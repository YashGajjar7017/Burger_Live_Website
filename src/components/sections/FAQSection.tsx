import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQS } from "../../data/burgerData";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    sounds.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative min-h-[70vh] py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-900/90 text-white overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Knowledge Base
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            Frequently <span className="text-gold-gradient">Answered.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-charcoal-950/90 border-gold-500/40 shadow-xl"
                    : "bg-charcoal-950/40 border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-display font-bold text-zinc-100">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-gold-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
