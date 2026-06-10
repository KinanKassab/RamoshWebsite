import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Particles } from '../components/Particles';

interface MemoriesSceneProps {
  onComplete: () => void;
}

const memories = [
  {
    id: 1,
    image: '/images/FXI-1.webp',
    title: 'That First Capture',
    description:
      'First photo for us, forever in my heart. You were the most beautiful sight, and I was the luckiest to have you in my frame.',
    date: '1 May 2026',
  },
  {
    id: 2,
    image: '/images/FXI-2.webp',
    title: 'FIX Break Time',
    description:
      'When the team that inspired me to take the first step finished speaking, I chose to spend some time with you. We wanted to change things up together, and our escape was a beautiful day, filled with the sweetest laughter and creating soulful memories.',
    date: '1 May 2026',
  },
  {
    id: 3,
    image: '/images/Qudsaya.jpg',
    title: 'Qudsaya, Syria: The road of my love',
    description:
      'Every time I see this video, it takes me back to that moment in Qudsaya. The way the light danced on your face, the sound of your laughter echoing through the streets, and the warmth of your hand in mine.',
    date: '1 May 2026',
  },
  {
    id: 4,
    image: '/images/Royal-1.webp',
    title: 'Happy Land, Syria: A day of pure joy',
    description:
      'This photo from our day at Happy Land is a treasure. It captures the pure joy and laughter we shared, the way your eyes lit up with excitement, and the carefree happiness that filled the air.',
    date: '2 May 2026',
  },
  {
    id: 5,
    image: '/images/Royal-2.webp',
    title: 'Before the Storm, The day with yasmine',
    description:
      'In the rotating wheel, we had a day filled with laughter and fun. This photo captures the essence of that day, the way you smiled and laughed with Yasmin, and the carefree joy that surrounded us.',
    date: '2 May 2026',
  },
  {
    id: 6,
    image: '/images/Royal-3.webp',
    title: 'Enjoy the shower!',
    description:
      'This photo after our day at the water game in Happy Land is a reminder of the fun and laughter we shared. The way you enjoyed the shower, the carefree joy on your face, and the happiness that filled the air.',
    date: '2 May 2026',
  },
  {
    id: 7,
    image: '/images/Car-1.webp',
    title: 'The Last One',
    description:
      "This photo from our last day together is a bittersweet reminder of the love and memories we shared. The way you smiled, the warmth in your eyes, and the love that comes from me to you — every time I see it, I'm reminded of how much I love you.",
    date: '31 May 2026',
  },
];

