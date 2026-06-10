import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Sparkles, MapPin, Clock, Star } from 'lucide-react';
import { Particles } from '../components/Particles';

interface TimelineSceneProps {
  onComplete: () => void;
}

const timelineEvents = [
  {
    id: 1,
    icon: Sparkles,
    title: "The Day We Met",
    date: "Where it all began",
    description: "Little did we know that a simple hello would change everything. The universe had plans we couldn't even imagine.",
    align: 'left' as const,
  },
  {
    id: 2,
    icon: Heart,
    title: "First Conversation",
    date: "When time stood still",
    description: "I remember what you said. I remember how it felt. I remember knowing, somehow, that you would matter.",
    align: 'right' as const,
  },
  {
    id: 3,
    icon: MapPin,
    title: "Growing Closer",
    date: "Across the miles",
    description: "Distance tried to keep us apart. But hearts don't care about geography. Neither did we.",
    align: 'left' as const,
  },
  {
    id: 4,
    icon: Clock,
    title: "Every Day Since",
    date: "Falling deeper",
    description: "Each message, each call, each shared moment. Building something beautiful, one day at a time.",
    align: 'right' as const,
  },
  {
    id: 5,
    icon: Star,
    title: "Right Now",
    date: "This moment",
    description: "Looking back at the journey, looking forward to the future. Grateful for every step that led me to you.",
    align: 'left' as const,
  },
];

export function TimelineScene({ onComplete }: TimelineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.6]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-950 via-rose-950/50 to-slate-950 scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <Particles count={20} color="rgba(244, 114, 182, 0.4)" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-rose-500/10"
        style={{ opacity: backgroundOpacity }}
      />

      <div className="relative min-h-screen py-20 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-rose-300/60 text-sm tracking-[0.3em] uppercase mb-2">
              Chapter Two
            </p>
            <h2 className="text-4xl md:text-6xl font-light text-rose-100" style={{ textShadow: '0 0 40px rgba(244, 114, 182, 0.4)' }}>
              Our Story
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-400/50 to-transparent" />

            {timelineEvents.map((event) => {
              const Icon = event.icon;
              const isLeft = event.align === 'left';

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`relative flex items-center mb-16 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${isLeft ? 'md:ml-auto' : 'md:mr-auto'} max-w-sm`}>
                      <p className={`text-rose-400/80 text-sm tracking-widest uppercase mb-2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        {event.date}
                      </p>
                      <h3 className={`text-xl md:text-2xl font-light text-rose-100 mb-3 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        {event.title}
                      </h3>
                      <p className={`text-rose-200/70 font-light leading-relaxed ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-500/30 flex items-center justify-center border border-rose-400/30 backdrop-blur-sm z-10"
                  >
                    <Icon className="w-5 h-5 text-rose-300" />
                  </motion.div>

                  <div className="hidden md:block w-5/12" />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pb-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-rose-400/60 mx-auto mb-4" fill="currentColor" />
            </motion.div>
            <p className="text-rose-200/60 text-lg italic">
              And the story continues...
            </p>
            <button
              onClick={onComplete}
              className="mt-6 px-6 py-3 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors border border-rose-400/30"
            >
              Continue
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
