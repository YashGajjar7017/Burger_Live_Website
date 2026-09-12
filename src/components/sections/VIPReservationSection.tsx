import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Wine, Sparkles, Award, ShieldCheck, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { VIP_PACKAGES } from "../../data/burgerData";
import { CardSpotlight } from "../ui/card-spotlight";
import { GlowingBadge } from "../ui/glowing-border";
import { sounds } from "../../lib/sound";

export const VIPReservationSection: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>("plancha-counter");
  const [guestName, setGuestName] = useState<string>("Lord Sterling");
  const [partySize, setPartySize] = useState<number>(2);
  const [bookingDate, setBookingDate] = useState<string>("2026-04-18");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const activePackage =
    VIP_PACKAGES.find((p) => p.id === selectedPackageId) || VIP_PACKAGES[0];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#facc15", "#f59e0b", "#ffffff"],
    });
    setIsBooked(true);
  };

  return (
    <section
      id="vip-reservation"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-charcoal-950 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-block">
            <GlowingBadge glowColor="gold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                VIP Chef's Table
              </span>
            </GlowingBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight">
            The Private <span className="text-gold-gradient">Atelier Lounge.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Reserve front-row seats at the 650°F Plancha Counter or book the private Sommelier Cellar Salon for an exclusive multi-course masterclass pairing.
          </p>
        </div>

        {/* Package Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {VIP_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedPackageId(pkg.id);
                  setIsBooked(false);
                }}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-charcoal-900 border-gold-400 shadow-2xl shadow-gold-500/15 scale-[1.02]"
                    : "bg-charcoal-900/50 border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-display font-bold text-gold-300">
                      {pkg.price}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
                      {pkg.capacity}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-zinc-100 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-amber-300/80 mb-4 font-mono">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Deposit: <strong>{pkg.deposit}</strong></span>
                  <span className="text-gold-400 font-semibold">{isSelected ? "Selected" : "Select Experience"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Reservation Form & VIP Certificate Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Customizer Form */}
          <div className="lg:col-span-6">
            <CardSpotlight
              glowColor="rgba(234, 179, 8, 0.2)"
              className="p-8 rounded-3xl bg-charcoal-900/90 border border-white/10 shadow-2xl"
            >
              <h3 className="text-xl font-display font-bold text-zinc-100 mb-6">
                Reserve {activePackage.name}
              </h3>

              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Guest of Honor Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-white/10 text-zinc-100 text-sm focus:border-gold-400 focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Party Size
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-white/10 text-zinc-100 text-sm focus:border-gold-400 focus:outline-none"
                    >
                      {[1, 2, 4, 6, 8, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-white/10 text-zinc-100 text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 text-charcoal-950 font-bold font-mono text-sm tracking-wider uppercase shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Generate VIP Table Pass
                </button>
              </form>
            </CardSpotlight>
          </div>

          {/* Real-time VIP Pass / Certificate Preview */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 border-2 border-gold-400/60 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-gold-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold">
                    Official Atelier VIP Pass
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">Pass #2026-VIP-88</span>
              </div>

              <div className="my-6 space-y-3">
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block">
                  Distinguished Guest:
                </span>
                <h4 className="text-2xl font-display font-bold text-zinc-100">
                  {guestName || "Distinguished Connoisseur"}
                </h4>
                <p className="text-xs font-mono text-gold-300">
                  Experience: <strong>{activePackage.name}</strong> • {partySize} Guests
                </p>
                <p className="text-xs font-mono text-zinc-400">
                  Scheduled for: <strong>{bookingDate}</strong> @ 19:30 JST / EST
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5 text-gold-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Executive Head Chef Kuroda Verification</span>
                </div>
                <span className="text-zinc-400">{isBooked ? "STATUS: CONFIRMED" : "PENDING PASS GENERATION"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
