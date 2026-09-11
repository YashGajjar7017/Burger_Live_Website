import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  radius?: number;
}

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  children,
  className,
  glowColor = "rgba(234, 179, 8, 0.15)",
  radius = 350,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal-900/80 backdrop-blur-xl transition-all duration-300 hover:border-gold-500/30",
        className
      )}
    >
      {/* Background Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      {/* Border Highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl border border-gold-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius * 0.7}px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 80%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              ${radius * 0.7}px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
