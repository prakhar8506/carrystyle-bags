export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  quote: string;
  orderSpec: string;
}

export const CLIENT_LOGOS = [
  { name: "Oberoi Hotels", logo: "OBEROI" },
  { name: "TechCorp Global", logo: "TECHCORP" },
  { name: "EcoEarth Retail", logo: "ECOEARTH" },
  { name: "Aura Cosmetics", logo: "AURA" },
  { name: "Titan Industries", logo: "TITAN" },
  { name: "Infosys Campus", logo: "INFOSYS" },
  { name: "Marathon India", logo: "MARATHON" },
  { name: "FabIndia Partners", logo: "FABINDIA" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Vikram Malhotra",
    company: "Oberoi Luxury Group",
    role: "Head of Procurement",
    rating: 5,
    quote: "Finding a bag manufacturer in India that can deliver 5,000 gold foil stamped tote bags without a single alignment flaw is rare. Carrystyle's production quality matched our strict hotel luxury standards perfectly.",
    orderSpec: "5,000 Organic Gold Foil Canvas Totes"
  },
  {
    id: "t2",
    clientName: "Ananya Deshmukh",
    company: "TechCorp India",
    role: "Events & Onboarding Manager",
    rating: 5,
    quote: "We needed 3,500 executive laptop backpacks delivered across 4 city offsites in under 12 days. Carrystyle handled the embroidery, quality audit, and express freight smoothly.",
    orderSpec: "3,500 Executive Laptop Backpacks"
  },
  {
    id: "t3",
    clientName: "Rajesh Khandelwal",
    company: "EcoEarth Supermarkets",
    role: "Supply Chain Director",
    rating: 5,
    quote: "We order 20,000 laminated jute shopper bags every quarter. Their fabric GSM is consistent, handle stitching never gives way, and bulk pricing is direct factory true.",
    orderSpec: "80,000+ Annual Jute Shopper Units"
  }
];
