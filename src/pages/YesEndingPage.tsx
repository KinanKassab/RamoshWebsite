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
            Fully impressed, I am at a loss for words.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 opacity-22 w-full max-w-[180px]">
          <div className="h-px flex-1 bg-rose-800" />
          <div className="w-1.5 h-1.5 rotate-45 bg-rose-700" />
          <div className="h-px flex-1 bg-rose-800" />
        </div>

        <p
          className="text-stone-600/65 text-sm italic leading-relaxed"
          style={{ fontFamily: serif, maxWidth: '270px' }}
        >
          I wanted this moment…
          but I also remember how easily you gave up on me before.      
        </p>


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
