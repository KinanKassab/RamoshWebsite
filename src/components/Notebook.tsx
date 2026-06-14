import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

/* ─── Section tab definitions ───────────────────────────── */
export interface SectionTab {
  id: string;
  color: string;
  glow: string;
}

interface NotebookProps {
  children: ReactNode;
  pageNumber: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  direction: number;
  pageKey: string;
  chapterLabel?: string;
  sections: SectionTab[];
  currentSection: string;
}

const RING_COUNT = 7;

export function Notebook({
  children,
  pageNumber,
  totalPages,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  direction,
  pageKey,
  chapterLabel = '',
  sections,
  currentSection,
}: NotebookProps) {
  /* Book entrance – drops onto the desk from above */
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLanded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        background:
          'radial-gradient(ellipse 130% 100% at 50% 60%, #2d1a0e 0%, #140b05 55%, #0a0603 100%)',
      }}
    >
      {/* Warm desk light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 45% at 50% 65%, rgba(220,130,60,0.055) 0%, transparent 70%)',
        }}
      />

      {/* ── Entrance animation wrapper ── */}
      <motion.div
        initial={{ opacity: 0, y: -70, rotateX: 18, scale: 0.88 }}
        animate={
          landed
            ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
            : {}
        }
        transition={{
          type: 'spring',
          damping: 16,
          stiffness: 130,
          mass: 0.9,
          opacity: { duration: 0.4 },
        }}
        className="relative w-full mx-4"
        style={{ maxWidth: '460px', perspective: '900px' }}
      >
        {/* Page-stack depth */}
        <div
          className="absolute rounded-lg"
          style={{
            inset: 0,
            bottom: '-9px',
            right: '-7px',
            background: '#FDE8C0',
            zIndex: 0,
            boxShadow: '2px 2px 0 #e8c898',
          }}
        />
        <div
          className="absolute rounded-lg"
          style={{
            inset: 0,
            bottom: '-5px',
            right: '-4px',
            background: '#F0D8',
            zIndex: 1,
          }}
        />

        {/* ── Book body ── */}
        <div
          className="relative flex rounded-lg overflow-hidden"
          style={{
            zIndex: 2,
            boxShadow:
              '0 6px 30px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Spine */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-around py-5"
            style={{
              width: '38px',
              background: 'linear-gradient(to right, #5a1515 0%, #9b2424 40%, #7a1c1c 100%)',
              boxShadow:
                'inset -4px 0 10px rgba(0,0,0,0.55), inset 2px 0 4px rgba(255,255,255,0.06)',
            }}
          >
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <div key={i} className="relative flex items-center justify-center">
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 30%, #d4a870, #7a3a18)',
                    boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.65), 0 1px 2px rgba(255,255,255,0.18)',
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#0a0502',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Page area */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              background: '#FDF6E9',
              minHeight: 'min(68vh, 560px)',
              maxHeight: 'min(68vh, 560px)',
              perspective: '1000px',
            }}
          >
            {/* Ruled lines */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 27px, rgba(100,70,50,0.11) 27px, rgba(100,70,50,0.11) 28px)',
                backgroundPositionY: '46px',
              }}
            />
            {/* Red margin line */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{ left: '42px', width: '1px', background: 'rgba(195,55,55,0.2)' }}
            />
            {/* Dog-ear corner */}
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 18px 18px 0',
                borderColor: 'transparent rgba(200,170,130,0.35) transparent transparent',
              }}
            />

            {/* ── Section color tabs (right edge) ── */}
            <div
              className="absolute right-0 top-0 bottom-0 flex flex-col justify-around items-end py-3 pointer-events-none"
              style={{ width: '18px', zIndex: 10 }}
            >
              {sections.map((sec) => {
                const active = sec.id === currentSection;
                return (
                  <motion.div
                    key={sec.id}
                    animate={{
                      width: active ? 16 : 8,
                      opacity: active ? 1 : 0.38,
                    }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: '22px',
                      background: sec.color,
                      borderRadius: '3px 0 0 3px',
                      boxShadow: active ? `0 0 8px ${sec.glow}` : 'none',
                    }}
                  />
                );
              })}
            </div>

            {/* ── Page-flip animation ── */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={pageKey}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    opacity: 0,
                    rotateY: d > 0 ? 28 : -28,
                    x: d > 0 ? 40 : -40,
                    scale: 0.97,
                  }),
                  center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
                  exit: (d: number) => ({
                    opacity: 0,
                    rotateY: d > 0 ? -28 : 28,
                    x: d > 0 ? -40 : 40,
                    scale: 0.97,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute inset-0 overflow-y-auto scrollbar-hide"
                style={{
                  paddingLeft: '52px',
                  paddingRight: '22px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation bar ── */}
        <div className="flex items-center justify-between mt-3 px-1" style={{ zIndex: 2 }}>
          <span
            className="text-amber-300/38 text-xs tracking-[0.22em] uppercase truncate"
            style={{ maxWidth: '130px', fontFamily: "'Georgia', serif" }}
          >
            {chapterLabel}
          </span>

          <div className="flex items-center gap-2.5">
            <NavButton onClick={onPrev} enabled={canGoPrev} aria-label="Previous page">
              <ChevronLeft className="w-3.5 h-3.5" />
            </NavButton>

            <span
              className="text-amber-200/28 text-xs tabular-nums"
              style={{
                fontFamily: "'Georgia', serif",
                minWidth: '3.5rem',
                textAlign: 'center',
              }}
            >
              {pageNumber} / {totalPages}
            </span>

            <NavButton onClick={onNext} enabled={canGoNext} aria-label="Next page">
              <ChevronRight className="w-3.5 h-3.5" />
            </NavButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NavButton({
  onClick,
  enabled,
  children,
  'aria-label': ariaLabel,
}: {
  onClick: () => void;
  enabled: boolean;
  children: ReactNode;
  'aria-label': string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!enabled}
      whileHover={enabled ? { scale: 1.12 } : {}}
      whileTap={enabled ? { scale: 0.88 } : {}}
      aria-label={ariaLabel}
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: enabled ? 'rgba(140,32,32,0.52)' : 'rgba(60,30,30,0.2)',
        border: `1px solid ${enabled ? 'rgba(185,60,60,0.55)' : 'rgba(100,50,50,0.18)'}`,
        color: enabled ? 'rgba(255,210,190,0.88)' : 'rgba(180,120,100,0.22)',
        cursor: enabled ? 'pointer' : 'not-allowed',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {children}
    </motion.button>
  );
}
