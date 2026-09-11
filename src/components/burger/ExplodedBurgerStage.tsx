import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import type { BurgerLayer } from "../../data/burgerData";
import { BURGER_LAYERS } from "../../data/burgerData";
import { BurgerHUD } from "./BurgerHUD";
import { sounds } from "../../lib/sound";
import { SparklesCore } from "../ui/sparkles";

interface ExplodedBurgerStageProps {
  onOpenCustomizer?: () => void;
  onOpenOrder?: () => void;
}

export const ExplodedBurgerStage: React.FC<ExplodedBurgerStageProps> = ({
  onOpenCustomizer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.0005,
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [lastWhooshMilestone, setLastWhooshMilestone] = useState(0);

  // Interactive 3D Stage Tilt with Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const stageRotateY = useTransform(smoothMouseX, [-400, 400], [-18, 18]);
  const stageRotateX = useTransform(smoothMouseY, [-400, 400], [18, -18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Sync state with scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setCurrentProgress(latest);

      // Determine active layer
      let bestIndex = 0;
      let minDistance = 999;
      BURGER_LAYERS.forEach((layer, idx) => {
        const dist = Math.abs(latest - layer.focusProgress);
        if (dist < minDistance) {
          minDistance = dist;
          bestIndex = idx;
        }
      });

      if (bestIndex !== activeLayerIndex) {
        setActiveLayerIndex(bestIndex);
        if (soundEnabled && Math.abs(latest - lastWhooshMilestone) > 0.12) {
          sounds.playWhoosh();
          setLastWhooshMilestone(latest);
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, activeLayerIndex, soundEnabled, lastWhooshMilestone]);

  // Autoplay Tour Engine
  useEffect(() => {
    if (!isAutoPlaying || !containerRef.current) return;

    let startTime: number | null = null;
    const duration = 12000; // 12 seconds full explosion cycle
    let animationFrame: number;

    const animateScroll = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const targetProgress = (elapsed % duration) / duration;

      if (containerRef.current) {
        const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
        window.scrollTo({
          top: containerRef.current.offsetTop + totalHeight * targetProgress,
          behavior: "auto",
        });
      }

      animationFrame = requestAnimationFrame(animateScroll);
    };

    animationFrame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoPlaying]);

  const handleSelectMilestone = (targetProgress: number) => {
    if (!containerRef.current) return;
    setIsAutoPlaying(false);
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerRef.current.offsetTop + totalHeight * targetProgress;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const activeLayer = BURGER_LAYERS[activeLayerIndex];

  return (
    <section
      id="deconstruct"
      ref={containerRef}
      className="relative h-[420vh] bg-charcoal-950 text-white"
    >
      {/* Sticky Stage Viewport */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
      >
        {/* Ambient Dark Luxury Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(35,25,15,0.4)_0%,rgba(6,6,8,0.95)_70%)] pointer-events-none" />
        
        {/* Subtle Gold Sparkles in Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <SparklesCore
            minSize={1}
            maxSize={2.5}
            particleDensity={35}
            particleColor="#facc15"
          />
        </div>

        {/* Dynamic Center Stage Glow */}
        <motion.div
          className="absolute w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full blur-[140px] pointer-events-none"
          animate={{
            backgroundColor:
              currentProgress < 0.15
                ? "rgba(234, 179, 8, 0.12)"
                : currentProgress > 0.4 && currentProgress < 0.7
                ? "rgba(255, 87, 34, 0.15)"
                : "rgba(217, 119, 6, 0.1)",
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 3D Perspective Exploded Burger Rig */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[480px] lg:h-[480px]"
          style={{
            perspective: 1400,
            transformStyle: "preserve-3d",
            rotateX: stageRotateX,
            rotateY: stageRotateY,
          }}
        >
          {BURGER_LAYERS.map((layer, index) => {
            return (
              <BurgerLayerMotionItem
                key={layer.id}
                layer={layer}
                index={index}
                progress={smoothProgress}
                isHovered={hoveredLayerId === layer.id}
                isActive={activeLayer.id === layer.id}
                onHover={() => {
                  setHoveredLayerId(layer.id);
                  if (soundEnabled) sounds.playClick();
                }}
                onLeave={() => setHoveredLayerId(null)}
                onClick={() => {
                  sounds.playSnap();
                  handleSelectMilestone(layer.focusProgress);
                }}
              />
            );
          })}
        </motion.div>

        {/* Interactive HUD Overlays */}
        <BurgerHUD
          activeLayer={activeLayer}
          scrollProgress={currentProgress}
          onSelectMilestone={handleSelectMilestone}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            sounds.enabled = !soundEnabled;
            setSoundEnabled(!soundEnabled);
          }}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
          onOpenCustomizer={onOpenCustomizer}
        />
      </div>
    </section>
  );
};

// =========================================================================
// INDIVIDUAL BURGER LAYER MOTION ITEM (3D Perspective Physics)
// =========================================================================
interface BurgerLayerMotionItemProps {
  layer: BurgerLayer;
  index: number;
  progress: any;
  isHovered: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const BurgerLayerMotionItem: React.FC<BurgerLayerMotionItemProps> = ({
  layer,
  index,
  progress,
  isHovered,
  isActive,
  onHover,
  onLeave,
  onClick,
}) => {
  // Translate Y from 0 (stacked burger) to layer.offsetY (exploded)
  const translateY = useTransform(
    progress,
    [0, 1],
    [0, layer.offsetY]
  );

  // Rotate X for exploded perspective spread
  const rotateX = useTransform(
    progress,
    [0, 1],
    [0, layer.rotateX]
  );

  // Scale adjustment for depth
  const scale = useTransform(
    progress,
    [0, 1],
    [1, layer.scale]
  );

  // Dynamic Z-Index: ensure natural stacking when collapsed, and highlight when active
  const zIndex = isActive ? 50 : isHovered ? 45 : 30 - index;

  return (
    <motion.div
      style={{
        position: "absolute",
        translateY,
        rotateX,
        scale,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer group flex items-center justify-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] transition-transform duration-300 group-hover:scale-105">
        
        {/* Active Layer Golden Halo Rings */}
        {isActive && (
          <motion.div
            layoutId="layerGlow"
            className="absolute -inset-4 rounded-full border border-gold-400/40 bg-gold-500/5 blur-md pointer-events-none"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}

        {/* High Resolution Layer Image */}
        <img
          src={layer.image}
          alt={layer.tierName}
          draggable={false}
          className={`w-full h-full object-contain filter transition-all duration-300 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] ${
            isActive
              ? "brightness-110 contrast-105 drop-shadow-[0_0_35px_rgba(234,179,8,0.35)]"
              : isHovered
              ? "brightness-105"
              : "brightness-95 hover:brightness-105"
          }`}
        />

        {/* Floating Mini Badge Indicator on Hover / Active */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isActive || isHovered ? 1 : 0,
            scale: isActive || isHovered ? 1 : 0.8,
            y: isActive ? -10 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/95 border border-gold-500/40 text-gold-300 shadow-xl backdrop-blur-md text-[11px] font-mono whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="font-semibold">{layer.shortName}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
