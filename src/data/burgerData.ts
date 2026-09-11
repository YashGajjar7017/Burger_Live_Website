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
    offsetY: -320,
    rotateX: 20,
    scale: 1.04,
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
    offsetY: -210,
    rotateX: 14,
    scale: 1.02,
    scrollRange: [0.15, 0.35],
    focusProgress: 0.25,
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
    offsetY: -105,
    rotateX: 8,
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
    offsetY: 105,
    rotateX: -8,
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
    offsetY: 210,
    rotateX: -14,
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
    offsetY: 320,
    rotateX: -20,
    scale: 1.04,
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
