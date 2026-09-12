export interface BurgerLayer {
  id: string;
  index: number;
  tierName: string;
  shortName: string;
  badge: string;
  image: string;
  offsetY: number; // Max explosion distance in px (negative = up, positive = down)
  rotateX: number; // 3D tilt angle
  scale: number;
  scrollRange: [number, number]; // [startProgress, endProgress]
  focusProgress: number; // Ideal scroll position to lock on this layer
  
  // Culinary Dossier
  origin: string;
  flavorProfile: string[];
  description: string;
  chefTechnique: string;
  
  // Nutrition & Composition
  metrics: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
    artisanGrade: string;
  };
  
  // Thermal & Architectural Engineering
  thermal: {
    tempF: number;
    tempC: number;
    thermalState: string;
    heatSignatureColor: string;
  };
  architecture: {
    thicknessMm: number;
    weightGrams: number;
    density: string;
    moisturePercent: number;
  };
  macroAnalysis: {
    cellularStructure: string;
    keyCompound: string;
    sensoryImpact: string;
  };
  xrayNotes: string;
  terroirCoords: {
    lat: number;
    lng: number;
    region: string;
    elevation: string;
    purveyor: string;
  };

  allergens: string[];
  pairing: string;
}

export const BURGER_LAYERS: BurgerLayer[] = [
  {
    id: "top-bun",
    index: 0,
    tierName: "Artisan 24k Gold Brioche Crown",
    shortName: "Brioche Crown",
    badge: "Tier 01 • The Canopy",
    image: "/assets/burger/layer-1-top-bun.jpg",
    offsetY: -340,
    rotateX: 22,
    scale: 1.05,
    scrollRange: [0.0, 0.20],
    focusProgress: 0.10,
    origin: "Normandy, France & Kyoto, Japan",
    flavorProfile: ["Toasted Butter", "Nutty Sesame", "Subtle Sweetness", "Golden Crust"],
    description: "48-hour slow-fermented French brioche enriched with AOP Charentes-Poitou cultured butter, finished with Japanese black sesame seeds and delicate 24-karat edible gold leaf flakes.",
    chefTechnique: "Steam-deck baked at 210°C to achieve a featherlight 68% hydration crumb with a high-gloss egg-wash shell.",
    metrics: {
      calories: 160,
      protein: "5g",
      fat: "6g",
      carbs: "22g",
      artisanGrade: "Grand Cru"
    },
    thermal: {
      tempF: 135,
      tempC: 57,
      thermalState: "Warm Glazed",
      heatSignatureColor: "#f59e0b"
    },
    architecture: {
      thicknessMm: 28,
      weightGrams: 55,
      density: "0.24 g/cm³ (Aerated Levain)",
      moisturePercent: 68
    },
    macroAnalysis: {
      cellularStructure: "Open honeycomb crumb with micro gelatinized gluten pockets.",
      keyCompound: "Maltol & Diacetyl (Toasted brioche aromatics)",
      sensoryImpact: "Provides velvety pillowy entry with zero roof-of-mouth resistance."
    },
    xrayNotes: "68% hydration levain alveoli cavities visible under 40kV radiography.",
    terroirCoords: {
      lat: 49.1828,
      lng: -0.3707,
      region: "Normandy Pastures, France",
      elevation: "115m ASL",
      purveyor: "Maison Isigny Sainte-Mère"
    },
    allergens: ["Gluten", "Dairy", "Sesame", "Egg"],
    pairing: "2012 Dom Pérignon Vintage Champagne"
  },
  {
    id: "truffle-sauce",
    index: 1,
    tierName: "Black Truffle & Bone Marrow Aioli",
    shortName: "Truffle Emulsion",
    badge: "Tier 02 • The Elixir",
    image: "/assets/burger/layer-2-sauce.jpg",
    offsetY: -225,
    rotateX: 16,
    scale: 1.02,
    scrollRange: [0.15, 0.35],
    focusProgress: 0.25,
    origin: "Périgord, France & Jerez, Spain",
    flavorProfile: ["Earthy Umami", "Roasted Garlic", "Silky Richness", "Aged Sherry"],
    description: "Hand-whisked emulsion of black winter truffles (Tuber melanosporum), roasted wagyu bone marrow, pasture-raised egg yolks, and 12-year Solera sherry vinegar.",
    chefTechnique: "Cold-infused for 72 hours under nitrogen pressure to capture the most volatile aromatic truffle terpenes.",
    metrics: {
      calories: 120,
      protein: "1g",
      fat: "13g",
      carbs: "1g",
      artisanGrade: "Reserve A++"
    },
    thermal: {
      tempF: 95,
      tempC: 35,
      thermalState: "Tempered Emulsion",
      heatSignatureColor: "#d97706"
    },
    architecture: {
      thicknessMm: 6,
      weightGrams: 28,
      density: "0.98 g/cm³ (Colloidal Suspension)",
      moisturePercent: 32
    },
    macroAnalysis: {
      cellularStructure: "Micronized lipid droplets (<5µm) locking volatile sulfur terpenes.",
      keyCompound: "Dimethyl sulfide & 2-Methylbutanal (Truffle umami essence)",
      sensoryImpact: "Coats the palate instantaneously, amplifying wagyu fat solubility."
    },
    xrayNotes: "Homogeneous colloidal phase with suspended 80-mesh truffle carpaccio specks.",
    terroirCoords: {
      lat: 45.1833,
      lng: 0.7167,
      region: "Périgord Oak Woods, France",
      elevation: "240m ASL",
      purveyor: "Domaine des Truffières Noires"
    },
    allergens: ["Egg"],
    pairing: "Barolo DOCG 2016, Piedmont"
  },
  {
    id: "butter-lettuce",
    index: 2,
    tierName: "Hydroponic Crisp Butter Lettuce",
    shortName: "Crisp Greens",
    badge: "Tier 03 • The Freshness",
    image: "/assets/burger/layer-3-lettuce.jpg",
    offsetY: -110,
    rotateX: 10,
    scale: 1.0,
    scrollRange: [0.30, 0.50],
    focusProgress: 0.40,
    origin: "Greenhouse Apex, Hudson Valley NY",
    flavorProfile: ["Crisp Snap", "Clean Sweetness", "Mineral Freshness"],
    description: "Living-root hydroponic butter lettuce harvested less than 4 hours before service, shock-chilled in volcanic mineral spring water for peak cellular crunch.",
    chefTechnique: "Delicately dressed in micro-droplets of cold-pressed Sicilian lemon oil to cut through the rich wagyu marbling.",
    metrics: {
      calories: 12,
      protein: "1g",
      fat: "0.2g",
      carbs: "2g",
      artisanGrade: "Living Harvest"
    },
    thermal: {
      tempF: 38,
      tempC: 3.3,
      thermalState: "Hydro-Chilled Crisp",
      heatSignatureColor: "#10b981"
    },
    architecture: {
      thicknessMm: 12,
      weightGrams: 22,
      density: "0.15 g/cm³ (Botanical Turgor)",
      moisturePercent: 94
    },
    macroAnalysis: {
      cellularStructure: "Turgid plant cells pressurized with mineral water for acoustic 58dB snap.",
      keyCompound: "Chlorophyll A/B & Hexanal (Botanical brightness)",
      sensoryImpact: "Provides refreshing acoustic crunch and tactile palate cleansing."
    },
    xrayNotes: "Translucent cellular leaf parenchyma with intact vascular vein networks.",
    terroirCoords: {
      lat: 41.7004,
      lng: -73.9210,
      region: "Hudson Valley Greenhouse, New York",
      elevation: "80m ASL",
      purveyor: "Apex Botanical Aeroponics"
    },
    allergens: [],
    pairing: "San Pellegrino Limonata Riserva"
  },
  {
    id: "wagyu-patty",
    index: 3,
    tierName: "Double Smashed A5 Miyazaki Wagyu & 18-Mo Cheddar",
    shortName: "Double Smashed Wagyu",
    badge: "Tier 04 • The Epicenter",
    image: "/assets/burger/layer-4-wagyu.jpg",
    offsetY: 0,
    rotateX: 0,
    scale: 1.1,
    scrollRange: [0.45, 0.70],
    focusProgress: 0.55,
    origin: "Miyazaki Prefecture, Japan & Somerset, UK",
    flavorProfile: ["Intense Umami", "Lacy Char Crust", "Buttery Beefiness", "Sharp Nutty Cheese"],
    description: "Twin 3.5oz patties of BMS 11 Miyazaki A5 Wagyu beef coarsely ground with dry-aged prime brisket fat, seared on a 650°F cast-iron plancha and draped with cave-aged 18-month Clothbound Somerset Cheddar.",
    chefTechnique: "Smash-laced technique with tallow-rendered edges to form an ultra-crispy Maillard reaction crust while locking in molten juices.",
    metrics: {
      calories: 540,
      protein: "48g",
      fat: "39g",
      carbs: "2g",
      artisanGrade: "A5 Miyazaki / BMS 11"
    },
    thermal: {
      tempF: 165,
      tempC: 74,
      thermalState: "650°F Plancha Sizzle",
      heatSignatureColor: "#ef4444"
    },
    architecture: {
      thicknessMm: 24,
      weightGrams: 210,
      density: "1.05 g/cm³ (High-Oleic Marbled Protein)",
      moisturePercent: 52
    },
    macroAnalysis: {
      cellularStructure: "Snowflake intramuscular lipid veins melting at human body temp (24°C).",
      keyCompound: "Oleic acid, Pyrazines & 2-Methylfuran (Maillard crust compounds)",
      sensoryImpact: "Explosive savory depth with velvety butter-like mouth-melt."
    },
    xrayNotes: "Dense protein matrix surrounded by molten monounsaturated fat channels.",
    terroirCoords: {
      lat: 31.9077,
      lng: 131.4202,
      region: "Miyazaki Highlands, Kyushu, Japan",
      elevation: "420m ASL",
      purveyor: "Miyachiku Wagyu Federation"
    },
    allergens: ["Dairy"],
    pairing: "Cabernet Sauvignon, Stag's Leap District"
  },
  {
    id: "caramelized-onions",
    index: 4,
    tierName: "6-Hour Balsamic Shallot Confit",
    shortName: "Shallot Confit",
    badge: "Tier 05 • The Reduction",
    image: "/assets/burger/layer-5-onions.jpg",
    offsetY: 115,
    rotateX: -10,
    scale: 1.0,
    scrollRange: [0.60, 0.80],
    focusProgress: 0.70,
    origin: "Modena, Italy & Walla Walla, WA",
    flavorProfile: ["Deep Jammy Caramel", "Acidity Tang", "Smoky Molasses"],
    description: "Heirloom French echalion shallots and sweet onions slowly reduced over hardwood coals for 6 hours in grass-fed wagyu tallow and finished with DOP 25-year Traditional Balsamic of Modena.",
    chefTechnique: "Triple-stage deglazing with reduced port wine and thyme sprigs to yield an unctuous sweet-savory jam.",
    metrics: {
      calories: 75,
      protein: "1g",
      fat: "3g",
      carbs: "11g",
      artisanGrade: "DOP Certified"
    },
    thermal: {
      tempF: 140,
      tempC: 60,
      thermalState: "Warm Jammy Confit",
      heatSignatureColor: "#ea580c"
    },
    architecture: {
      thicknessMm: 8,
      weightGrams: 35,
      density: "0.92 g/cm³ (Caramelized Reduction)",
      moisturePercent: 44
    },
    macroAnalysis: {
      cellularStructure: "Cell walls fully dissolved into unctuous pectin and fructose syrup.",
      keyCompound: "Hydroxymethylfurfural & Acetic Acid (Balsamic sweetness and tang)",
      sensoryImpact: "Provides luxurious acidity counterpoint cutting through rich wagyu tallow."
    },
    xrayNotes: "Non-crystalline amorphous sugar and fiber suspension.",
    terroirCoords: {
      lat: 44.6471,
      lng: 10.9252,
      region: "Modena Acetaia Estate, Italy",
      elevation: "34m ASL",
      purveyor: "Acetaia Giusti 1605"
    },
    allergens: [],
    pairing: "Vintage Tawny Port 20-Year"
  },
  {
    id: "tomatoes-pickles",
    index: 5,
    tierName: "Cherokee Purple Tomatoes & Barrel Pickles",
    shortName: "Heirloom & Pickles",
    badge: "Tier 06 • The Contrast",
    image: "/assets/burger/layer-6-tomatoes.jpg",
    offsetY: 225,
    rotateX: -16,
    scale: 1.02,
    scrollRange: [0.72, 0.90],
    focusProgress: 0.85,
    origin: "Sonoma Coast, California & Bourbon County, KY",
    flavorProfile: ["Vine Brightness", "Bourbon Dill", "Lactic Crunch", "Malty Snap"],
    description: "Thick hand-sliced organic Cherokee Purple heirloom tomatoes seasoned with hand-harvested Maldon smoked sea salt flakes, alongside 30-day Kentucky oak bourbon barrel-cured dill pickles.",
    chefTechnique: "Tomatoes salted 10 minutes prior to assembly to concentrate natural juices; pickles cold-brined with toasted mustard seeds and wild dill blossom.",
    metrics: {
      calories: 35,
      protein: "1g",
      fat: "0.5g",
      carbs: "7g",
      artisanGrade: "Estate Grown"
    },
    thermal: {
      tempF: 52,
      tempC: 11,
      thermalState: "Cool Seasoned",
      heatSignatureColor: "#059669"
    },
    architecture: {
      thicknessMm: 14,
      weightGrams: 60,
      density: "0.85 g/cm³ (Hydrated Flesh & Brine)",
      moisturePercent: 91
    },
    macroAnalysis: {
      cellularStructure: "High lycopene locular gel with intact lactic acid brine pores.",
      keyCompound: "Glutamic acid & Cis-3-Hexenol (Tomato savory sweetness & garden aroma)",
      sensoryImpact: "Releases a burst of savory juice with sharp lacto-fermented dill snap."
    },
    xrayNotes: "Dual locular seed cavities with surrounding high-density saline pericarp.",
    terroirCoords: {
      lat: 38.2919,
      lng: -122.4580,
      region: "Sonoma Coast Organic Farms, California",
      elevation: "65m ASL",
      purveyor: "Heirloom Seed Heritage Collective"
    },
    allergens: ["Mustard"],
    pairing: "Smoked Mezcal Paloma"
  },
  {
    id: "bottom-bun",
    index: 6,
    tierName: "Garlic Confit Toasted Brioche Heel",
    shortName: "Brioche Heel",
    badge: "Tier 07 • The Foundation",
    image: "/assets/burger/layer-7-bottom-bun.jpg",
    offsetY: 340,
    rotateX: -22,
    scale: 1.05,
    scrollRange: [0.85, 1.0],
    focusProgress: 0.98,
    origin: "Normandy, France",
    flavorProfile: ["Crunchy Base", "Garlic Butter", "Toasted Brioche", "Structure"],
    description: "Reinforced dense-crumb brioche base, griddled in slow-roasted garlic confit butter to create an impermeable crisp golden barrier that locks in the burger's legendary juices without sogginess.",
    chefTechnique: "Seared on plancha with weighted press for 90 seconds to crystallize a rigid caramel foundation.",
    metrics: {
      calories: 180,
      protein: "5g",
      fat: "7g",
      carbs: "24g",
      artisanGrade: "Grand Cru"
    },
    thermal: {
      tempF: 155,
      tempC: 68,
      thermalState: "Plancha Griddled Golden",
      heatSignatureColor: "#f59e0b"
    },
    architecture: {
      thicknessMm: 22,
      weightGrams: 50,
      density: "0.32 g/cm³ (Compressed & Caramelized)",
      moisturePercent: 48
    },
    macroAnalysis: {
      cellularStructure: "Crystallized outer lipid-seared crust with resilient internal crumb.",
      keyCompound: "Allicin metabolites & 2-Acetyl-1-pyrroline (Roasted garlic butter aroma)",
      sensoryImpact: "Delivers foundational crunch and structural integrity to the final bite."
    },
    xrayNotes: "Compressed basal crust forming impermeable hydrophobic lipid barrier.",
    terroirCoords: {
      lat: 49.1828,
      lng: -0.3707,
      region: "Normandy Pastures, France",
      elevation: "115m ASL",
      purveyor: "Maison Isigny Sainte-Mère"
    },
    allergens: ["Gluten", "Dairy", "Egg"],
    pairing: "Craft Smoked Amber Ale"
  }
];

