import React, { useRef, useState, useCallback, useEffect } from "react";
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
import { BurgerSliceVisual } from "./BurgerSlicesVisual";
import type { SliceRenderMode } from "./BurgerSlicesVisual";
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

  // Smooth spring physics for fluid 600vh scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 28,
    restDelta: 0.001,
  });

  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);
  const [soloLayerId, setSoloLayerId] = useState<string | null>(null);
  const [renderMode, setRenderMode] = useState<SliceRenderMode>("normal");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [currentProgressVal, setCurrentProgressVal] = useState(0);

  // Interactive 3D Parallax Tilt with Smooth Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const stageRotateY = useTransform(smoothMouseX, [-400, 400], [-18, 18]);
  const stageRotateX = useTransform(smoothMouseY, [-400, 400], [16, -16]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  // Autoplay loop timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && containerRef.current) {
      interval = setInterval(() => {
        const container = containerRef.current;
        if (!container) return;
        const totalHeight = container.offsetHeight - window.innerHeight;
        const currentY = window.scrollY - container.offsetTop;
        const nextY = currentY + window.innerHeight * 0.45;
        if (nextY >= totalHeight) {
          window.scrollTo({ top: container.offsetTop, behavior: "smooth" });
        } else {
          window.scrollTo({ top: container.offsetTop + nextY, behavior: "smooth" });
        }
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // High performance listener - updates active layer
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const rounded = Math.round(latest * 100) / 100;
    if (Math.abs(rounded - currentProgressVal) >= 0.01) {
      setCurrentProgressVal(rounded);
    }

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

  const handleResetPerspective = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeLayer = BURGER_LAYERS[activeLayerIndex];

  return (
    <section
      id="deconstruct"
      ref={containerRef}
      className="relative h-[600vh] bg-charcoal-950 text-white"
    >
      {/* Sticky Stage Viewport */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleResetPerspective}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
      >
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(35,24,14,0.6)_0%,rgba(6,6,8,0.99)_80%)] pointer-events-none" />

        {/* Ambient Gold Dust / Sparkles */}
        <div className="absolute inset-0 opacity-35 pointer-events-none">
          <SparklesCore
            minSize={1}
            maxSize={2.5}
            particleDensity={30}
            particleColor={renderMode === "thermal" ? "#ef4444" : renderMode === "xray" ? "#38bdf8" : "#facc15"}
          />
        </div>

        {/* Dynamic Center Stage Spotlight */}
        <motion.div
          className="absolute w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full blur-[140px] pointer-events-none"
          animate={{
            backgroundColor:
              renderMode === "thermal"
                ? "rgba(239, 68, 68, 0.18)"
                : renderMode === "xray"
                ? "rgba(56, 189, 248, 0.16)"
                : currentProgressVal < 0.15
                ? "rgba(234, 179, 8, 0.15)"
                : currentProgressVal > 0.4 && currentProgressVal < 0.7
                ? "rgba(255, 87, 34, 0.18)"
                : "rgba(217, 119, 6, 0.14)",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Dynamic 3D Coordinate-Tracking SVG Leader Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
          <defs>
            <linearGradient id="leaderLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.8)" />
              <stop offset="50%" stopColor="rgba(234,179,8,0.4)" />
              <stop offset="100%" stopColor="rgba(234,179,8,0.1)" />
            </linearGradient>
          </defs>
          {/* Subtle connecting pulse indicator */}
          <circle
            cx="50%"
            cy="50%"
            r="8"
            fill="none"
            stroke="#facc15"
            strokeWidth="1.5"
            className="animate-ping opacity-75"
          />
        </svg>

        {/* 3D Perspective Rig */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px]"
          style={{
            perspective: 1500,
            transformStyle: "preserve-3d",
            rotateX: stageRotateX,
            rotateY: stageRotateY,
          }}
        >
          {BURGER_LAYERS.map((layer, index) => {
            const isSoloActive = soloLayerId === null || soloLayerId === layer.id;
            return (
              <BurgerLayerMotionItem
                key={layer.id}
                layer={layer}
                index={index}
                progress={smoothProgress}
                renderMode={renderMode}
                isSoloActive={isSoloActive}
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

        {/* Interactive HUD Overlays & Controllers */}
        <BurgerHUD
          activeLayer={activeLayer}
          scrollProgress={currentProgressVal}
          renderMode={renderMode}
          onChangeRenderMode={(mode) => {
            sounds.playClick();
            setRenderMode(mode);
          }}
          soloLayerId={soloLayerId}
          onToggleSoloLayer={(id) => {
            sounds.playClick();
            setSoloLayerId(id);
          }}
          onSelectMilestone={handleSelectMilestone}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            sounds.enabled = !soundEnabled;
            setSoundEnabled(!soundEnabled);
          }}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
          onOpenCustomizer={onOpenCustomizer}
          onResetPerspective={handleResetPerspective}
        />
      </div>
    </section>
  );
};

// =========================================================================
// INDIVIDUAL BURGER LAYER MOTION ITEM
// =========================================================================
interface BurgerLayerMotionItemProps {
  layer: BurgerLayer;
  index: number;
  progress: any;
  renderMode: SliceRenderMode;
  isSoloActive: boolean;
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
  renderMode,
  isSoloActive,
  isHovered,
  isActive,
  onHover,
  onLeave,
  onClick,
}) => {
  // Assembled base offset (at scroll = 0, slices stack seamlessly into a cohesive whole burger)
  const assembledBaseY = (index - 3) * 22;

  // Smooth GPU translation along Y axis: from assembled stack -> full exploded deconstruction
  const translateY = useTransform(
    progress,
    [0, 1],
    [assembledBaseY, layer.offsetY]
  );

  // Smooth 3D tilt rotation
  const rotateX = useTransform(
    progress,
    [0, 1],
    [0, layer.rotateX]
  );

  // Smooth scale
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
        opacity: isSoloActive ? 1 : 0.15,
        filter: isSoloActive ? "blur(0px)" : "blur(4px)",
      }}
      className="cursor-pointer group flex items-center justify-center select-none transition-[opacity,filter] duration-300 pointer-events-auto"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="relative w-72 h-44 sm:w-96 sm:h-56 md:w-[440px] md:h-64 lg:w-[500px] lg:h-72 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
        
        {/* Active Layer Golden Halo */}
        {isActive && isSoloActive && (
          <div className="absolute -inset-3 rounded-full border border-gold-400/50 bg-gold-500/10 blur-md pointer-events-none animate-pulse" />
        )}

        {/* 7 Perfect Slices Visual Engine (Isolated, Transparent SVG/Canvas graphics) */}
        <BurgerSliceVisual
          layer={layer}
          isActive={isActive}
          isHovered={isHovered}
          renderMode={renderMode}
          separationProgress={0.5}
        />

        {/* Floating Mini Interactive Pin on Active Tier */}
        {isActive && isSoloActive && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/95 border border-gold-400/60 text-gold-300 shadow-2xl backdrop-blur-md text-[11px] font-mono whitespace-nowrap z-50"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span className="font-bold">{layer.shortName}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
