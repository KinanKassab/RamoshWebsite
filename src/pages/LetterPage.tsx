import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";

export function LetterPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="py-2">
      {/* Chapter heading */}
      <p
        className="text-rose-700/58 text-xs tracking-[0.25em] uppercase mb-0.5"
        style={{ fontFamily: serif }}
      >
        Chapter Three
      </p>
      <h2
        className="text-2xl font-light text-stone-800 mb-5"
        style={{ fontFamily: serif }}
      >
        A Letter From Afar
      </h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.93, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-3 py-4"
          >
            {/* Envelope */}
            <motion.div
              onClick={() => setOpened(true)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="cursor-pointer"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.18))' }}
            >
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  position: 'relative',
                  background: 'linear-gradient(to bottom, #f5ead0, #ecdbc0)',
                  border: '1px solid rgba(150,100,55,0.28)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Envelope V flap */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background:
                      'linear-gradient(135deg, #ecdbc0 49%, transparent 50%), linear-gradient(225deg, #ecdbc0 49%, transparent 50%)',
                    backgroundSize: '50% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left top, right top',
                    borderBottom: '1px solid rgba(150,100,55,0.22)',
                  }}
                />
                {/* Bottom V fold */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background:
                      'linear-gradient(315deg, #e8d4b0 49%, transparent 50%), linear-gradient(45deg, #e8d4b0 49%, transparent 50%)',
                    backgroundSize: '50% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left bottom, right bottom',
                  }}
                />
                <Mail className="w-7 h-7 text-rose-700/45 relative z-10" />
              </div>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-stone-500/45 text-xs italic"
              style={{ fontFamily: serif }}
            >
              tap to open
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3.5"
          >
            <p className="text-stone-700/82 text-sm leading-relaxed italic" style={{ fontFamily: serif }}>
              "Hello again, how it's going? I hope you enjoy your days without me, but I also hope you miss me a little. I miss you a lot. I miss your voice, your smile, your laugh, and the way you make me feel like I'm the only person in the world that matters.
            </p>
            <p className="text-stone-700/82 text-sm leading-relaxed italic" style={{ fontFamily: serif }}>
              I know we can't be together again, but somehow my heart still refuses to fully let go of you.
            </p>
            <p className="text-stone-700/82 text-sm leading-relaxed italic" style={{ fontFamily: serif }}>
              It’s strange how something that hurt me this much can still feel like home in some quiet corner of my chest. I keep telling myself that I deserve something real, something honest… not something that let me the second option from its world.
            </p>
            <p className="text-stone-700/82 text-sm leading-relaxed italic" style={{ fontFamily: serif }}>
              Maybe missing you isn’t about wanting you back, but about letting go of what I thought we were. And that’s the hardest part—accepting that the version of you I loved never really existed the way I believed it did. 
            </p>            
            <p className="text-stone-700/82 text-sm leading-relaxed italic" style={{ fontFamily: serif }}>
              Still… I hope one day I’ll think of you without this heaviness. Not with love, not with pain—just peace.
            </p>              
            <p className="text-rose-700/55 text-sm italic" style={{ fontFamily: serif }}>
              love you, but I can’t be with you. I hope you find someone who can love you the way that you wanted to.
            </p>
            
            <div className="text-right pt-1">
              <p className="text-stone-800 text-base mt-0.5" style={{ fontFamily: "'Great Vibes'" }}>
                — Kinan
              </p>
            </div>

            {/* Wax seal */}
            <div className="flex justify-center pt-1">
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 38% 33%, #d44, #8b1010)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="text-white/75 text-xs">♥</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
