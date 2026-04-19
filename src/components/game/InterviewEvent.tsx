import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronRight, Loader2, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InterviewMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Determination {
  result: 'pass' | 'fail' | 'forcible_return';
  reasoning: string;
}

const QUESTIONS = [
  'Do you have family in a resettlement country?',
  'What was your occupation in Vietnam?',
  'What are your language skills?',
  'Why did you leave Vietnam?',
  'When did you decide to leave?',
  'What do you fear if you return?',
];

const SUGGESTED_ANSWERS: Record<number, string[]> = {
  0: [
    'I have an uncle in California, USA.',
    'No, I have no family abroad.',
    'My cousin resettled in France two years ago.',
  ],
  1: [
    'I was a teacher at a public school.',
    'I served in the South Vietnamese Army.',
    'I was a fisherman in a small village.',
    'I worked for the American embassy.',
  ],
  2: [
    'I speak some English from school.',
    'Only Vietnamese. No other languages.',
    'I speak French and some English.',
  ],
  3: [
    'The communists sent my father to a reeducation camp. We feared we would be next.',
    'We could not find work or food. Life became impossible.',
    'They came to our house at night. They said we were traitors because my father served in the ARVN.',
    'I am Catholic. The government closed our church and arrested our priest.',
  ],
  4: [
    'After my father did not return from the reeducation camp for three years.',
    'When they began relocating families to the New Economic Zones.',
    'We planned for months after the fall of Saigon.',
    'It was sudden — we heard the police were coming for us.',
  ],
  5: [
    'I fear imprisonment in a reeducation camp. My family served the South.',
    'I fear nothing specific, I just want a better life for my children.',
    'They will execute me. I am on a list because of my work with the Americans.',
    'Religious persecution. They have arrested many Catholics in our province.',
  ],
};

// Keywords that indicate political persecution for fallback determination
const PERSECUTION_KEYWORDS = [
  'reeducation', 're-education', 'camp', 'arvn', 'army', 'military', 'soldier',
  'embassy', 'american', 'catholic', 'church', 'priest', 'persecution',
  'arrest', 'prison', 'execute', 'traitor', 'political', 'police', 'list',
  'communist', 'viet cong', 'fear', 'kill', 'punish',
];

interface InterviewEventProps {
  onPass: () => void;
  onFail: () => void;
  onForcibleReturn: () => void;
}

