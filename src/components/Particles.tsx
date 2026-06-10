import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xDrift: number;
  yRange: number;
}

interface ParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export function Particles({ count = 25, color = 'rgba(255, 255, 255, 0.6)', className = '' }: ParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 15 + Math.random() * 85,
      size: 2 + Math.random() * 3,
      duration: 9 + Math.random() * 11,
      delay: -(Math.random() * 8),
      opacity: 0.3 + Math.random() * 0.5,
      xDrift: Math.random() * 28 - 14,
      yRange: 70 + Math.random() * 50,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [-10, -particle.yRange, -10],
            x: [0, particle.xDrift, 0],
            opacity: [particle.opacity * 0.35, particle.opacity, particle.opacity * 0.35],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
