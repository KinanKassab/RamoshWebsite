import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScene } from '../contexts/SceneContext';

export function QuestionScene() {
  const { setAnswer, goToScene } = useScene();
  const [revealed, setRevealed] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setAnswer('yes');
    goToScene('yes-ending');
  };

  const handleNo = () => {
    setAnswer('no');
    goToScene('no-ending');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        style={{
          background: hoveredButton === 'yes'
            ? 'radial-gradient(ellipse at center, rgba(244, 114, 182, 0.15) 0%, transparent 60%)'
            : hoveredButton === 'no'
            ? 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
        }}
        animate={{
          opacity: hoveredButton ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, width: 50, height: 50 }}
          animate={{
            opacity: revealed ? 1 : 0.3,
            width: revealed ? '100%' : 50,
            height: revealed ? '100%' : 50,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute bg-gradient-radial from-white/[0.02] via-transparent to-transparent"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 50,
          }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="mb-8"
          >
            <Heart
              className="w-8 h-8 text-rose-400/80 mx-auto"
              fill="currentColor"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6"
          >
            The Final Chapter
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="text-4xl md:text-6xl font-light text-white mb-8"
            style={{ textShadow: '0 0 60px rgba(255, 255, 255, 0.2)' }}
          >
            I have a question...
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="space-y-8"
          >
            <p className="text-2xl md:text-3xl text-white/80 font-light mb-12">
              Will you be mine?
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredButton('yes')}
                onHoverEnd={() => setHoveredButton(null)}
                onClick={handleYes}
                className="group relative px-12 py-4 rounded-full border border-rose-400/30 hover:border-rose-400/60 transition-all duration-300"
                style={{
                  boxShadow: hoveredButton === 'yes'
                    ? '0 0 40px rgba(244, 114, 182, 0.4)'
                    : '0 0 0 rgba(244, 114, 182, 0)',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative text-rose-300 text-xl font-light tracking-wide">
                  Yes
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredButton('no')}
                onHoverEnd={() => setHoveredButton(null)}
                onClick={handleNo}
                className="group relative px-12 py-4 rounded-full border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300"
                style={{
                  boxShadow: hoveredButton === 'no'
                    ? '0 0 40px rgba(59, 130, 246, 0.3)'
                    : '0 0 0 rgba(59, 130, 246, 0)',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative text-blue-300/70 text-xl font-light tracking-wide">
                  No
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <motion.p
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-white/30 text-sm"
        >
          Choose with your heart
        </motion.p>
      </motion.div>
    </div>
  );
}