export const WHOLE_BURGER_SPECS = {
  name: "The Obsidian Wagyu Reserve",
  subtitle: "The Pinnacle of Architectural Gastronomy",
  price: "$38.00",
  totalCalories: 1122,
  totalProtein: "62g",
  totalFat: "68.7g",
  totalCarbs: "67g",
  cookTime: "8 mins",
  craftingOrigin: "Tokyo • Paris • New York",
  awards: [
    "Michelin Guide Select 2026",
    "World's 50 Best Gastronomy Innovation",
    "Gold Palate Grand Trophy"
  ]
};

export interface MenuItem {
  id: string;
  name: string;
  category: "Burgers" | "Sides & Frites" | "Elixirs & Shakes";
  price: string;
  numericPrice: number;
  calories: number;
  tag: string;
  description: string;
  image: string;
  highlights: string[];
  pairing: string;
}

export const SIGNATURE_MENU: MenuItem[] = [
  {
    id: "obsidian-reserve",
    name: "The Obsidian Wagyu Reserve",
    category: "Burgers",
    price: "$38.00",
    numericPrice: 38,
    calories: 1122,
    tag: "Flagship Edition",
    description: "Double smashed A5 Miyazaki Wagyu, Périgord black truffle emulsion, 48-hr brioche crown dusted in 24k gold leaf, 18-month Clothbound Cheddar.",
    image: "/assets/burger/hero.jpg",
    highlights: ["A5 Miyazaki Wagyu", "24k Gold Leaf", "Black Truffle Aioli", "48h Brioche"],
    pairing: "2012 Dom Pérignon Vintage"
  },
  {
    id: "imperial-foie-gras",
    name: "The Imperial Périgord & Foie Gras",
    category: "Burgers",
    price: "$54.00",
    numericPrice: 54,
    calories: 1290,
    tag: "Chef's Private Cut",
    description: "Pan-seared French duck foie gras escalope atop thick-cut BMS 12 Wagyu tenderloin patty, black winter truffle carpaccio, and Alpine Gruyère.",
    image: "/assets/menu/truffle-foie.jpg",
    highlights: ["French Foie Gras", "Truffle Carpaccio", "BMS 12 Tenderloin", "Alpine Gruyère"],
    pairing: "2015 Château d'Yquem Sauternes"
  },
  {
    id: "tallow-truffle-frites",
    name: "Triple-Cooked Wagyu Tallow Frites",
    category: "Sides & Frites",
    price: "$18.00",
    numericPrice: 18,
    calories: 420,
    tag: "Signature Side",
    description: "Hand-cut Kennebec potatoes triple-fried in clarified Wagyu beef tallow, finished with shaved black truffles, 24-month Parmigiano-Reggiano, and smoked sea salt.",
    image: "/assets/menu/wagyu-frites.jpg",
    highlights: ["Wagyu Beef Tallow", "Shaved Black Truffle", "Parmigiano-Reggiano", "Maldon Smoke Salt"],
    pairing: "Belgian Trappist Tripel"
  },
  {
    id: "gold-vanilla-shake",
    name: "24k Gold Smoked Vanilla Gelato Shake",
    category: "Elixirs & Shakes",
    price: "$22.00",
    numericPrice: 22,
    calories: 560,
    tag: "Dessert Grand Cru",
    description: "A2 Jersey cow double cream spun with wood-smoked Madagascar bourbon vanilla bean gelato, salted caramel ribbon, black truffle dust, and edible 24k gold flake.",
    image: "/assets/menu/gold-shake.jpg",
    highlights: ["Madagascar Vanilla", "Edible 24k Gold", "A2 Double Cream", "Black Truffle Dust"],
    pairing: "Espresso Corretto con Grappa"
  }
];

