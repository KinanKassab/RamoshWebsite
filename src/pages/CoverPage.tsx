import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";

export function CoverPage() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-6 gap-4"
      style={{ minHeight: '100%' }}
    >
      {/* Top ornament */}
      <Divider />

      <p
        className="text-rose-700/65 text-xs tracking-[0.35em] uppercase"
        style={{ fontFamily: serif }}
      >
        For the most special person
      </p>

      {/* Pulsing heart */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart
          className="w-14 h-14 text-rose-600 mx-auto"
          fill="currentColor"
          style={{ filter: 'drop-shadow(0 2px 10px rgba(190,40,40,0.45))' }}
        />
      </motion.div>

      {/* Title */}
      <div>
        <h1
          className="text-4xl font-light text-stone-800 leading-tight"
          style={{ fontFamily: serif }}
        >
          Happy Birthday
        </h1>
        <p
          className="text-rose-700/45 text-sm tracking-[0.2em] uppercase mt-1"
          style={{ fontFamily: serif }}
        >
          A Story Just For You
        </p>
      </div>

      <Divider diamond />

      {/* Quote */}
      <p
        className="text-stone-600/60 text-sm italic leading-relaxed"
        style={{ fontFamily: serif, maxWidth: '210px' }}
      >
        "There's something I've been wanting to tell you..."
      </p>

      {/* Turn page hint */}
      <motion.p
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="text-stone-500/35 text-xs tracking-widest mt-4"
        style={{ fontFamily: serif }}
      >
        turn the page →
      </motion.p>
    </div>
  );
}

function Divider({ diamond }: { diamond?: boolean }) {
  return (
    <div className="flex items-center gap-2 opacity-30 w-full max-w-[180px]">
      <div className="h-px flex-1 bg-rose-800" />
      {diamond ? (
        <div className="w-1.5 h-1.5 rotate-45 bg-rose-700" />
      ) : (
        <div className="w-1 h-1 rounded-full bg-rose-700" />
      )}
      <div className="h-px flex-1 bg-rose-800" />
    </div>
  );
}
