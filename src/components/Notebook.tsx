import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

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

const RING_COUNT = 9;

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
          'radial-gradient(ellipse 150% 110% at 50% 65%, #2e1a08 0%, #1a0e04 55%, #0d0703 100%)',
      }}
    >
      {/* Hidden SVG filter for paper grain */}
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="nb-grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.72 0.72" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="alphaReduced">
              <feFuncA type="linear" slope="0.07" />
            </feComponentTransfer>
            <feComposite in="alphaReduced" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Warm desk light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 48% at 50% 62%, rgba(230,148,55,0.07) 0%, transparent 72%)',
        }}
      />
      {/* Desk wood grain lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(92deg, transparent, transparent 90px, rgba(255,185,85,0.013) 90px, rgba(255,185,85,0.013) 91px)',
        }}
      />

      {/* Entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: -85, rotateX: 22, scale: 0.85 }}
        animate={landed ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{
          type: 'spring',
          damping: 17,
          stiffness: 122,
          mass: 1,
          opacity: { duration: 0.45 },
        }}
        className="relative w-full mx-4"
        style={{ maxWidth: '478px', perspective: '1000px' }}
      >
        {/* Page-stack depth — 3 layers showing book thickness */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            bottom: '-13px',
            right: '-11px',
            left: '46px',
            background: 'linear-gradient(170deg, #e4ceaa 0%, #d8c298 100%)',
            borderRadius: '0 3px 3px 0',
            zIndex: 0,
            boxShadow: '1px 1px 0 #cbb688',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            bottom: '-8px',
            right: '-7px',
            left: '46px',
            background: '#E8D8B2',
            borderRadius: '0 2px 2px 0',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            bottom: '-4px',
            right: '-4px',
            left: '46px',
            background: '#EEDFC0',
            borderRadius: '0 2px 2px 0',
            zIndex: 1,
          }}
        />

        {/* ── Book body ── */}
        <div
          className="relative flex overflow-hidden"
          style={{
            zIndex: 2,
            borderRadius: '2px',
            boxShadow:
              '0 16px 60px rgba(0,0,0,0.75), 0 6px 18px rgba(0,0,0,0.55), -3px 0 16px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.025)',
          }}
        >
          {/* ── SPINE (leather) ── */}
          <div
            style={{
              width: '46px',
              flexShrink: 0,
              background:
                'linear-gradient(to right, #380c0c 0%, #641616 16%, #8e2020 36%, #9e2222 50%, #8e2020 64%, #641616 84%, #380c0c 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '18px 0',
              position: 'relative',
            }}
          >
            {/* Leather grain horizontal lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.095) 5px, rgba(0,0,0,0.095) 6px)',
                pointerEvents: 'none',
              }}
            />
            {/* Spine left edge highlight */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '3px',
                width: '1px',
                background:
                  'linear-gradient(to bottom, transparent 4%, rgba(255,145,100,0.13) 22%, rgba(255,145,100,0.13) 78%, transparent 96%)',
                pointerEvents: 'none',
              }}
            />
            {/* Spine right edge shadow (page edge) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '7px',
                background:
                  'linear-gradient(to left, rgba(0,0,0,0.55), rgba(0,0,0,0.12) 60%, transparent)',
                pointerEvents: 'none',
              }}
            />
            {/* Vertical coil connector line */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                bottom: '18px',
                left: '50%',
                width: '3px',
                transform: 'translateX(-50%)',
                background:
                  'linear-gradient(to bottom, rgba(180,135,50,0.18), rgba(205,160,60,0.45), rgba(180,135,50,0.18))',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <Ring key={i} />
            ))}
          </div>

          {/* ── PAGE AREA ── */}
          <div
            style={{
              flex: 1,
              minHeight: 'min(73vh, 620px)',
              maxHeight: 'min(73vh, 620px)',
              position: 'relative',
              overflow: 'hidden',
              perspective: '1200px',
            }}
          >
            {/* Paper base — warm aged ivory */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(160deg, #F8F0DC 0%, #F4EACF 35%, #F6EED8 65%, #F2E7CA 100%)',
              }}
            />

            {/* Paper grain (SVG fractal noise) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#A07840',
                filter: 'url(#nb-grain)',
                opacity: 1,
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle paper imperfection tonal spots */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `
                  radial-gradient(ellipse 28% 14% at 18% 22%, rgba(180,145,80,0.05) 0%, transparent 100%),
                  radial-gradient(ellipse 18% 22% at 82% 72%, rgba(160,125,65,0.04) 0%, transparent 100%),
                  radial-gradient(ellipse 22% 10% at 58% 48%, rgba(200,165,90,0.03) 0%, transparent 100%)
                `,
                pointerEvents: 'none',
              }}
            />

            {/* College-ruled lines (blue-ish, real notebook look) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 27px, rgba(65,95,175,0.1) 27px, rgba(65,95,175,0.1) 28px)',
                backgroundPositionY: '48px',
                pointerEvents: 'none',
              }}
            />

            {/* Single header line (pink-red, thicker) */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '48px',
                height: '1.5px',
                background: 'rgba(185,90,90,0.18)',
                pointerEvents: 'none',
              }}
            />

            {/* Red margin line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '52px',
                width: '1.5px',
                background: 'rgba(192,52,52,0.3)',
                pointerEvents: 'none',
              }}
            />

            {/* Binding shadow — left edge */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '30px',
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.11) 0%, rgba(0,0,0,0.04) 65%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />

            {/* Page aging vignette (edges slightly darker) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 92% 92% at 50% 50%, transparent 58%, rgba(130,95,45,0.08) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Dog-ear corner */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 24px 24px 0',
                borderColor: 'transparent #D4C090 transparent transparent',
                pointerEvents: 'none',
                zIndex: 6,
              }}
            />
            {/* Dog-ear crease shadow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '26px',
                height: '26px',
                background:
                  'linear-gradient(135deg, transparent 46%, rgba(0,0,0,0.14) 46%)',
                pointerEvents: 'none',
                zIndex: 6,
              }}
            />

            {/* ── Section colour tabs (right edge) ── */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                padding: '14px 0',
                width: '20px',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              {sections.map((sec) => {
                const active = sec.id === currentSection;
                return (
                  <motion.div
                    key={sec.id}
                    animate={{ width: active ? 18 : 9, opacity: active ? 1 : 0.38 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: '27px',
                      background: sec.color,
                      borderRadius: '4px 0 0 4px',
                      boxShadow: active
                        ? `0 0 11px ${sec.glow}, inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.14)`
                        : 'none',
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
                    rotateY: d > 0 ? 32 : -32,
                    x: d > 0 ? 48 : -48,
                    scale: 0.97,
                  }),
                  center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
                  exit: (d: number) => ({
                    opacity: 0,
                    rotateY: d > 0 ? -32 : 32,
                    x: d > 0 ? -48 : 48,
                    scale: 0.97,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute inset-0 overflow-y-auto scrollbar-hide"
                style={{
                  paddingLeft: '64px',
                  paddingRight: '26px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  zIndex: 5,
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            paddingLeft: '4px',
            paddingRight: '4px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Caveat', 'Georgia', serif",
              fontSize: '15px',
              color: 'rgba(255,195,140,0.42)',
              letterSpacing: '0.04em',
              maxWidth: '145px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {chapterLabel}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NavButton onClick={onPrev} enabled={canGoPrev} aria-label="Previous page">
              <ChevronLeft className="w-3.5 h-3.5" />
            </NavButton>
            <span
              style={{
                fontFamily: "'Caveat', 'Georgia', serif",
                fontSize: '14px',
                color: 'rgba(255,208,168,0.32)',
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

function Ring() {
  return (
    <div
      style={{
        width: '30px',
        height: '26px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 1,
      }}
    >
      {/* Outer ring — conic gradient for metallic sheen */}
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background:
            'conic-gradient(from 195deg at 50% 50%, #f0d878, #c89830, #7a5510, #9a7020, #c89830, #f0d878, #fae898, #f0d878)',
          boxShadow:
            '0 2px 6px rgba(0,0,0,0.68), 0 -1px 2px rgba(255,225,130,0.14)',
          position: 'relative',
          flexShrink: 0,
        }}
      />
      {/* Inner hole */}
      <div
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 38% 32%, #1c0c00, #050100)',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.95)',
        }}
      />
      {/* Highlight spot */}
      <div
        style={{
          position: 'absolute',
          width: '7px',
          height: '3px',
          borderRadius: '50%',
          background: 'rgba(255,248,198,0.58)',
          top: '5px',
          left: '8px',
          filter: 'blur(0.5px)',
          pointerEvents: 'none',
        }}
      />
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
      onClick={() => onClick()}
      disabled={!enabled}
      whileHover={enabled ? { scale: 1.12 } : {}}
      whileTap={enabled ? { scale: 0.88 } : {}}
      aria-label={ariaLabel}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: enabled ? 'rgba(140,32,32,0.56)' : 'rgba(60,30,30,0.22)',
        border: `1px solid ${enabled ? 'rgba(185,60,60,0.56)' : 'rgba(100,50,50,0.18)'}`,
        color: enabled ? 'rgba(255,210,190,0.88)' : 'rgba(180,120,100,0.22)',
        cursor: enabled ? 'pointer' : 'not-allowed',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {children}
    </motion.button>
  );
}
