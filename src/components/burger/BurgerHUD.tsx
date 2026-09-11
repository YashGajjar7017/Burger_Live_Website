import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Utensils,
  Wine,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Play,
  Pause,
  ChevronDown,
} from "lucide-react";
import type { BurgerLayer } from "../../data/burgerData";
import { BURGER_LAYERS } from "../../data/burgerData";
import { sounds } from "../../lib/sound";
import { CardSpotlight } from "../ui/card-spotlight";

interface BurgerHUDProps {
  activeLayer: BurgerLayer;
  scrollProgress: number;
  onSelectMilestone: (progress: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onOpenCustomizer?: () => void;
}

export const BurgerHUD: React.FC<BurgerHUDProps> = ({
  activeLayer,
  scrollProgress,
  onSelectMilestone,
  soundEnabled,
  onToggleSound,
  isAutoPlaying,
  onToggleAutoPlay,
  onOpenCustomizer,
}) => {
  const percentage = Math.round(scrollProgress * 100);

  return (
    <>
      {/* ========================================================================= */}
      {/* LEFT HUD: DYNAMIC INGREDIENT DOSSIER                                     */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute left-4 md:left-8 lg:left-12 top-24 bottom-24 z-20 flex flex-col justify-center w-80 md:w-96 lg:w-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <CardSpotlight
              glowColor="rgba(234, 179, 8, 0.2)"
              className="p-5 md:p-6 shadow-2xl border-white/15 bg-charcoal-900/90 backdrop-blur-2xl"
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-[11px] font-mono font-bold tracking-widest text-gold-400 uppercase">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  {activeLayer.badge}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider bg-charcoal-800/80 px-2 py-0.5 rounded border border-white/5">
                  {activeLayer.metrics.artisanGrade}
                </span>
              </div>

              {/* Layer Title */}
              <h2 className="text-xl md:text-2xl font-display font-bold text-zinc-100 tracking-wide leading-tight mb-2">
                {activeLayer.tierName}
              </h2>

              {/* Origin Tag */}
              <div className="flex items-center gap-1.5 text-xs text-amber-300/80 font-medium mb-3">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{activeLayer.origin}</span>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-zinc-300/90 leading-relaxed mb-4">
                {activeLayer.description}
              </p>

              {/* Flavor Profile Badges */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Flavor Profile
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLayer.flavorProfile.map((flavor) => (
                    <span
                      key={flavor}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-200 font-medium hover:border-gold-500/30 transition-colors"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chef's Technique */}
              <div className="p-3 rounded-xl bg-charcoal-950/70 border border-white/5 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-400 font-semibold mb-1">
                  <Utensils className="w-3 h-3 text-gold-400" />
                  <span>Chef's Craft Execution</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {activeLayer.chefTechnique}
                </p>
              </div>

              {/* Nutritional Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10 text-center">
                <div className="bg-charcoal-950/50 p-1.5 rounded-lg border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block">Calories</span>
                  <span className="text-xs md:text-sm font-bold text-gold-300 font-mono">
                    {activeLayer.metrics.calories}
                  </span>
                </div>
                <div className="bg-charcoal-950/50 p-1.5 rounded-lg border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block">Protein</span>
                  <span className="text-xs md:text-sm font-bold text-zinc-200 font-mono">
                    {activeLayer.metrics.protein}
                  </span>
                </div>
                <div className="bg-charcoal-950/50 p-1.5 rounded-lg border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block">Fat</span>
                  <span className="text-xs md:text-sm font-bold text-zinc-200 font-mono">
                    {activeLayer.metrics.fat}
                  </span>
                </div>
                <div className="bg-charcoal-950/50 p-1.5 rounded-lg border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block">Carbs</span>
                  <span className="text-xs md:text-sm font-bold text-zinc-200 font-mono">
                    {activeLayer.metrics.carbs}
                  </span>
                </div>
              </div>

              {/* Sommelier Pairing */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1 text-amber-400/90 font-mono">
                  <Wine className="w-3.5 h-3.5" />
                  <span>Pairing:</span>
                </div>
                <span className="text-zinc-300 font-medium truncate ml-2 text-right">
                  {activeLayer.pairing}
                </span>
              </div>
            </CardSpotlight>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT HUD: LUXURY VERTICAL TIMELINE & MILESTONE NAVIGATOR                */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute right-4 md:right-8 lg:right-12 top-24 bottom-24 z-20 flex flex-col justify-center items-end">
        <div className="pointer-events-auto flex items-center gap-4 bg-charcoal-900/80 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Milestone Labels (Visible on lg screens) */}
          <div className="hidden lg:flex flex-col justify-between h-[360px] text-right py-1">
            {BURGER_LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectMilestone(layer.focusProgress);
                  }}
                  className="group flex items-center justify-end gap-2 text-right transition-all cursor-pointer"
                >
                  <span
                    className={`text-xs font-mono transition-colors ${
                      isActive
                        ? "text-gold-300 font-bold translate-x-0"
                        : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  >
                    {layer.shortName}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                      isActive
                        ? "bg-gold-500/20 text-gold-400 border border-gold-500/40"
                        : "bg-white/5 text-zinc-400 group-hover:bg-white/10"
                    }`}
                  >
                    0{layer.index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Progress Bar Track */}
          <div className="relative h-[360px] w-3 rounded-full bg-charcoal-950/80 border border-white/10 flex flex-col items-center">
            {/* Glowing Active Fill */}
            <motion.div
              className="absolute top-0 w-full rounded-full bg-gradient-to-b from-gold-400 via-amber-500 to-ember-500 shadow-[0_0_12px_rgba(234,179,8,0.6)]"
              style={{ height: `${Math.max(4, percentage)}%` }}
            />

            {/* Draggable/Tappable Milestones */}
            {BURGER_LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              const topPos = layer.focusProgress * 100;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectMilestone(layer.focusProgress);
                  }}
                  title={layer.tierName}
                  style={{ top: `${topPos}%` }}
                  className={`absolute -translate-y-1/2 w-4 h-4 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "scale-150 bg-white ring-4 ring-gold-500/50 shadow-lg shadow-gold-500/80 z-20"
                      : "bg-zinc-700 hover:bg-gold-400 hover:scale-125 z-10"
                  }`}
                >
                  <span className="sr-only">{layer.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Live Percentage Dial */}
          <div className="flex flex-col items-center justify-center pl-1">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Depth
              </span>
              <span className="text-xl font-bold font-mono text-gold-300">
                {percentage}%
              </span>
            </div>
            <div className="mt-3 flex flex-col items-center">
              <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider">
                {percentage < 15 ? "Assembled" : percentage > 85 ? "Full Explode" : "Deconstructed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CONTROL BAR: AUDIO, AUTOPLAY & SCROLL HINTS                      */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center px-4">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2 sm:gap-3 rounded-full bg-charcoal-900/90 border border-white/15 px-4 py-2 shadow-2xl backdrop-blur-2xl">
          
          {/* Scroll Guidance Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300 pr-3 border-r border-white/10">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-4 h-4 text-gold-400" />
            </motion.div>
            <span>Scroll to Explode in 3D</span>
          </div>

          {/* Autoplay Play/Pause */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleAutoPlay();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800/80 hover:bg-white/10 text-xs font-medium text-zinc-200 border border-white/10 transition-colors"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-gold-400" />
                <span>Pause Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                <span>Auto Deconstruct</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) sounds.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              soundEnabled
                ? "bg-gold-500/15 border-gold-500/40 text-gold-300"
                : "bg-charcoal-800/80 border-white/10 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          {/* Quick Collapse / Expand Button */}
          <button
            onClick={() => {
              sounds.playWhoosh();
              onSelectMilestone(scrollProgress > 0.5 ? 0.0 : 1.0);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800/80 hover:bg-gold-500/20 hover:border-gold-500/40 text-xs font-medium text-zinc-200 border border-white/10 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{scrollProgress > 0.5 ? "Reassemble" : "Explode All"}</span>
          </button>

          {/* Customizer Trigger on mobile/tablet */}
          {onOpenCustomizer && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenCustomizer();
              }}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-bold shadow-md shadow-gold-500/20 hover:bg-gold-400 transition-colors"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