export const CRITIQUES = [
  {
    quote: "A staggering triumph of culinary engineering. The structural separation of textures and flavors achieves what few Michelin three-star kitchens have ever dared to attempt with a burger.",
    author: "Elena Rostova",
    title: "Chief Gastronomy Critic, Michelin Guide International",
    outlet: "Michelin Select Review 2026",
    rating: "⭐⭐⭐ Extraordinary"
  },
  {
    quote: "The Maillard crust on the Miyazaki Wagyu is nothing short of miraculous, and the 48-hour brioche with 24k gold feels like dining inside a private Parisian salon.",
    author: "Marcus Sterling",
    title: "Senior Food & Wine Editor",
    outlet: "The New York Times Dining",
    rating: "Critic's Top Pick"
  },
  {
    quote: "Obsidian Reserve has rewritten the playbook for luxury street-gastronomy. Every single tier is a masterclass in culinary balance.",
    author: "Kenji Takahashi",
    title: "President, Tokyo Culinary Academy",
    outlet: "Tokyo Gourmet Gazette",
    rating: "10/10 Benchmark"
  }
];

export const FAQS = [
  {
    q: "How is the A5 Miyazaki Wagyu authenticated?",
    a: "Every shipment of our Miyazaki Wagyu comes accompanied by an authentic Japanese Beef Marbling Standard (BMS 11/12) pedigree certificate, lineage registration, and nose-print verification directly from Miyazaki Prefecture, Kyushu."
  },
  {
    q: "Can I customize dietary restrictions (Halal, Gluten-Free, Dairy-Free)?",
    a: "Yes. We offer Certified 100% Halal Wagyu cuts upon request, house-crafted gluten-free gold brioche buns, and dairy-free aged cheese alternatives in our 3D Customizer Studio."
  },
  {
    q: "What is the daily allocation limit?",
    a: "Due to our 48-hour levain fermentation and 72-hour cold truffle nitrogen infusion, each flagship atelier crafts strictly 50 numbered burgers per service."
  },
  {
    q: "How does the VIP Table Reservation and Chef's Counter work?",
    a: "VIP reservations include priority seating at the Plancha Chef's Counter, a private sommelier consultation, and a bespoke customized numbered certificate signed by Executive Chef Antoine Kuroda."
  }
];

