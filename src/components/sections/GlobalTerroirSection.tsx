import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Sparkles, Navigation, Mountain, Award } from "lucide-react";
import { GLOBAL_TERROIR_DESTINATIONS } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const GlobalTerroirSection: React.FC = () => {
  const [activeDestId, setActiveDestId] = useState<string>("kyushu-wagyu");

  const activeDest =
    GLOBAL_TERROIR_DESTINATIONS.find((d) => d.id === activeDestId) ||
    GLOBAL_TERROIR_DESTINATIONS[0];

  return (
    <section
      id="terroir"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-900/90 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gold-500/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gold-400" />
                Global Provenance
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            The Terroir <span className="text-gold-gradient">Odyssey.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Trace the international voyage of our seven ingredients. Sourced directly from estate purveyors across three continents to ensure unparalleled purity and pedigree.
          </p>
        </div>

        {/* Interactive Voyage Station */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Interactive Destination List & Route Node Selector */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block mb-2 px-1">
              Select Purveyor Terroir:
            </span>

            {GLOBAL_TERROIR_DESTINATIONS.map((dest, idx) => {
              const isSelected = activeDest.id === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveDestId(dest.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "bg-charcoal-950 border-gold-500/60 shadow-xl shadow-gold-500/10 scale-[1.02]"
                      : "bg-charcoal-950/60 border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        isSelected
                          ? "bg-gold-500 text-charcoal-950"
                          : "bg-white/5 text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-zinc-100 group-hover:text-gold-300 transition-colors">
                        {dest.name}
                      </h4>
                      <span className="text-xs font-mono text-amber-300/80">
                        {dest.country}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
                    {dest.badge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Terroir Dossier Spotlight */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardSpotlight
                  glowColor="rgba(234, 179, 8, 0.2)"
                  className="p-8 rounded-3xl bg-charcoal-950/90 border border-gold-500/30 shadow-2xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gold-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold">
                          {activeDest.country}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100">
                        {activeDest.name}
                      </h3>
                    </div>

                    <div className="text-right font-mono text-xs text-zinc-400 bg-charcoal-900/80 px-3 py-2 rounded-xl border border-white/5">
                      <div>GPS: <span className="text-gold-300">{activeDest.lat.toFixed(4)}° N, {activeDest.lng.toFixed(4)}° E</span></div>
                      <div>Elevation: <span className="text-amber-400">{activeDest.elevation}</span></div>
                    </div>
                  </div>

                  {/* Highlighted Ingredient */}
                  <div className="p-4 rounded-2xl bg-charcoal-900/80 border border-white/5">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block mb-1">
                      Exclusive Ingredient Yield
                    </span>
                    <h4 className="text-lg font-display font-bold text-gold-300 mb-2">
                      {activeDest.ingredient}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {activeDest.terroirNote}
                    </p>
                  </div>

                  {/* Purveyor & Harvest Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-charcoal-900/60 border border-white/5 space-y-1">
                      <span className="text-zinc-400 block">Certified Purveyor:</span>
                      <strong className="text-zinc-200 text-sm">{activeDest.purveyor}</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-charcoal-900/60 border border-white/5 space-y-1">
                      <span className="text-zinc-400 block">Harvest & Aging Cycle:</span>
                      <strong className="text-amber-400 text-sm">{activeDest.harvestCycle}</strong>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-gold-400">
                      <Award className="w-4 h-4" />
                      Estate Provenance Certified
                    </span>
                    <span>Direct Air-Freight Cold-Chain</span>
                  </div>
                </CardSpotlight>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
