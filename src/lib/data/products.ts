export interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  inStock: boolean;
  category: string;
  subcategory?: string;
  description: string;
  tags: string[];
  manufacturer?: string;
  country?: string;
}

export const products: Product[] = [
  // Mamă și Copil
  {
    id: 1,
    image: "/src/assets/nestle-nan-confort-2.jpg",
    brand: "Nestle",
    name: "Nestle Nan Confort 2",
    price: 320,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    category: "mama-copil",
    description: "Lapte praf pentru sugari de la 6 luni",
    tags: ["lapte praf", "sugari", "nutriție"],
    manufacturer: "Nestle",
    country: "Elveția"
  },
  {
    id: 2,
    image: "/src/assets/category-mother-baby.jpg",
    brand: "Chicco",
    name: "Scaunel prima pappa balloon beige+diner savana azzur",
    price: 75.01,
    rating: 4.5,
    reviews: 89,
    inStock: true,
    category: "mama-copil",
    description: "Scaun de masă pentru bebeluși",
    tags: ["scaun masa", "bebelusi", "siguranta"],
    country: "Italia"
  },
  {
    id: 3,
    image: "/src/assets/category-mother-baby.jpg",
    brand: "Chicco",
    name: "Chicco Aspirator nazal Physioclean",
    price: 277.23,
    rating: 4.7,
    reviews: 134,
    inStock: true,
    category: "mama-copil",
    description: "Aspirator nazal pentru curățarea nasului bebelușului",
    tags: ["aspirator", "nas", "igiena"],
    manufacturer: "Chicco",
    country: "Italia"
  },
  {
    id: 4,
    image: "/src/assets/category-mother-baby.jpg",
    brand: "Chicco",
    name: "Chicco Sampon-gel copii Baby Moments 750ml",
    price: 248.28,
    rating: 4.9,
    reviews: 203,
    inStock: true,
    category: "mama-copil",
    description: "Șampon gel delicat pentru copii",
    tags: ["sampon", "gel", "copii", "igiena"],
    manufacturer: "Chicco",
    country: "Italia"
  },

  // Sănătate - Medicamente OTC
  {
    id: 5,
    image: "/src/assets/paracetamol-otc.jpg",
    brand: "Balkan",
    name: "Aciclovir caps. 200 mg N10x3",
    price: 61.04,
    rating: 4.5,
    reviews: 78,
    inStock: true,
    category: "sanatate",
    subcategory: "medicamente-otc",
    description: "Antiviral pentru tratamentul herpesului",
    tags: ["antiviral", "herpes", "tratament"],
    manufacturer: "Balkan Pharmaceuticals SRL, SC",
    country: "Republica Moldova"
  },
  {
    id: 6,
    image: "/src/assets/paracetamol-otc.jpg",
    brand: "Balkan",
    name: "Ambroxol comp.30mg N20",
    price: 24.14,
    rating: 4.3,
    reviews: 92,
    inStock: true,
    category: "sanatate",
    subcategory: "medicamente-otc",
    description: "Expectorant pentru tuse productivă",
    tags: ["tuse", "expectorant", "bronșii"],
    manufacturer: "Balkan Pharmaceuticals SRL, SC",
    country: "Republica Moldova"
  },
  {
    id: 7,
    image: "/src/assets/paracetamol-otc.jpg",
    brand: "Balkan",
    name: "Analgina-BP comp. 500mg N10",
    price: 10.42,
    rating: 4.2,
    reviews: 156,
    inStock: true,
    category: "sanatate",
    subcategory: "medicamente-otc",
    description: "Analgezic și antipiretic",
    tags: ["durere", "febră", "analgezic"],
    manufacturer: "Balkan Pharmaceuticals SRL, SC",
    country: "Republica Moldova"
  },
  {
    id: 8,
    image: "/src/assets/paracetamol-otc.jpg",
    brand: "Balkan",
    name: "Citramon-BP comp. N10",
    price: 5.10,
    rating: 4.4,
    reviews: 245,
    inStock: true,
    category: "sanatate",
    subcategory: "medicamente-otc",
    description: "Analgezic combinat pentru dureri și febră",
    tags: ["durere", "febră", "cefalee"],
    manufacturer: "Balkan Pharmaceuticals SRL, SC",
    country: "Republica Moldova"
  },

  // Vitamine și Minerale
  {
    id: 9,
    image: "/src/assets/vitamin-c-supplement.jpg",
    brand: "Balkan",
    name: "Berberine 500mg + Chromium 40µg caps. N60",
    price: 539.75,
    rating: 4.8,
    reviews: 67,
    inStock: true,
    category: "vitamine-minerale",
    description: "Supliment pentru metabolismul zahărului",
    tags: ["berberina", "crom", "metabolism", "diabet"],
    manufacturer: "Balkan Pharmaceuticals SRL, SC",
    country: "Republica Moldova"
  },
  {
    id: 10,
    image: "/src/assets/vitamin-c-supplement.jpg",
    brand: "Balkan",
    name: "Join Support Ultra pulbere 14g N30",
    price: 1050,
    rating: 4.9,
    reviews: 123,
    inStock: true,
    category: "vitamine-minerale",
    description: "Complex pentru sănătatea articulațiilor",
    tags: ["articulații", "colagen", "glucozamină"],
    manufacturer: "Balkan Pharmaceuticals SRL, SC",
    country: "Republica Moldova"
  },
  {
    id: 11,
    image: "/src/assets/vitamin-c-supplement.jpg",
    brand: "Konark Ayurveda",
    name: "Immuno Veda comp. N30",
    price: 140,
    rating: 4.6,
    reviews: 189,
    inStock: true,
    category: "vitamine-minerale",
    description: "Supliment natural pentru imunitate",
    tags: ["imunitate", "ayurveda", "natural"],
    manufacturer: "Konark Ayurveda",
    country: "India"
  },
  {
    id: 12,
    image: "/src/assets/vitamin-c-supplement.jpg",
    brand: "Arcopharma",
    name: "Azinc Adulte caps. N60",
    price: 230,
    rating: 4.7,
    reviews: 234,
    inStock: true,
    category: "vitamine-minerale",
    description: "Complex multivitaminic cu zinc pentru adulți",
    tags: ["multivitamine", "zinc", "energie"],
    manufacturer: "Arcopharma",
    country: "Franta"
  },

  // Produse Naturiste
  {
    id: 13,
    image: "/src/assets/omega3-natural.jpg",
    brand: "Nordic Naturals",
    name: "Omega-3 Fish Oil Premium 60 caps",
    price: 299,
    rating: 4.9,
    reviews: 456,
    inStock: true,
    category: "vitamine-minerale",
    subcategory: "produse-naturiste",
    description: "Omega-3 premium din ulei de pește sălbatic",
    tags: ["omega3", "inimă", "creier", "natural"],
    manufacturer: "Nordic Naturals",
    country: "Norvegia"
  },
  {
    id: 14,
    image: "/src/assets/probiotics-natural.jpg",
    brand: "Solgar",
    name: "Probiotice Premium Flora 30 caps",
    price: 189,
    rating: 4.8,
    reviews: 312,
    inStock: true,
    category: "vitamine-minerale",
    subcategory: "produse-naturiste",
    description: "Probiotice pentru sănătatea digestivă",
    tags: ["probiotice", "digestie", "flora"],
    manufacturer: "Solgar",
    country: "SUA"
  },

  // Dermatocosmetică
  {
    id: 15,
    image: "/src/assets/vichy-capital-soleil.jpg",
    brand: "Vichy",
    name: "Vichy Capital Soleil Lapte-Gel hidratant SPF50",
    price: 425,
    rating: 4.9,
    reviews: 567,
    inStock: true,
    category: "dermatocosmetica",
    description: "Protecție solară înaltă cu textură ușoară",
    tags: ["protecție solară", "SPF50", "hidratant"],
    manufacturer: "L'Oréal",
    country: "Franta"
  },
  {
    id: 16,
    image: "/src/assets/category-dermatocosmetics.jpg",
    brand: "La Roche-Posay",
    name: "Effaclar Duo+ 40ml",
    price: 380,
    rating: 4.8,
    reviews: 423,
    inStock: true,
    category: "dermatocosmetica",
    description: "Tratament anti-imperfecțiuni",
    tags: ["acnee", "anti-imperfectiuni", "piele grasa"],
    manufacturer: "L'Oréal",
    country: "Franta"
  },
  {
    id: 17,
    image: "/src/assets/category-dermatocosmetics.jpg",
    brand: "CeraVe",
    name: "CeraVe Lotiune hidratanta 473ml",
    price: 295,
    rating: 4.7,
    reviews: 678,
    inStock: true,
    category: "dermatocosmetica",
    description: "Loțiune hidratantă pentru față și corp",
    tags: ["hidratant", "ceramide", "piele uscata"],
    manufacturer: "L'Oréal",
    country: "SUA"
  },
  {
    id: 18,
    image: "/src/assets/category-dermatocosmetics.jpg",
    brand: "Avene",
    name: "Avene Eau Thermale Spray 300ml",
    price: 185,
    rating: 4.9,
    reviews: 892,
    inStock: true,
    category: "dermatocosmetica",
    description: "Apă termală calmantă și protectoare",
    tags: ["apa termala", "calmanta", "piele sensibila"],
    manufacturer: "Pierre Fabre",
    country: "Franta"
  },

  // Frumusețe și Igienă
  {
    id: 19,
    image: "/src/assets/category-natural-products.jpg",
    brand: "Nivea",
    name: "Nivea Soft Crema 300ml",
    price: 89,
    rating: 4.6,
    reviews: 534,
    inStock: true,
    category: "frumusete-igiena",
    description: "Cremă hidratantă universală",
    tags: ["hidratant", "crema", "corp"],
    manufacturer: "Beiersdorf",
    country: "Germania"
  },
  {
    id: 20,
    image: "/src/assets/category-natural-products.jpg",
    brand: "Garnier",
    name: "Garnier Fructis Sampon 400ml",
    price: 67,
    rating: 4.5,
    reviews: 421,
    inStock: true,
    category: "frumusete-igiena",
    description: "Șampon fortifiant cu fructe",
    tags: ["sampon", "par", "fortifiant"],
    manufacturer: "L'Oréal",
    country: "Franta"
  }
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductsBySubcategory = (subcategorySlug: string): Product[] => {
  return products.filter(product => product.subcategory === subcategorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products
    .filter(p => p.rating >= 4.7 && p.inStock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
};

export const getBestSellers = (): Product[] => {
  return products
    .filter(p => p.inStock)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 6);
};
