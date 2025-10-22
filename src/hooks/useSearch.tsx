import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface SearchableProduct {
  id: number;
  name: string;
  category: string;
  brand?: string;
  description?: string;
  tags?: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  image: string;
  inStock: boolean;
}

interface UseSearchProps {
  products: SearchableProduct[];
  onResultsChange?: (results: SearchableProduct[]) => void;
}

export const useSearch = ({ products, onResultsChange }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Încărcăm istoricul căutărilor din localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('nobis-search-history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Salvăm istoricul în localStorage
  const saveSearchHistory = (history: string[]) => {
    localStorage.setItem('nobis-search-history', JSON.stringify(history));
  };

  // Funcție pentru normalizarea textului (eliminare diacritice)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimină diacriticele
      .replace(/[^\w\s]/g, ' ') // Înlocuiește caractere speciale cu spații
      .replace(/\s+/g, ' ') // Înlocuiește spațiile multiple cu unul singur
      .trim();
  };

  // Funcție pentru calcularea relevanței rezultatelor
  const calculateRelevance = (product: SearchableProduct, term: string): number => {
    const normalizedTerm = normalizeText(term);
    const normalizedName = normalizeText(product.name);
    const normalizedCategory = normalizeText(product.category);
    const normalizedBrand = product.brand ? normalizeText(product.brand) : '';
    const normalizedDescription = product.description ? normalizeText(product.description) : '';
    const normalizedTags = product.tags ? product.tags.map(tag => normalizeText(tag)).join(' ') : '';

    let relevance = 0;

    // Exact match în nume - prioritate maximă
    if (normalizedName === normalizedTerm) relevance += 100;
    
    // Începe cu termenul căutat în nume
    if (normalizedName.startsWith(normalizedTerm)) relevance += 80;
    
    // Conține termenul în nume
    if (normalizedName.includes(normalizedTerm)) relevance += 60;
    
    // Match în brand
    if (normalizedBrand && normalizedBrand.includes(normalizedTerm)) relevance += 40;
    
    // Match în categorie
    if (normalizedCategory.includes(normalizedTerm)) relevance += 30;
    
    // Match în tags
    if (normalizedTags.includes(normalizedTerm)) relevance += 25;
    
    // Match în descriere
    if (normalizedDescription.includes(normalizedTerm)) relevance += 15;

    // Bonus pentru produse în stoc
    if (product.inStock) relevance += 5;

    // Verifică match-uri parțiale pentru fiecare cuvânt
    const termWords = normalizedTerm.split(' ').filter(word => word.length > 2);
    termWords.forEach(word => {
      if (normalizedName.includes(word)) relevance += 10;
      if (normalizedBrand && normalizedBrand.includes(word)) relevance += 8;
      if (normalizedCategory.includes(word)) relevance += 6;
      if (normalizedTags.includes(word)) relevance += 4;
      if (normalizedDescription.includes(word)) relevance += 2;
    });

    return relevance;
  };

  // Rezultatele căutării cu memoization pentru performanță
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    setIsSearching(true);

    const results = products
      .map(product => ({
        ...product,
        relevance: calculateRelevance(product, searchTerm)
      }))
      .filter(product => product.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .map(({ relevance, ...product }) => product);

    setTimeout(() => setIsSearching(false), 100);

    return results;
  }, [searchTerm, products]);

  // Notifică schimbarea rezultatelor
  useEffect(() => {
    if (onResultsChange) {
      onResultsChange(searchResults);
    }
  }, [searchResults, onResultsChange]);

  // Funcție pentru efectuarea unei căutări
  const performSearch = (term: string, navigateToResults = true) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    setSearchTerm(trimmedTerm);

    // Adăugăm în istoric (evităm duplicatele)
    const newHistory = [
      trimmedTerm,
      ...searchHistory.filter(item => item !== trimmedTerm)
    ].slice(0, 10); // Păstrăm doar ultimele 10 căutări

    setSearchHistory(newHistory);
    saveSearchHistory(newHistory);

    // Navigăm la pagina de produse cu termenul de căutare
    if (navigateToResults) {
      navigate(`/produse?search=${encodeURIComponent(trimmedTerm)}`);
    }
  };

  // Funcție pentru ștergerea unei căutări din istoric
  const removeFromHistory = (term: string) => {
    const newHistory = searchHistory.filter(item => item !== term);
    setSearchHistory(newHistory);
    saveSearchHistory(newHistory);
  };

  // Funcție pentru ștergerea completă a istoricului
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('nobis-search-history');
  };

  // Funcție pentru căutare rapidă (fără navigare)
  const quickSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Funcție pentru sugestii de căutare
  const getSearchSuggestions = (term: string, limit = 5): string[] => {
    if (!term.trim()) return [];

    const normalizedTerm = normalizeText(term);
    const suggestions = new Set<string>();

    products.forEach(product => {
      // Sugestii din nume
      if (normalizeText(product.name).includes(normalizedTerm)) {
        suggestions.add(product.name);
      }
      
      // Sugestii din brand
      if (product.brand && normalizeText(product.brand).includes(normalizedTerm)) {
        suggestions.add(product.brand);
      }
      
      // Sugestii din categorie
      if (normalizeText(product.category).includes(normalizedTerm)) {
        suggestions.add(product.category);
      }
      
      // Sugestii din tags
      if (product.tags) {
        product.tags.forEach(tag => {
          if (normalizeText(tag).includes(normalizedTerm)) {
            suggestions.add(tag);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, limit);
  };

  // Funcție pentru ștergerea căutării curente
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Statistici căutare
  const searchStats = useMemo(() => ({
    totalProducts: products.length,
    resultsCount: searchResults.length,
    inStockResults: searchResults.filter(p => p.inStock).length,
    hasResults: searchResults.length > 0,
    hasSearch: searchTerm.trim().length > 0
  }), [products.length, searchResults.length, searchResults, searchTerm]);

  return {
    // State
    searchTerm,
    searchResults,
    searchHistory,
    isSearching,
    searchStats,
    
    // Actions
    setSearchTerm,
    performSearch,
    quickSearch,
    clearSearch,
    removeFromHistory,
    clearSearchHistory,
    getSearchSuggestions,
    
    // Helpers
    normalizeText,
    calculateRelevance
  };
};

export default useSearch;
