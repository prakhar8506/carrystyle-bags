export interface PortfolioItem {
  id: string;
  clientName: string;
  category: 'Corporate' | 'Retail' | 'Events' | 'Eco-Series';
  bagType: string;
  printTechnique: string;
  quantity: string;
  image: string;
  highlights: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "port-1",
    clientName: "Oberoi Luxury Hotels",
    category: "Corporate",
    bagType: "Gold Foil Damask Canvas Tote",
    printTechnique: "24k Hot Gold Foil Stamping",
    quantity: "2,500 Units",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    highlights: "Luxury organic cotton canvas tote featuring ornate gold damask cartouche branding for VIP guest amenities."
  },
  {
    id: "port-2",
    clientName: "TechCorp Global Summit",
    category: "Events",
    bagType: "Executive Laptop Backpack",
    printTechnique: "Metallic Crest Plate & 3D Embroidery",
    quantity: "5,000 Units",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    highlights: "Custom waterproof 1680D nylon backpacks for annual developer conference delegates."
  },
  {
    id: "port-3",
    clientName: "EcoEarth Retail Chain",
    category: "Eco-Series",
    bagType: "Laminated Natural Jute Shopper",
    printTechnique: "Azo-Free Dual-Color Screen Print",
    quantity: "15,000 Units",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    highlights: "Heavy-duty eco shopper bags with padded cotton handles deployed across 40 supermarket outlets."
  },
  {
    id: "port-4",
    clientName: "Aura Botanical Cosmetics",
    category: "Retail",
    bagType: "Velvet Gold Foil Gift Pouch",
    printTechnique: "Embossed Foil & Braided Gold Drawstring",
    quantity: "8,000 Units",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    highlights: "Custom plush velvet pouches designed for high-end skincare festive gift boxes."
  },
  {
    id: "port-5",
    clientName: "Marathon India 2025",
    category: "Events",
    bagType: "Reflective Drawstring Sackpack",
    printTechnique: "High-Visibility Reflective Screen Print",
    quantity: "25,000 Units",
    image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80",
    highlights: "High-volume kit bags distributed to all registered runners with metal eyelet reinforcements."
  },
  {
    id: "port-6",
    clientName: "Vedic Crafts Heritage Store",
    category: "Retail",
    bagType: "Bleached Cotton Canvas Tote",
    printTechnique: "Precision Multi-Pass Screen Print",
    quantity: "4,000 Units",
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80",
    highlights: "Classic off-white tote bags with reinforced X-stitch handles for heritage handicraft retail sales."
  }
];
