import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "../../lib/utils";
import { sounds } from "../../lib/sound";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems?: NavItem[];
  className?: string;
  onOpenOrder?: () => void;
  onOpenCustomizer?: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems = [
    { name: "Experience", link: "#experience" },
    { name: "Deconstruction", link: "#deconstruct" },
    { name: "Flavor Matrix", link: "#flavor-matrix" },
    { name: "Craft & Provenance", link: "#craft" },
    { name: "Private Reserve", link: "#reserve" },
  ],
  className,
  onOpenOrder,
  onOpenCustomizer,
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("experience");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto show/hide on directional scroll
      if (currentScrollY > 100 && currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = ["experience", "deconstruct", "flavor-matrix", "craft", "reserve"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (link: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "fixed top-5 inset-x-0 mx-auto max-w-5xl z-50 px-4 sm:px-6 pointer-events-auto",
          className
        )}
      >
        <div className="relative flex items-center justify-between rounded-full border border-white/10 bg-charcoal-900/80 px-4 py-2.5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/5 sm:px-6">
          
          {/* Brand Emblem */}
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#experience");
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-amber-500 to-amber-700 shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <Flame className="h-5 w-5 text-charcoal-950 fill-charcoal-950" />
              <div className="absolute inset-0 rounded-full animate-ping opacity-25 bg-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.25em] font-bold text-zinc-100 uppercase group-hover:text-gold-300 transition-colors">
                Obsidian
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold-400 font-mono -mt-1">
                Wagyu Reserve
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-charcoal-950/60 p-1 border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.link.replace("#", "");
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.link)}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-medium tracking-wider transition-all duration-200 rounded-full",
                    isActive
                      ? "text-gold-300 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-500/20 via-amber-500/20 to-gold-500/20 border border-gold-500/40 shadow-inner"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {onOpenCustomizer && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenCustomizer();
                }}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-gold-300 transition-colors border border-white/10 rounded-full hover:border-gold-500/30 bg-charcoal-800/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Customizer</span>
              </button>
            )}

            <button
              onClick={() => {
                sounds.playWhoosh();
                if (onOpenOrder) onOpenOrder();
              }}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-gold-500/20 cursor-pointer"
            >
              <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-charcoal-950 rounded-full group-hover:bg-opacity-0 flex items-center gap-1.5 text-gold-300 group-hover:text-charcoal-950 font-bold uppercase tracking-wider text-[11px]">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Taste Reserve</span>
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-charcoal-800/80 text-zinc-300 hover:text-gold-300 border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden mt-2 p-4 rounded-2xl bg-charcoal-900/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.link)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-zinc-300 hover:text-gold-300 hover:bg-white/5 rounded-xl transition-colors"
                >
                  {item.name}
                </button>
              ))}
              {onOpenCustomizer && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gold-400 bg-gold-500/10 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>3D Burger Customizer Studio</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};
