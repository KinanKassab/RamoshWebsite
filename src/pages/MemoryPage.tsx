import { motion } from 'framer-motion';
import { Memory } from '../data/memories';

interface MemoryPageProps {
  memory: Memory;
  memoryNumber: number;
  totalMemories: number;
}

const serif = "'Georgia', 'Times New Roman', serif";

export function MemoryPage({ memory, memoryNumber, totalMemories }: MemoryPageProps) {
  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Header row */}
      <div className="flex items-baseline justify-between">
        <p
          className="text-rose-700/58 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: serif }}
        >
          Memory {memoryNumber} of {totalMemories}
        </p>
        <p className="text-stone-500/45 text-xs" style={{ fontFamily: serif }}>
          {memory.date}
        </p>
      </div>

      {/* Polaroid photo — centred, tilted */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8, rotate: memory.rotation * 0.4 }}
          animate={{ opacity: 1, y: 0, rotate: memory.rotation }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: 'drop-shadow(2px 5px 14px rgba(0,0,0,0.28))',
          }}
        >
          {/* Polaroid frame */}
          <div
            style={{
              background: '#fff',
              padding: '6px 6px 26px',
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.04)',
            }}
          >
            <img
              src={memory.image}
              alt={memory.title}
              style={{
                width: '195px',
                height: '150px',
                objectFit: 'cover',
                display: 'block',
              }}
              draggable={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Title */}
      <h3
        className="text-stone-800 text-lg font-normal leading-snug"
        style={{ fontFamily: serif }}
      >
        {memory.title}
      </h3>

      {/* Description */}
      <p
        className="text-stone-600/78 text-sm leading-relaxed italic"
        style={{ fontFamily: serif }}
      >
        {memory.description}
      </p>

      {/* Bottom rule */}
      <div className="flex items-center gap-2 opacity-25 mt-1">
        <div className="h-px flex-1 bg-rose-800" />
        <div className="w-1 h-1 rounded-full bg-rose-700" />
      </div>
    </div>
  );
}
