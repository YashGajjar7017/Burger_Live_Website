import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ShieldCheck, Sparkles, Award, Key, Check } from "lucide-react";
import { UNBOXING_SPECS } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const LuxuryUnboxingSection: React.FC = () => {
  const [isUnboxed, setIsUnboxed] = useState<boolean>(false);

  return (
    <section
      id="unboxing"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-900/90 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gold-500/10 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-gold-400" />
                Haute Presentation
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            The Bespoke <span className="text-gold-gradient">Humidor.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Delivered in a custom-machined aerospace titanium thermal vault engineered to maintain 65°C core warmth and humidity for 45 minutes of pristine transit.
          </p>
        </div>

        {/* 3D Interactive Vault Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
          
          {/* Left: 3D Vault Graphic Box */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-charcoal-950 border-2 border-gold-500/30 p-8 flex flex-col items-center justify-center shadow-2xl overflow-hidden group">
              
              {/* Spinning Golden Orbit Rings */}
              <div className="absolute inset-4 rounded-full border border-dashed border-gold-400/20 animate-[spin_40s_linear_infinite]" />

              {/* Humidor Vault Graphic */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-center text-center cursor-pointer"
                onClick={() => {
                  sounds.playSnap();
                  setIsUnboxed(!isUnboxed);
                }}
              >
                <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl border-2 transition-all duration-700 flex flex-col items-center justify-center p-6 shadow-2xl ${
                  isUnboxed
                    ? "bg-charcoal-900 border-gold-400 shadow-gold-500/30 scale-105"
                    : "bg-charcoal-950 border-white/20 hover:border-gold-500/50"
                }`}>
                  {/* Vault Emblem */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-500/20 to-amber-500/10 border border-gold-400/50 flex items-center justify-center mb-3">
                    <Award className="w-8 h-8 text-gold-300" />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block mb-1">
                    Obsidian Vault #042
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {isUnboxed ? "Vault Magnetic Seal: OPEN" : "Hermetically Sealed"}
                  </span>

                  {/* Laser Inscription */}
                  <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Temp: <strong className="text-gold-300">65.0°C</strong></span>
                    <span>Status: <strong className="text-amber-400">Insulated</strong></span>
                  </div>
                </div>

                {/* Click to Toggle Pill */}
                <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-900 border border-gold-500/40 text-gold-300 text-xs font-mono shadow-xl">
                  <Key className="w-3.5 h-3.5 text-gold-400" />
                  <span>{isUnboxed ? "Click to Reseal Vault" : "Click to Open Magnetic Latch"}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Unboxing Accoutrements & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <CardSpotlight
              glowColor="rgba(234, 179, 8, 0.2)"
              className="p-8 rounded-3xl bg-charcoal-950/90 border border-gold-500/30 shadow-2xl"
            >
              <h3 className="text-2xl font-display font-bold text-zinc-100 mb-2">
                The Presentation Accoutrements
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Every reserve allocation comes complete with ceremonial white-glove dining accoutrements to ensure the Michelin-grade atelier experience at your table.
              </p>

              {/* Accoutrements List */}
              <div className="space-y-3 mb-6">
                {UNBOXING_SPECS.includedAccoutrements.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-xl bg-charcoal-900/80 border border-white/5"
                  >
                    <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gold-400" />
                    </div>
                    <span className="text-xs text-zinc-200 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Material Engineering Specs */}
              <div className="p-4 rounded-2xl bg-charcoal-900/60 border border-white/5 space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Chamber Casing:</span>
                  <span className="text-zinc-200">{UNBOXING_SPECS.casing}</span>
                </div>
                <div className="flex justify-between">
                  <span>Thermal Insulation:</span>
                  <span className="text-amber-400">{UNBOXING_SPECS.insulation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Internal Dimensions:</span>
                  <span className="text-zinc-200">{UNBOXING_SPECS.dimensions}</span>
                </div>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  );
};
