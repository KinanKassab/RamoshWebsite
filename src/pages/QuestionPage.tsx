import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface QuestionPageProps {
  onAnswer: (answer: 'yes' | 'no') => void;
}

const serif = "'Georgia', 'Times New Roman', serif";

export function QuestionPage({ onAnswer }: QuestionPageProps) {
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

      {/* Pulsing heart */}
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

      {/* Question */}
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
          Will you be mine?
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 opacity-25 w-full max-w-[200px]">
        <div className="h-px flex-1 bg-stone-700" />
        <div className="w-1.5 h-1.5 rotate-45 bg-stone-700" />
        <div className="h-px flex-1 bg-stone-700" />
      </div>

      {/* Answer buttons */}
      <div className="flex gap-3 w-full">
        <motion.button
          onClick={() => onAnswer('yes')}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="flex-1 py-3 text-sm font-light tracking-wide rounded-sm transition-colors"
          style={{
            background: 'rgba(160,30,30,0.07)',
            border: '1px solid rgba(175,45,45,0.38)',
            color: '#8b1a1a',
            fontFamily: serif,
            boxShadow: '0 2px 8px rgba(160,30,30,0.08)',
          }}
        >
          Yes ♥
        </motion.button>

        <motion.button
          onClick={() => onAnswer('no')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="flex-1 py-3 text-sm font-light tracking-wide rounded-sm transition-colors"
          style={{
            background: 'rgba(80,80,100,0.04)',
            border: '1px solid rgba(100,100,130,0.18)',
            color: '#5a5a6a',
            fontFamily: serif,
          }}
        >
          No
        </motion.button>
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
