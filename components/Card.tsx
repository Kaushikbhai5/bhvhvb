
import React from 'react';
import { motion as m, useMotionValue, useMotionTemplate } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  onClick, 
  hoverEffect = true 
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        delay, 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{ willChange: 'transform, opacity' }}
      className={`group relative border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 ${hoverEffect ? 'hover:border-white/20 hover:bg-white/10' : ''} ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} ${className}`}
    >
      <m.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          willChange: 'opacity',
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(129, 140, 248, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full p-8">{children}</div>
    </m.div>
  );
};
