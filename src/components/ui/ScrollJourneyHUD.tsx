import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Award, Sparkles, ChevronUp, Flame } from "lucide-react";
import { sounds } from "../../lib/sound";

export const ScrollJourneyHUD: React.FC = () => {
  const [scrollDurationSecs, setScrollDurationSecs] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unlockedMilestone, setUnlockedMilestone] = useState<string | null>(null);

  // Detect active scrolling time & velocity
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let scrollTimer: NodeJS.Timeout;
    let isUserScrolling = false;

    const handleScroll = () => {
      isUserScrolling = true;
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = Math.max(1, now - lastTime);
      const velocity = Math.round((deltaY / deltaTime) * 1000); // px per second

      setScrollVelocity(velocity);
      lastScrollY = currentScrollY;
      lastTime = now;

      // Calculate total page scroll depth
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setScrollProgress(Math.min(100, Math.round((currentScrollY / totalDocHeight) * 100)));
      }

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isUserScrolling = false;
        setScrollVelocity(0);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Active journey timer ticks when user is exploring
    const durationInterval = setInterval(() => {
      setScrollDurationSecs((prev) => {
        const next = prev + 1;
        // Check Milestone Triggers (at 30s, 60s, 90s, 120s)
        if (next === 30) {
          setUnlockedMilestone("Sensory Initiate • 3D Architecture Explored");
          sounds.playSuccess();
        } else if (next === 60) {
          setUnlockedMilestone("Epicurean Connoisseur • Flame Alchemy Mastered");
          sounds.playSuccess();
        } else if (next === 90) {
          setUnlockedMilestone("Grand Sommelier • Global Terroir Unlocked");
          sounds.playSuccess();
        } else if (next === 120) {
          setUnlockedMilestone("Grand Master Gastronome • Full 2-Min Odyssey Complete!");
          sounds.playSuccess();
        }
        return next;
      });
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
      clearInterval(durationInterval);
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const targetSecs = 120; // 2 minutes goal
  const journeyPercent = Math.min(100, Math.round((scrollDurationSecs / targetSecs) * 100));

  return (
    <>
      {/* Floating Milestone Unlock Toast Alert */}
      <AnimatePresence>
        {unlockedMilestone && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          >
            <div className="bg-charcoal-900/95 border-2 border-gold-400 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-gold-500/30 backdrop-blur-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center shrink-0 animate-bounce">
                <Award className="w-5 h-5 text-gold-300" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block font-bold">
                  Odyssey Milestone Unlocked
                </span>
                <span className="text-sm font-display font-bold text-zinc-100">
                  {unlockedMilestone}
                </span>
              </div>
              <button
                onClick={() => setUnlockedMilestone(null)}
                className="ml-3 text-zinc-400 hover:text-white text-xs font-mono px-2 py-1 bg-white/5 rounded-lg"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sticky HUD (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.div
          layout
          className="bg-charcoal-900/90 border border-gold-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="p-3 flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
              title="Expand Journey HUD"
            >
              <Timer className="w-4 h-4 text-gold-400 animate-pulse" />
              <span className="text-xs font-mono font-bold">{formatTime(scrollDurationSecs)}</span>
            </button>
          ) : (
            <div className="p-3 sm:p-4 w-64 sm:w-72">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-gold-300 uppercase">
                    2-Min Motion Odyssey
                  </span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Bar & Counter */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">Journey Time:</span>
                  <span className="text-gold-300 font-bold">
                    {formatTime(scrollDurationSecs)} <span className="text-zinc-400">/ 02:00</span>
                  </span>
                </div>

                <div className="h-1.5 w-full bg-charcoal-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                    style={{ width: `${journeyPercent}%` }}
                  />
                </div>

                {/* Telemetry Metrics */}
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/5">
                  <span>Scroll Depth: <strong className="text-zinc-200">{scrollProgress}%</strong></span>
                  <span>Velocity: <strong className="text-amber-400">{scrollVelocity} px/s</strong></span>
                </div>

                {/* Status Tier */}
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-gold-400/90 bg-charcoal-950/60 px-2 py-1 rounded-lg border border-white/5">
                  <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
                  <span className="truncate">
                    {scrollDurationSecs < 30
                      ? "Chapter 01 • Sensory Exploration"
                      : scrollDurationSecs < 60
                      ? "Chapter 02 • Searing Plancha Flame"
                      : scrollDurationSecs < 90
                      ? "Chapter 03 • Global Terroir & Cellar"
                      : "Chapter 04 • Grand Master Gastronome"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};