// =========================================================================
// NEW SECTION DATA: 650°F MAILLARD PLANCHA SEAR CHEMISTRY
// =========================================================================
export const PLANCHA_CHEMISTRY = [
  {
    tempF: 400,
    phase: "Sub-Maillard Moisture Evaporation",
    color: "#3b82f6",
    description: "Surface moisture turns to micro-steam. Amino acids begin active alignment with reducing sugars.",
    crustCrispness: "15%",
    juicinessRetention: "98%"
  },
  {
    tempF: 525,
    phase: "Amino Acid Cross-Polymerization",
    color: "#f59e0b",
    description: "Pyrazines and furans unlock deep roasted hazelnut and caramelized tallow aromas.",
    crustCrispness: "55%",
    juicinessRetention: "94%"
  },
  {
    tempF: 650,
    phase: "The Golden Apex (Our Standard)",
    color: "#ef4444",
    description: "Instantaneous smash creates a paper-thin lacy char crust, locking 100% of molten oleic juices within.",
    crustCrispness: "100%",
    juicinessRetention: "99%"
  },
  {
    tempF: 750,
    phase: "Thermal Pyrolysis Zone",
    color: "#7c2d12",
    description: "Extreme surface carbonization; tallow begins rapid thermal decomposition.",
    crustCrispness: "120% (Bitter)",
    juicinessRetention: "82%"
  }
];

