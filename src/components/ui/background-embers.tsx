import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  pulsing: boolean;
  pulseSpeed: number;
}

interface BackgroundEmbersProps {
  className?: string;
  particleCount?: number;
  intensity?: "low" | "medium" | "high";
}

export const BackgroundEmbers: React.FC<BackgroundEmbersProps> = ({
  className,
  particleCount = 50,
  intensity = "medium",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(250, 204, 21, ", // gold
      "rgba(245, 158, 11, ", // amber
      "rgba(255, 87, 34, ",  // ember orange
      "rgba(255, 171, 0, ",  // golden flame
      "rgba(239, 68, 68, ",  // fiery red
    ];

    const count = intensity === "low" ? particleCount * 0.6 : intensity === "high" ? particleCount * 1.5 : particleCount;

    const particles: Particle[] = Array.from({ length: Math.floor(count) }, () => {
      const maxOp = Math.random() * 0.7 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.8 + 0.3),
        opacity: Math.random() * maxOp,
        maxOpacity: maxOp,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsing: Math.random() > 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulse opacity
        if (p.pulsing) {
          p.opacity += p.pulseSpeed;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        // Draw ember with radial glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `${p.color}${p.opacity})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none fixed inset-0 z-0 h-full w-full", className)}
    />
  );
};
