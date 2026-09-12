import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, Flame, CheckCircle, Utensils, ShieldCheck } from "lucide-react";
import { ATELIER_TIMELINE_STEPS } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const AtelierTimelineSection: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(1);

  const activeStep = ATELIER_TIMELINE_STEPS[activeStepIdx];

  return (
    <section
      id="timeline"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-950 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-ember-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                8-Minute Live Choreography
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            The Atelier <span className="text-gold-gradient">Timeline.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every Obsidian Reserve burger is executed in strictly 480 seconds from raw flame to numbered presentation case. Explore each stage of the culinary choreography.
          </p>
        </div>

        {/* Interactive Chronometer Navigation Rail */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-charcoal-900/90 p-2.5 rounded-3xl border border-white/10 backdrop-blur-2xl">
            {ATELIER_TIMELINE_STEPS.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <button
                  key={step.timeLabel}
                  onClick={() => {
                    sounds.playClick();
                    if (idx === 1) sounds.playSizzle();
                    setActiveStepIdx(idx);
                  }}
                  className={`flex-1 min-w-[130px] p-3 rounded-2xl flex flex-col items-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gold-500 text-charcoal-950 font-bold shadow-lg shadow-gold-500/20 scale-[1.02]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`text-xs font-mono mb-1 ${isSelected ? "text-charcoal-900 font-bold" : "text-amber-400"}`}>
                    {step.timeLabel}
                  </span>
                  <span className="text-xs font-display font-semibold truncate max-w-[140px] text-center">
                    {step.stageName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Spotlight Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.timeLabel}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
          >
            <CardSpotlight
              glowColor="rgba(255, 87, 34, 0.2)"
              className="p-8 sm:p-12 rounded-3xl bg-charcoal-900/95 border border-gold-500/30 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Time & Stage Overview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-gold-300">
                      Minute {activeStep.timeLabel}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                      Stage 0{activeStepIdx + 1} of 05
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100">
                    {activeStep.stageName}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {activeStep.chefAction}
                  </p>

                  {/* Sensory Cue */}
                  <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono text-gold-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Sensory Signature
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 italic">
                      "{activeStep.sensoryCue}"
                    </p>
                  </div>
                </div>

                {/* Right: Equipment & Thermal Telemetry */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 rounded-2xl bg-charcoal-950/90 border border-white/10 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-zinc-400">Target Temp:</span>
                      <span className="text-ember-400 font-bold text-sm">{activeStep.temperature}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-zinc-400">Atelier Apparatus:</span>
                      <span className="text-zinc-200 font-semibold">{activeStep.equipment}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Choreography Status:</span>
                      <span className="text-gold-300 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                        Synchronized
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-2">
                    <span>Executive Chef Lead: <strong>Antoine Kuroda</strong></span>
                    <span>Tolerance: <strong>±3 Seconds</strong></span>
                  </div>
                </div>
              </div>
            </CardSpotlight>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
