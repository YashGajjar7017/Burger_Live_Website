import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Flame, ArrowUpRight } from "lucide-react";
import { BURGER_LAYERS } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

interface FlavorMatrixSectionProps {
  onSelectLayer: (focusProgress: number) => void;
}

export const FlavorMatrixSection: React.FC<FlavorMatrixSectionProps> = ({
  onSelectLayer,
}) => {
  const [filter, setFilter] = useState<"all" | "meat" | "produce" | "bakery">("all");

  const filteredLayers = BURGER_LAYERS.filter((layer) => {
    if (filter === "all") return true;
    if (filter === "meat") return layer.id === "wagyu-patty" || layer.id === "truffle-sauce";
    if (filter === "produce") return layer.id === "butter-lettuce" || layer.id === "caramelized-onions" || layer.id === "tomatoes-pickles";
    if (filter === "bakery") return layer.id === "top-bun" || layer.id === "bottom-bun";
    return true;
  });

  return (
    <section
      id="flavor-matrix"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-950 text-white overflow-hidden"
    >
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-gold-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-ember-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="mb-4">
              <GlowingBadge glowColor="gold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sensory Anatomy
                </span>
              </GlowingBadge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
              The Flavor <span className="text-gold-gradient">Matrix.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Every element of the Obsidian Reserve is sourced from estate purveyors and balanced across five primary taste axes: Umami, Sweet, Salt, Acid, and Crisp.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-charcoal-900/90 p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
            {(
              [
                { id: "all", label: "All Tiers (7)" },
                { id: "meat", label: "Wagyu & Truffle" },
                { id: "produce", label: "Botanicals & Relish" },
                { id: "bakery", label: "Artisan Brioche" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setFilter(tab.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  filter === tab.id
                    ? "bg-gold-500 text-charcoal-950 font-bold shadow-md shadow-gold-500/20"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 7-Layer Matrix Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredLayers.map((layer) => (
              <motion.div
                key={layer.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CardSpotlight
                  glowColor="rgba(234, 179, 8, 0.18)"
                  className="h-full p-6 flex flex-col justify-between group hover:border-gold-500/40 transition-all duration-300 shadow-xl"
                >
                  {/* Top Layer Info */}
                  <div>
                    {/* Header with image thumbnail */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-widest block mb-1">
                          {layer.badge}
                        </span>
                        <h3 className="text-lg font-display font-bold text-zinc-100 group-hover:text-gold-300 transition-colors">
                          {layer.tierName}
                        </h3>
                      </div>
                      <div className="w-16 h-16 rounded-xl bg-charcoal-950/80 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-gold-500/30 transition-colors">
                        <img
                          src={layer.image}
                          alt={layer.shortName}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Origin */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/80 font-medium mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{layer.origin}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-300/80 leading-relaxed mb-4">
                      {layer.description}
                    </p>

                    {/* Flavor Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {layer.flavorProfile.map((flavor) => (
                        <span
                          key={flavor}
                          className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-zinc-300 border border-white/5"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                      <Flame className="w-3 h-3 text-gold-400" />
                      <span>{layer.metrics.calories} kcal</span>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playWhoosh();
                        onSelectLayer(layer.focusProgress);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono text-gold-400 hover:text-gold-300 font-semibold group/btn cursor-pointer"
                    >
                      <span>Jump in 3D</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
