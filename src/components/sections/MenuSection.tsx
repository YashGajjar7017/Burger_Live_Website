import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Wine } from "lucide-react";
import type { MenuItem } from "../../data/burgerData";
import { SIGNATURE_MENU } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

interface MenuSectionProps {
  onOpenOrder: (item?: MenuItem) => void;
  onOpenCustomizer: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onOpenOrder,
  onOpenCustomizer,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Burgers", "Sides & Frites", "Elixirs & Shakes"];

  const filteredItems = activeCategory === "All"
    ? SIGNATURE_MENU
    : SIGNATURE_MENU.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-ember-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="mb-4">
              <GlowingBadge glowColor="gold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Haute Carte
                </span>
              </GlowingBadge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
              The Grand <span className="text-gold-gradient">Collection.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Explore our full gastronomy repertoire. From Miyazaki Wagyu and seared duck foie gras to triple-cooked beef tallow frites and 24k gold smoked gelato shakes.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-charcoal-950/80 p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-gold-500 text-charcoal-950 font-bold shadow-md shadow-gold-500/20"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CardSpotlight
                  glowColor="rgba(234, 179, 8, 0.15)"
                  className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between group hover:border-gold-500/40 transition-all duration-300 shadow-2xl h-full"
                >
                  {/* Item Image */}
                  <div className="w-full sm:w-48 h-48 rounded-2xl bg-charcoal-950/80 border border-white/10 p-2 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-gold-500/30 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                          {item.tag}
                        </span>
                        <span className="text-xl font-display font-bold text-gold-300">
                          {item.price}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-zinc-100 group-hover:text-gold-300 transition-colors mb-2">
                        {item.name}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-zinc-300 border border-white/5"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono">
                        <Wine className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[140px] text-[11px] text-zinc-300">{item.pairing}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.id === "obsidian-reserve" && (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onOpenCustomizer();
                            }}
                            className="px-3 py-1.5 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-gold-400 text-xs font-mono transition-colors border border-white/10"
                          >
                            Customize
                          </button>
                        )}
                        <button
                          onClick={() => {
                            sounds.playWhoosh();
                            onOpenOrder(item);
                          }}
                          className="px-4 py-1.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1 shadow-md shadow-gold-500/20 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Reserve</span>
                        </button>
                      </div>
                    </div>
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
