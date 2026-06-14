import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";

export function NoEndingPage() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-5 py-5"
      style={{ minHeight: '100%' }}
    >
      {/* Dim heart */}
      <Heart
        className="w-12 h-12 text-stone-500/35"
        fill="currentColor"
      />

      {/* Title */}
      <div>
        <h1 className="text-2xl font-light text-stone-700/78 mb-1.5" style={{ fontFamily: serif }}>
          I understand
        </h1>
        <p className="text-base text-stone-500/62 italic font-light" style={{ fontFamily: serif }}>
          Maybe some stories are not meant to have a second chance.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 opacity-20 w-full max-w-[160px]">
        <div className="h-px flex-1 bg-stone-600" />
        <div className="w-1 h-1 rounded-full bg-stone-600" />
        <div className="h-px flex-1 bg-stone-600" />
      </div>

      <p
        className="text-stone-600/58 text-sm italic leading-relaxed"
        style={{ fontFamily: serif, maxWidth: '300px' }}
      >
          Thank you for every memory, every smile, and every moment we shared.
          No matter what happens next, you'll always hold a special place in my heart.
      </p>

      {/* Three dots */}
      <div className="flex gap-2.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: '6px', height: '6px', background: 'rgba(100,100,110,0.32)' }}
            animate={{ opacity: [0.28, 0.55, 0.28] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="space-y-0.5 mt-2">
        <p className="text-stone-500/48 text-sm" style={{ fontFamily: serif }}>
          (But I still want to say...)
        </p>
        <p className="text-stone-400/38 text-xs italic" style={{ fontFamily: serif }}>
          Even if this is goodbye, you were my favorite chapter.
        </p>
      </div>
    </div>
  );
}
