import React from "react";
import { Flame, Sparkles, MapPin, Mail, ArrowRight, Award } from "lucide-react";
import { sounds } from "../../lib/sound";

export const Footer: React.FC = () => {
  return (
    <footer id="reserve" className="relative bg-charcoal-950 text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background Subtle Ember Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-gold-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Newsletter / VIP Allocation Form */}
        <div className="p-8 sm:p-12 rounded-3xl bg-charcoal-900/90 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-2xl backdrop-blur-xl">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-2 font-bold">
              Private Cellar Dispatch
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100">
              Receive Secret Drops & Tasting Invitations
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Join 4,200+ culinary patrons who receive first notification when new Wagyu BMS 12 cuts are released.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sounds.playSuccess();
              alert("You are now registered for Private Dispatch.");
            }}
            className="flex w-full sm:w-auto items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your VIP email"
              required
              className="px-5 py-3.5 rounded-full bg-charcoal-950 border border-white/15 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50 w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 shadow-lg shadow-gold-500/20"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Mid Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-md">
                <Flame className="w-4 h-4 text-charcoal-950 fill-charcoal-950" />
              </div>
              <span className="font-display font-bold tracking-[0.2em] text-zinc-100 uppercase">
                Obsidian
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              The world’s first architectural wagyu burger experience. Hand-crafted in micro-batches daily.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gold-400">
              <Award className="w-3.5 h-3.5" />
              <span>Michelin Select 2026</span>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-4">
              Flagship Ateliers
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>Tokyo — Ginza 6-Chome, 12-4</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>Paris — 8e Arrondissement, Rue du Faubourg</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>New York — Hudson Yards Reserve Level</span>
              </li>
            </ul>
          </div>

          {/* Gastronomy */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-4">
              Sourcing & Heritage
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#flavor-matrix" className="hover:text-gold-300 transition-colors">A5 Miyazaki Wagyu BMS 11</a></li>
              <li><a href="#flavor-matrix" className="hover:text-gold-300 transition-colors">Périgord Black Truffle Harvest</a></li>
              <li><a href="#flavor-matrix" className="hover:text-gold-300 transition-colors">Normandy 48h Fermented Brioche</a></li>
              <li><a href="#flavor-matrix" className="hover:text-gold-300 transition-colors">Modena DOP 25-Year Balsamic</a></li>
            </ul>
          </div>

          {/* Private Service */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-4">
              VIP Concierge
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Private banquets, corporate tasting salons, and caviar pairings available upon request.
            </p>
            <span className="text-xs font-mono text-zinc-300 block">
              concierge@obsidianreserve.luxury
            </span>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-4">
          <p>© 2026 OBSIDIAN RESERVE GASTRONOMY GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Culinary License</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Nutritional Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
