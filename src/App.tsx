import { useState } from "react";
import { FloatingNav } from "./components/ui/floating-navbar";
import { BackgroundEmbers } from "./components/ui/background-embers";
import { ScrollJourneyHUD } from "./components/ui/ScrollJourneyHUD";
import { HeroSection } from "./components/sections/HeroSection";
import { ExplodedBurgerStage } from "./components/burger/ExplodedBurgerStage";
import { MaillardPlanchaSection } from "./components/sections/MaillardPlanchaSection";
import { MenuSection } from "./components/sections/MenuSection";
import { FlavorMatrixSection } from "./components/sections/FlavorMatrixSection";
import { CulinaryMasterclassSection } from "./components/sections/CulinaryMasterclassSection";
import { GlobalTerroirSection } from "./components/sections/GlobalTerroirSection";
import { SommelierCellarSection } from "./components/sections/SommelierCellarSection";
import { AtelierTimelineSection } from "./components/sections/AtelierTimelineSection";
import { LuxuryUnboxingSection } from "./components/sections/LuxuryUnboxingSection";
import { CraftsmanshipSection } from "./components/sections/CraftsmanshipSection";
import { VIPReservationSection } from "./components/sections/VIPReservationSection";
import { PressCritiquesSection } from "./components/sections/PressCritiquesSection";
import { FAQSection } from "./components/sections/FAQSection";
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

  const navItems = [
    { name: "Experience", link: "#experience" },
    { name: "3D Slices", link: "#deconstruct" },
    { name: "650°F Plancha", link: "#plancha-chemistry" },
    { name: "Haute Menu", link: "#menu" },
    { name: "Flavor Matrix", link: "#flavor-matrix" },
    { name: "Masterclass", link: "#masterclass" },
    { name: "Global Terroir", link: "#terroir" },
    { name: "Cellar", link: "#cellar" },
    { name: "8-Min Timeline", link: "#timeline" },
    { name: "Humidor Vault", link: "#unboxing" },
    { name: "VIP Lounge", link: "#vip-reservation" },
    { name: "Critiques", link: "#critiques" },
    { name: "FAQ", link: "#faq" },
  ];

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-white selection:bg-gold-500/30 selection:text-gold-300 font-sans">
      {/* Background Floating Embers & Fire Dust */}
      <BackgroundEmbers particleCount={45} intensity="medium" />

      {/* Real-time 2-Minute Motion Odyssey Tracker HUD */}
      <ScrollJourneyHUD />

      {/* Aceternity Floating Navigation */}
      <FloatingNav
        navItems={navItems}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Page Content Flow (~2-Minute Deep Motion Odyssey) */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Showcase */}
        <HeroSection
          onExploreScroll={() => handleScrollToSection("deconstruct")}
          onOpenOrder={() => setIsOrderOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* 2. Core 3D Exploded Burger Live Scroll Stage (h-[600vh] - 7 Perfect Slices) */}
        <ExplodedBurgerStage
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenOrder={() => setIsOrderOpen(true)}
        />

        {/* 3. The 650°F Cast-Iron Maillard Plancha & Live Flame Alchemy */}
        <MaillardPlanchaSection />

        {/* 4. The Grand Collection & Haute Menu */}
        <MenuSection
          onOpenOrder={() => setIsOrderOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* 5. Sensory Anatomy & Flavor Matrix */}
        <FlavorMatrixSection
          onSelectLayer={handleSelectLayerInStage}
        />

        {/* 6. Culinary Masterclass & Interactive BMS Marbling Scale */}
        <CulinaryMasterclassSection />

        {/* 7. Global Terroir & Sourcing Provenance Odyssey */}
        <GlobalTerroirSection />

        {/* 8. Sommelier Cellar & Grand Cru Pairings */}
        <SommelierCellarSection />

        {/* 9. 8-Minute Kitchen Atelier Live Timeline */}
        <AtelierTimelineSection />

        {/* 10. Bespoke Aerospace Titanium Humidor Presentation Unboxing */}
        <LuxuryUnboxingSection />

        {/* 11. Craftsmanship & Provenance Pillars */}
        <CraftsmanshipSection />

        {/* 12. VIP Chef's Table & Atelier Private Reservation Lounge */}
        <VIPReservationSection />

        {/* 13. Haute Critiques & Michelin Reviews */}
        <PressCritiquesSection />

        {/* 14. Frequently Answered Knowledge Base */}
        <FAQSection />
      </main>

      {/* 15. Luxury Brand Footer */}
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
