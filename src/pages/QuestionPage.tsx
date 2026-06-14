import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { track } from '../utils/track';

interface QuestionPageProps {
  onAnswer: (answer: 'yes' | 'no') => void;
}

const serif = "'Georgia', 'Times New Roman', serif";

const ESCAPE_TEXTS = [
  "Think again... 💭",
  "Are you sure? 🙈",
  "One more try ✨",
];

function randomPos() {
  const angle = Math.random() * 2 * Math.PI;
  const dist = 150 + Math.random() * 100;
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist * 0.45),
  };
}

export function QuestionPage({ onAnswer }: QuestionPageProps) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [floatText, setFloatText] = useState('');
  const [locked, setLocked] = useState(false);
  const [prevAnswer, setPrevAnswer] = useState<string | null>(null);
  const isEscaping = useRef(false);

  useEffect(() => {
    fetch('/api/state')
      .then(r => r.json())
      .then((s: { answer?: string | null }) => {
        if (s.answer) {
          setLocked(true);
          setPrevAnswer(s.answer);
        }
      })
      .catch(() => {});
  }, []);

  const handleYes = () => {
    if (locked) {
      track({ type: 'change-attempt', previousAnswer: prevAnswer ?? 'yes' });
      return;
    }
    onAnswer('yes');
  };

  const handleNo = () => {
    if (locked) {
      track({ type: 'change-attempt', previousAnswer: prevAnswer ?? 'no' });
      return;
    }

    if (escapeCount >= 3) {
      onAnswer('no');
      return;
    }

    if (isEscaping.current) return;
    isEscaping.current = true;

    const nextPos = randomPos();
    setPos(nextPos);
    setFloatText(ESCAPE_TEXTS[escapeCount] ?? '🙈');
    track({ type: 'no-attempt', attempt: escapeCount + 1, x: nextPos.x, y: nextPos.y });

    setTimeout(() => {
      setFloatText('');
      setEscapeCount((c) => c + 1);
      isEscaping.current = false;
    }, 700);
  };

  if (locked) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center gap-5"
        style={{ minHeight: '100%' }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart
            className="w-11 h-11 text-rose-500"
            fill="currentColor"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(190,40,40,0.45))' }}
          />
        </motion.div>
        <p className="text-stone-700 text-base font-light" style={{ fontFamily: serif }}>
          You already chose...
        </p>
        <p className="text-stone-400 text-sm italic" style={{ fontFamily: serif }}>
          why would you change that? 🥺
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-5 py-6"
      style={{ minHeight: '100%' }}
    >
      <p
        className="text-rose-700/58 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: serif }}
      >
        The Final Chapter
      </p>

      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart
          className="w-11 h-11 text-rose-600"
          fill="currentColor"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(190,40,40,0.5))' }}
        />
      </motion.div>

      <div className="space-y-1.5">
        <h2
          className="text-2xl font-light text-stone-800 leading-tight"
          style={{ fontFamily: serif }}
        >
          I have a question...
        </h2>
        <p
          className="text-lg text-stone-600/75 italic font-light"
          style={{ fontFamily: serif }}
        >
          If time turned back for us...<br />
          would you start the talk again?
        </p>
      </div>

      <div className="flex items-center gap-2 opacity-25 w-full max-w-[200px]">
        <div className="h-px flex-1 bg-stone-700" />
        <div className="w-1.5 h-1.5 rotate-45 bg-stone-700" />
        <div className="h-px flex-1 bg-stone-700" />
      </div>

      <div className="flex gap-3 w-full" style={{ position: 'relative' }}>
        <motion.button
          onClick={handleYes}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="flex-1 py-3 text-sm font-light tracking-wide rounded-sm"
          style={{
            background: 'rgba(160,30,30,0.07)',
            border: '1px solid rgba(175,45,45,0.38)',
            color: '#8b1a1a',
            fontFamily: serif,
            boxShadow: '0 2px 8px rgba(160,30,30,0.08)',
          }}
        >
          Yes
        </motion.button>

        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence>
            {floatText && (
              <motion.p
                key={escapeCount}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: -4 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: '110%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  color: '#9a8a7a',
                  fontFamily: serif,
                  fontStyle: 'italic',
                  pointerEvents: 'none',
                }}
              >
                {floatText}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleNo}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className="w-full py-3 text-sm font-light tracking-wide rounded-sm"
            style={{
              background: 'rgba(80,80,100,0.04)',
              border: '1px solid rgba(100,100,130,0.18)',
              color: '#5a5a6a',
              fontFamily: serif,
              position: 'relative',
              zIndex: 10,
            }}
          >
            No
          </motion.button>
        </div>
      </div>

      <motion.p
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-stone-500/38 text-xs"
        style={{ fontFamily: serif }}
      >
        Choose with your heart
      </motion.p>
    </div>
  );
}
