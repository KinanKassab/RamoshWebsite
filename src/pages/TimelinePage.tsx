import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Clock, Star } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const serif = "'Georgia', 'Times New Roman', serif";

const events: { icon: LucideIcon; title: string; date: string; description: string }[] = [
  {
    icon: Sparkles,
    title: 'The Day We Met',
    date: 'Where it all began',
    description: 'Little did we know that a simple hello would change everything. The universe had plans.',
  },
  {
    icon: Heart,
    title: 'First Conversation',
    date: 'When time stood still',
    description: 'I remember what you said. I remember how it felt. I knew somehow that you would matter.',
  },
  {
    icon: MapPin,
    title: 'Growing Closer',
    date: 'Across the miles',
    description: "Distance tried to keep us apart. But hearts don't care about geography.",
  },
  {
    icon: Clock,
    title: 'Every Day Since',
    date: 'Falling deeper',
    description: 'Each message, each shared moment — building something beautiful, one day at a time.',
  },
  {
    icon: Star,
    title: 'Right Now',
    date: 'This moment',
    description: 'Looking back at the journey, looking forward to the future. Grateful for every step that led me to you.',
  },
];

export function TimelinePage() {
  return (
    <div className="py-2">
      {/* Chapter heading */}
      <p
        className="text-rose-700/58 text-xs tracking-[0.25em] uppercase mb-0.5"
        style={{ fontFamily: serif }}
      >
        Chapter Two
      </p>
      <h2
        className="text-2xl font-light text-stone-800 mb-5"
        style={{ fontFamily: serif }}
      >
        Our Story
      </h2>

      {/* Timeline list */}
      <div className="relative space-y-5">
        {/* Vertical stem */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: '10px', width: '1px', background: 'rgba(180,60,60,0.18)' }}
        />

        {events.map((ev, i) => {
          const Icon = ev.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3.5 relative"
            >
              {/* Icon node */}
              <div
                className="flex-shrink-0 flex items-center justify-center z-10"
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#FDF6E9',
                  border: '1px solid rgba(180,60,60,0.38)',
                  boxShadow: '0 0 0 3px #FDF6E9',
                  marginTop: '1px',
                }}
              >
                <Icon className="w-2.5 h-2.5 text-rose-700/65" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p
                  className="text-stone-400/60 text-xs mb-0.5"
                  style={{ fontFamily: serif }}
                >
                  {ev.date}
                </p>
                <h4
                  className="text-stone-800 text-sm font-medium leading-tight mb-1"
                  style={{ fontFamily: serif }}
                >
                  {ev.title}
                </h4>
                <p
                  className="text-stone-600/68 text-xs italic leading-relaxed"
                  style={{ fontFamily: serif }}
                >
                  {ev.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
