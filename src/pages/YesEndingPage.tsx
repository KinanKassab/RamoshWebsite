import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";

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
          className="w-16 h-16 text-rose-600"
          fill="currentColor"
          style={{ filter: 'drop-shadow(0 2px 14px rgba(200,40,40,0.55))' }}
        />
      </motion.div>

      {/* Title + tagline */}
      <div>
        <h1 className="text-3xl font-light text-stone-800 leading-tight mb-1.5" style={{ fontFamily: serif }}>
          You said Yes!
        </h1>
        <p className="text-base text-rose-700/68 italic font-light" style={{ fontFamily: serif }}>
          My heart has never been so full
        </p>
      </div>

      {/* Floating stars */}
      <div className="flex gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -9, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.7, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Star className="w-4 h-4 text-rose-500/72" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 opacity-22 w-full max-w-[180px]">
        <div className="h-px flex-1 bg-rose-800" />
        <div className="w-1.5 h-1.5 rotate-45 bg-rose-700" />
        <div className="h-px flex-1 bg-rose-800" />
      </div>

      <p
        className="text-stone-600/65 text-sm italic leading-relaxed"
        style={{ fontFamily: serif, maxWidth: '210px' }}
      >
        "This is the beginning of forever..."
      </p>

      {/* Birthday note */}
      <div className="space-y-0.5">
        <p className="text-rose-700/52 text-sm" style={{ fontFamily: serif }}>
          Happy Birthday, my love
        </p>
        <p className="text-stone-500/42 text-xs italic" style={{ fontFamily: serif }}>
          Thank you for making this the most special day
        </p>
      </div>

      {/* Wax seal */}
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 33%, #e44, #8b1010)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '4px',
        }}
      >
        <span className="text-white/80 text-sm">♥</span>
      </div>
    </div>
  );
}
