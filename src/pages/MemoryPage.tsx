import { motion } from 'framer-motion';
import { Memory } from '../data/memories';

interface MemoryPageProps {
  memory: Memory;
  memoryNumber: number;
  totalMemories: number;
}

const serif = "'Georgia', 'Times New Roman', serif";
const hand  = "'Caveat', 'Georgia', serif";

/* Washi tape colors — vary by memory */
const TAPE_PAIRS: Array<{ left: string; right: string }> = [
  { left: 'rgba(148,198,190,0.72)', right: 'rgba(212,180,158,0.72)' },
  { left: 'rgba(218,178,188,0.72)', right: 'rgba(175,208,198,0.72)' },
  { left: 'rgba(228,208,148,0.72)', right: 'rgba(188,185,218,0.72)' },
  { left: 'rgba(198,175,215,0.72)', right: 'rgba(158,198,178,0.72)' },
  { left: 'rgba(210,158,158,0.72)', right: 'rgba(195,218,178,0.72)' },
  { left: 'rgba(218,198,155,0.72)', right: 'rgba(175,198,218,0.72)' },
];

const TAPE_STRIPE = `repeating-linear-gradient(
  90deg,
  rgba(255,255,255,0.18) 0px,
  rgba(255,255,255,0.18) 2px,
  transparent 2px,
  transparent 7px
)`;

export function MemoryPage({ memory, memoryNumber, totalMemories }: MemoryPageProps) {
  const tape = TAPE_PAIRS[(memoryNumber - 1) % TAPE_PAIRS.length];

  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Header row */}
      <div className="flex items-baseline justify-between">
        <p
          style={{
            fontFamily: hand,
            fontSize: '13px',
            color: 'rgba(160,55,55,0.62)',
            letterSpacing: '0.04em',
          }}
        >
          Memory {memoryNumber} of {totalMemories}
        </p>
        <p
          style={{
            fontFamily: hand,
            fontSize: '13px',
            color: 'rgba(80,60,30,0.48)',
          }}
        >
          {memory.date}
        </p>
      </div>

      {/* Polaroid photo with washi tape */}
      <div className="flex justify-center" style={{ marginTop: '4px', marginBottom: '4px' }}>
        <motion.div
          initial={{ opacity: 0, y: 10, rotate: memory.rotation * 0.4 }}
          animate={{ opacity: 1, y: 0, rotate: memory.rotation }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            filter: 'drop-shadow(3px 7px 16px rgba(0,0,0,0.32))',
          }}
        >
          {/* Washi tape — left */}
          <div
            style={{
              position: 'absolute',
              top: '-9px',
              left: '14px',
              width: '40px',
              height: '15px',
              background: tape.left,
              backgroundImage: TAPE_STRIPE,
              transform: 'rotate(-13deg)',
              borderRadius: '1px',
              zIndex: 10,
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }}
          />
          {/* Washi tape — right */}
          <div
            style={{
              position: 'absolute',
              top: '-9px',
              right: '14px',
              width: '40px',
              height: '15px',
              background: tape.right,
              backgroundImage: TAPE_STRIPE,
              transform: 'rotate(11deg)',
              borderRadius: '1px',
              zIndex: 10,
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }}
          />

          {/* Polaroid frame */}
          <div
            style={{
              background: 'linear-gradient(175deg, #fefefe 0%, #f8f6f0 100%)',
              padding: '6px 6px 0',
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.14), inset 0 0 0 1px rgba(0,0,0,0.04)',
              position: 'relative',
            }}
          >
            <img
              src={memory.image}
              alt={memory.title}
              style={{
                width: '192px',
                height: '148px',
                objectFit: 'cover',
                display: 'block',
              }}
              draggable={false}
            />
            {/* Polaroid caption strip — handwritten date */}
            <div
              style={{
                padding: '5px 6px 8px',
                textAlign: 'center',
                minHeight: '26px',
              }}
            >
              <p
                style={{
                  fontFamily: hand,
                  fontSize: '12px',
                  color: 'rgba(30,20,10,0.52)',
                  letterSpacing: '0.02em',
                }}
              >
                {memory.date}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Memory title — handwriting */}
      <h3
        style={{
          fontFamily: hand,
          fontSize: '1.45rem',
          fontWeight: 600,
          color: '#2c1a08',
          lineHeight: 1.15,
        }}
      >
        {memory.title}
      </h3>

      {/* Description — italic serif */}
      <p
        style={{
          fontFamily: serif,
          fontSize: '0.82rem',
          color: 'rgba(60,40,20,0.72)',
          lineHeight: 1.7,
          fontStyle: 'italic',
        }}
      >
        {memory.description}
      </p>

      {/* Bottom rule */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.22,
          marginTop: '2px',
        }}
      >
        <div style={{ height: '1px', flex: 1, background: '#8B2020' }} />
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#8B2020',
          }}
        />
      </div>
    </div>
  );
}