export function InterviewEvent({ onPass, onFail, onForcibleReturn }: InterviewEventProps) {
  // Full history sent to AI (invisible to user after each exchange)
  const historyRef = useRef<InterviewMessage[]>([]);
  const answersRef = useRef<string[]>([]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [determination, setDetermination] = useState<Determination | null>(null);
  const [started, setStarted] = useState(false);

  // Current visible exchange — only the latest interviewer message
  const [currentResponse, setCurrentResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const typewriteText = useCallback((text: string) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        if (typingRef.current) clearInterval(typingRef.current);
        typingRef.current = null;
        setIsTyping(false);
      }
    }, 25);
  }, []);

  useEffect(() => {
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, []);

  // Fallback determination based on player answers
  const getFallbackDetermination = useCallback((): Determination => {
    const allAnswers = answersRef.current.join(' ').toLowerCase();
    const persecutionScore = PERSECUTION_KEYWORDS.filter((kw) => allAnswers.includes(kw)).length;

    if (persecutionScore >= 4) {
      return {
        result: 'pass',
        reasoning: 'Based on your testimony regarding political persecution and ties to the former South Vietnamese government, you qualify as a refugee under the 1951 Convention.',
      };
    } else if (persecutionScore >= 2) {
      return {
        result: 'fail',
        reasoning: 'Your case contains some elements of persecution but insufficient evidence for immediate approval. Your case will be reviewed further.',
      };
    } else {
      return {
        result: 'forcible_return',
        reasoning: 'Your testimony indicates economic motivations rather than political persecution. Under UNHCR guidelines, you have been classified as an economic migrant.',
      };
    }
  }, []);

  const callAI = useCallback(async (history: InterviewMessage[], qIndex: number): Promise<{message: string; determination: Determination | null}> => {
    try {
      const { data, error } = await supabase.functions.invoke('interview-ai', {
        body: {
          history: history.map((m) => ({ role: m.role, content: m.content })),
          questionIndex: qIndex,
        },
      });
      if (error) throw error;
      if (!data?.message) throw new Error('Empty response');
      return { message: data.message, determination: data.determination || null };
    } catch (err) {
      console.error('Interview AI error:', err);
      return null as never;
    }
  }, []);

  // Start interview
  const startInterview = useCallback(async () => {
    setStarted(true);
    setIsLoading(true);
    try {
      const result = await callAI([], 0);
      const greeting = result.message;
      const assistantMsg: InterviewMessage = { role: 'assistant', content: greeting };
      historyRef.current = [
        { role: 'user', content: 'I am here for my refugee status interview.' },
        assistantMsg,
      ];
      setCurrentResponse(greeting);
      typewriteText(greeting);
    } catch {
      // Fallback greeting
      const greeting = 'Good morning. Please sit down. I am the UNHCR case officer assigned to your file. I have some questions for you. Let us begin. Do you have family in a resettlement country?';
      const assistantMsg: InterviewMessage = { role: 'assistant', content: greeting };
      historyRef.current = [
        { role: 'user', content: 'I am here for my refugee status interview.' },
        assistantMsg,
      ];
      setCurrentResponse(greeting);
      typewriteText(greeting);
    } finally {
      setIsLoading(false);
    }
  }, [callAI, typewriteText]);

  // Send answer
  const sendAnswer = useCallback(async (answer: string) => {
    if (isLoading || isTyping) return;

    setCustomInput('');
    setIsLoading(true);

    // Store the answer
    answersRef.current.push(answer);
    const newQIndex = questionIndex + 1;
    setQuestionIndex(newQIndex);

    // Add user message to history
    const userMsg: InterviewMessage = { role: 'user', content: answer };
    const updatedHistory = [...historyRef.current, userMsg];

    try {
      const result = await callAI(updatedHistory, newQIndex);
      const assistantMsg: InterviewMessage = { role: 'assistant', content: result.message };
      historyRef.current = [...updatedHistory, assistantMsg];
      setCurrentResponse(result.message);
      typewriteText(result.message);

      if (result.determination) {
        setDetermination(result.determination);
      } else if (newQIndex >= 6) {
        // AI didn't give determination after Q6 — use fallback
        setDetermination(getFallbackDetermination());
      }
    } catch {
      // Fallback response
      if (newQIndex < 6) {
        const fallbackText = `Noted. ${QUESTIONS[newQIndex]}`;
        const assistantMsg: InterviewMessage = { role: 'assistant', content: fallbackText };
        historyRef.current = [...updatedHistory, assistantMsg];
        setCurrentResponse(fallbackText);
        typewriteText(fallbackText);
      } else {
        // Q6 answered — determine from answers
        const det = getFallbackDetermination();
        const fallbackText = 'Thank you. I have reviewed your testimony. I have reached my determination.';
        const assistantMsg: InterviewMessage = { role: 'assistant', content: fallbackText };
        historyRef.current = [...updatedHistory, assistantMsg];
        setCurrentResponse(fallbackText);
        typewriteText(fallbackText);
        setDetermination(det);
      }
    } finally {
      setIsLoading(false);
    }
  }, [questionIndex, isLoading, isTyping, callAI, typewriteText, getFallbackDetermination]);

  const handleSubmit = useCallback(() => {
    if (customInput.trim()) {
      sendAnswer(customInput.trim());
    }
  }, [customInput, sendAnswer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  // ---- RENDERS ----

  // Not started
  if (!started) {
    return (
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-pixel text-[10px] text-primary crt-glow">Interview Day</span>
          <div className="flex-1 border-t-2 border-primary/20" />
        </div>
        <p className="font-retro text-base md:text-lg text-foreground leading-relaxed mb-3">
          A UN official calls your name from a clipboard. Your heart pounds as you walk into the small office.
          This interview will determine your future. Answer carefully — your words decide everything.
        </p>
        <div className="flex justify-end">
          <button onClick={startInterview} className="btn-neon flex items-center gap-2 font-pixel text-[10px] px-4 py-2">
            Begin Interview
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Determination reached
  if (determination && !isTyping) {
    const cfg = {
      pass: { title: 'STATUS: APPROVED', color: 'text-game-food', border: 'border-game-food/40', bg: 'bg-game-food/5' },
      fail: { title: 'STATUS: INSUFFICIENT EVIDENCE', color: 'text-yellow-400', border: 'border-yellow-400/40', bg: 'bg-yellow-400/5' },
      forcible_return: { title: 'STATUS: DENIED — ECONOMIC MIGRANT', color: 'text-game-health', border: 'border-game-health/40', bg: 'bg-game-health/5' },
    }[determination.result];

    return (
      <div className="animate-fade-in-up">
        <div className={`border ${cfg.border} ${cfg.bg} p-3 mb-3`}>
          <p className={`font-pixel text-[10px] ${cfg.color} mb-2`}>{cfg.title}</p>
          <p className="font-retro text-sm text-foreground/80 leading-relaxed">{determination.reasoning}</p>
        </div>
        {determination.result === 'forcible_return' && (
          <p className="font-retro text-sm text-game-health/80 italic mb-3">
            You have been classified as an economic migrant and will be forcibly returned to Vietnam...
          </p>
        )}
        {determination.result === 'fail' && (
          <p className="font-retro text-sm text-yellow-400/80 italic mb-3">
            Your case requires further review. The uncertainty weighs heavily on your spirit.
          </p>
        )}
        {determination.result === 'pass' && (
          <p className="font-retro text-sm text-game-food/80 italic mb-3">
            Your application for resettlement has been approved. A new chapter begins.
          </p>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (determination.result === 'pass') onPass();
              else if (determination.result === 'fail') onFail();
              else onForcibleReturn();
            }}
            className="btn-neon flex items-center gap-2 font-pixel text-[10px] px-4 py-2"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Active interview — show ONLY the current interviewer response
  const suggestedForCurrent = SUGGESTED_ANSWERS[questionIndex] || [];

  return (
    <div className="animate-fade-in-up flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-pixel text-[10px] text-primary crt-glow">UNHCR Interview</span>
        <div className="flex-1 border-t-2 border-primary/20" />
        <span className="font-pixel text-[8px] text-muted-foreground">Q{Math.min(questionIndex + 1, 6)}/6</span>
      </div>

      {/* Current interviewer message only */}
      <div className="mb-3">
        {isLoading ? (
          <div className="flex items-center gap-2 py-2">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <span className="font-retro text-xs text-muted-foreground">The officer is reviewing your response...</span>
          </div>
        ) : currentResponse && (
          <div className="px-3 py-2 bg-muted/30 border border-border/40" style={{ borderRadius: '2px' }}>
            <p className="font-retro text-sm text-foreground/90 leading-relaxed">
              {displayedText}
              {isTyping && <span className="inline-block w-1.5 h-3 bg-primary/60 ml-0.5 animate-pulse" />}
            </p>
          </div>
        )}
      </div>

      {/* Suggested answers */}
      {!isLoading && !isTyping && questionIndex < 6 && suggestedForCurrent.length > 0 && (
        <div className="space-y-1 mb-2">
          {suggestedForCurrent.map((answer, i) => (
            <button
              key={`${questionIndex}-${i}`}
              onClick={() => sendAnswer(answer)}
              className="w-full text-left flex items-start gap-2 px-2.5 py-1.5 border border-primary/15 hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99] transition-all cursor-pointer group"
              style={{ borderRadius: '2px' }}
            >
              <span className="text-primary font-pixel text-[8px] mt-0.5 shrink-0">&gt;{i + 1}</span>
              <span className="font-retro text-xs text-foreground/60 group-hover:text-foreground/90 transition-colors">{answer}</span>
            </button>
          ))}
        </div>
      )}

      {/* Custom input */}
      {!isLoading && !isTyping && questionIndex < 6 && (
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your own answer..."
            className="flex-1 bg-background border border-primary/20 px-3 py-1.5 font-retro text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
            style={{ borderRadius: '2px' }}
          />
          <button
            onClick={handleSubmit}
            disabled={!customInput.trim()}
            className="px-3 py-1.5 border border-primary/30 hover:border-primary/70 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            style={{ borderRadius: '2px' }}
          >
            <Send className="w-4 h-4 text-primary" />
          </button>
        </div>
      )}
    </div>
  );
}
