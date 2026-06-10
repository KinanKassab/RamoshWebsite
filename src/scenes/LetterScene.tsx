import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Particles } from '../components/Particles';

interface LetterSceneProps {
  onComplete: () => void;
}

export function LetterScene({ onComplete }: LetterSceneProps) {
  const [showLetter, setShowLetter] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    const drops: RainDrop[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 18 + 8,
      speed: Math.random() * 8 + 12,
      opacity: Math.random() * 0.25 + 0.07,
    }));

    let animationId: number;
    let lastTime = 0;
    const fps = 45;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.8;

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(130, 170, 255, ${drop.opacity})`;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-45 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/8 to-transparent pointer-events-none" />

      <Particles count={12} color="rgba(103, 232, 249, 0.3)" />

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-xl w-full my-auto"
        >
          <motion.div
            className="relative bg-gradient-to-br from-slate-800/65 via-slate-700/45 to-slate-800/65 backdrop-blur-md rounded-2xl border border-cyan-400/20 p-7 md:p-10 overflow-hidden"
            style={{
              boxShadow:
                '0 0 60px rgba(103,232,249,0.08), inset 0 0 60px rgba(103,232,249,0.04)',
            }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-400/8 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-400/8 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Chapter header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-3 mb-5"
              >
                <Heart className="w-4 h-4 text-cyan-400/80 flex-shrink-0" fill="currentColor" />
                <p className="text-cyan-300/60 text-xs tracking-[0.2em] uppercase">
                  Chapter Three
                </p>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-2xl md:text-4xl font-light text-cyan-100 mb-7"
                style={{ textShadow: '0 0 28px rgba(103,232,249,0.3)' }}
              >
                A Letter From Afar
              </motion.h2>

              {/* Envelope / Letter content */}
              {!showLetter ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center py-4"
                >
                  <motion.div
                    className="w-20 h-28 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg border border-cyan-400/30 flex items-center justify-center cursor-pointer hover:border-cyan-400/55 transition-colors"
                    onClick={() => setShowLetter(true)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    style={{ boxShadow: '0 0 20px rgba(103,232,249,0.12)' }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Send className="w-7 h-7 text-cyan-400/65" />
                    </motion.div>
                  </motion.div>
                  <p className="text-cyan-200/45 text-sm mt-4">Click to open</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  <p className="text-cyan-100/80 text-base md:text-lg leading-relaxed font-light italic">
                    "Distance is just a number. What really matters is the feeling that no matter how
                    many miles separate us, you're always here with me.
                  </p>
                  <p className="text-cyan-100/80 text-base md:text-lg leading-relaxed font-light italic">
                    Every message from you lights up my world. Every call feels like coming home. And
                    every night, I look at the same moon knowing you do too.
                  </p>
                  <p className="text-cyan-100/80 text-base md:text-lg leading-relaxed font-light italic">
                    I carry you in my heart everywhere I go. And that makes anywhere feel like
                    home."
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-right pt-1"
                  >
                    <p className="text-cyan-400/60 text-base">Forever yours,</p>
                    <p className="text-cyan-300 text-lg mt-1">Me</p>
                  </motion.div>

                  {/* Continue button — inside card, always visible */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex justify-center pt-4"
                  >
                    <motion.button
                      onClick={onComplete}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full bg-cyan-500/18 hover:bg-cyan-500/30 text-cyan-300 transition-colors border border-cyan-400/30 text-sm tracking-wide"
                      style={{ boxShadow: '0 0 16px rgba(103,232,249,0.1)' }}
                    >
                      Continue to the end
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-cyan-900/18 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
    </div>
  );
}
