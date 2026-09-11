import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, ChevronRight, Award, ShieldCheck, Flame } from "lucide-react";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";
import { WHOLE_BURGER_SPECS } from "../../data/burgerData";

interface HeroSectionProps {
  onExploreScroll: () => void;
  onOpenOrder: () => void;
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreScroll,
  onOpenOrder,
  onOpenCustomizer,
}) => {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950"
    >
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-ember-500/10 blur-[140px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Column: Headlines & Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Badge */}
          <div className="mb-6 flex items-center gap-3">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Michelin Guide Select 2026
              </span>
            </GlowingBadge>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Edition 001 // Grand Reserve
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight leading-[1.08] text-zinc-100 mb-6">
            The Architecture <br />
            <span className="text-gold-gradient text-glow">of Haute Taste.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed mb-8">
            Engineered layer by layer. Discover <strong className="text-gold-300 font-semibold">{WHOLE_BURGER_SPECS.name}</strong> — where 
            A5 Miyazaki Wagyu, Périgord black truffle emulsion, and 24-karat gold brioche coalesce into culinary perfection.
          </p>

          {/* Hero Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playWhoosh();
                onExploreScroll();
              }}
              className="relative group px-7 py-4 rounded-full bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 text-charcoal-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explode In 3D Scroll</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenOrder();
              }}
              className="px-6 py-4 rounded-full bg-charcoal-900/80 hover:bg-charcoal-800 border border-white/10 hover:border-gold-500/30 text-zinc-200 hover:text-gold-300 font-semibold text-sm tracking-wider transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
            >
              <span>Order Reserve • {WHOLE_BURGER_SPECS.price}</span>
              <ChevronRight className="w-4 h-4 text-gold-400" />
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenCustomizer();
              }}
              className="px-5 py-4 rounded-full bg-charcoal-950/60 hover:bg-white/5 border border-white/5 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-ember-500" />
              <span>Customize Stack</span>
            </button>
          </div>

          {/* Luxury Highlights Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gold-400 font-semibold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>BMS 11</span>
              </div>
              <p className="text-xs text-zinc-400">Miyazaki A5 Wagyu</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>48 Hours</span>
              </div>
              <p className="text-xs text-zinc-400">Fermented Brioche</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gold-300 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>24k Gold</span>
              </div>
              <p className="text-xs text-zinc-400">Flaked Canopy</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Floating 3D Whole Burger Hero Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Circular Glowing Pedestal */}
          <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
            
            {/* Spinning Aura */}
            <div className="absolute inset-0 rounded-full border border-gold-500/20 bg-gradient-to-tr from-gold-500/10 via-amber-500/5 to-transparent animate-[spin_25s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-dashed border-gold-400/20 animate-[spin_35s_linear_infinite_reverse]" />

            {/* Whole Burger Floating Showcase */}
            <motion.div
              animate={{
                y: [0, -16, 0],
                rotateZ: [0, 1.5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 cursor-pointer group"
              onClick={() => {
                sounds.playWhoosh();
                onExploreScroll();
              }}
            >
              <img
                src="/assets/burger/hero.jpg"
                alt="The Obsidian Wagyu Reserve Burger"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Interaction Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-900/95 border border-gold-500/40 text-gold-300 shadow-2xl backdrop-blur-xl text-xs font-mono tracking-wider whitespace-nowrap group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Click to Explode Layers</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center gap-2 text-center mt-8 cursor-pointer"
        onClick={onExploreScroll}
      >
        <span className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase">
          Scroll Down to Enter Live 3D Deconstruction
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gold-500/40 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
};
