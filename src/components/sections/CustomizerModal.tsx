import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "../../lib/sound";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderSummary: any) => void;
}

interface CustomizerOption {
  id: string;
  name: string;
  category: "patty" | "cheese" | "sauce" | "produce" | "bun";
  price: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  image: string;
  includedByDefault: boolean;
}

const CUSTOMIZER_ITEMS: CustomizerOption[] = [
  {
    id: "top-bun",
    name: "Artisan 24k Gold Brioche Crown",
    category: "bun",
    price: 0,
    calories: 160,
    protein: 5,
    fat: 6,
    carbs: 22,
    image: "/assets/burger/layer-1-top-bun.jpg",
    includedByDefault: true,
  },
  {
    id: "extra-truffle",
    name: "Double Périgord Black Truffle Emulsion",
    category: "sauce",
    price: 6,
    calories: 120,
    protein: 1,
    fat: 13,
    carbs: 1,
    image: "/assets/burger/layer-2-sauce.jpg",
    includedByDefault: true,
  },
  {
    id: "crisp-lettuce",
    name: "Hydroponic Greenhouse Butter Lettuce",
    category: "produce",
    price: 0,
    calories: 12,
    protein: 1,
    fat: 0.2,
    carbs: 2,
    image: "/assets/burger/layer-3-lettuce.jpg",
    includedByDefault: true,
  },
  {
    id: "wagyu-patty-base",
    name: "Double Smashed A5 Miyazaki Wagyu & Cheddar",
    category: "patty",
    price: 0,
    calories: 540,
    protein: 48,
    fat: 39,
    carbs: 2,
    image: "/assets/burger/layer-4-wagyu.jpg",
    includedByDefault: true,
  },
  {
    id: "extra-wagyu-patty",
    name: "Extra Triple Smashed Wagyu Patty (+3.5oz)",
    category: "patty",
    price: 16,
    calories: 260,
    protein: 24,
    fat: 19,
    carbs: 1,
    image: "/assets/burger/layer-4-wagyu.jpg",
    includedByDefault: false,
  },
  {
    id: "shallot-relish",
    name: "6-Hour Balsamic Shallot Confit",
    category: "produce",
    price: 0,
    calories: 75,
    protein: 1,
    fat: 3,
    carbs: 11,
    image: "/assets/burger/layer-5-onions.jpg",
    includedByDefault: true,
  },
  {
    id: "heirloom-tomatoes",
    name: "Cherokee Purple Tomatoes & Bourbon Pickles",
    category: "produce",
    price: 0,
    calories: 35,
    protein: 1,
    fat: 0.5,
    carbs: 7,
    image: "/assets/burger/layer-6-tomatoes.jpg",
    includedByDefault: true,
  },
  {
    id: "bottom-bun",
    name: "Garlic Confit Brioche Heel",
    category: "bun",
    price: 0,
    calories: 180,
    protein: 5,
    fat: 7,
    carbs: 24,
    image: "/assets/burger/layer-7-bottom-bun.jpg",
    includedByDefault: true,
  },
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    CUSTOMIZER_ITEMS.filter((i) => i.includedByDefault).map((i) => i.id)
  );
  const [doneness, setDoneness] = useState<"Medium-Rare" | "Medium" | "Chef's Cut">("Medium-Rare");
  const [isOrdered, setIsOrdered] = useState(false);

  const basePrice = 38;
  const extraPrice = selectedItems.reduce((acc, id) => {
    const item = CUSTOMIZER_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalPrice = basePrice + extraPrice;

  // Recalculate live macros
  const totalCalories = selectedItems.reduce((acc, id) => {
    const item = CUSTOMIZER_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.calories : 0);
  }, 0);

  const totalProtein = selectedItems.reduce((acc, id) => {
    const item = CUSTOMIZER_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.protein : 0);
  }, 0);

  const totalFat = Math.round(
    selectedItems.reduce((acc, id) => {
      const item = CUSTOMIZER_ITEMS.find((i) => i.id === id);
      return acc + (item ? item.fat : 0);
    }, 0)
  );

  const totalCarbs = selectedItems.reduce((acc, id) => {
    const item = CUSTOMIZER_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.carbs : 0);
  }, 0);

  const toggleItem = (id: string) => {
    sounds.playClick();
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleReset = () => {
    sounds.playWhoosh();
    setSelectedItems(CUSTOMIZER_ITEMS.filter((i) => i.includedByDefault).map((i) => i.id));
  };

  const handleCheckout = () => {
    sounds.playSuccess();
    setIsOrdered(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#facc15", "#f59e0b", "#ff5722", "#ffffff"],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onOrderSuccess({
        totalPrice,
        doneness,
        selectedItems,
        totalCalories,
      });
      setIsOrdered(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-charcoal-900 border border-white/15 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-charcoal-950/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-zinc-100">
                    Architectural Customizer Studio
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Reconfigure tiers & live macro balance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-zinc-200 text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Reset to Chef's Default"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive Layer Selection */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Select & Toggle Ingredients
                </span>

                {CUSTOMIZER_ITEMS.map((item) => {
                  const isChecked = selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? "bg-charcoal-800/90 border-gold-500/40 shadow-lg shadow-gold-500/5"
                          : "bg-charcoal-950/50 border-white/5 opacity-50 hover:opacity-75"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-gold-500 text-charcoal-950 font-bold"
                              : "border border-zinc-600 bg-transparent text-transparent"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-charcoal-950 border border-white/10 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-zinc-100">
                            {item.name}
                          </h4>
                          <span className="text-[11px] font-mono text-zinc-400">
                            {item.calories} kcal • {item.protein}g protein
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-gold-400">
                          {item.price > 0 ? `+$${item.price}.00` : "Included"}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Doneness Selector */}
                <div className="mt-4 p-4 rounded-2xl bg-charcoal-950/80 border border-white/10">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-semibold">
                    Wagyu Plancha Doneness
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Chef's Cut", "Medium-Rare", "Medium"] as const).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => {
                          sounds.playClick();
                          setDoneness(grade);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                          doneness === grade
                            ? "bg-gradient-to-r from-amber-500 to-ember-500 text-charcoal-950 font-bold shadow-md"
                            : "bg-white/5 text-zinc-400 hover:text-zinc-200 border border-white/5"
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Visual Rig & Live Macro Telemetry */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-charcoal-950/60 p-6 rounded-2xl border border-white/10">
                
                {/* Visual Representation Stack */}
                <div className="flex flex-col items-center justify-center relative min-h-[220px]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 absolute top-0 left-0">
                    Live Stack Preview
                  </span>

                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <img
                      src="/assets/burger/hero.jpg"
                      alt="Customized Burger"
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                    />
                  </div>

                  <span className="text-xs font-mono text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 mt-2">
                    {selectedItems.length} Active Tiers Selected
                  </span>
                </div>

                {/* Live Macro Metrics Gauge */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                    Real-time Nutritional Profile
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-charcoal-900 p-2 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase block">Calories</span>
                      <span className="text-sm font-bold font-mono text-gold-300">{totalCalories}</span>
                    </div>
                    <div className="bg-charcoal-900 p-2 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase block">Protein</span>
                      <span className="text-sm font-bold font-mono text-zinc-100">{totalProtein}g</span>
                    </div>
                    <div className="bg-charcoal-900 p-2 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase block">Fat</span>
                      <span className="text-sm font-bold font-mono text-zinc-100">{totalFat}g</span>
                    </div>
                    <div className="bg-charcoal-900 p-2 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase block">Carbs</span>
                      <span className="text-sm font-bold font-mono text-zinc-100">{totalCarbs}g</span>
                    </div>
                  </div>
                </div>

                {/* Price & Checkout */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-zinc-300 font-medium">Grand Reserve Total:</span>
                    <span className="text-2xl font-display font-bold text-gold-300">
                      ${totalPrice}.00
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isOrdered}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 text-charcoal-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isOrdered ? (
                      <>
                        <Zap className="w-4 h-4 animate-bounce text-charcoal-950" />
                        <span>Reserving Masterpiece...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Place Custom Reserve Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
