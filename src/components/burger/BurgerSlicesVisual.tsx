import React from "react";
import { motion } from "framer-motion";
import type { BurgerLayer } from "../../data/burgerData";

export type SliceRenderMode = "normal" | "thermal" | "macro" | "xray";

interface BurgerSliceVisualProps {
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
  separationProgress: number; // 0 (assembled) to 1 (fully exploded)
}

export const BurgerSliceVisual: React.FC<BurgerSliceVisualProps> = ({
  layer,
  isActive,
  isHovered,
  renderMode,
  separationProgress,
}) => {
  // Render specific layer visual
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Dynamic Drop Shadow onto next layer (scales with separation) */}
      <div
        className="absolute inset-x-4 -bottom-4 h-8 rounded-full bg-black/70 blur-xl transition-all duration-300 pointer-events-none"
        style={{
          opacity: Math.max(0.15, 0.7 - separationProgress * 0.4),
          transform: `scale(${1 - separationProgress * 0.15}) translateY(${8 + separationProgress * 12}px)`,
        }}
      />

      {/* Mode-Specific Wrapper */}
      <div
        className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${
          renderMode === "thermal"
            ? "filter brightness-125 contrast-125"
            : renderMode === "xray"
            ? "filter drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            : ""
        }`}
      >
        {/* Layer Content */}
        {layer.id === "top-bun" && (
          <TopBunVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
        {layer.id === "truffle-sauce" && (
          <TruffleSauceVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
        {layer.id === "butter-lettuce" && (
          <ButterLettuceVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
        {layer.id === "wagyu-patty" && (
          <WagyuPattyVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
        {layer.id === "caramelized-onions" && (
          <CaramelizedOnionsVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
        {layer.id === "tomatoes-pickles" && (
          <TomatoesPicklesVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
        {layer.id === "bottom-bun" && (
          <BottomBunVisual
            layer={layer}
            isActive={isActive}
            isHovered={isHovered}
            renderMode={renderMode}
          />
        )}
      </div>

      {/* Thermal Temperature HUD Badge Overlay */}
      {renderMode === "thermal" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-3 right-2 bg-charcoal-950/95 border border-amber-500/60 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: layer.thermal.heatSignatureColor }}
          />
          <span>{layer.thermal.tempF}°F / {layer.thermal.tempC}°C</span>
        </motion.div>
      )}

      {/* X-Ray CAD Dimensional Callout Overlay */}
      {renderMode === "xray" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none border border-dashed border-cyan-400/40 rounded-2xl flex flex-col justify-between p-2"
        >
          <div className="flex justify-between items-center text-[9px] font-mono text-cyan-300">
            <span>h = {layer.architecture.thicknessMm}mm</span>
            <span>m = {layer.architecture.weightGrams}g</span>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400/80">
            <span>{layer.architecture.density}</span>
            <span>{layer.architecture.moisturePercent}% H₂O</span>
          </div>
        </motion.div>
      )}

      {/* Macro Mode Zoom Highlight Lens */}
      {renderMode === "macro" && isActive && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-charcoal-900/95 border border-gold-400/60 rounded-xl px-3 py-1 text-center shadow-2xl backdrop-blur-xl max-w-[280px]"
        >
          <span className="text-[9px] font-mono text-gold-400 uppercase tracking-wider block font-bold">
            Micro-Lattice Structure
          </span>
          <p className="text-[10px] text-zinc-200 font-sans leading-tight">
            {layer.macroAnalysis.cellularStructure}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// =========================================================================
// LAYER 1: ARTISAN 24K GOLD BRIOCHE CROWN
// =========================================================================
const TopBunVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
      >
        <defs>
          {/* Bun Gloss Gradient */}
          <radialGradient id="bunGloss" cx="45%" cy="30%" r="65%">
            <stop offset="0%" stopColor={isThermal ? "#fbbf24" : isXRay ? "#38bdf8" : "#fef08a"} />
            <stop offset="25%" stopColor={isThermal ? "#f59e0b" : isXRay ? "#0284c7" : "#d97706"} />
            <stop offset="65%" stopColor={isThermal ? "#d97706" : isXRay ? "#0369a1" : "#92400e"} />
            <stop offset="100%" stopColor={isThermal ? "#9a3412" : isXRay ? "#082f49" : "#451a03"} />
          </radialGradient>

          {/* Gold Leaf Shimmer */}
          <linearGradient id="goldShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Crust Rim Shadow */}
          <linearGradient id="bunRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="80%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </linearGradient>
        </defs>

        {/* Outer Bun Dome Shape */}
        <path
          d="M 40,170 C 35,80 120,30 200,30 C 280,30 365,80 360,170 C 360,195 330,205 200,205 C 70,205 40,195 40,170 Z"
          fill="url(#bunGloss)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#f59e0b" : "#b45309"}
          strokeWidth={isXRay ? "2" : "1"}
          strokeDasharray={isXRay ? "4 2" : "none"}
        />

        {/* Specular Highlight Arc */}
        {!isXRay && (
          <path
            d="M 80,120 C 100,65 150,45 200,45 C 250,45 285,60 305,95 C 275,65 235,55 195,55 C 145,55 105,75 80,120 Z"
            fill="white"
            opacity="0.25"
          />
        )}

        {/* Lower Curvature Highlight */}
        <path
          d="M 50,165 C 100,190 300,190 350,165 C 330,195 270,202 200,202 C 130,202 70,195 50,165 Z"
          fill="url(#bunRim)"
        />

        {/* 24-Karat Gold Leaf Flakes (Organic gilded clusters) */}
        {!isXRay && (
          <g filter="drop-shadow(0 0 4px rgba(234,179,8,0.8))">
            <polygon points="180,65 192,60 198,72 188,78 178,70" fill="url(#goldShimmer)" />
            <polygon points="215,80 230,75 235,88 222,95 210,85" fill="url(#goldShimmer)" />
            <polygon points="145,95 158,88 162,102 150,108 140,100" fill="url(#goldShimmer)" />
            <polygon points="255,105 268,98 274,112 260,118 250,110" fill="url(#goldShimmer)" />
            <polygon points="185,120 195,112 205,124 192,130 180,125" fill="url(#goldShimmer)" />
          </g>
        )}

        {/* Black & White Toasted Sesame Seeds */}
        {!isXRay && (
          <g>
            {/* White Seeds */}
            {[
              [110, 110, 20], [130, 80, -15], [160, 65, 35], [210, 55, -25], [250, 70, 40],
              [280, 95, -10], [310, 125, 30], [130, 140, 45], [170, 100, -30], [230, 115, 15],
              [275, 135, -20], [195, 90, 50], [220, 140, -40], [160, 150, 10], [290, 155, 25]
            ].map(([cx, cy, rot], i) => (
              <ellipse
                key={`ws-${i}`}
                cx={cx}
                cy={cy}
                rx="4.5"
                ry="2.2"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
                fill="#fef3c7"
                stroke="#d97706"
                strokeWidth="0.5"
              />
            ))}

            {/* Black Sesame Seeds */}
            {[
              [140, 115, -35], [185, 75, 25], [240, 65, -45], [270, 110, 15], [115, 135, 55],
              [205, 105, -15], [255, 140, 35], [155, 130, -20], [300, 145, -50], [175, 160, 30]
            ].map(([cx, cy, rot], i) => (
              <ellipse
                key={`bs-${i}`}
                cx={cx}
                cy={cy}
                rx="4.2"
                ry="2.0"
                transform={`rotate(${rot}, ${cx}, ${cy})`}
                fill="#18181b"
                stroke="#3f3f46"
                strokeWidth="0.5"
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// LAYER 2: BLACK TRUFFLE & BONE MARROW AIOLI EMULSION
// =========================================================================
const TruffleSauceVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 160"
        className="w-full h-full drop-shadow-[0_12px_25px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <radialGradient id="truffleAioli" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={isThermal ? "#f59e0b" : isXRay ? "#38bdf8" : "#fde68a"} />
            <stop offset="40%" stopColor={isThermal ? "#d97706" : isXRay ? "#0284c7" : "#d97706"} />
            <stop offset="85%" stopColor={isThermal ? "#b45309" : isXRay ? "#0369a1" : "#78350f"} />
            <stop offset="100%" stopColor={isThermal ? "#78350f" : isXRay ? "#082f49" : "#451a03"} />
          </radialGradient>
        </defs>

        {/* Flowing Organic Aioli Spread with Dripping Droplets */}
        <path
          d="M 60,75 C 90,60 140,80 180,68 C 220,55 260,80 300,65 C 340,55 355,85 345,100 C 335,115 315,105 295,120 C 285,128 275,145 265,145 C 255,145 250,120 240,115 C 225,110 215,135 200,135 C 185,135 180,108 165,108 C 150,108 145,138 135,138 C 125,138 120,112 105,110 C 85,110 65,125 50,110 C 35,95 45,85 60,75 Z"
          fill="url(#truffleAioli)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#d97706" : "#92400e"}
          strokeWidth={isXRay ? "2" : "1"}
        />

        {/* Viscous Droplets */}
        {!isXRay && (
          <g>
            <circle cx="135" cy="148" r="4.5" fill="#d97706" />
            <circle cx="200" cy="145" r="5" fill="#d97706" />
            <circle cx="265" cy="155" r="4" fill="#b45309" />
            <circle cx="310" cy="130" r="3.5" fill="#d97706" />
          </g>
        )}

        {/* Shaved Black Winter Truffle Specks */}
        {!isXRay && (
          <g fill="#18181b" opacity="0.85">
            {[
              [90, 85, 4, 3], [120, 75, 5, 3], [150, 95, 6, 4], [175, 80, 5, 3],
              [210, 75, 6, 4], [235, 95, 5, 3], [260, 80, 6, 4], [290, 88, 5, 3],
              [320, 80, 4, 3], [130, 115, 4, 3], [190, 115, 5, 3], [250, 118, 5, 3]
            ].map(([cx, cy, rx, ry], i) => (
              <ellipse key={`tr-${i}`} cx={cx} cy={cy} rx={rx} ry={ry} />
            ))}
          </g>
        )}

        {/* Glossy Oil Surface Specular Reflections */}
        {!isXRay && (
          <path
            d="M 100,75 Q 140,68 180,72 Q 240,60 290,70"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// LAYER 3: HYDROPONIC CRISP BUTTER LETTUCE
// =========================================================================
const ButterLettuceVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 420 180"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
      >
        <defs>
          <linearGradient id="lettuceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isThermal ? "#10b981" : isXRay ? "#38bdf8" : "#86efac"} />
            <stop offset="40%" stopColor={isThermal ? "#059669" : isXRay ? "#0284c7" : "#22c55e"} />
            <stop offset="85%" stopColor={isThermal ? "#047857" : isXRay ? "#0369a1" : "#15803d"} />
            <stop offset="100%" stopColor={isThermal ? "#064e3b" : isXRay ? "#082f49" : "#14532d"} />
          </linearGradient>
        </defs>

        {/* Ruffled Botanical Leaf Cluster */}
        <path
          d="M 30,95 C 20,60 55,45 85,60 C 110,40 145,42 165,65 C 190,35 235,38 255,62 C 285,40 325,48 345,72 C 375,55 405,75 395,105 C 385,135 350,145 325,132 C 300,150 265,145 240,128 C 210,148 170,145 145,128 C 115,148 75,142 55,122 C 30,125 25,115 30,95 Z"
          fill="url(#lettuceGrad)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#10b981" : "#166534"}
          strokeWidth={isXRay ? "2" : "1.5"}
        />

        {/* Translucent Rib Veins */}
        <g stroke={isXRay ? "#38bdf8" : isThermal ? "#6ee7b7" : "#bbf7d0"} strokeWidth="2" strokeLinecap="round" opacity={isXRay ? "0.8" : "0.6"}>
          <path d="M 210,130 Q 205,95 200,50" />
          <path d="M 205,100 Q 165,85 130,80" />
          <path d="M 205,90 Q 245,75 285,70" />
          <path d="M 205,115 Q 155,108 100,105" />
          <path d="M 205,110 Q 255,105 320,98" />
        </g>

        {/* Crystal Dew Drops */}
        {!isXRay && (
          <g>
            <circle cx="120" cy="72" r="3" fill="white" opacity="0.75" />
            <circle cx="175" cy="55" r="3.5" fill="white" opacity="0.8" />
            <circle cx="240" cy="58" r="4" fill="white" opacity="0.8" />
            <circle cx="305" cy="65" r="3" fill="white" opacity="0.75" />
            <circle cx="280" cy="110" r="3" fill="white" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// LAYER 4: DOUBLE SMASHED A5 MIYAZAKI WAGYU & 18-MO CHEDDAR
// =========================================================================
const WagyuPattyVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 420 220"
        className="w-full h-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
      >
        <defs>
          {/* Seared Beef Crust Gradient */}
          <radialGradient id="wagyuSear" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor={isThermal ? "#ef4444" : isXRay ? "#38bdf8" : "#451a03"} />
            <stop offset="50%" stopColor={isThermal ? "#dc2626" : isXRay ? "#0284c7" : "#290e02"} />
            <stop offset="85%" stopColor={isThermal ? "#b91c1c" : isXRay ? "#0369a1" : "#1a0801"} />
            <stop offset="100%" stopColor={isThermal ? "#7f1d1d" : isXRay ? "#082f49" : "#0f0501"} />
          </radialGradient>

          {/* Molten Cheddar Blanket */}
          <linearGradient id="meltedCheddar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isThermal ? "#f59e0b" : isXRay ? "#67e8f9" : "#fef08a"} />
            <stop offset="35%" stopColor={isThermal ? "#ea580c" : isXRay ? "#06b6d4" : "#f59e0b"} />
            <stop offset="85%" stopColor={isThermal ? "#c2410c" : isXRay ? "#0891b2" : "#d97706"} />
            <stop offset="100%" stopColor={isThermal ? "#9a3412" : isXRay ? "#164e63" : "#b45309"} />
          </linearGradient>
        </defs>

        {/* Lower Smashed Wagyu Patty (Lacy crispy jagged edges) */}
        <path
          d="M 35,130 C 20,115 45,100 65,105 C 80,95 120,98 145,102 C 170,95 210,95 240,102 C 270,95 310,98 335,105 C 365,98 395,115 385,135 C 375,155 355,160 330,155 C 305,165 265,162 235,155 C 205,165 165,162 135,155 C 105,165 65,158 45,148 C 25,142 25,138 35,130 Z"
          fill="url(#wagyuSear)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#ef4444" : "#290e02"}
          strokeWidth={isXRay ? "2" : "1.5"}
        />

        {/* Upper Smashed Wagyu Patty */}
        <path
          d="M 45,85 C 30,70 55,60 75,65 C 95,58 135,62 160,65 C 190,58 230,58 260,65 C 290,58 330,62 350,68 C 380,62 400,80 390,98 C 380,118 355,122 330,118 C 300,128 260,125 230,118 C 200,128 160,125 130,118 C 95,125 60,118 45,105 C 30,95 35,90 45,85 Z"
          fill="url(#wagyuSear)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#dc2626" : "#1a0801"}
          strokeWidth={isXRay ? "2" : "1.5"}
        />

        {/* Molten 18-Month Clothbound Somerset Cheddar Blanket */}
        <path
          d="M 55,75 C 95,65 165,70 210,68 C 265,65 330,68 365,78 C 375,95 365,115 355,130 C 345,145 335,168 325,168 C 315,168 310,135 295,125 C 280,118 270,155 255,155 C 240,155 235,122 220,122 C 205,122 195,178 180,178 C 165,178 160,125 145,125 C 130,125 125,162 110,162 C 95,162 90,120 75,115 C 60,110 50,135 40,135 C 32,135 38,105 45,95 C 50,85 52,80 55,75 Z"
          fill="url(#meltedCheddar)"
          stroke={isXRay ? "#67e8f9" : isThermal ? "#f59e0b" : "#d97706"}
          strokeWidth={isXRay ? "2" : "1"}
        />

        {/* Cheddar Surface Specular Highlight */}
        {!isXRay && (
          <path
            d="M 90,75 Q 150,70 210,72 Q 280,68 335,76"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        )}

        {/* Lacy Crispy Plancha Edge Beads */}
        {!isXRay && (
          <g fill="#1a0801">
            <circle cx="32" cy="132" r="3" />
            <circle cx="388" cy="136" r="3.5" />
            <circle cx="42" cy="85" r="2.5" />
            <circle cx="395" cy="95" r="3" />
            <circle cx="215" cy="158" r="2.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// LAYER 5: 6-HOUR BALSAMIC SHALLOT CONFIT
// =========================================================================
const CaramelizedOnionsVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 160"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
      >
        <defs>
          <radialGradient id="shallotConfit" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor={isThermal ? "#ea580c" : isXRay ? "#38bdf8" : "#b45309"} />
            <stop offset="40%" stopColor={isThermal ? "#c2410c" : isXRay ? "#0284c7" : "#78350f"} />
            <stop offset="80%" stopColor={isThermal ? "#9a3412" : isXRay ? "#0369a1" : "#451a03"} />
            <stop offset="100%" stopColor={isThermal ? "#7c2d12" : isXRay ? "#082f49" : "#240a02"} />
          </radialGradient>
        </defs>

        {/* Jammy Caramelized Confit Mass */}
        <path
          d="M 50,80 C 70,60 120,68 150,62 C 180,55 220,58 250,65 C 290,58 330,65 355,82 C 370,98 350,118 325,115 C 300,128 260,122 230,118 C 200,128 160,125 130,118 C 95,128 65,120 48,105 C 35,92 40,85 50,80 Z"
          fill="url(#shallotConfit)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#ea580c" : "#78350f"}
          strokeWidth={isXRay ? "2" : "1"}
        />

        {/* Curled Caramelized Shallot Ribbons */}
        <g stroke={isXRay ? "#38bdf8" : isThermal ? "#f59e0b" : "#d97706"} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M 80,85 C 110,75 130,95 160,82" />
          <path d="M 140,80 C 170,70 190,90 220,78" />
          <path d="M 200,82 C 230,72 250,92 280,80" />
          <path d="M 260,80 C 290,72 310,90 335,85" />
          <path d="M 100,105 C 130,98 160,112 190,100" />
          <path d="M 210,105 C 240,95 270,110 300,102" />
        </g>

        {/* Fresh Thyme Sprigs */}
        {!isXRay && (
          <g fill="#15803d">
            <ellipse cx="125" cy="78" rx="3.5" ry="2" transform="rotate(-25, 125, 78)" />
            <ellipse cx="195" cy="70" rx="4" ry="2.2" transform="rotate(30, 195, 70)" />
            <ellipse cx="265" cy="74" rx="3.5" ry="2" transform="rotate(-15, 265, 74)" />
            <ellipse cx="165" cy="100" rx="3" ry="1.8" transform="rotate(40, 165, 100)" />
            <ellipse cx="235" cy="98" rx="3.5" ry="2" transform="rotate(-35, 235, 98)" />
          </g>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// LAYER 6: CHEROKEE PURPLE TOMATOES & BOURBON PICKLES
// =========================================================================
const TomatoesPicklesVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 420 180"
        className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
      >
        <defs>
          {/* Cherokee Purple Tomato Flesh */}
          <radialGradient id="cherokeeFlesh" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor={isThermal ? "#ef4444" : isXRay ? "#38bdf8" : "#f43f5e"} />
            <stop offset="45%" stopColor={isThermal ? "#dc2626" : isXRay ? "#0284c7" : "#be123c"} />
            <stop offset="85%" stopColor={isThermal ? "#991b1b" : isXRay ? "#0369a1" : "#881337"} />
            <stop offset="100%" stopColor={isThermal ? "#7f1d1d" : isXRay ? "#082f49" : "#4c0519"} />
          </radialGradient>

          {/* Oak Cured Pickle Gradient */}
          <radialGradient id="pickleGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor={isThermal ? "#10b981" : isXRay ? "#67e8f9" : "#84cc16"} />
            <stop offset="50%" stopColor={isThermal ? "#059669" : isXRay ? "#06b6d4" : "#65a30d"} />
            <stop offset="90%" stopColor={isThermal ? "#047857" : isXRay ? "#0891b2" : "#3f6212"} />
            <stop offset="100%" stopColor={isThermal ? "#064e3b" : isXRay ? "#164e63" : "#1a2e05"} />
          </radialGradient>
        </defs>

        {/* Left Tomato Slice */}
        <g>
          <ellipse
            cx="145"
            cy="90"
            rx="95"
            ry="48"
            fill="url(#cherokeeFlesh)"
            stroke={isXRay ? "#38bdf8" : isThermal ? "#ef4444" : "#881337"}
            strokeWidth={isXRay ? "2" : "1.5"}
          />
          {/* Locular Seed Cavities */}
          {!isXRay && (
            <g fill="#4c0519" stroke="#fda4af" strokeWidth="0.8">
              <ellipse cx="115" cy="80" rx="14" ry="8" />
              <ellipse cx="165" cy="80" rx="15" ry="8.5" />
              <ellipse cx="140" cy="102" rx="16" ry="9" />
              <circle cx="115" cy="80" r="2.2" fill="#fef08a" />
              <circle cx="165" cy="80" r="2.5" fill="#fef08a" />
              <circle cx="140" cy="102" r="2.5" fill="#fef08a" />
            </g>
          )}
        </g>

        {/* Right Tomato Slice */}
        <g>
          <ellipse
            cx="275"
            cy="90"
            rx="95"
            ry="48"
            fill="url(#cherokeeFlesh)"
            stroke={isXRay ? "#38bdf8" : isThermal ? "#ef4444" : "#881337"}
            strokeWidth={isXRay ? "2" : "1.5"}
          />
          {/* Locular Seed Cavities */}
          {!isXRay && (
            <g fill="#4c0519" stroke="#fda4af" strokeWidth="0.8">
              <ellipse cx="250" cy="80" rx="14" ry="8" />
              <ellipse cx="295" cy="80" rx="15" ry="8.5" />
              <ellipse cx="270" cy="102" rx="16" ry="9" />
              <circle cx="250" cy="80" r="2.2" fill="#fef08a" />
              <circle cx="295" cy="80" r="2.5" fill="#fef08a" />
              <circle cx="270" cy="102" r="2.5" fill="#fef08a" />
            </g>
          )}
        </g>

        {/* Crinkle-Cut Bourbon Oak Barrel Pickle Slices */}
        <g>
          {/* Pickle 1 */}
          <ellipse
            cx="80"
            cy="105"
            rx="45"
            ry="25"
            transform="rotate(-15, 80, 105)"
            fill="url(#pickleGrad)"
            stroke={isXRay ? "#67e8f9" : isThermal ? "#10b981" : "#365314"}
            strokeWidth={isXRay ? "2" : "1.5"}
          />
          {/* Pickle 2 */}
          <ellipse
            cx="335"
            cy="105"
            rx="45"
            ry="25"
            transform="rotate(15, 335, 105)"
            fill="url(#pickleGrad)"
            stroke={isXRay ? "#67e8f9" : isThermal ? "#10b981" : "#365314"}
            strokeWidth={isXRay ? "2" : "1.5"}
          />
        </g>

        {/* Flaky Maldon Smoked Sea Salt Crystals */}
        {!isXRay && (
          <g fill="white" opacity="0.9">
            <polygon points="135,72 138,70 140,74 137,76" />
            <polygon points="175,90 178,87 181,92 177,94" />
            <polygon points="245,75 248,72 251,77 247,79" />
            <polygon points="285,92 289,89 292,95 287,97" />
          </g>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// LAYER 7: GARLIC CONFIT TOASTED BRIOCHE HEEL
// =========================================================================
const BottomBunVisual: React.FC<{
  layer: BurgerLayer;
  isActive: boolean;
  isHovered: boolean;
  renderMode: SliceRenderMode;
}> = ({ renderMode }) => {
  const isThermal = renderMode === "thermal";
  const isXRay = renderMode === "xray";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
      >
        <defs>
          {/* Brioche Heel Gradient */}
          <radialGradient id="heelGloss" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor={isThermal ? "#f59e0b" : isXRay ? "#38bdf8" : "#fde68a"} />
            <stop offset="35%" stopColor={isThermal ? "#d97706" : isXRay ? "#0284c7" : "#d97706"} />
            <stop offset="75%" stopColor={isThermal ? "#b45309" : isXRay ? "#0369a1" : "#92400e"} />
            <stop offset="100%" stopColor={isThermal ? "#78350f" : isXRay ? "#082f49" : "#451a03"} />
          </radialGradient>
        </defs>

        {/* Brioche Heel Foundation Slab */}
        <path
          d="M 50,55 C 80,42 140,38 200,38 C 260,38 320,42 350,55 C 365,75 365,100 350,120 C 320,138 260,145 200,145 C 140,145 80,138 50,120 C 35,100 35,75 50,55 Z"
          fill="url(#heelGloss)"
          stroke={isXRay ? "#38bdf8" : isThermal ? "#f59e0b" : "#b45309"}
          strokeWidth={isXRay ? "2" : "1.5"}
          strokeDasharray={isXRay ? "4 2" : "none"}
        />

        {/* Plancha Cast-Iron Diagonal Sear Char Marks */}
        {!isXRay && (
          <g stroke="#451a03" strokeWidth="4.5" strokeLinecap="round" opacity="0.6">
            <line x1="100" y1="58" x2="160" y2="115" />
            <line x1="160" y1="50" x2="220" y2="120" />
            <line x1="220" y1="50" x2="280" y2="120" />
            <line x1="280" y1="58" x2="330" y2="110" />
          </g>
        )}

        {/* Roasted Garlic Confit Butter Sheen */}
        {!isXRay && (
          <ellipse
            cx="200"
            cy="75"
            rx="120"
            ry="28"
            fill="white"
            opacity="0.18"
          />
        )}
      </svg>
    </div>
  );
};
