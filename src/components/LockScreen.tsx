import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { useEffect, useState } from 'react';
const serif = "'Georgia', 'Times New Roman', serif";
const hand  = "'Caveat', 'Georgia', serif";
const RING_COUNT = 7;
const KEYS: (string | null)[] = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  null, '0', '⌫',
];

const SUCCESS_PARTICLES = [
  { dx: -55, dy: -40, size: 4, delay: 0,    dur: 0.7 },
  { dx:  55, dy: -40, size: 3, delay: 0.04, dur: 0.65 },
  { dx: -38, dy:  50, size: 5, delay: 0.08, dur: 0.72 },
  { dx:  38, dy:  50, size: 3, delay: 0.02, dur: 0.68 },
  { dx: -70, dy:  10, size: 3, delay: 0.06, dur: 0.60 },
  { dx:  70, dy:  10, size: 4, delay: 0.05, dur: 0.63 },
  { dx:   0, dy: -65, size: 3, delay: 0.03, dur: 0.75 },
  { dx:   0, dy:  65, size: 4, delay: 0.07, dur: 0.70 },
];

type Status = 'init' | 'idle' | 'submitting' | 'error' | 'success' | 'locked';

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<Status>('init');
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [lastKey, setLastKey] = useState<string | null>(null);

  /* Check global state on mount */
  useEffect(() => {
    fetch('/api/state')
      .then(r => r.json())
      .then((s: { locked: boolean; opened: boolean; attemptsLeft: number }) => {
        if (s.locked || s.opened) {
          setStatus('locked');
        } else {
          setAttemptsLeft(s.attemptsLeft);
          setStatus('idle');
        }
      })
      .catch(() => {
        setStatus('idle');
      });
  }, []);

  const fire = async (key: string) => {
    if (status !== 'idle') return;
    setLastKey(key);
    setTimeout(() => setLastKey(null), 320);

    if (key === '⌫') { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;

    const next = pin + key;
    setPin(next);

    if (next.length === 4) {
      setStatus('submitting');
      try {
        const result = await fetch('/api/attempt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: next }),
        }).then(r => r.json()) as {
          correct: boolean; locked?: boolean; attemptsLeft?: number; error?: boolean;
        };

        if (result.correct) {
          localStorage.setItem('notebook_unlocked', '1');
          setStatus('success');
          setTimeout(onUnlock, 980);
        } else if (result.locked) {
          setStatus('locked');
        } else {
          if (result.attemptsLeft !== undefined) setAttemptsLeft(result.attemptsLeft);
          setStatus('error');
          setTimeout(() => { setPin(''); setStatus('idle'); }, 800);
        }
      } catch {
        /* fallback: local check */
        if (next === '7626') {
          localStorage.setItem('notebook_unlocked', '1');
          setStatus('success');
          setTimeout(onUnlock, 980);
        } else {
          setStatus('error');
          setTimeout(() => { setPin(''); setStatus('idle'); }, 800);
        }
      }
    }
  };

  /* ── dot helpers ── */
  const dotBg = (i: number) => {
    if (status === 'locked') return i < 4 ? 'rgba(120,30,30,0.5)' : 'transparent';
    if (i >= pin.length) return 'transparent';
    if (status === 'error')   return 'rgba(205,55,55,0.92)';
    if (status === 'success') return 'rgba(212,168,58,0.96)';
    return 'rgba(196,120,32,0.90)';
  };

  const dotShadow = (i: number) => {
    if (status === 'locked') return i < 4 ? '0 0 6px rgba(180,40,40,0.4)' : 'none';
    if (i >= pin.length) return 'none';
    if (status === 'error')   return '0 0 10px rgba(220,50,50,0.85)';
    if (status === 'success') return '0 0 14px rgba(220,178,58,0.9), 0 0 28px rgba(220,178,58,0.4)';
    return '0 0 8px rgba(196,130,40,0.72)';
  };

  const dotBorder =
    status === 'error'  ? 'rgba(200,70,70,0.65)' :
    status === 'locked' ? 'rgba(140,40,40,0.4)'  :
    'rgba(196,120,32,0.48)';

  const isLocked   = status === 'locked';
  const isInit     = status === 'init';
  const isDisabled = status !== 'idle';

  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        background:
          'radial-gradient(ellipse 130% 100% at 50% 60%, #2d1a0e 0%, #140b05 55%, #0a0603 100%)',
        transformOrigin: 'left center',
      }}
      exit={{
        rotateY: 90,
        opacity: 0,
        transition: {
          rotateY: { duration: 0.52, ease: [0.4, 0, 1, 1] },
          opacity:  { duration: 0.52, ease: 'easeIn' },
        },
      }}
    >
      {/* Desk light */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 45% at 50% 65%, rgba(220,130,60,0.055) 0%, transparent 70%)',
      }} />

      {/* Book */}
      <motion.div
        initial={{ opacity: 0, y: -70, rotateX: 18, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 16, stiffness: 130, mass: 0.9, opacity: { duration: 0.4 } }}
        className="relative w-full mx-4"
        style={{ maxWidth: '460px', perspective: '900px' }}
      >
        {/* Page-stack depth */}
        <div className="absolute rounded-lg" style={{ inset: 0, bottom: '-9px', right: '-7px', background: '#FDE8C0', zIndex: 0, boxShadow: '2px 2px 0 #e8c898' }} />
        <div className="absolute rounded-lg" style={{ inset: 0, bottom: '-5px', right: '-4px', background: '#FDF0D8', zIndex: 1 }} />

        {/* Book body */}
        <div
          className="relative flex rounded-lg overflow-hidden"
          style={{ zIndex: 2, boxShadow: '0 6px 30px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)' }}
        >
          {/* Spine */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-around py-5"
            style={{
              width: '38px',
              background: 'linear-gradient(to right, #5a1515 0%, #9b2424 40%, #7a1c1c 100%)',
              boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.55), inset 2px 0 4px rgba(255,255,255,0.06)',
            }}
          >
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <div key={i} className="relative flex items-center justify-center">
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #d4a870, #7a3a18)', boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.65), 0 1px 2px rgba(255,255,255,0.18)' }} />
                <div className="absolute" style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#0a0502', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)' }} />
              </div>
            ))}
          </div>

          {/* Cover page */}
          <div
            className="flex-1 flex flex-col items-center justify-between relative overflow-hidden"
            style={{
              background: isLocked
                ? 'linear-gradient(155deg, #2a0606 0%, #180404 45%, #100303 100%)'
                : 'linear-gradient(155deg, #3d0e0e 0%, #240808 45%, #160404 100%)',
              minHeight: 'min(68vh, 560px)',
              maxHeight: 'min(68vh, 560px)',
              padding: '14px 16px',
              transition: 'background 0.6s',
            }}
          >
            {/* Border insets */}
            <div className="absolute pointer-events-none" style={{
              inset: '7px',
              border: `1px solid ${isLocked ? 'rgba(140,40,40,0.22)' : 'rgba(196,120,32,0.18)'}`,
              borderRadius: '2px',
              transition: 'border-color 0.6s',
            }} />
            <div className="absolute pointer-events-none" style={{
              inset: '11px',
              border: `1px solid ${isLocked ? 'rgba(140,40,40,0.09)' : 'rgba(196,120,32,0.07)'}`,
              borderRadius: '1px',
              transition: 'border-color 0.6s',
            }} />
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.18) 100%)' }} />

            {/* Top ornament */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-full">
              <GoldLine locked={isLocked} />
              <p
                style={{
                  fontFamily: hand,
                  fontSize: '13px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'rgba(175,120,40,0.48)',
                }}
              >
                {isLocked ? 'locked' : 'Private'}
              </p>
            </div>

            {/* Center: icon + title + dots */}
            <div className="relative z-10 flex flex-col items-center gap-4">

              {/* Icon */}
              <div className="relative" style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div key="unlocked"
                      initial={{ scale: 0.3, rotate: -30, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 290, damping: 16 }}
                    >
                      <Unlock className="w-10 h-10" style={{ color: 'rgba(212,168,58,0.92)', filter: 'drop-shadow(0 0 16px rgba(220,178,60,0.75))' }} />
                    </motion.div>
                  ) : isLocked ? (
                    <motion.div key="hard-locked"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Lock className="w-10 h-10" style={{ color: 'rgba(140,40,40,0.55)' }} />
                    </motion.div>
                  ) : (
                    <motion.div key="locked-idle"
                      animate={
                        isInit ? { opacity: [0.4, 0.7, 0.4] } :
                        status === 'submitting' ? { opacity: [0.5, 0.9, 0.5] } :
                        status === 'error' ? { rotate: [-5, 5, -5, 5, 0] } :
                        { filter: ['drop-shadow(0 0 5px rgba(196,120,32,0.22))', 'drop-shadow(0 0 10px rgba(196,120,32,0.4))', 'drop-shadow(0 0 5px rgba(196,120,32,0.22))'] }
                      }
                      transition={
                        isInit || status === 'submitting' ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } :
                        status === 'error' ? { duration: 0.45 } :
                        { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                      }
                    >
                      <Lock className="w-10 h-10" style={{ color: 'rgba(196,120,32,0.62)' }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success burst ring */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div key="ring"
                      className="absolute rounded-full pointer-events-none"
                      initial={{ width: 10, height: 10, opacity: 0.7 }}
                      animate={{ width: 110, height: 110, opacity: 0 }}
                      exit={{}}
                      transition={{ duration: 0.75, ease: 'easeOut' }}
                      style={{ border: '1.5px solid rgba(212,168,58,0.55)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Title */}
              <p
                className="text-sm font-light tracking-[0.06em]"
                style={{
                  fontFamily: isLocked ? serif : hand,
                  fontSize: isLocked ? '13px' : '16px',
                  color: isLocked ? 'rgba(140,60,60,0.55)' : 'rgba(255,220,180,0.52)',
                  transition: 'color 0.5s',
                }}
              >
                {isLocked ? 'هذا الدفتر مقفل' : isInit ? '...' : 'Enter the secret code'}
              </p>

              {/* PIN dots row */}
              <div className="relative flex justify-center">
                <motion.div
                  className="flex gap-4"
                  animate={status === 'error' ? { x: [0, -11, 11, -11, 11, -7, 7, 0] } : { x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {Array.from({ length: 4 }).map((_, i) => {
                    const filled = isLocked ? true : i < pin.length;
                    return (
                      <motion.div
                        key={`${i}-${filled ? '1' : '0'}-${status}`}
                        initial={{ scale: filled && !isLocked ? 0.15 : 1 }}
                        animate={{ scale: 1, background: dotBg(i), boxShadow: dotShadow(i) }}
                        transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                        style={{ width: '14px', height: '14px', borderRadius: '50%', border: `1.5px solid ${dotBorder}`, flexShrink: 0 }}
                      />
                    );
                  })}
                </motion.div>

                {/* Success particles */}
                <AnimatePresence>
                  {status === 'success' && SUCCESS_PARTICLES.map((p, i) => (
                    <motion.div key={i} className="absolute rounded-full pointer-events-none"
                      initial={{ x: 0, y: 0, opacity: 0.85, scale: 1 }}
                      animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0 }}
                      exit={{}}
                      transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut' }}
                      style={{ width: `${p.size}px`, height: `${p.size}px`, background: 'rgba(212,168,58,0.82)', boxShadow: '0 0 4px rgba(212,168,58,0.6)', top: '50%', left: '50%', marginTop: `-${p.size / 2}px`, marginLeft: `-${p.size / 2}px` }}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Status / attempts text */}
              <div style={{ height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.p key="err"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-red-400/65 text-xs italic" style={{ fontFamily: serif }}
                    >
                      {attemptsLeft <= 2
                        ? `رمز خاطئ — ${attemptsLeft} محاول${attemptsLeft === 1 ? 'ة' : 'ات'} متبقي${attemptsLeft === 1 ? 'ة' : ''}`
                        : 'آخر يوم إلنا سوا'}
                    </motion.p>
                  )}
                  {status === 'success' && (
                    <motion.p key="ok"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-amber-300/82 text-xs italic" style={{ fontFamily: serif }}
                    >
                      Welcome ♥
                    </motion.p>
                  )}
                  {isLocked && (
                    <motion.p key="locked-msg"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      style={{ fontFamily: serif, color: 'rgba(160,60,60,0.6)', fontSize: '11px', fontStyle: 'italic' }}
                    >
                      لا يمكن الوصول إلى هذا الدفتر
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Keypad — hidden when locked or loading */}
            <AnimatePresence>
              {!isLocked && !isInit && (
                <motion.div
                  key="keypad"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex justify-center w-full"
                >
                  <div className="grid grid-cols-3 gap-2.5" style={{ width: '192px' }}>
                    {KEYS.map((key, idx) => {
                      if (key === null) return <div key={`sp-${idx}`} />;
                      return (
                        <PinKey
                          key={key}
                          label={key}
                          isDelete={key === '⌫'}
                          rippling={lastKey === key}
                          disabled={isDisabled}
                          onClick={() => fire(key)}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading state placeholder */}
            {isInit && (
              <div className="relative z-10 flex justify-center items-center" style={{ height: '46px' }}>
                <motion.div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i}
                      className="rounded-full"
                      style={{ width: '5px', height: '5px', background: 'rgba(196,120,32,0.4)' }}
                      animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Bottom ornament */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-full">
              <GoldLine diamond locked={isLocked} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Pin key ── */
function PinKey({ label, isDelete, rippling, disabled, onClick }: {
  label: string; isDelete: boolean; rippling: boolean; disabled: boolean; onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.11 } : {}}
      whileTap={!disabled ? { scale: 0.82 } : {}}
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        height: '46px', borderRadius: '50%',
        background: 'rgba(62,10,10,0.68)',
        border: '1px solid rgba(175,95,45,0.32)',
        color: isDelete ? 'rgba(255,145,110,0.72)' : 'rgba(255,215,170,0.92)',
        fontFamily: serif, fontSize: isDelete ? '15px' : '19px',
        cursor: disabled ? 'default' : 'pointer',
        boxShadow: '0 3px 8px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)',
        userSelect: 'none', WebkitUserSelect: 'none',
        opacity: disabled ? 0.55 : 1, transition: 'opacity 0.2s',
      }}
    >
      <AnimatePresence>
        {rippling && (
          <motion.div key="ripple" className="absolute rounded-full pointer-events-none"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.34, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', background: 'rgba(218,155,65,0.38)', top: 0, left: 0 }}
          />
        )}
      </AnimatePresence>
      {label}
    </motion.button>
  );
}

/* ── Gold ornament line ── */
function GoldLine({ diamond, locked }: { diamond?: boolean; locked?: boolean }) {
  const c = locked ? 'rgba(140,50,50,0.7)' : 'rgba(196,120,32,0.85)';
  return (
    <div className="flex items-center gap-2 w-full max-w-[96px]" style={{ opacity: 0.36 }}>
      <div className="h-px flex-1" style={{ background: c }} />
      {diamond
        ? <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: c }} />
        : <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: c }} />
      }
      <div className="h-px flex-1" style={{ background: c }} />
    </div>
  );
}
