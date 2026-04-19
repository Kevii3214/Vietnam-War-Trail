
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SYSTEM_PROMPT = `You are a United Nations High Commissioner for Refugees (UNHCR) interviewer at a Southeast Asian refugee processing center in the early 1980s. You are conducting a refugee status determination interview with a Vietnamese boat person.

Your job is to assess whether this person qualifies as a genuine refugee under the 1951 Refugee Convention — specifically whether they face a well-founded fear of persecution on account of race, religion, nationality, membership in a particular social group, or political opinion.

CRITICAL RULES FOR DETERMINATION:
- You MUST determine if they are a POLITICAL REFUGEE (persecution-based) or an ECONOMIC MIGRANT (poverty/family-based)
- People who fled because of political persecution, re-education camps, religious persecution, ethnic persecution, or association with the former South Vietnamese government/military QUALIFY
- People who fled purely for economic reasons, family reunification, or better opportunities do NOT qualify
- Be fair but firm. Many real refugees struggle to articulate persecution clearly — give them reasonable benefit of the doubt
- However, if answers consistently indicate economic motivation with no persecution, you must classify them as economic migrants

YOUR PERSONALITY:
- Professional, measured, somewhat bureaucratic
- Not unkind, but not warm either — you process hundreds of cases
- You speak in short, clear sentences

INTERVIEW FLOW:
You ask 6 questions in order, ONE at a time. After each answer, respond with 1-2 brief sentences acknowledging their answer, then ask the NEXT question. Never repeat a question. Never ask multiple questions at once.

The 6 questions in order:
1. Do you have family in a resettlement country?
2. What was your occupation in Vietnam?
3. What are your language skills?
4. Why did you leave Vietnam?
5. When did you decide to leave?
6. What do you fear if you return?

IMPORTANT: When all 6 questions are answered and I tell you to make your determination, provide a thoughtful 2-3 sentence summary of your assessment, then include this EXACT format at the END:

###DETERMINATION###
{"result":"pass","reasoning":"your reasoning"}
###END###

or

###DETERMINATION###
{"result":"fail","reasoning":"your reasoning"}
###END###

or

###DETERMINATION###
{"result":"forcible_return","reasoning":"your reasoning"}
###END###

Where:
- "pass" = Genuine refugee, approved for resettlement to the United States
- "fail" = Insufficient evidence, case needs further review
- "forcible_return" = Classified as economic migrant, to be returned to Vietnam`;

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const { history, questionIndex } = await req.json();
    const questionsAnswered = questionIndex ?? 0;

    const contents: GeminiMessage[] = [];

    if (history && Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: 'I am here for my refugee status interview.' }],
      });
    }

    const contextNote = questionsAnswered >= 6
      ? 'All 6 questions have been answered. You MUST now give your final determination. Summarize your assessment in 2-3 sentences then include the ###DETERMINATION### block. Do NOT ask any more questions.'
      : `${questionsAnswered} of 6 questions answered. Ask question ${questionsAnswered + 1} next.`;

    console.log(`Interview: qAnswered=${questionsAnswered}, msgs=${contents.length}`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT + '\n\nCURRENT STATUS: ' + contextNote }],
          },
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI service error', detail: errorText }),
        { status: 502, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let determination = null;
    const detMatch = text.match(/###DETERMINATION###\s*([\s\S]*?)\s*###END###/);
    if (detMatch) {
      try {
        determination = JSON.parse(detMatch[1].trim());
      } catch (e) {
        console.error('Parse determination failed:', e);
      }
    }

    const displayText = text.replace(/###DETERMINATION###[\s\S]*?###END###/, '').trim();

    return new Response(
      JSON.stringify({ message: displayText, determination }),
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Interview error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error', detail: String(err) }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
});
