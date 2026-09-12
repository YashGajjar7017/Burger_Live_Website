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
  Activity,
  Layers,
  Search,
  Cpu,
  Thermometer
} from "lucide-react";
import type { BurgerLayer } from "../../data/burgerData";
import { BURGER_LAYERS } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import type { SliceRenderMode } from "./BurgerSlicesVisual";

interface BurgerHUDProps {
  activeLayer: BurgerLayer;
  scrollProgress: number;
  renderMode: SliceRenderMode;
  onChangeRenderMode: (mode: SliceRenderMode) => void;
  soloLayerId: string | null;
  onToggleSoloLayer: (id: string | null) => void;
  onSelectMilestone: (progress: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onOpenCustomizer?: () => void;
  onResetPerspective: () => void;
}

export const BurgerHUD: React.FC<BurgerHUDProps> = ({
  activeLayer,
  scrollProgress,
  renderMode,
  onChangeRenderMode,
  soloLayerId,
  onToggleSoloLayer,
  onSelectMilestone,
  soundEnabled,
  onToggleSound,
  isAutoPlaying,
  onToggleAutoPlay,
  onOpenCustomizer,
  onResetPerspective,
}) => {
  const percentage = Math.round(scrollProgress * 100);

  return (
    <>
      {/* ========================================================================= */}
      {/* TOP FLOATING MODE SWITCHER BAR                                           */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute top-20 inset-x-0 z-30 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full bg-charcoal-900/90 border border-white/15 shadow-2xl backdrop-blur-2xl">
          {(
            [
              { id: "normal", label: "3D Artisan", icon: Layers },
              { id: "thermal", label: "Infrared Thermal", icon: Thermometer },
              { id: "macro", label: "Macro Texture", icon: Search },
              { id: "xray", label: "X-Ray CAD Blueprint", icon: Cpu },
            ] as const
          ).map((mode) => {
            const Icon = mode.icon;
            const isSelected = renderMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onChangeRenderMode(mode.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-gold-400 to-amber-500 text-charcoal-950 font-bold shadow-lg shadow-gold-500/25"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-charcoal-950" : "text-gold-400"}`} />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEFT HUD: DYNAMIC INGREDIENT TELEMETRY DOSSIER                           */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute left-3 sm:left-6 lg:left-10 top-28 bottom-24 z-20 flex flex-col justify-center w-[300px] sm:w-[360px] lg:w-[410px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id + renderMode}
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <CardSpotlight
              glowColor="rgba(234, 179, 8, 0.22)"
              className="p-4 sm:p-5 shadow-2xl border-white/15 bg-charcoal-900/95 backdrop-blur-2xl rounded-3xl"
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-[10px] font-mono font-bold tracking-wider text-gold-400 uppercase">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  {activeLayer.badge}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider bg-charcoal-800/90 px-2 py-0.5 rounded-full border border-white/5">
                  {activeLayer.metrics.artisanGrade}
                </span>
              </div>

              {/* Layer Title */}
              <h2 className="text-lg sm:text-2xl font-display font-bold text-zinc-100 tracking-wide leading-tight mb-1.5">
                {activeLayer.tierName}
              </h2>

              {/* Origin Tag & Terroir */}
              <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium mb-2.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{activeLayer.origin}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300/90 leading-relaxed mb-3 line-clamp-3">
                {activeLayer.description}
              </p>

              {/* Mode-Sensitive Telemetry Panel */}
              {renderMode === "thermal" ? (
                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5" /> Thermal Core
                    </span>
                    <span className="text-white font-bold">{activeLayer.thermal.tempF}°F ({activeLayer.thermal.tempC}°C)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                    <span>Heat Profile:</span>
                    <span className="text-amber-300 font-semibold">{activeLayer.thermal.thermalState}</span>
                  </div>
                </div>
              ) : renderMode === "macro" ? (
                <div className="p-3 rounded-2xl bg-gold-950/40 border border-gold-500/30 mb-3 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-gold-400 font-bold">
                    <Search className="w-3.5 h-3.5" />
                    <span>Micro-Compound Analysis</span>
                  </div>
                  <p className="text-[11px] text-zinc-200 leading-snug">
                    <strong className="text-gold-300">Compound:</strong> {activeLayer.macroAnalysis.keyCompound}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-snug">
                    {activeLayer.macroAnalysis.sensoryImpact}
                  </p>
                </div>
              ) : renderMode === "xray" ? (
                <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 mb-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" /> Structural Specs
                    </span>
                    <span>{activeLayer.architecture.thicknessMm}mm / {activeLayer.architecture.weightGrams}g</span>
                  </div>
                  <p className="text-[10px] text-cyan-200/90 font-mono leading-tight">
                    {activeLayer.xrayNotes}
                  </p>
                </div>
              ) : (
                /* Chef Craft Execution */
                <div className="p-2.5 rounded-2xl bg-charcoal-950/80 border border-white/5 mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-400 font-semibold mb-1">
                    <Utensils className="w-3 h-3 text-gold-400" />
                    <span>Chef's Craft Execution</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {activeLayer.chefTechnique}
                  </p>
                </div>
              )}

              {/* Flavor Profile Badges */}
              <div className="mb-3">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Flavor Profile
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeLayer.flavorProfile.map((flavor) => (
                    <span
                      key={flavor}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-zinc-200 font-medium"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutritional Metrics Grid */}
              <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-white/10 text-center">
                <div className="bg-charcoal-950/60 p-1 rounded-lg border border-white/5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase block">Calories</span>
                  <span className="text-xs font-bold text-gold-300 font-mono">
                    {activeLayer.metrics.calories}
                  </span>
                </div>
                <div className="bg-charcoal-950/60 p-1 rounded-lg border border-white/5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase block">Protein</span>
                  <span className="text-xs font-bold text-zinc-200 font-mono">
                    {activeLayer.metrics.protein}
                  </span>
                </div>
                <div className="bg-charcoal-950/60 p-1 rounded-lg border border-white/5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase block">Fat</span>
                  <span className="text-xs font-bold text-zinc-200 font-mono">
                    {activeLayer.metrics.fat}
                  </span>
                </div>
                <div className="bg-charcoal-950/60 p-1 rounded-lg border border-white/5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase block">Carbs</span>
                  <span className="text-xs font-bold text-zinc-200 font-mono">
                    {activeLayer.metrics.carbs}
                  </span>
                </div>
              </div>

              {/* Sommelier Pairing & Solo Isolate Button */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1 text-amber-400/90 font-mono truncate max-w-[200px]">
                  <Wine className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeLayer.pairing}</span>
                </div>

                <button
                  onClick={() => onToggleSoloLayer(soloLayerId === activeLayer.id ? null : activeLayer.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                    soloLayerId === activeLayer.id
                      ? "bg-gold-500 text-charcoal-950 font-bold border-gold-400"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-gold-500/40"
                  }`}
                >
                  {soloLayerId === activeLayer.id ? "Un-Isolate" : "Isolate Slice"}
                </button>
              </div>
            </CardSpotlight>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT HUD: LUXURY VERTICAL TIMELINE & MILESTONE NAVIGATOR                */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute right-3 sm:right-6 lg:right-10 top-28 bottom-24 z-20 flex flex-col justify-center items-end">
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 bg-charcoal-900/85 backdrop-blur-2xl p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Milestone Labels (Visible on lg screens) */}
          <div className="hidden lg:flex flex-col justify-between h-[360px] text-right py-1">
            {BURGER_LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => onSelectMilestone(layer.focusProgress)}
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
          <div className="relative h-[340px] sm:h-[360px] w-3 rounded-full bg-charcoal-950/90 border border-white/10 flex flex-col items-center">
            {/* Glowing Active Fill */}
            <motion.div
              className="absolute top-0 w-full rounded-full bg-gradient-to-b from-gold-400 via-amber-500 to-ember-500 shadow-[0_0_15px_rgba(234,179,8,0.7)]"
              style={{ height: `${Math.max(5, percentage)}%` }}
            />

            {/* Draggable/Tappable Milestones */}
            {BURGER_LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              const topPos = layer.focusProgress * 100;
              return (
                <button
                  key={layer.id}
                  onClick={() => onSelectMilestone(layer.focusProgress)}
                  title={layer.tierName}
                  style={{ top: `${topPos}%` }}
                  className={`absolute -translate-y-1/2 w-4 h-4 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "scale-150 bg-white ring-4 ring-gold-500/60 shadow-lg shadow-gold-500/80 z-20"
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
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                Depth
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-gold-300">
                {percentage}%
              </span>
            </div>
            <div className="mt-2 flex flex-col items-center">
              <span className="text-[8px] font-mono text-amber-400 uppercase tracking-wider text-center">
                {percentage < 15 ? "Assembled" : percentage > 85 ? "Exploded" : "Deconstructed"}
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
            <span>Scroll to Explode 7 Slices</span>
          </div>

          {/* Autoplay Play/Pause */}
          <button
            onClick={onToggleAutoPlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800/80 hover:bg-white/10 text-xs font-medium text-zinc-200 border border-white/10 transition-colors cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-gold-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                <span>Auto Tour</span>
              </>
            )}
          </button>

          {/* Reset 3D Tilt */}
          <button
            onClick={onResetPerspective}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800/80 hover:bg-white/10 text-xs font-medium text-zinc-300 border border-white/10 transition-colors cursor-pointer"
            title="Reset Gyroscope Tilt"
          >
            <Activity className="w-3.5 h-3.5 text-gold-400" />
            <span>Reset Tilt</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              soundEnabled
                ? "bg-gold-500/15 border-gold-500/40 text-gold-300"
                : "bg-charcoal-800/80 border-white/10 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                <span className="hidden sm:inline">Audio</span>
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
            onClick={() => onSelectMilestone(scrollProgress > 0.5 ? 0.0 : 1.0)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800/80 hover:bg-gold-500/20 hover:border-gold-500/40 text-xs font-medium text-zinc-200 border border-white/10 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{scrollProgress > 0.5 ? "Assemble" : "Explode"}</span>
          </button>

          {/* Customizer Trigger on mobile */}
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-bold shadow-md shadow-gold-500/20 hover:bg-gold-400 transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Customizer</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
