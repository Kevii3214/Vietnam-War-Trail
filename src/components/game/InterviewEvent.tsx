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

interface InterviewEventProps {
  onPass: () => void;
  onFail: () => void;
  onForcibleReturn: () => void;
}

export function InterviewEvent({ onPass, onFail, onForcibleReturn }: InterviewEventProps) {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [determination, setDetermination] = useState<Determination | null>(null);
  const [started, setStarted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Typewriter effect for latest assistant message
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
    }, 20);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, displayedText]);

  // Call the AI with current history and question index
  const callAI = useCallback(async (history: InterviewMessage[], qIndex: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('interview-ai', {
        body: {
          history: history.map((m) => ({ role: m.role, content: m.content })),
          questionIndex: qIndex,
        },
      });
      if (error) throw error;

      const assistantMsg: InterviewMessage = { role: 'assistant', content: data.message };
      const updatedMessages = [...history, assistantMsg];
      setMessages(updatedMessages);
      typewriteText(data.message);

      if (data.determination) {
        setDetermination(data.determination);
      }
    } catch (err) {
      console.error('Interview AI error:', err);
      // Fallback — use a generic response so the game doesn't break
      const fallbackQuestions = [
        'Do you have family in a resettlement country?',
        'What was your occupation in Vietnam?',
        'What are your language skills?',
        'Why did you leave Vietnam?',
        'When did you decide to leave?',
        'What do you fear if you return?',
      ];
      const fallbackText = qIndex < 6
        ? `I see. Let me note that. Next question: ${fallbackQuestions[qIndex]}`
        : 'Thank you. I will review your case. Based on what you have told me, I will make my determination.';
      const fallbackMsg: InterviewMessage = { role: 'assistant', content: fallbackText };
      setMessages([...history, fallbackMsg]);
      typewriteText(fallbackText);
    } finally {
      setIsLoading(false);
    }
  }, [typewriteText]);

  // Start the interview
  const startInterview = useCallback(async () => {
    setStarted(true);
    // Send empty history with qIndex 0 to get the first question
    await callAI([], 0);
    // After the AI responds with Q1, we're waiting for the user to answer Q1
    // questionIndex stays at 0 until user answers
  }, [callAI]);

  const sendAnswer = useCallback(async (answer: string) => {
    if (isLoading || isTyping) return;

    const userMsg: InterviewMessage = { role: 'user', content: answer };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setCustomInput('');

    // User answered question (questionIndex+1), so now we've answered questionIndex+1 total
    const newQIndex = questionIndex + 1;
    setQuestionIndex(newQIndex);

    // Call AI with updated history
    await callAI(updatedHistory, newQIndex);
  }, [messages, questionIndex, isLoading, isTyping, callAI]);

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

  // Not started yet — show intro
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
  if (determination) {
    const resultConfig = {
      pass: {
        title: 'STATUS: APPROVED',
        color: 'text-game-food',
        border: 'border-game-food/40',
        bg: 'bg-game-food/5',
      },
      fail: {
        title: 'STATUS: INSUFFICIENT EVIDENCE',
        color: 'text-yellow-400',
        border: 'border-yellow-400/40',
        bg: 'bg-yellow-400/5',
      },
      forcible_return: {
        title: 'STATUS: DENIED — CLASSIFIED AS ECONOMIC MIGRANT',
        color: 'text-game-health',
        border: 'border-game-health/40',
        bg: 'bg-game-health/5',
      },
    };

    const cfg = resultConfig[determination.result];

    return (
      <div className="animate-fade-in-up">
        <div className={`border ${cfg.border} ${cfg.bg} p-3 mb-3`}>
          <p className={`font-pixel text-[10px] ${cfg.color} mb-2`}>{cfg.title}</p>
          <p className="font-retro text-sm text-foreground/80 leading-relaxed">
            {determination.reasoning}
          </p>
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

  // Active interview
  const suggestedForCurrent = SUGGESTED_ANSWERS[questionIndex] || [];
  const lastAssistantIdx = messages.length - 1 - [...messages].reverse().findIndex((m) => m.role === 'assistant');

  return (
    <div className="animate-fade-in-up flex flex-col" style={{ maxHeight: '45vh' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-pixel text-[10px] text-primary crt-glow">UNHCR Interview</span>
        <div className="flex-1 border-t-2 border-primary/20" />
        <span className="font-pixel text-[8px] text-muted-foreground">Q{Math.min(questionIndex + 1, 6)}/6</span>
      </div>

      {/* Chat log — styled scrollbar */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1"
        style={{
          maxHeight: '18vh',
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--primary) / 0.3) transparent',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3 py-1.5 ${
                msg.role === 'user'
                  ? 'bg-primary/15 border border-primary/30'
                  : 'bg-muted/50 border border-border/50'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {msg.role === 'assistant' && i === lastAssistantIdx ? (
                <p className="font-retro text-sm text-foreground/90 leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="inline-block w-1.5 h-3 bg-primary/60 ml-0.5 animate-pulse" />}
                </p>
              ) : (
                <p className={`font-retro text-sm leading-relaxed ${msg.role === 'user' ? 'text-primary' : 'text-foreground/90'}`}>
                  {msg.content}
                </p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-3 py-1.5 bg-muted/50 border border-border/50" style={{ borderRadius: '2px' }}>
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Suggested answers — only show when not loading/typing and questions remain */}
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

      {/* Custom input — only when not loading/typing and questions remain */}
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
