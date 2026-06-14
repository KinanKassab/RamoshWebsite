import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";
const hand  = "'Caveat', 'Georgia', serif";

export function YesEndingPage() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-4 py-5"
      style={{ minHeight: '100%' }}
    >
      {/* Big pulsing heart */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart
          style={{
            width: '62px',
            height: '62px',
            color: '#c03030',
            filter: 'drop-shadow(0 2px 16px rgba(200,40,40,0.52))',
          }}
          fill="currentColor"
        />
      </motion.div>

      {/* Title in handwriting */}
      <div>
        <h1
          style={{
            fontFamily: hand,
            fontSize: '2.4rem',
            fontWeight: 700,
            color: '#2a1808',
            lineHeight: 1.05,
            marginBottom: '5px',
          }}
        >
          You said Yes!
        </h1>
        <p
          style={{
            fontFamily: serif,
            fontSize: '0.9rem',
            color: 'rgba(175,48,48,0.65)',
            fontStyle: 'italic',
          }}
        >
          Fully impressed, I am at a loss for words.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.2,
          width: '100%',
          maxWidth: '180px',
        }}
      >
        <div style={{ height: '1px', flex: 1, background: '#8B2020' }} />
        <div
          style={{
            width: '7px',
            height: '7px',
            transform: 'rotate(45deg)',
            background: '#8B2020',
            flexShrink: 0,
          }}
        />
        <div style={{ height: '1px', flex: 1, background: '#8B2020' }} />
      </div>

      <p
        style={{
          fontFamily: serif,
          fontSize: '0.84rem',
          color: 'rgba(60,40,15,0.62)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          maxWidth: '268px',
        }}
      >
        I wanted this moment…
        but I also remember how easily you gave up on me before.
      </p>

      {/* Wax seal */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 36% 32%, #e44, #8b1010)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '4px',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>♥</span>
      </div>
    </div>
  );
}
