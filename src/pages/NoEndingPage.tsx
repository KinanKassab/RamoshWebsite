import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";
const hand  = "'Caveat', 'Georgia', serif";

export function NoEndingPage() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-5 py-5"
      style={{ minHeight: '100%' }}
    >
      {/* Dim heart */}
      <Heart
        style={{
          width: '46px',
          height: '46px',
          color: 'rgba(90,80,80,0.32)',
        }}
        fill="currentColor"
      />

      {/* Title */}
      <div>
        <h1
          style={{
            fontFamily: hand,
            fontSize: '2.1rem',
            fontWeight: 600,
            color: 'rgba(55,40,25,0.72)',
            lineHeight: 1.1,
            marginBottom: '5px',
          }}
        >
          I understand
        </h1>
        <p
          style={{
            fontFamily: serif,
            fontSize: '0.84rem',
            color: 'rgba(70,58,40,0.58)',
            fontStyle: 'italic',
          }}
        >
          Maybe some stories are not meant to have a second chance.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.18,
          width: '100%',
          maxWidth: '160px',
        }}
      >
        <div style={{ height: '1px', flex: 1, background: '#5a5050' }} />
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#5a5050',
            flexShrink: 0,
          }}
        />
        <div style={{ height: '1px', flex: 1, background: '#5a5050' }} />
      </div>

      <p
        style={{
          fontFamily: serif,
          fontSize: '0.84rem',
          color: 'rgba(60,45,25,0.55)',
          fontStyle: 'italic',
          lineHeight: 1.72,
          maxWidth: '295px',
        }}
      >
        Thank you for every memory, every smile, and every moment we shared.
        No matter what happens next, a part of my heart will always carry your name.
      </p>

      {/* Three dots */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(90,80,70,0.3)',
            }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
        <p
          style={{
            fontFamily: hand,
            fontSize: '1rem',
            color: 'rgba(70,55,30,0.45)',
          }}
        >
          (But I still want to say...)
        </p>
        <p
          style={{
            fontFamily: serif,
            fontSize: '0.76rem',
            color: 'rgba(70,55,30,0.35)',
            fontStyle: 'italic',
          }}
        >
          Even if this is goodbye, you were my favorite chapter.
        </p>
      </div>
    </div>
  );
}
