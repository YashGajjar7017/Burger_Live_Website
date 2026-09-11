import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { CRITIQUES } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const PressCritiquesSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = () => {
    sounds.playClick();
    setCurrentIdx((prev) => (prev + 1) % CRITIQUES.length);
  };

  const prevSlide = () => {
    sounds.playClick();
    setCurrentIdx((prev) => (prev - 1 + CRITIQUES.length) % CRITIQUES.length);
  };

  const activeReview = CRITIQUES[currentIdx];

  return (
    <section
      id="critiques"
      className="relative min-h-[70vh] py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-950 text-white overflow-hidden border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Critical Acclaim
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            Haute <span className="text-gold-gradient">Critiques.</span>
          </h2>
        </div>

        {/* Carousel Showcase */}
        <CardSpotlight
          glowColor="rgba(234, 179, 8, 0.15)"
          className="p-8 sm:p-12 rounded-3xl bg-charcoal-900/90 border border-white/10 shadow-2xl relative"
        >
          <Quote className="w-16 h-16 text-gold-500/10 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between min-h-[200px]"
            >
              <div className="mb-6">
                <span className="text-xs font-mono text-gold-400 font-bold uppercase tracking-widest block mb-3">
                  {activeReview.outlet} • {activeReview.rating}
                </span>
                <blockquote className="text-lg sm:text-2xl font-display italic text-zinc-100 leading-relaxed">
                  "{activeReview.quote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-zinc-100">{activeReview.author}</h4>
                  <p className="text-xs font-mono text-zinc-400">{activeReview.title}</p>
                </div>

                {/* Slide Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-zinc-300 transition-colors border border-white/10"
                    aria-label="Previous critique"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-zinc-400 px-2">
                    0{currentIdx + 1} / 0{CRITIQUES.length}
                  </span>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-zinc-300 transition-colors border border-white/10"
                    aria-label="Next critique"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardSpotlight>
      </div>
    </section>
  );
};