// =========================================================================
// NEW SECTION DATA: GLOBAL TERROIR & SOURCING PROVENANCE VOYAGE
// =========================================================================
export interface TerroirDestination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  ingredient: string;
  terroirNote: string;
  purveyor: string;
  elevation: string;
  harvestCycle: string;
  badge: string;
}

export const GLOBAL_TERROIR_DESTINATIONS: TerroirDestination[] = [
  {
    id: "kyushu-wagyu",
    name: "Miyazaki Prefecture",
    country: "Kyushu, Japan",
    lat: 31.9077,
    lng: 131.4202,
    ingredient: "A5 Miyazaki Wagyu Beef (BMS 11)",
    terroirNote: "Volcanic mineral water springs and roasted malt barley feed yields pure oleic marbling melting at 24°C.",
    purveyor: "Miyachiku Agricultural Federation",
    elevation: "420m ASL",
    harvestCycle: "30-Month Grain Fed",
    badge: "Wagyu Prime Capital"
  },
  {
    id: "perigord-truffle",
    name: "Oak Woodlands of Périgord",
    country: "Dordogne, France",
    lat: 45.1833,
    lng: 0.7167,
    ingredient: "Black Winter Diamond Truffles (Tuber melanosporum)",
    terroirNote: "Limestone-rich alkaline soil beneath ancient white oaks yielding intense sulfurous umami terpenes.",
    purveyor: "Domaine des Truffières Noires",
    elevation: "240m ASL",
    harvestCycle: "Winter Frost Forage",
    badge: "Black Diamond Reserve"
  },
  {
    id: "normandy-butter",
    name: "Normandy Pastures",
    country: "Normandy, France",
    lat: 49.1828,
    lng: -0.3707,
    ingredient: "AOP Charentes-Poitou Cultured Butter & Brioche Flour",
    terroirNote: "Coastal oceanic maritime climate providing grass rich in beta-carotene for deep golden butter.",
    purveyor: "Isigny Sainte-Mère Cooperative",
    elevation: "115m ASL",
    harvestCycle: "48-Hour Churn & Ferment",
    badge: "AOP Heritage Gold"
  },
  {
    id: "modena-balsamic",
    name: "Acetaia Giusti Attics",
    country: "Modena, Emilia-Romagna, Italy",
    lat: 44.6471,
    lng: 10.9252,
    ingredient: "25-Year Traditional DOP Balsamic Vinegar",
    terroirNote: "Aged in century-old battery casks of oak, chestnut, cherry, ash, and mulberry wood.",
    purveyor: "Acetaia Giusti 1605",
    elevation: "34m ASL",
    harvestCycle: "25-Year Solera Aging",
    badge: "DOP Gold Seal"
  },
  {
    id: "hudson-botanicals",
    name: "Hudson Valley Greenhouse",
    country: "New York, USA",
    lat: 41.7004,
    lng: -73.9210,
    ingredient: "Living-Root Hydroponic Butter Lettuce",
    terroirNote: "Pure Catskill mountain filtered water with closed-loop solar nutrition for crisp 58dB cellular snap.",
    purveyor: "Apex Botanical Aeroponics",
    elevation: "80m ASL",
    harvestCycle: "Harvested <4h Pre-Service",
    badge: "Zero-Mile Pure Harvest"
  }
];

