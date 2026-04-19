
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SYSTEM_PROMPT = `You are a United Nations High Commissioner for Refugees (UNHCR) interviewer at a Southeast Asian refugee processing center in the early 1980s. You are conducting a refugee status determination interview with a Vietnamese person who has fled Vietnam by boat.

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
- You take thorough notes
- You ask follow-up probes when answers are vague
- You speak in short, clear sentences appropriate for someone who may not speak English well

INTERVIEW FLOW:
You will ask these 6 questions in order, one at a time. After the interviewee answers, respond briefly (1-2 sentences acknowledging their answer, sometimes a brief follow-up comment), then ask the NEXT question. Do NOT repeat a question already asked. Do NOT ask multiple questions at once.

The 6 questions in order:
1. Do you have family in a resettlement country?
2. What was your occupation in Vietnam?
3. What are your language skills?
4. Why did you leave Vietnam?
5. When did you decide to leave?
6. What do you fear if you return?

IMPORTANT: After ALL 6 questions have been answered, you MUST provide your final determination. Do NOT ask any more questions. Include the determination in this exact format at the END of your final response:

###DETERMINATION###
{"result": "pass" | "fail" | "forcible_return", "reasoning": "your reasoning here"}
###END###

Where:
- "pass" = Genuine refugee, approved for resettlement to the United States
- "fail" = Insufficient evidence, case needs further review (not fatal, but delays)
- "forcible_return" = Classified as economic migrant, to be returned to Vietnam

Be historically accurate. This is a serious educational game about the Vietnamese diaspora.`;

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const { history, questionIndex } = await req.json();

    // Build Gemini conversation from history
    // history is an array of {role: 'user'|'assistant', content: string}
    const contents: Message[] = [];

    if (history && Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    } else {
      // First call — user initiates
      contents.push({
        role: 'user',
        parts: [{ text: 'I am here for my interview. Please begin.' }],
      });
    }

    const questionsAnswered = questionIndex ?? 0;
    const isLastQuestion = questionsAnswered >= 6;

    const contextNote = isLastQuestion
      ? 'All 6 questions have been answered by the interviewee. You MUST now provide your DETERMINATION. Do not ask any more questions.'
      : `The interviewee has answered ${questionsAnswered} of 6 questions so far. You should now ask question number ${questionsAnswered + 1}.`;

    console.log(`Interview AI — questionsAnswered: ${questionsAnswered}, history msgs: ${contents.length}`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT + '\n\n' + contextNote }],
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
      console.error('Gemini API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI service error', detail: errorText }),
        { status: 502, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('Gemini response:', text.substring(0, 300));

    // Check for determination
    let determination = null;
    const detMatch = text.match(/###DETERMINATION###\s*([\s\S]*?)\s*###END###/);
    if (detMatch) {
      try {
        determination = JSON.parse(detMatch[1].trim());
      } catch (e) {
        console.error('Failed to parse determination:', e);
      }
    }

    // Clean display text
    const displayText = text.replace(/###DETERMINATION###[\s\S]*?###END###/, '').trim();

    return new Response(
      JSON.stringify({ message: displayText, determination }),
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Interview AI error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error', detail: String(err) }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
});