export function MemoriesScene({ onComplete }: MemoriesSceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-280, 0, 280], [3.5, 0, -3.5]);
  const cardOpacity = useTransform(x, [-280, -90, 0, 90, 280], [0.55, 1, 1, 1, 0.55]);
  const cardScale = useTransform(x, [-280, 0, 280], [0.92, 1, 0.92]);

  /* Reactive arrow visibilities */
  const leftArrowOpacity = useTransform(x, [-20, 0, 70, 250], [0.1, 0.25, 0.5, 0.9]);
  const rightArrowOpacity = useTransform(x, [-250, -70, 0, 20], [0.9, 0.5, 0.25, 0.1]);
  const leftArrowX = useTransform(x, [0, 250], [-8, 0]);
  const rightArrowX = useTransform(x, [-250, 0], [0, 8]);

  /* Reactive drag-direction glow backgrounds */
  const amberGlowOpacity = useTransform(x, [-10, 0, 80, 260], [0, 0, 0.35, 0.75]);
  const pinkGlowOpacity = useTransform(x, [-260, -80, 0, 10], [0.75, 0.35, 0, 0]);

  /* Reactive top-edge line */
  const amberLineOpacity = useTransform(x, [-10, 0, 80, 260], [0, 0, 0.4, 0.85]);
  const pinkLineOpacity = useTransform(x, [-260, -80, 0, 10], [0.85, 0.4, 0, 0]);

  const currentMemory = memories[currentIndex];

  const resetX = () => x.set(0);

  const goNext = () => {
    resetX();
    if (currentIndex < memories.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    resetX();
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const { velocity, offset } = info;

    if (velocity.x < -500 || offset.x < -100) {
      goNext();
    } else if (velocity.x > 500 || offset.x > 100) {
      goPrev();
    }
    /* snap back to 0 — dragConstraints handles this automatically */
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-amber-950/90 via-rose-950 to-stone-950">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <Particles count={20} color="rgba(251, 191, 36, 0.3)" />

      {/* Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-amber-200/80 text-sm tracking-[0.3em] uppercase"
        >
          Chapter One
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl md:text-5xl font-light text-rose-100 mt-2"
          style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}
        >
          Our Memories
        </motion.h2>
      </div>

      {/* Card area */}
      <div className="absolute bottom-28 top-28 left-0 right-0 flex items-center justify-center px-4 md:px-16">
        {/* Drag-direction glow — reactive to MotionValue */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(251,191,36,0.18) 0%, transparent 65%)',
            opacity: amberGlowOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(244,114,182,0.18) 0%, transparent 65%)',
            opacity: pinkGlowOpacity,
          }}
        />

        {/* Left arrow hint */}
        <motion.div
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 pointer-events-none z-20"
          style={{ opacity: leftArrowOpacity, x: leftArrowX }}
        >
          <ChevronLeft className="w-8 h-8 text-rose-300" />
        </motion.div>

        {/* Right arrow hint */}
        <motion.div
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none z-20"
          style={{ opacity: rightArrowOpacity, x: rightArrowX }}
        >
          <ChevronRight className="w-8 h-8 text-rose-300" />
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 280 : -280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 280 : -280 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x, rotateZ, opacity: cardOpacity, scale: cardScale, willChange: 'transform' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full max-w-2xl cursor-grab active:cursor-grabbing touch-none select-none"
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl bg-white/5"
              animate={{
                boxShadow: isDragging
                  ? '0 30px 60px -10px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.15)'
                  : '0 20px 40px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
              transition={{ duration: 0.25 }}
            >
              {/* Image */}
              <motion.div
                className="relative w-full aspect-[4/3] overflow-hidden"
                animate={{ scale: isHovered && !isDragging ? 1.04 : 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentMemory.image}
                    src={currentMemory.image}
                    alt={currentMemory.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative px-6 py-5 md:px-8 md:py-6"
              >
                <p className="text-amber-300/70 text-xs tracking-[0.2em] uppercase mb-1.5">
                  {currentMemory.date}
                </p>
                <h3 className="text-xl md:text-3xl font-light text-white mb-2 tracking-wide">
                  {currentMemory.title}
                </h3>
                <p className="text-rose-200/75 text-sm md:text-base font-light italic leading-relaxed line-clamp-3">
                  {currentMemory.description}
                </p>
              </motion.div>

              {/* Reactive top-edge accent lines */}
              <motion.div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(244,114,182,0.7), transparent)',
                  opacity: pinkLineOpacity,
                }}
              />
              <motion.div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(251,191,36,0.7), transparent)',
                  opacity: amberLineOpacity,
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-10">
        <motion.button
          onClick={goPrev}
          disabled={currentIndex === 0}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/12 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-rose-300" />
        </motion.button>

        <div className="flex gap-2 items-center">
          {memories.map((_, idx) => (
            <motion.div
              key={idx}
              className={`rounded-full cursor-pointer transition-colors ${
                idx === currentIndex ? 'bg-rose-400' : 'bg-rose-400/28'
              }`}
              animate={{
                width: idx === currentIndex ? 22 : 7,
                height: 7,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.25 }}
              onClick={() => {
                if (idx !== currentIndex) {
                  resetX();
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={goNext}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/12 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-rose-300" />
        </motion.button>
      </div>

      {/* Swipe hint */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-rose-300/35 text-xs tracking-widest uppercase">
          Drag or swipe to navigate
        </p>
      </motion.div>
    </div>
  );
}