// =========================================================================
// NEW SECTION DATA: 8-MINUTE KITCHEN ATELIER TIMELINE CHOREOGRAPHY
// =========================================================================
export interface AtelierStep {
  timeLabel: string;
  seconds: number;
  stageName: string;
  chefAction: string;
  temperature: string;
  equipment: string;
  sensoryCue: string;
}

export const ATELIER_TIMELINE_STEPS: AtelierStep[] = [
  {
    timeLabel: "00:00",
    seconds: 0,
    stageName: "Brioche Heel & Crown Sear",
    chefAction: "Infuse 48-hr brioche with whipped garlic confit butter on 380°F chrome plancha for 90 seconds under weighted cast iron.",
    temperature: "380°F (193°C)",
    equipment: "Mirrored Chrome Griddle",
    sensoryCue: "Aroma of toasted cultured butter and caramelized yeast fills the atelier."
  },
  {
    timeLabel: "02:15",
    stageName: "Double Miyazaki Wagyu Smash",
    seconds: 135,
    chefAction: "Twin 3.5oz BMS 11 Miyazaki balls placed on 650°F cast-iron plancha. Smashed flat with 25kg hydraulic hand-press in under 3 seconds.",
    temperature: "650°F (343°C)",
    equipment: "Heavy Plancha & Cast-Iron Smasher",
    sensoryCue: "Explosive 78dB sizzle as wagyu fat renders into a lacy caramel web."
  },
  {
    timeLabel: "04:30",
    stageName: "Clothbound Cheddar Steam Dome",
    seconds: 270,
    chefAction: "18-month Somerset cheddar slices draped over sizzling patties, covered with stainless cloche and injected with 5ml bone broth steam.",
    temperature: "212°F (100°C) Steam",
    equipment: "Stainless Infusion Cloche",
    sensoryCue: "Cheese melts into a glossy molten blanket sealing all patty juices."
  },
  {
    timeLabel: "06:15",
    stageName: "Architectural Stacking & Truffle Cascade",
    seconds: 375,
    chefAction: "Bottom heel layered with 6-hr shallot confit, heirloom tomatoes, double wagyu stack, crisp hydroponic greens, and Périgord truffle aioli.",
    temperature: "Balanced Dynamic Range",
    equipment: "Precision Culinary Tweezers & Spatula",
    sensoryCue: "Deep aroma of earthy black winter truffles and balsamic reduction."
  },
  {
    timeLabel: "07:45",
    stageName: "24k Gold Leaf Flaking & Numbered Vaulting",
    seconds: 465,
    chefAction: "Brioche crown crowned with hand-gilded 24k Japanese gold leaf, transferred to titanium humidor, sealed with numbered certificate.",
    temperature: "Optimized 148°F Core",
    equipment: "Bamboo Gilding Tongs & Titanium Humidor",
    sensoryCue: "Shimmering gold canopy reflects the warm glow of the atelier heat lamps."
  }
];

