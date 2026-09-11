import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Wine,
  CheckCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "../../lib/sound";
import { WHOLE_BURGER_SPECS } from "../../data/burgerData";

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({ isOpen, onClose }) => {
  const [orderType, setOrderType] = useState<"dine-in" | "delivery">("dine-in");
  const [quantity, setQuantity] = useState(1);
  const [includeWinePairing, setIncludeWinePairing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState("19:30");

  const basePrice = 38;
  const winePrice = 28;
  const totalPrice = quantity * basePrice + (includeWinePairing ? quantity * winePrice : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#facc15", "#f59e0b", "#ff5722", "#ffffff"],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-md md:max-w-lg bg-charcoal-900 border-l border-white/10 h-full overflow-y-auto flex flex-col justify-between shadow-2xl p-6 sm:p-8"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono text-gold-400 font-bold uppercase tracking-widest block mb-1">
                    Private Cellar & Kitchen
                  </span>
                  <h3 className="text-2xl font-display font-bold text-zinc-100">
                    Acquire The Reserve
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-gold-400" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-zinc-100 mb-2">
                    Reservation Confirmed
                  </h4>
                  <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                    Your bespoke table and crafted Obsidian Reserve(s) have been registered. A VIP host concierge will contact you shortly.
                  </p>
                  <span className="mt-4 text-xs font-mono text-gold-400">
                    Ticket ID: #OB-9921-VIP
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Experience Selector */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                      Experience Format
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setOrderType("dine-in");
                        }}
                        className={`p-3 rounded-2xl border text-xs font-mono font-medium transition-all ${
                          orderType === "dine-in"
                            ? "bg-gold-500/20 border-gold-500/40 text-gold-300"
                            : "bg-charcoal-950/50 border-white/5 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        Chef's Table VIP
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setOrderType("delivery");
                        }}
                        className={`p-3 rounded-2xl border text-xs font-mono font-medium transition-all ${
                          orderType === "delivery"
                            ? "bg-gold-500/20 border-gold-500/40 text-gold-300"
                            : "bg-charcoal-950/50 border-white/5 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        White Glove Delivery
                      </button>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                      Number of Burgers
                    </span>
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-charcoal-950/60 border border-white/10">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-100">
                          {WHOLE_BURGER_SPECS.name}
                        </h4>
                        <span className="text-xs font-mono text-gold-400">
                          ${basePrice}.00 per edition
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            setQuantity(Math.max(1, quantity - 1));
                          }}
                          className="w-8 h-8 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-zinc-300 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono text-base font-bold text-zinc-100 w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            setQuantity(Math.min(6, quantity + 1));
                          }}
                          className="w-8 h-8 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-zinc-300 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sommelier Wine Pairing Add-on */}
                  <div
                    onClick={() => {
                      sounds.playClick();
                      setIncludeWinePairing(!includeWinePairing);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      includeWinePairing
                        ? "bg-amber-500/10 border-amber-500/40"
                        : "bg-charcoal-950/40 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-charcoal-800 flex items-center justify-center shrink-0">
                      <Wine className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs sm:text-sm font-semibold text-zinc-100">
                          Sommelier Pairing Cru
                        </h5>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +$28.00 / glass
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-snug">
                        2012 Dom Pérignon Vintage Champagne & 2016 Barolo DOCG pairing.
                      </p>
                    </div>
                  </div>

                  {/* Table Selection / Time */}
                  {orderType === "dine-in" && (
                    <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-white/10 space-y-3">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                        VIP Tasting Schedule
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {["18:00", "19:30", "21:00"].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              sounds.playClick();
                              setSelectedTime(time);
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-mono transition-colors ${
                              selectedTime === time
                                ? "bg-gold-500 text-charcoal-950 font-bold"
                                : "bg-charcoal-800 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Inputs */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="VIP Guest Name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50"
                    />
                    <input
                      type="email"
                      placeholder="Concierge Email for Confirmation"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Sticky Action */}
            {!isSubmitted && (
              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-400 font-mono">Total Allocation:</span>
                  <span className="text-2xl font-display font-bold text-gold-300">
                    ${totalPrice}.00
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 text-charcoal-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Confirm Allocation</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
