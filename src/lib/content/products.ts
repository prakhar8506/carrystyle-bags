export interface ProductCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  moq: string;
  materialOptions: string[];
  printTechniques: string[];
  image: string;
  bgGradient: string;
  popularFor: string;
  specs: {
    weightGSM: string;
    handleTypes: string;
    durability: string;
  };
}

export const PRODUCTS: ProductCategory[] = [
  {
    id: "canvas-tote",
    name: "Heavyweight Canvas Tote Bags",
    tagline: "Organic cotton canvas with gold-foil damask or multi-color print",
    description: "Our signature product. Premium 280–400 GSM natural canvas engineered for luxury retail, corporate merchandise, and high-end giveaways.",
    moq: "100 Units",
    materialOptions: ["Organic Cotton Canvas (280 GSM)", "Heavy Utility Canvas (350 GSM)", "Recycled Denim Fabric"],
    printTechniques: ["Gold / Silver Foil Stamping", "Screen Printing", "High-Density Embroidery"],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-amber-950/20 to-navy/30",
    popularFor: "Corporate Gifting, Boutique Brands, Fashion Merch",
    specs: {
      weightGSM: "280 - 420 GSM",
      handleTypes: "Padded Cotton Webbing, Self-Fabric Handles",
      durability: "Holds up to 15 kg",
    }
  },
  {
    id: "jute-eco",
    name: "Premium Eco Jute & Juco Bags",
    tagline: "Natural biodegradable fiber with laminated water-resistant interior",
    description: "Sustainable, sturdy jute bags with cotton padding handles. Ideal for grocery chains, eco-friendly corporate initiatives, and export promotions.",
    moq: "150 Units",
    materialOptions: ["100% Natural Golden Jute", "Juco (Jute-Cotton Blend)", "Bleached White Jute"],
    printTechniques: ["Azo-Free Screen Print", "Rubberized Logo Embossing"],
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-emerald-950/20 to-navy/30",
    popularFor: "Eco Conferences, Retail Supermarkets, Export Fair Giveaways",
    specs: {
      weightGSM: "300 - 350 GSM",
      handleTypes: "Cotton Rope, Padded Cane Handle",
      durability: "Holds up to 20 kg",
    }
  },
  {
    id: "non-woven",
    name: "High-Volume Non-Woven Bags",
    tagline: "Lightweight, reusable, budget-friendly bags for mass distribution",
    description: "Built for maximum volume and lowest cost per unit. D-cut, W-cut, and box-loop styles crafted for trade shows, retail shopping, and expo bags.",
    moq: "500 Units",
    materialOptions: ["70 GSM Standard Non-Woven", "90 GSM Heavy Non-Woven", "Ultrasonic Sealed Bond"],
    printTechniques: ["Rotary Flexo Printing", "Multi-Color Screen Printing"],
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-teal-950/20 to-navy/30",
    popularFor: "Exhibitions, Trade Shows, Retail Shopping Chains",
    specs: {
      weightGSM: "60 - 100 GSM",
      handleTypes: "D-Cut Punch, Loop Handle",
      durability: "Holds up to 8 kg",
    }
  },
  {
    id: "corporate-laptop",
    name: "Executive Corporate Laptop Bags",
    tagline: "Multi-compartment padded polyester & vegan leather backpacks",
    description: "Designed for corporate employee onboarding and VIP client kits. Weatherproof polyester with padded 15.6\" laptop sleeves and USB pass-through.",
    moq: "100 Units",
    materialOptions: ["1680D Ballistic Polyester", "Vegan Leather Accents", "Waterproof Nylon"],
    printTechniques: ["Metallic Crest Plate", "3D Embroidery", "Debossed Leather Patch"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-blue-950/20 to-navy/30",
    popularFor: "Employee Welcome Kits, Tech Companies, Executive Offsites",
    specs: {
      weightGSM: "600D - 1680D Nylon",
      handleTypes: "Reinforced Ergonomic Straps",
      durability: "Padded Shockproof Frame",
    }
  },
  {
    id: "drawstring-pouch",
    name: "Event & Athletic Drawstring Pouches",
    tagline: "Flexible cinch-up bags for marathons, colleges, and festivals",
    description: "Compact drawstring backpacks crafted from durable polyester or soft cotton jersey. Quick cinching rope closure with metal eyelet reinforcement.",
    moq: "200 Units",
    materialOptions: ["210D Polyester", "Organic Cotton Jersey", "Reflective Safety Fabric"],
    printTechniques: ["Reflective Night-Glow Print", "DTG Full Color", "Sublimation"],
    image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-purple-950/20 to-navy/30",
    popularFor: "Marathons, University Orientations, Sports Clubs",
    specs: {
      weightGSM: "180 - 220 GSM",
      handleTypes: "Heavy Cord Drawstring with Metal Eyelets",
      durability: "Holds up to 10 kg",
    }
  },
  {
    id: "luxury-packaging",
    name: "Gold-Foil Gift & Packaging Pouches",
    tagline: "Velvet, satin, and stiffened cotton pouches with ribbon drawstrings",
    description: "Elevate your product packaging. Ornate jewelry, perfume, and luxury product pouches customized with gold foil stamping and custom cartouche frames.",
    moq: "250 Units",
    materialOptions: ["Plush Velvet", "Pure Silk Satin", "Stiffened Linen Cotton"],
    printTechniques: ["Hot Foil Damask Stamping", "Gold Thread Tassels"],
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-yellow-950/20 to-navy/30",
    popularFor: "Jewelry Brands, Cosmetic Packaging, Luxury Event Favors",
    specs: {
      weightGSM: "250 - 320 GSM",
      handleTypes: "Satin Ribbon Pull, Braided Gold Cord",
      durability: "Delicate Velvet Finish",
    }
  }
];
