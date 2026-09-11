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
    offsetY: -350,
    rotateX: 24,
    scale: 1.05,
    scrollRange: [0.0, 0.22],
    focusProgress: 0.12,
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
    offsetY: -230,
    rotateX: 18,
    scale: 1.02,
    scrollRange: [0.15, 0.38],
    focusProgress: 0.26,
    origin: "Périgord, France",
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
    offsetY: -115,
    rotateX: 12,
    scale: 1.0,
    scrollRange: [0.30, 0.52],
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
    scale: 1.08,
    scrollRange: [0.45, 0.72],
    focusProgress: 0.55,
    origin: "Miyazaki Prefecture, Japan & Somerset, UK",
    flavorProfile: ["Intense Umami", "Lacy Char Crusta", "Buttery Beefiness", "Sharp Nutty Cheese"],
    description: "Twin 3.5oz patties of BMS 11 Miyazaki A5 Wagyu beef coarsely ground with dry-aged prime brisket fat, seared on a 650°F cast-iron plancha and draped with cave-aged 18-month Clothbound Somerset Cheddar.",
    chefTechnique: "Smash-laced technique with tallow-rendered edges to form an ultra-crispy Maillard reaction crust while locking in molten juices.",
    metrics: {
      calories: 540,
      protein: "48g",
      fat: "39g",
      carbs: "2g",
      artisanGrade: "A5 Miyazaki / BMS 11"
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
    rotateX: -12,
    scale: 1.0,
    scrollRange: [0.60, 0.82],
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
    offsetY: 230,
    rotateX: -18,
    scale: 1.02,
    scrollRange: [0.72, 0.92],
    focusProgress: 0.83,
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
    offsetY: 350,
    rotateX: -24,
    scale: 1.05,
    scrollRange: [0.82, 1.0],
    focusProgress: 0.95,
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
