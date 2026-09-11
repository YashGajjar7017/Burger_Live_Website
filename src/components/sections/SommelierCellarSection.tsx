import React, { useState } from "react";
import { Wine } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const SommelierCellarSection: React.FC = () => {
  const [activeVintage, setActiveVintage] = useState(0);

  const vintages = [
    {
      name: "Dom Pérignon Vintage 2012 Brut",
      producer: "Champagne, Épernay, France",
      type: "Grand Cru Champagne",
      notes: "White peach, toasted brioche, smoky minerality, and vibrant citrus tension. Cuts through the buttery A5 Wagyu tallow with crystalline acidity.",
      abv: "12.5%",
      glassware: "Lehmann Grand Champagne Flute",
      pairWith: "The Obsidian Wagyu Reserve"
    },
    {
      name: "Barolo DOCG Cannubi 2016",
      producer: "E. Pira & Figli - Chiara Boschis, Piedmont, Italy",
      type: "Single Vineyard Nebbiolo",
      notes: "Tar, dried rose petal, wild truffle, and leather with structured velvety tannins. Resonates profoundly with 72-hr black truffle emulsion.",
      abv: "14.5%",
      glassware: "Bordeaux Grand Cru Goblet",
      pairWith: "The Imperial Périgord & Foie Gras"
    },
    {
      name: "Smoked Mezcal & Blood Orange Elixir",
      producer: "Oaxaca, Mexico & Sicilian Tarocco",
      type: "Artisan Smoked Cocktail",
      notes: "Wild Tobalá agave cooked in underground earthen pits, fresh Tarocco blood orange, thyme smoke mist, and volcanic black salt rim.",
      abv: "18.0%",
      glassware: "Hand-Cut Crystal Rocks Tumbler",
      pairWith: "Triple-Cooked Wagyu Tallow Frites"
    }
  ];

  return (
    <section
      id="cellar"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-900/90 text-white overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="mb-4">
              <GlowingBadge glowColor="gold">
                <span className="flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5" />
                  Sommelier Reserve
                </span>
              </GlowingBadge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
              The Private <span className="text-gold-gradient">Cellar.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Curated by Head Sommelier Jean-Baptiste Moreau. Each pour is meticulously calibrated to enhance the aromatic compounds of the Wagyu and Truffle layers.
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-400">
            Cellar Temperature: <strong className="text-gold-400">12.5°C</strong> • Humidity: <strong className="text-gold-400">70%</strong>
          </span>
        </div>

        {/* Wine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vintages.map((vintage, idx) => {
            const isSelected = activeVintage === idx;
            return (
              <CardSpotlight
                key={vintage.name}
                glowColor="rgba(245, 158, 11, 0.15)"
                className={`p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-charcoal-950 border-gold-500/50 shadow-2xl"
                    : "bg-charcoal-950/60 border-white/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  onClick={() => {
                    sounds.playClick();
                    setActiveVintage(idx);
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <Wine className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="text-xs font-mono text-gold-400 font-bold px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                      {vintage.type}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-400 block mb-1">
                    {vintage.producer}
                  </span>
                  <h3 className="text-xl font-display font-bold text-zinc-100 mb-3">
                    {vintage.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300/80 leading-relaxed mb-6">
                    {vintage.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span>Glassware:</span>
                    <span className="text-zinc-200">{vintage.glassware}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Recommended Match:</span>
                    <span className="text-gold-300 font-semibold">{vintage.pairWith}</span>
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </div>
      </div>
    </section>
  );
};
