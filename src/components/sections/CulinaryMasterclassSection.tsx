import React, { useState } from "react";
import { Sparkles, Flame, Award, Volume2, ShieldCheck } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const CulinaryMasterclassSection: React.FC = () => {
  const [bmsScore, setBmsScore] = useState<number>(11);
  const [activeStep, setActiveStep] = useState<number>(0);

  const bmsData = {
    1: { grade: "Commercial Choice", meltPoint: "42°C", fatRatio: "12%", desc: "Lean muscular texture, traditional beef chew without intramuscular marbling." },
    4: { grade: "Prime Reserve", meltPoint: "38°C", fatRatio: "24%", desc: "Moderate marbling, rich beef flavor with pleasant tenderness." },
    8: { grade: "Japanese A4 Grade", meltPoint: "32°C", fatRatio: "42%", desc: "High snowflake marbling, buttery mouthfeel with rich sweet umami." },
    11: { grade: "Miyazaki A5 Grand Reserve", meltPoint: "24°C (Body Temp)", fatRatio: "58%", desc: "Pinnacle BMS 11 Miyazaki Wagyu. Melts instantly on the tongue like velvet butter, releasing deep hazelnut and wagyu sweetness." },
    12: { grade: "Imperial Royal Cut", meltPoint: "21°C", fatRatio: "65%", desc: "Rarest 0.1% Japanese cattle. Ultra-dense crystalline lace marbling of pure monounsaturated oleic acid." }
  };

  const currentBms = bmsData[bmsScore as keyof typeof bmsData] || bmsData[11];

  const masterclassSteps = [
    {
      step: "01",
      title: "Miyazaki A5 Wagyu Lineage & 45-Day Dry Aging",
      tagline: "Kyushu Spring Water & Roasted Barley Diet",
      desc: "Our cattle are raised in Miyazaki Prefecture with strict genealogical registries. The prime brisket and chuck are dry-aged for 45 days in Himalayan pink salt chambers to intensify amino acid glutamates before coarse grinding.",
      icon: Award
    },
    {
      step: "02",
      title: "48-Hour Natural Levain Fermentation",
      tagline: "Normandy AOP Cultured French Butter",
      desc: "Heirloom French starter fermented over two days yields an ultra-airy 68% hydration crumb. Each bun is steam-deck baked at 210°C, high-gloss egg-washed, and finished with Japanese black sesame and 24-karat gold leaf.",
      icon: Sparkles
    },
    {
      step: "03",
      title: "The 650°F Cast-Iron Plancha Sear",
      tagline: "Tallow-Laced Maillard Reaction",
      desc: "Smashed within 4 seconds of hitting the screaming-hot seasoned cast-iron plancha. Wagyu bone marrow tallow renders immediately, creating a paper-thin lacy caramelized crust while locking 100% of molten juices inside.",
      icon: Flame
    },
    {
      step: "04",
      title: "72-Hour Cold Truffle Nitrogen Infusion",
      tagline: "Périgord Black Diamonds & Solera Sherry",
      desc: "Fresh winter truffles (Tuber melanosporum) are shaved under negative pressure with pasture-raised egg yolks, bone marrow demi-glace, and 12-year Solera sherry vinegar, emulsifying into a velvety elixir.",
      icon: ShieldCheck
    }
  ];

  return (
    <section
      id="masterclass"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-950 text-white overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Culinary Science
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            The Atelier <span className="text-gold-gradient">Masterclass.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Delve into the molecular gastronomy, aging science, and artisan techniques that elevate the Obsidian Reserve above all else.
          </p>
        </div>

        {/* Interactive BMS 1-12 Wagyu Marbling Simulator */}
        <CardSpotlight
          glowColor="rgba(255, 87, 34, 0.18)"
          className="p-8 sm:p-10 mb-16 rounded-3xl bg-charcoal-900/90 border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ember-500 font-bold block mb-1">
                Interactive Beef Marbling Standard (BMS)
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100">
                Grade: <span className="text-gold-300">BMS {bmsScore}</span> — {currentBms.grade}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-charcoal-950 px-4 py-2 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Melting Point</span>
                <span className="text-sm font-bold font-mono text-ember-400">{currentBms.meltPoint}</span>
              </div>
              <div className="bg-charcoal-950 px-4 py-2 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Oleic Fat Ratio</span>
                <span className="text-sm font-bold font-mono text-gold-300">{currentBms.fatRatio}</span>
              </div>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex justify-between text-xs font-mono text-zinc-400 px-1">
              <span>BMS 1 (Choice)</span>
              <span>BMS 4 (Prime)</span>
              <span>BMS 8 (A4)</span>
              <span className="text-gold-400 font-bold">BMS 11 (Our Standard)</span>
              <span className="text-ember-400 font-bold">BMS 12 (Ultra Rare)</span>
            </div>

            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={bmsScore}
              onChange={(e) => {
                sounds.playClick();
                setBmsScore(Number(e.target.value));
              }}
              className="w-full h-3 bg-charcoal-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />

            <div className="p-4 rounded-2xl bg-charcoal-950/70 border border-white/5 mt-4">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <strong className="text-gold-300 font-semibold">Tasting Analysis:</strong> {currentBms.desc}
              </p>
            </div>
          </div>
        </CardSpotlight>

        {/* 4-Step Masterclass Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masterclassSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => {
                  sounds.playClick();
                  if (idx === 2) sounds.playSizzle();
                  setActiveStep(idx);
                }}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-charcoal-900 border-gold-500/50 shadow-xl shadow-gold-500/10 scale-[1.02]"
                    : "bg-charcoal-900/50 border-white/5 hover:border-white/15 opacity-75 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-bold text-gold-400/80">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                  </div>

                  <h4 className="text-base font-display font-bold text-zinc-100 mb-1">
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-mono text-amber-400 block mb-3">
                    {step.tagline}
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx === 2 && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-ember-400">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Click to hear 650°F Sizzle</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
