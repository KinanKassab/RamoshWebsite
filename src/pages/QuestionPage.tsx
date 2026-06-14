import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { track } from '../utils/track';

interface QuestionPageProps {
  onAnswer: (answer: 'yes' | 'no') => void;
}

const serif = "'Georgia', 'Times New Roman', serif";
const hand  = "'Caveat', 'Georgia', serif";

const ESCAPE_TEXTS = [
  "Think again... 💭",
  "Are you sure? 🙈",
  "One more try ✨",
];

function randomPos() {
  const angle = Math.random() * 2 * Math.PI;
  const dist  = 150 + Math.random() * 100;
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist * 0.45),
  };
}

export function QuestionPage({ onAnswer }: QuestionPageProps) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [pos,         setPos]         = useState({ x: 0, y: 0 });
  const [floatText,   setFloatText]   = useState('');
  const [locked,      setLocked]      = useState(false);
  const [prevAnswer,  setPrevAnswer]  = useState<string | null>(null);
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
    if (escapeCount >= 3) { onAnswer('no'); return; }
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
            style={{
              width: '44px',
              height: '44px',
              color: '#c04040',
              filter: 'drop-shadow(0 2px 8px rgba(190,40,40,0.45))',
            }}
            fill="currentColor"
          />
        </motion.div>
        <p style={{ fontFamily: hand, fontSize: '1.35rem', color: '#2a1808' }}>
          You already chose...
        </p>
        <p style={{ fontFamily: serif, fontSize: '0.82rem', color: 'rgba(80,60,30,0.52)', fontStyle: 'italic' }}>
          why would you change that? 🥺
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-5 py-5"
      style={{ minHeight: '100%' }}
    >
      <p
        style={{
          fontFamily: hand,
          fontSize: '13px',
          color: 'rgba(160,55,55,0.58)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        The Final Chapter
      </p>

      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart
          style={{
            width: '44px',
            height: '44px',
            color: '#c04040',
            filter: 'drop-shadow(0 2px 8px rgba(190,40,40,0.5))',
          }}
          fill="currentColor"
        />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h2
          style={{
            fontFamily: hand,
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#2a1808',
            lineHeight: 1.1,
          }}
        >
          I have a question...
        </h2>
        <p
          style={{
            fontFamily: hand,
            fontSize: '1.2rem',
            color: 'rgba(60,40,15,0.72)',
            fontStyle: 'italic',
            lineHeight: 1.4,
          }}
        >
          If time turned back for us…<br />
          would you start the talk again?
        </p>
      </div>

      {/* Diamond divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.22,
          width: '100%',
          maxWidth: '200px',
        }}
      >
        <div style={{ height: '1px', flex: 1, background: '#4a3820' }} />
        <div
          style={{
            width: '7px',
            height: '7px',
            transform: 'rotate(45deg)',
            background: '#4a3820',
            flexShrink: 0,
          }}
        />
        <div style={{ height: '1px', flex: 1, background: '#4a3820' }} />
      </div>

      <div
        style={{ display: 'flex', gap: '12px', width: '100%', position: 'relative' }}
      >
        {/* Yes button */}
        <motion.button
          onClick={handleYes}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          style={{
            flex: 1,
            padding: '12px 0',
            fontFamily: hand,
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#7a1414',
            background: 'rgba(155,28,28,0.07)',
            border: '1px solid rgba(170,42,42,0.35)',
            borderRadius: '2px',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 8px rgba(155,28,28,0.07)',
          }}
        >
          Yes
        </motion.button>

        {/* No button (escapes) */}
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
                  fontFamily: hand,
                  fontSize: '0.9rem',
                  color: 'rgba(90,70,40,0.75)',
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
            style={{
              width: '100%',
              padding: '12px 0',
              fontFamily: hand,
              fontSize: '1.1rem',
              color: 'rgba(70,65,80,0.7)',
              background: 'rgba(80,80,100,0.04)',
              border: '1px solid rgba(100,100,130,0.18)',
              borderRadius: '2px',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 10,
            }}
          >
            No
          </motion.button>
        </div>
      </div>

      <motion.p
        animate={{ opacity: [0.22, 0.45, 0.22] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          fontFamily: serif,
          fontSize: '0.75rem',
          color: 'rgba(70,55,30,0.38)',
          fontStyle: 'italic',
        }}
      >
        Choose with your heart
      </motion.p>
    </div>
  );
}
