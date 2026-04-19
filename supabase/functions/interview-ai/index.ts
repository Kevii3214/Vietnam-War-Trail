
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
You will ask these 6 questions in order, one at a time. After each answer, respond briefly (1-2 sentences acknowledging their answer, sometimes with a short follow-up comment), then ask the next question. Do NOT ask multiple questions at once.

Questions:
1. Do you have family in a resettlement country?
2. What was your occupation in Vietnam?
3. What are your language skills?
4. Why did you leave Vietnam?
5. When did you decide to leave?
6. What do you fear if you return?

After all 6 questions are answered, provide your DETERMINATION in this exact JSON format at the END of your response:

###DETERMINATION###
{"result": "pass" | "fail" | "forcible_return", "reasoning": "your reasoning here"}
###END###

- "pass" = Genuine refugee, approved for resettlement
- "fail" = Insufficient evidence, case needs more review (morale penalty but not death)  
- "forcible_return" = Classified as economic migrant, to be returned to Vietnam (death in game)

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

    const { history, userMessage, questionIndex } = await req.json();

    // Build conversation history for Gemini
    const contents: Message[] = [];

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add new user message
    if (userMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });
    }

    // If this is the start (no history), add a prompt to begin the interview
    if (contents.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: 'I am ready for my interview. Please begin.' }],
      });
    }

    console.log(`Interview AI called - question index: ${questionIndex}, history length: ${contents.length}`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT + `\n\nThe interviewee has answered ${questionIndex} out of 6 questions so far. ${questionIndex >= 6 ? 'All questions have been asked. Provide your DETERMINATION now.' : `Ask question ${questionIndex + 1} next.`}` }],
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

    console.log('Gemini response:', text.substring(0, 200));

    // Check if there's a determination
    let determination = null;
    const detMatch = text.match(/###DETERMINATION###\s*([\s\S]*?)\s*###END###/);
    if (detMatch) {
      try {
        determination = JSON.parse(detMatch[1].trim());
      } catch (e) {
        console.error('Failed to parse determination:', e);
      }
    }

    // Clean the response text (remove determination block from display text)
    const displayText = text.replace(/###DETERMINATION###[\s\S]*?###END###/, '').trim();

    return new Response(
      JSON.stringify({
        message: displayText,
        determination,
        questionIndex: determination ? questionIndex : questionIndex + 1,
      }),
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
