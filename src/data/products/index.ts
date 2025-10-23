import { Product } from "../types";

// Products will be imported from category files as they are added
// Structure: src/data/products/{category-slug}.ts

// All products combined from category files
export const allProducts: Product[] = [
  // Products will be added here as category files are created
];

// Helper functions for product queries
export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(p => p.id === id);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return allProducts.filter(p => p.category === categorySlug);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.manufacturer.toLowerCase().includes(searchTerm) ||
    p.country.toLowerCase().includes(searchTerm)
  );
};

export const getUniqueCountries = (): string[] => {
  return Array.from(new Set(allProducts.map(p => p.country))).sort();
};

export const getUniqueManufacturers = (): string[] => {
  return Array.from(new Set(allProducts.map(p => p.manufacturer))).sort();
};

export const getPriceRange = (): { min: number; max: number } => {
  const prices = allProducts.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

export const filterProducts = (
  products: Product[],
  filters: {
    category?: string;
    countries?: string[];
    manufacturers?: string[];
    priceRange?: [number, number];
    searchQuery?: string;
  }
): Product[] => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.countries && filters.countries.length > 0) {
    filtered = filtered.filter(p => filters.countries!.includes(p.country));
  }

  if (filters.manufacturers && filters.manufacturers.length > 0) {
    filtered = filtered.filter(p => filters.manufacturers!.includes(p.manufacturer));
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(p => 
      p.price >= min && p.price <= max
    );
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.manufacturer.toLowerCase().includes(query) ||
      p.country.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const sortProducts = (
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc'
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating-desc':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted;
  }
};

// Statistics
export const getProductStats = () => {
  const byCategory = allProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: allProducts.length,
    byCategory,
    countries: getUniqueCountries().length,
    manufacturers: getUniqueManufacturers().length,
    priceRange: getPriceRange()
  };
};
