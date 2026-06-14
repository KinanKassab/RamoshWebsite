import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";
const hand  = "'Caveat', 'Georgia', serif";

export function LetterPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="py-2">
      {/* Chapter heading */}
      <p
        style={{
          fontFamily: hand,
          fontSize: '13px',
          color: 'rgba(160,55,55,0.6)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '2px',
        }}
      >
        Chapter Three
      </p>
      <h2
        style={{
          fontFamily: hand,
          fontSize: '1.9rem',
          fontWeight: 600,
          color: '#2c1808',
          marginBottom: '18px',
          lineHeight: 1.1,
        }}
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
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              style={{ filter: 'drop-shadow(0 5px 18px rgba(0,0,0,0.22))' }}
            >
              <div
                style={{
                  width: '130px',
                  height: '88px',
                  position: 'relative',
                  background: 'linear-gradient(to bottom, #f4e8cc, #ead5b0)',
                  border: '1px solid rgba(140,95,45,0.3)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Envelope V-flap top */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '52%',
                    background:
                      'linear-gradient(135deg, #e8d4b0 49%, transparent 50%), linear-gradient(225deg, #e8d4b0 49%, transparent 50%)',
                    backgroundSize: '50% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left top, right top',
                    borderBottom: '1px solid rgba(140,95,45,0.2)',
                  }}
                />
                {/* Envelope V-fold bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '52%',
                    background:
                      'linear-gradient(315deg, #d8c498 49%, transparent 50%), linear-gradient(45deg, #d8c498 49%, transparent 50%)',
                    backgroundSize: '50% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left bottom, right bottom',
                  }}
                />
                {/* Postmark stamp effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '20px',
                    height: '22px',
                    border: '1px solid rgba(140,90,40,0.35)',
                    borderRadius: '2px',
                    background: 'rgba(240,220,185,0.6)',
                  }}
                />
                <Mail
                  style={{
                    width: '28px',
                    height: '28px',
                    color: 'rgba(180,55,55,0.42)',
                    position: 'relative',
                    zIndex: 10,
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: hand,
                fontSize: '14px',
                color: 'rgba(80,60,30,0.45)',
                fontStyle: 'italic',
              }}
            >
              tap to open
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Letter paper — lined sheet */}
            <div
              style={{
                background: 'rgba(252,248,238,0.85)',
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 23px, rgba(65,95,175,0.09) 23px, rgba(65,95,175,0.09) 24px)',
                backgroundPositionY: '4px',
                padding: '12px 14px 14px 38px',
                border: '1px solid rgba(180,148,98,0.22)',
                borderRadius: '2px',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)',
              }}
            >
              {/* Letter margin line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '26px',
                  width: '1px',
                  background: 'rgba(192,52,52,0.22)',
                  pointerEvents: 'none',
                }}
              />

              <div className="space-y-3">
                <p
                  style={{
                    fontFamily: hand,
                    fontSize: '1.05rem',
                    color: 'rgba(25,15,5,0.78)',
                    lineHeight: 1.65,
                  }}
                >
                  "Hello again, how it's going? I hope you enjoy your days without me, but I also hope you miss me a little. I miss you a lot. I miss your voice, your smile, your laugh, and the way you make me feel like I'm the only person in the world that matters.
                </p>
                <p
                  style={{
                    fontFamily: hand,
                    fontSize: '1.05rem',
                    color: 'rgba(25,15,5,0.78)',
                    lineHeight: 1.65,
                  }}
                >
                  I know we can't be together again, but somehow my heart still refuses to fully let go of you.
                </p>
                <p
                  style={{
                    fontFamily: hand,
                    fontSize: '1.05rem',
                    color: 'rgba(25,15,5,0.78)',
                    lineHeight: 1.65,
                  }}
                >
                  It's strange how something that hurt me this much can still feel like home in some quiet corner of my chest. I keep telling myself that I deserve something real, something honest… not something that let me be the second option from its world.
                </p>
                <p
                  style={{
                    fontFamily: hand,
                    fontSize: '1.05rem',
                    color: 'rgba(25,15,5,0.78)',
                    lineHeight: 1.65,
                  }}
                >
                  Maybe missing you isn't about wanting you back, but about letting go of what I thought we were. And that's the hardest part — accepting that the version of you I loved never really existed the way I believed it did.
                </p>
                <p
                  style={{
                    fontFamily: hand,
                    fontSize: '1.05rem',
                    color: 'rgba(25,15,5,0.78)',
                    lineHeight: 1.65,
                  }}
                >
                  Still… I hope one day I'll think of you without this heaviness. Not with love, not with pain — just peace.
                </p>
                <p
                  style={{
                    fontFamily: hand,
                    fontSize: '1.05rem',
                    color: 'rgba(175,48,48,0.62)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                  }}
                >
                  love you, but I can't be with you. I hope you find someone who can love you the way that you wanted to.
                </p>

                {/* Signature */}
                <div style={{ textAlign: 'right', paddingTop: '2px' }}>
                  <p
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: '1.6rem',
                      color: '#2a1808',
                      lineHeight: 1.2,
                    }}
                  >
                    — Kinan
                  </p>
                </div>
              </div>
            </div>

            {/* Wax seal */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 36% 32%, #d44, #8b1010)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: '14px' }}>♥</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
