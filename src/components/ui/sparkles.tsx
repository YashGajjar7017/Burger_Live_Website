import React, { useId, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../lib/utils";

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  minSize = 1,
  maxSize = 3,
  particleDensity = 40,
  className,
  particleColor = "#facc15",
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const generatedId = useId();

  useEffect(() => {
    const generatedSparkles: Sparkle[] = Array.from({ length: particleDensity }).map((_, i) => ({
      id: `${generatedId}-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      color: particleColor,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
    }));
    setSparkles(generatedSparkles);
  }, [generatedId, minSize, maxSize, particleDensity, particleColor]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {sparkles.map((sparkle) => (
        <SparkleParticle key={sparkle.id} sparkle={sparkle} />
      ))}
    </div>
  );
};

const SparkleParticle: React.FC<{ sparkle: Sparkle }> = ({ sparkle }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 0.8, 0],
      scale: [0.3, 1.2, 0.3],
      y: [`${sparkle.y}%`, `${sparkle.y - 15}%`],
      transition: {
        duration: sparkle.duration,
        repeat: Infinity,
        delay: sparkle.delay,
        ease: "easeInOut",
      },
    });
  }, [controls, sparkle]);

  return (
    <motion.span
      animate={controls}
      style={{
        position: "absolute",
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        width: `${sparkle.size}px`,
        height: `${sparkle.size}px`,
        borderRadius: "50%",
        backgroundColor: sparkle.color,
        boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.color}`,
        pointerEvents: "none",
      }}
    />
  );
};
