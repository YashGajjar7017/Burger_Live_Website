import React from "react";
import { Sparkles, Shield, Award, Flame, Clock } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      title: "Miyazaki A5 Wagyu Pedigree",
      origin: "Miyazaki Prefecture, Kyushu, Japan",
      stat: "BMS 11 Marbling",
      desc: "Raised on pristine natural spring water and roasted barley grain diets. Seared on 650°F cast iron with render tallow for maximum lacy crisp edges and buttery melt.",
      icon: Flame,
    },
    {
      title: "Périgord Black Diamond Truffles",
      origin: "Oak Groves of Périgord, France",
      stat: "72h Cold Extraction",
      desc: "Foraged by Lagotto Romagnolo truffle dogs during the peak winter frost. Nitrogen-infused with bone marrow reduction and Solera sherry vinegar.",
      icon: Sparkles,
    },
    {
      title: "48-Hour Cultured Brioche",
      origin: "Normandy, France",
      stat: "68% Hydration",
      desc: "Slow-fermented using heirloom levain and AOP Charentes-Poitou French cultured butter. Flaked with edible 24-karat gold leaf and toasted black sesame.",
      icon: Clock,
    },
  ];

  return (
    <section
      id="craft"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-900/90 text-white overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                The Pursuit of Perfection
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            Craftsmanship & <span className="text-gold-gradient">Provenance.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            The Obsidian Reserve is not merely assembled; it is precision-engineered using three centuries of combined culinary heritage across three continents.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <CardSpotlight
                key={pillar.title}
                glowColor="rgba(245, 158, 11, 0.15)"
                className="p-8 flex flex-col justify-between h-full bg-charcoal-950/70 border-white/10 shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400/20 via-amber-500/10 to-transparent border border-gold-500/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <span className="text-xs font-mono text-gold-400 font-bold px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                      {pillar.stat}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-amber-300/80 uppercase tracking-widest block mb-2">
                    0{idx + 1} // {pillar.origin}
                  </span>

                  <h3 className="text-xl font-display font-bold text-zinc-100 mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-gold-400" />
                    Verified Authenticity
                  </span>
                  <span className="text-gold-400 font-semibold">Reserve Certified</span>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 border border-gold-500/20 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-2">
                Executive Chef’s Philosophy
              </span>
              <blockquote className="text-lg sm:text-2xl font-display italic text-zinc-200 leading-snug">
                "When each layer achieves independent gastronomic greatness, the collective bite is nothing short of transcendent."
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-display font-bold text-gold-300">
                  AK
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100">Antoine Kuroda</h4>
                  <p className="text-xs font-mono text-zinc-400">Master of Culinary Architecture</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-2xl font-display font-bold text-gold-300 block">50 Daily Limit</span>
                <span className="text-xs font-mono text-zinc-400">Numbered Certificate Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