// =========================================================================
// NEW SECTION DATA: BESPOKE PACKAGING & UNBOXING SUITE
// =========================================================================
export const UNBOXING_SPECS = {
  casing: "Anodized Aerospace Titanium & Matte Obsidian Vault",
  insulation: "Dual-Wall Vacuum Thermal Insulation (Maintains 65°C for 45 Mins)",
  lining: "Micro-Suede & Japanese Carbon Fiber Shock Absorber",
  includedAccoutrements: [
    "Individually Numbered Gold-Embossed Lineage Certificate",
    "Chef Antoine Kuroda Signature Tasting Dossier",
    "Pair of Black Nitrile Epicurean Handling Gloves",
    "Micro-Spritzer of Solera Sherry Truffle Essence"
  ],
  dimensions: "220mm x 220mm x 145mm",
  weight: "1.45 kg (Including Presentation Case)"
};

// =========================================================================
// NEW SECTION DATA: VIP CHEF'S TABLE RESERVATION PACKAGES
// =========================================================================
export interface VIPPackage {
  id: string;
  name: string;
  price: string;
  tagline: string;
  capacity: string;
  features: string[];
  deposit: string;
}

export const VIP_PACKAGES: VIPPackage[] = [
  {
    id: "plancha-counter",
    name: "The Plancha Chef's Counter",
    price: "$120 / Guest",
    tagline: "Front-row seat to the 650°F Maillard spectacle",
    capacity: "Solo / Couples (Max 4)",
    features: [
      "Obsidian Reserve Burger with BMS 11 Wagyu",
      "Triple-Cooked Wagyu Tallow Frites with Shaved Truffles",
      "Glass of 2012 Dom Pérignon Vintage",
      "Direct live banter with Master Chef Kuroda",
      "Numbered Laser-Engraved VIP Coin"
    ],
    deposit: "$50 per guest"
  },
  {
    id: "sommelier-salon",
    name: "Private Sommelier Cellar Salon",
    price: "$240 / Guest",
    tagline: "Exclusive 5-course gastronomic pairing flight",
    capacity: "Private Groups (2 - 8 Guests)",
    features: [
      "The Imperial Périgord & Foie Gras Burger",
      "Full Grand Cru 4-Glass Wine Pairing Flight",
      "24k Gold Smoked Gelato Shake Intermezzo",
      "Dedicated Sommelier Table Consultation",
      "Bespoke Wooden Presentation Case Gift"
    ],
    deposit: "$100 per guest"
  },
  {
    id: "royal-atelier",
    name: "The Imperial Kuroda Atelier Buyout",
    price: "$1,800 / Evening",
    tagline: "Entire atelier reserved exclusively for your party",
    capacity: "Private Party (Up to 12 Guests)",
    features: [
      "Unrestricted access to all Haute Carte menu creations",
      "Rare BMS 12 Imperial Wagyu Cut allocations",
      "Vintage Champagne & Rare Bourbon Tastings",
      "Custom personalized menu signed by the culinary board",
      "Delivered in custom titanium vaults for all guests"
    ],
    deposit: "$500"
  }
];

