import React from "react";
import { cn } from "../../lib/utils";

interface GlowingBadgeProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "gold" | "ember" | "emerald";
}

export const GlowingBadge: React.FC<GlowingBadgeProps> = ({
  children,
  className,
  glowColor = "gold",
}) => {
  return (
    <div className={cn("relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none", className)}>
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[glowSpin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#facc15_50%,#00000000_100%)]",
          glowColor === "ember" && "bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#ff5722_50%,#00000000_100%)]"
        )}
      />
      <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-charcoal-950/90 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-xl border border-white/5 tracking-wider uppercase font-mono">
        {children}
      </span>
    </div>
  );
};
