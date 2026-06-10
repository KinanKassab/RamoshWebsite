import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Stars } from '../components/Stars';
import { Particles } from '../components/Particles';
import { Heart } from 'lucide-react';

interface IntroSceneProps {
  onComplete: () => void;
}

export function IntroScene({ onComplete }: IntroSceneProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 900),
      setTimeout(() => setStage(2), 2400),
      setTimeout(() => setStage(3), 3900),
      setTimeout(() => setStage(4), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage === 4) {
      const timer = setTimeout(onComplete, 1600);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-pink-950/30">
      <Stars count={120} />
      <Particles count={30} color="rgba(167, 139, 250, 0.5)" />

      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-transparent" />

      <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Heart icon */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={stage >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart
              className="w-16 h-16 text-pink-500 mx-auto"
              fill="currentColor"
              style={{ filter: 'drop-shadow(0 0 18px rgba(244, 114, 182, 0.7))' }}
            />
          </motion.div>
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.p className="text-pink-300/80 text-sm tracking-[0.4em] uppercase mb-6">
            For the most special person
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="text-5xl md:text-7xl font-light text-white mb-4"
            style={{
              textShadow: '0 0 40px rgba(244, 114, 182, 0.55), 0 0 90px rgba(192, 132, 252, 0.3)',
            }}
          >
            Happy Birthday
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={stage >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8"
          >
            <p className="text-pink-200/60 text-lg font-light italic">
              There's something I've been wanting to tell you...
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={stage >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-pink-300/50 text-sm tracking-widest"
        >
          SCROLL TO BEGIN
        </motion.div>
      </motion.div>

      {/* Bottom glow pulse */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none"
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
