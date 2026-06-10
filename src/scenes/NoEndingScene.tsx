import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Particles } from '../components/Particles';

export function NoEndingScene() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950">
      <Particles count={20} color="rgba(96, 165, 250, 0.3)" />

      <div className="absolute inset-0 bg-gradient-to-t from-blue-400/5 via-transparent to-blue-500/5" />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at center, rgba(96, 165, 250, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.div
            className="relative inline-block mb-8"
          >
            <Heart
              className="w-16 h-16 md:w-20 md:h-20 text-blue-400/40"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-16 h-16 border border-blue-400/20 rounded-full" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-3xl md:text-5xl font-light text-blue-100/80 mb-6"
            style={{
              textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            I understand
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-blue-200/60 font-light italic">
              I'll always cherish what we have
            </p>
            <p className="text-lg md:text-xl text-slate-400/50 font-light">
              Your happiness is what matters most to me
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16 border-t border-blue-400/10 pt-8"
          >
            <p className="text-blue-300/40 text-base">
              Happy Birthday
            </p>
            <p className="text-blue-200/30 text-sm mt-2">
              May all your wishes come true
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 0.5 : 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-12 flex justify-center gap-2"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-400/30"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
