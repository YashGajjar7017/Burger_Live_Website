import { useState } from "react";
import { FloatingNav } from "./components/ui/floating-navbar";
import { BackgroundEmbers } from "./components/ui/background-embers";
import { HeroSection } from "./components/sections/HeroSection";
import { ExplodedBurgerStage } from "./components/burger/ExplodedBurgerStage";
import { FlavorMatrixSection } from "./components/sections/FlavorMatrixSection";
import { CraftsmanshipSection } from "./components/sections/CraftsmanshipSection";
import { CustomizerModal } from "./components/sections/CustomizerModal";
import { OrderDrawer } from "./components/sections/OrderDrawer";
import { Footer } from "./components/sections/Footer";

export function App() {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectLayerInStage = (focusProgress: number) => {
    const stageEl = document.getElementById("deconstruct");
    if (stageEl) {
      const totalHeight = stageEl.offsetHeight - window.innerHeight;
      const targetScrollY = stageEl.offsetTop + totalHeight * focusProgress;
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-white selection:bg-gold-500/30 selection:text-gold-300 font-sans">
      {/* Background Floating Embers & Fire Dust */}
      <BackgroundEmbers particleCount={45} intensity="medium" />

      {/* Aceternity Floating Navigation */}
      <FloatingNav
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Page Content */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Showcase Section */}
        <HeroSection
          onExploreScroll={() => handleScrollToSection("deconstruct")}
          onOpenOrder={() => setIsOrderOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* 2. Core 3D Exploded Burger Live Scroll Stage (h-[420vh]) */}
        <ExplodedBurgerStage
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenOrder={() => setIsOrderOpen(true)}
        />

        {/* 3. Sensory Anatomy & Flavor Matrix */}
        <FlavorMatrixSection
          onSelectLayer={handleSelectLayerInStage}
        />

        {/* 4. Craftsmanship & Provenance */}
        <CraftsmanshipSection />
      </main>

      {/* 5. Luxury Brand Footer */}
      <Footer />

      {/* Interactive 3D Burger Customizer Studio Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onOrderSuccess={(summary) => {
          console.log("Custom Order Placed:", summary);
        }}
      />

      {/* VIP Table Reservation & Order Drawer */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
      />
    </div>
  );
}

export default App;
