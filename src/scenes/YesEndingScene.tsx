import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Particles } from '../components/Particles';
import { Stars } from '../components/Stars';

export function YesEndingScene() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-rose-950/90 via-pink-950 to-rose-900/80">
      <Stars count={70} />
      <Particles count={40} color="rgba(244, 114, 182, 0.5)" />

      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/18 via-transparent to-rose-400/8 pointer-events-none" />

      {/* Pulsing radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at center, rgba(244,114,182,0.18) 0%, transparent 55%)',
            'radial-gradient(ellipse at center, rgba(251,207,232,0.22) 0%, transparent 55%)',
            'radial-gradient(ellipse at center, rgba(244,114,182,0.18) 0%, transparent 55%)',
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 45,
            scale: showContent ? 1 : 0.95,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Heart — GPU-only framer-motion pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative inline-block mb-8"
          >
            <Heart
              className="w-20 h-20 md:w-28 md:h-28 text-rose-400"
              fill="currentColor"
              style={{ filter: 'drop-shadow(0 0 28px rgba(244,114,182,0.85))' }}
            />
            <motion.div
              className="absolute -top-3 -right-3"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-pink-300" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 16 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-light text-rose-100 mb-6"
            style={{
              textShadow:
                '0 0 40px rgba(244,114,182,0.65), 0 0 80px rgba(251,207,232,0.3)',
            }}
          >
            You said Yes!
          </motion.h1>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 18 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <p className="text-2xl md:text-3xl text-pink-200/80 font-light">
              My heart has never been so full
            </p>
            <p className="text-xl md:text-2xl text-rose-300/60 font-light italic">
              This is the beginning of forever
            </p>
          </motion.div>

          {/* Floating stars row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex justify-center gap-3"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -14, 0],
                  opacity: [0.55, 1, 0.55],
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Star className="w-5 h-5 text-pink-400/70" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>

          {/* Birthday message */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
            transition={{ delay: 2.2, duration: 0.9 }}
            className="mt-14 space-y-2"
          >
            <p className="text-rose-200/55 text-lg">Happy Birthday, my love</p>
            <p className="text-rose-300/40 text-sm">
              Thank you for making this the most special day
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-rose-600/28 to-transparent pointer-events-none"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
