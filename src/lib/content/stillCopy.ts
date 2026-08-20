export interface BagPalette {
  ink: string;
  muted: string;
  accent: string;
  wash: string;
  line: string;
  ctaBg: string;
  ctaFg: string;
  serialIdle: string;
  numberStroke: string;
}

export interface BagType {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  materialTag: string;
  shortDesc: string;
  description: string;
  accentColor: string;
  accentHex: string;
  bgGlow: string;
  modelSrc: string;
  palette: BagPalette;
  specsCallouts: {
    material: string;
    printMethod: string;
    sizeRange: string;
    moq: string;
  };
  activeCapacity: string;
}

export const STILL_COPY = {
  brand: {
    wordmark: "CARRYSTYLE",
    tagline: "Bags, built for scale. Crafted with precision.",
    subtagline: "High-volume custom bag manufacturing crafted in Mumbai & NCR, India.",
    location: "Mumbai & NCR, India",
  },
  hero: {
    step: "01",
    label: "Manufacturing",
    headline: "Custom bags at factory scale, direct from Carrystyle.",
    description: "We engineer and produce branded carry bags for India's leading corporates — canvas totes, laminated jute shoppers, and executive gift bags — from our Mumbai and NCR facilities.",
    metrics: {
      capacity: "50,000+",
      capacityLabel: "bags / month",
      leadTime: "0",
      leadTimeLabel: "middleman markup",
    }
  },
  expanded: {
    step: "01",
    label: "The Collection",
    headline: "Custom bags at factory scale, for every brand.",
    description: "We engineer and produce branded carry bags for India's leading corporates — canvas totes, laminated jute shoppers, and executive gift bags — from our Mumbai and NCR facilities.",
    stats: "50,000+ bags / month · 0 middleman markup",
    aside: {
      kicker: "02 / Canvas tote",
      title: "Heavyweight Canvas Tote",
      note: "Double-stitched 10 oz cotton, cut and sewn in Mumbai and NCR.",
      specs: [
        { label: "Material", value: "10 oz / 340 GSM organic cotton" },
        { label: "Print", value: "Screen or heat transfer, 6 colours" },
        { label: "Size", value: "38 × 42 × 10 cm" },
        { label: "MOQ", value: "100 units" },
      ],
    },
  },
  bagTypes: [
    {
      id: "gift-bag",
      num: "01",
      name: "Premium Corporate Gift Bag",
      subtitle: "events & executive gifting",
      materialTag: "Matte Laminated Art Paper & Rope Handles",
      shortDesc: "Structured gift bag with reinforced base board, matte lamination, and cotton rope handles — built for product launches and client gifting.",
      description: "Our signature corporate gift bag features a rigid bottom insert, double rope handle attachment, and full-panel custom print. Ideal for luxury retail, hotel amenities, and boardroom presentations.",
      accentColor: "#E8DFD0",
      accentHex: "#C4A574",
      bgGlow: "radial-blur-cream",
      modelSrc: "/models/tote-bag.glb",
      palette: {
        ink: "#2C2416",
        muted: "#9A8B74",
        accent: "#C4A574",
        wash: "#F3EEE4",
        line: "rgba(196, 165, 116, 0.35)",
        ctaBg: "#3D3229",
        ctaFg: "#F7F1E6",
        serialIdle: "#C4B8A4",
        numberStroke: "rgba(61, 50, 41, 0.10)",
      },
      specsCallouts: {
        material: "300 GSM Art Paper + 2mm Grey Board Base",
        printMethod: "Offset + Spot UV / Foil Stamping",
        sizeRange: "25 × 10 × 32 cm (Custom dies available)",
        moq: "500 Units",
      },
      activeCapacity: "40,000",
    },
    {
      id: "canvas-tote",
      num: "02",
      name: "Heavyweight Canvas Tote",
      subtitle: "retail & conference carry",
      materialTag: "10 oz Unbleached Cotton Canvas",
      shortDesc: "Double-stitched organic cotton tote with reinforced stress points and a wide print panel for bold brand graphics.",
      description: "Engineered for trade shows, retail checkout, and employee welcome kits. Cross-box handle stitching and gusseted sides hold up to 8 kg without tearing.",
      accentColor: "#E8EEF4",
      accentHex: "#7A8FA3",
      bgGlow: "radial-blur-cloud",
      modelSrc: "/models/white-bag.glb",
      palette: {
        ink: "#2A3544",
        muted: "#8A96A6",
        accent: "#6D8499",
        wash: "#EEF1F4",
        line: "rgba(109, 132, 153, 0.28)",
        ctaBg: "#2A3544",
        ctaFg: "#F7F9FB",
        serialIdle: "#B7C0CA",
        numberStroke: "rgba(42, 53, 68, 0.10)",
      },
      specsCallouts: {
        material: "10 oz / 340 GSM Organic Cotton Canvas",
        printMethod: "Screen Print or Heat Transfer (up to 6 colours)",
        sizeRange: "38 × 42 × 10 cm",
        moq: "100 Units",
      },
      activeCapacity: "50,000",
    },
    {
      id: "eco-jute",
      num: "03",
      name: "Laminated Eco Jute Shopper",
      subtitle: "sustainable retail & export",
      materialTag: "Natural Golden Jute with PE Lamination",
      shortDesc: "Water-resistant laminated jute shopper with padded cotton rope handles — the go-to bag for eco-conscious retail chains.",
      description: "Built for supermarket chains, export consignments, and green-brand campaigns. Laminated interior prevents moisture bleed; handles tested to 20 kg load.",
      accentColor: "#F3D5D8",
      accentHex: "#C98990",
      bgGlow: "radial-blur-blush",
      modelSrc: "/models/pink-bag.glb",
      palette: {
        ink: "#5C2A2E",
        muted: "#C4A8A9",
        accent: "#D4787C",
        wash: "#F6EBE8",
        line: "rgba(212, 120, 124, 0.32)",
        ctaBg: "#6B3034",
        ctaFg: "#FBF6F3",
        serialIdle: "#E0C4C2",
        numberStroke: "rgba(107, 48, 52, 0.12)",
      },
      specsCallouts: {
        material: "320 GSM Laminated Natural Jute / Juco Blend",
        printMethod: "Azo-Free Multi-Pass Screen Print",
        sizeRange: "40 × 35 × 15 cm",
        moq: "150 Units",
      },
      activeCapacity: "35,000",
    }
  ] as BagType[],

  craftsmanship: {
    sectionNum: "03",
    label: "How We Build",
    headline: "Inside.",
    subtitle: "FOUR MATERIALS. TWO FACTORIES. FIFTEEN YEARS OF PRODUCTION KNOW-HOW.",
    ingredients: [
      {
        id: "gold-foil",
        num: "01 / 04",
        title: "L-GOLD FOIL",
        latin: "Hot-stamp foil finishing",
        description: "Metallic foil is pressed through custom brass dies at 175–185°C, bonding directly into paper and canvas fibres. On corporate gift bags, crests and monograms hold their edge through a full event season without lifting or flaking.",
        source: "In-house die-cutting shop",
        role: "Crests, monograms, VIP packaging",
        dose: "24k",
        doseTotal: "Metallic foil grade",
        accentHex: "#BCD3D8",
        progress: 0.85,
      },
      {
        id: "canvas",
        num: "02 / 04",
        title: "ORGANIC CANVAS",
        latin: "Unbleached cotton weave",
        description: "We work with 10–12 oz unbleached cotton, spread and cut before stitching. The tight plain weave keeps screen-ink registration sharp across large tote panels and stops gussets from sagging under a full load.",
        source: "South India cotton mills",
        role: "Tote bodies, reinforced handles",
        dose: "340",
        doseTotal: "GSM base weight",
        accentHex: "#E8C9A0",
        progress: 0.75,
      },
      {
        id: "embroidery",
        num: "03 / 04",
        title: "3D EMBROIDERY",
        latin: "Multi-head machine stitching",
        description: "Twelve-head Tajima looms run corporate crests at up to 15,000 stitches per logo. We layer underlay passes so raised thread work survives strap wear on backpacks and repeated washing on uniform bags.",
        source: "On-floor embroidery bay",
        role: "Logos on nylon and canvas",
        dose: "12,000",
        doseTotal: "Stitches per crest",
        accentHex: "#C9B5C8",
        progress: 0.90,
      },
      {
        id: "azo-free",
        num: "04 / 04",
        title: "AZO-FREE INKS",
        latin: "Water-based screen pigments",
        description: "Every jute and canvas run we export uses water-based pigments with zero azo compounds. Colours are oven-cured after each screen pass so multi-layer builds stay colourfast through Indian monsoon humidity.",
        source: "Certified pigment suppliers",
        role: "Screen print on jute and canvas",
        dose: "100%",
        doseTotal: "Azo-free compliant",
        accentHex: "#6FA23A",
        progress: 1.0,
      }
    ]
  },

  story: {
    sectionNum: "04",
    label: "STORY",
    headline: "Quietly built over fifteen years.",
    body: "Carrystyle began in 2008 as a quiet rejection of cheap disposable bags. Four core bag architectures, direct factory production, fifteen years of engineering, built to feel like baseline quality, not a short-term trend.",
    figures: [
      {
        year: "2008",
        figNum: "01",
        caption: "First cutting table & manual screen press, Mumbai factory floor, 2008",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=75",
      },
      {
        year: "2015",
        figNum: "02",
        caption: "Commissioning 24k gold foil stamping press & automated cutter, 2015",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=75",
      },
      {
        year: "2021",
        figNum: "03",
        caption: "Expanding monthly production capacity past 50,000 units, 2021",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=75",
      },
      {
        year: "2026",
        figNum: "04",
        caption: "Pan-India express logistics hub & export fulfillment launch, 2026",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=75",
      }
    ]
  },

  stockists: {
    headline: "Who We Work With",
    subtitle: "Carrystyle supplies bag programs across hospitality, corporate procurement, retail, and export — from single-event runs to recurring monthly orders.",
    categories: [
      {
        title: "Luxury Hospitality & Retail",
        description: "Gift bags, amenity totes, and branded carry for hotels, boutiques, and flagship stores that need consistent foil quality and tight delivery windows.",
      },
      {
        title: "Corporate & Institutional",
        description: "Onboarding kits, conference totes, and executive gifting for procurement teams that order in the hundreds or thousands with repeat artwork.",
      },
      {
        title: "Sustainable Retail & Export",
        description: "Laminated jute shoppers and eco-labelled canvas runs for retail chains and export buyers who need azo-free inks and documented material specs.",
      },
    ],
    note: "Client logos and named testimonials will be added here once permission is confirmed. If you are an existing Carrystyle client and would like to be featured, contact our sales team.",
  }
};