// =========================================================================
// NEW SECTION DATA: CONNOISSEUR COMMUNITY REVIEWS & FEED
// =========================================================================
export const EPICUREAN_REVIEWS = [
  {
    id: "rev-1",
    author: "Lord Julian Vance",
    city: "London, UK",
    badge: "Grand Cru Member",
    rating: 5,
    title: "An Architectural Marvel of Flavor",
    text: "The structural separation of the 7 layers creates a symphony of textures I have never experienced anywhere in Mayfair or Tokyo. The wagyu fat renders instantly at body temperature.",
    favoriteLayer: "Double Smashed BMS 11 Miyazaki Wagyu",
    date: "March 2026",
    verified: true
  },
  {
    id: "rev-2",
    author: "Dr. Simone Dubois",
    city: "Paris, France",
    badge: "Gastronomy Fellow",
    rating: 5,
    title: "Périgord Truffle Emulsion is Masterful",
    text: "Cold nitrogen infusion captures the wild volatile aroma of winter truffles without the acrid burnt notes typical of cooked truffles. The 48-hour brioche is pure cloud.",
    favoriteLayer: "Black Truffle & Bone Marrow Aioli",
    date: "February 2026",
    verified: true
  },
  {
    id: "rev-3",
    author: "Kenzo Miyamoto",
    city: "Tokyo, Japan",
    badge: "Wagyu Master Assessor",
    rating: 5,
    title: "Authentic Miyazaki Quality in Every Bite",
    text: "The lacy Maillard crust locked the sweet beef fats with perfection. Searing at 650°F gives it that incomparable plancha crunch that contrasts the brioche.",
    favoriteLayer: "650°F Maillard Plancha Sear",
    date: "March 2026",
    verified: true
  }
];
