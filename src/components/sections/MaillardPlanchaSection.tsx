import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Volume2, ShieldCheck, Thermometer } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { PLANCHA_CHEMISTRY } from "../../data/burgerData";
import { sounds } from "../../lib/sound";

export const MaillardPlanchaSection: React.FC = () => {
  const [targetTemp, setTargetTemp] = useState<number>(650);

  // Find closest plancha stage
  let activeStage = PLANCHA_CHEMISTRY[2];
  if (targetTemp < 460) activeStage = PLANCHA_CHEMISTRY[0];
  else if (targetTemp < 590) activeStage = PLANCHA_CHEMISTRY[1];
  else if (targetTemp <= 690) activeStage = PLANCHA_CHEMISTRY[2];
  else activeStage = PLANCHA_CHEMISTRY[3];

  return (
    <section
      id="plancha-chemistry"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-950 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Heat Shimmer Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ember-500/10 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-ember-400" />
                650°F Heat Alchemy
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            The Maillard Reaction <span className="text-gold-gradient">Plancha.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            The culinary difference between good and immortal is measured in milliseconds on cast iron. Witness the molecular caramelization of A5 Miyazaki Wagyu fat at 650°F.
          </p>
        </div>

        {/* Main Interactive Sear Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: 3D Visual Sear Plancha Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[520px] aspect-square rounded-3xl bg-charcoal-900/90 border-2 border-white/10 p-8 flex flex-col items-center justify-between shadow-2xl overflow-hidden group">
              
              {/* Cast Iron Griddle Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(35,15,5,0.8)_0%,rgba(10,8,6,0.98)_85%)] pointer-events-none" />
              
              {/* Glowing Heating Coils */}
              <div
                className="absolute inset-8 rounded-full border-4 border-dashed transition-all duration-700 pointer-events-none"
                style={{
                  borderColor: activeStage.color,
                  boxShadow: `0 0 45px ${activeStage.color}40`,
                  opacity: targetTemp > 500 ? 0.8 : 0.3,
                }}
              />

              {/* Header Status Inside Griddle */}
              <div className="relative z-10 w-full flex items-center justify-between">
                <div className="flex items-center gap-2 bg-charcoal-950/90 px-3.5 py-1.5 rounded-full border border-white/10">
                  <Thermometer className="w-4 h-4 text-ember-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-gold-300">
                    Plancha Core: {targetTemp}°F / {Math.round((targetTemp - 32) * (5 / 9))}°C
                  </span>
                </div>

                <button
                  onClick={() => sounds.playSizzle()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ember-500/20 hover:bg-ember-500/30 border border-ember-500/40 text-xs font-mono text-amber-300 transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear Sizzle</span>
                </button>
              </div>

              {/* Sizzling Patty Visual with Dynamic Sear Color */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  rotateZ: [0, 0.5, -0.5, 0],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center cursor-pointer"
                onClick={() => sounds.playSizzle()}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                  <defs>
                    <radialGradient id="pattySearState" cx="50%" cy="50%" r="55%">
                      <stop
                        offset="0%"
                        stopColor={
                          targetTemp < 460
                            ? "#b91c1c"
                            : targetTemp < 590
                            ? "#7f1d1d"
                            : targetTemp <= 690
                            ? "#451a03"
                            : "#18181b"
                        }
                      />
                      <stop
                        offset="70%"
                        stopColor={
                          targetTemp < 460
                            ? "#991b1b"
                            : targetTemp < 590
                            ? "#451a03"
                            : targetTemp <= 690
                            ? "#270c02"
                            : "#09090b"
                        }
                      />
                      <stop offset="100%" stopColor="#09090b" />
                    </radialGradient>
                  </defs>

                  {/* Smashed Beef Patty */}
                  <path
                    d="M 40,150 C 30,90 90,40 150,40 C 210,40 270,90 260,150 C 270,210 210,260 150,260 C 90,260 30,210 40,150 Z"
                    fill="url(#pattySearState)"
                    stroke={activeStage.color}
                    strokeWidth="3"
                  />

                  {/* Lacy Plancha Crust Edge Webbing */}
                  {targetTemp >= 520 && (
                    <g stroke={activeStage.color} strokeWidth="2" strokeDasharray="3 4" fill="none" opacity="0.8">
                      <circle cx="150" cy="150" r="118" />
                      <circle cx="150" cy="150" r="95" />
                    </g>
                  )}

                  {/* Sizzling Tallow Droplets */}
                  <g fill="#f59e0b" opacity="0.85">
                    <circle cx="120" cy="110" r="4" />
                    <circle cx="180" cy="130" r="5" />
                    <circle cx="140" cy="170" r="4.5" />
                    <circle cx="190" cy="180" r="3.5" />
                    <circle cx="100" cy="160" r="3" />
                  </g>
                </svg>

                {/* Floating Steam/Sizzle Particles */}
                {targetTemp >= 500 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-3 h-3 rounded-full bg-amber-400/60 animate-ping absolute -top-4" />
                    <span className="w-2 h-2 rounded-full bg-red-400/60 animate-ping absolute -bottom-4 right-10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-400/60 animate-ping absolute top-12 -left-3" />
                  </div>
                )}
              </motion.div>

              {/* Bottom Sear Metric */}
              <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-white/10">
                <span>Crust Crispness: <strong className="text-gold-300">{activeStage.crustCrispness}</strong></span>
                <span>Juice Retention: <strong className="text-amber-400">{activeStage.juicinessRetention}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Temperature Controller & Science Dossier */}
          <div className="lg:col-span-5 space-y-6">
            <CardSpotlight
              glowColor="rgba(255, 87, 34, 0.2)"
              className="p-6 sm:p-8 rounded-3xl bg-charcoal-900/90 border border-white/10 shadow-2xl"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-ember-400 font-bold block mb-2">
                Live Plancha Thermal Regulator
              </span>

              <h3 className="text-2xl font-display font-bold text-zinc-100 mb-4">
                Phase: <span className="text-gold-300">{activeStage.phase}</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {activeStage.description}
              </p>

              {/* Temperature Slider */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>400°F (Low)</span>
                  <span className="text-gold-400 font-bold">{targetTemp}°F</span>
                  <span>750°F (Max)</span>
                </div>

                <input
                  type="range"
                  min="400"
                  max="750"
                  step="25"
                  value={targetTemp}
                  onChange={(e) => {
                    sounds.playClick();
                    setTargetTemp(Number(e.target.value));
                  }}
                  className="w-full h-3 bg-charcoal-950 rounded-lg appearance-none cursor-pointer accent-ember-500"
                />
              </div>

              {/* Key Chemical Compounds Formed */}
              <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Volatile Pyrazines:</span>
                  <span className="text-gold-300 font-semibold">{targetTemp > 550 ? "Peak Synthesis (Nutty/Roast)" : "Latent"}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Oleic Acid Tallow Render:</span>
                  <span className="text-amber-400 font-semibold">{targetTemp >= 650 ? "Instantaneous 100% Emulsion" : "Partial Melting"}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Maillard Crust Depth:</span>
                  <span className="text-zinc-200 font-semibold">0.45 mm Micro-Lace Shell</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-gold-400">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Executive Plancha Certified: 650°F Apex Standard</span>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  );
};
