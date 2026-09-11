import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
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

  // Raw scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 26,
    restDelta: 0.001,
  });

  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [currentProgressVal, setCurrentProgressVal] = useState(0);

  // Interactive 3D Parallax Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 22 });

  const stageRotateY = useTransform(smoothMouseX, [-350, 350], [-14, 14]);
  const stageRotateX = useTransform(smoothMouseY, [-350, 350], [14, -14]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  // High performance listener - only updates state when layer index actually changes
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Update progress scalar for HUD dial (quantized to reduce render thrashing)
    const rounded = Math.round(latest * 100) / 100;
    if (Math.abs(rounded - currentProgressVal) >= 0.01) {
      setCurrentProgressVal(rounded);
    }

    // Identify active layer by closest focusProgress
    let bestIdx = 0;
    let minDiff = 999;
    for (let i = 0; i < BURGER_LAYERS.length; i++) {
      const diff = Math.abs(latest - BURGER_LAYERS[i].focusProgress);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    }

    if (bestIdx !== activeLayerIndex) {
      setActiveLayerIndex(bestIdx);
      if (soundEnabled) {
        sounds.playWhoosh();
      }
    }
  });

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
      className="relative h-[450vh] bg-charcoal-950 text-white"
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
        {/* Background radial atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,22,12,0.5)_0%,rgba(6,6,8,0.98)_75%)] pointer-events-none" />

        {/* Ambient Gold Particles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <SparklesCore
            minSize={1}
            maxSize={2}
            particleDensity={25}
            particleColor="#facc15"
          />
        </div>

        {/* Center Spotlight */}
        <motion.div
          className="absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] rounded-full blur-[130px] pointer-events-none"
          animate={{
            backgroundColor:
              currentProgressVal < 0.15
                ? "rgba(234, 179, 8, 0.12)"
                : currentProgressVal > 0.4 && currentProgressVal < 0.7
                ? "rgba(255, 87, 34, 0.15)"
                : "rgba(217, 119, 6, 0.12)",
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* 3D Perspective Rig */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px]"
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
          scrollProgress={currentProgressVal}
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
// INDIVIDUAL BURGER LAYER MOTION ITEM (Hardware-Accelerated 3D Transforms)
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
  // Smooth GPU translation along Y axis
  const translateY = useTransform(
    progress,
    [0, 1],
    [0, layer.offsetY]
  );

  // Smooth 3D tilt rotation
  const rotateX = useTransform(
    progress,
    [0, 1],
    [0, layer.rotateX]
  );

  // Subtle depth scale
  const scale = useTransform(
    progress,
    [0, 1],
    [1, layer.scale]
  );

  // Dynamic Z-Index for natural stacking
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
        willChange: "transform",
      }}
      className="cursor-pointer group flex items-center justify-center select-none"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-88 md:h-88 lg:w-[400px] lg:h-[400px] transition-transform duration-200 group-hover:scale-105">
        
        {/* Active Layer Golden Halo */}
        {isActive && (
          <div className="absolute -inset-4 rounded-full border border-gold-400/40 bg-gold-500/5 blur-md pointer-events-none animate-pulse" />
        )}

        {/* High Resolution Layer Image */}
        <img
          src={layer.image}
          alt={layer.tierName}
          draggable={false}
          loading="eager"
          className={`w-full h-full object-contain filter transition-all duration-200 ${
            isActive
              ? "brightness-110 contrast-105 drop-shadow-[0_10px_25px_rgba(234,179,8,0.3)]"
              : isHovered
              ? "brightness-105"
              : "brightness-95 hover:brightness-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          }`}
        />

        {/* Floating Mini Badge Indicator */}
        {isActive && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/95 border border-gold-500/40 text-gold-300 shadow-xl backdrop-blur-md text-[11px] font-mono whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            <span className="font-semibold">{layer.shortName}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
