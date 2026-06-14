import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";
const hand = "'Caveat', 'Georgia', serif";

export function CoverPage() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-5 gap-4"
      style={{ minHeight: '100%' }}
    >
      {/* Inscription label — handwritten feel */}
      <p
        style={{
          fontFamily: hand,
          fontSize: '13px',
          color: 'rgba(160,60,60,0.55)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        For my most special person
      </p>

      <InkDivider />

      {/* Pulsing heart */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart
          style={{
            width: '52px',
            height: '52px',
            color: '#be3030',
            filter: 'drop-shadow(0 2px 10px rgba(190,40,40,0.42))',
          }}
          fill="currentColor"
        />
      </motion.div>

      {/* Title in handwriting font */}
      <div>
        <h1
          style={{
            fontFamily: hand,
            fontSize: '2.6rem',
            fontWeight: 600,
            color: '#2a1808',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          Welcom back
        </h1>
        <p
          style={{
            fontFamily: serif,
            fontSize: '0.72rem',
            color: 'rgba(160,55,55,0.42)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: '4px',
          }}
        >
          A website Just For You
        </p>
      </div>

      <InkDivider diamond />

      {/* Quote — italic serif */}
      <p
        style={{
          fontFamily: serif,
          fontSize: '0.82rem',
          color: 'rgba(70,50,30,0.58)',
          fontStyle: 'italic',
          lineHeight: 1.65,
          maxWidth: '265px',
        }}
      >
        "I didn't build this website to impress you…{' '}
        I built it because I couldn't leave these words unsaid."
      </p>

      {/* Turn-page hint */}
      <motion.p
        animate={{ opacity: [0.22, 0.58, 0.22] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          fontFamily: hand,
          fontSize: '1rem',
          color: 'rgba(160,110,40,0.75)',
          letterSpacing: '0.04em',
          marginTop: '6px',
        }}
      >
        swipe to the next page →
      </motion.p>
    </div>
  );
}

function InkDivider({ diamond }: { diamond?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.28,
        width: '100%',
        maxWidth: '190px',
      }}
    >
      <div style={{ height: '1px', flex: 1, background: '#8B2020' }} />
      {diamond ? (
        <div
          style={{
            width: '7px',
            height: '7px',
            transform: 'rotate(45deg)',
            background: '#8B2020',
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#8B2020',
            flexShrink: 0,
          }}
        />
      )}
      <div style={{ height: '1px', flex: 1, background: '#8B2020' }} />
    </div>
  );
}
