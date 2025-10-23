import React, { useState } from 'react';
import { Search, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSearch } from '@/hooks/useSearch';
import { SearchResults } from '@/components/SearchResults';
import { cn } from '@/lib/utils';

// Mock data pentru demonstrație
const mockProducts = [
  { id: 1, name: "Paracetamol 500mg", category: "Medicamente", brand: "Farmacia Tei", price: 15, originalPrice: 20, rating: 4.5, reviews: 128, discount: 25, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop", inStock: true, description: "Analgezic și antipiretic", tags: ["durere", "febra"] },
  { id: 2, name: "Vitamina C 1000mg", category: "Vitamine", brand: "Solgar", price: 45, originalPrice: 60, rating: 5, reviews: 245, discount: 25, image: "https://images.unsplash.com/photo-1550572017-4725f1f5b8f5?w=500&h=500&fit=crop", inStock: true, description: "Supliment vitamina C", tags: ["imunitate", "antioxidant"] },
  { id: 3, name: "Aspenter 100mg", category: "Medicamente", brand: "Zentiva", price: 22, rating: 4.3, reviews: 94, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop", inStock: true, description: "Antiagregant plachetar", tags: ["inima", "preventie"] },
  { id: 4, name: "Omega 3", category: "Suplimente", brand: "Nordic Naturals", price: 89, originalPrice: 120, rating: 4.8, reviews: 89, discount: 26, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop", inStock: false, description: "Acizi grași omega 3", tags: ["inima", "creier"] },
  { id: 5, name: "Magneziu B6", category: "Vitamine", brand: "Magne B6", price: 35, rating: 4.9, reviews: 203, image: "https://images.unsplash.com/photo-1616671276746-6ff1a6a55b6e?w=500&h=500&fit=crop", inStock: true, description: "Supliment magneziu cu vitamina B6", tags: ["stres", "oboseala"] },
  { id: 6, name: "Balsam Спасатель 30g", category: "Dermato-Cosmetice", brand: "Efect", price: 158.48, rating: 4.7, reviews: 45, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop", inStock: true, description: "Balsam universal pentru regenerarea pielii", tags: ["balsam", "regenerare", "piele"] }
];

// Căutări populare
const popularSearches = [
  "Paracetamol", "Vitamina C", "Omega 3", "Probiotice", "Magneziu",
  "Aspirina", "Ibuprofen", "Vitamina D", "Zinc", "Fer"
];

interface QuickSearchProps {
  className?: string;
  showResults?: boolean;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  className,
  showResults = true
}) => {
  const [showQuickResults, setShowQuickResults] = useState(false);
  
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    performSearch,
    quickSearch,
    clearSearch,
    searchHistory,
    removeFromHistory,
    getSearchSuggestions,
    isSearching
  } = useSearch({ 
    products: mockProducts
  });

  const handleQuickSearch = (term: string) => {
    quickSearch(term);
    setShowQuickResults(true);
  };

  const handleFullSearch = (term?: string) => {
    const searchValue = term || searchTerm;
    performSearch(searchValue);
    setShowQuickResults(false);
  };

  const suggestions = searchTerm.length > 1 ? getSearchSuggestions(searchTerm, 5) : [];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value) {
                handleQuickSearch(e.target.value);
              } else {
                setShowQuickResults(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleFullSearch();
              }
            }}
            placeholder="Caută medicamente, vitamine, suplimente..."
            className="w-full h-14 pl-12 pr-32 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
          />
          <Button
            onClick={() => handleFullSearch()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-green-600 hover:bg-green-700"
          >
            <Search className="w-4 h-4 mr-2" />
            Caută
          </Button>
        </div>

        {/* Quick suggestions dropdown */}
        {searchTerm && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
            <div className="p-3 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-2">Sugestii rapide</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(suggestion);
                    handleQuickSearch(suggestion);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span className="text-sm">{suggestion}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </button>
              ))}
            </div>
            
            {searchHistory.length > 0 && (
              <div className="p-3">
                <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Căutări recente
                </div>
                {searchHistory.slice(0, 3).map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchTerm(term);
                      handleQuickSearch(term);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular searches */}
      {!searchTerm && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Căutări populare</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm(term);
                  handleQuickSearch(term);
                }}
                className="h-8 px-3 text-xs hover:bg-green-50 hover:border-green-300"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Results */}
      {showResults && showQuickResults && searchTerm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <SearchResults
            results={searchResults.slice(0, 5)}
            searchTerm={searchTerm}
            isLoading={isSearching}
            onAddToCart={(productId) => {
              console.log('Add to cart:', productId);
              // Aici se va integra cu hook-ul de cart
            }}
          />
          
          {searchResults.length > 5 && (
            <div className="text-center mt-4 pt-4 border-t border-gray-100">
              <Button
                onClick={() => handleFullSearch()}
                variant="outline"
                className="gap-2"
              >
                Vezi toate cele {searchResults.length} rezultate
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {showResults && showQuickResults && searchTerm && searchResults.length === 0 && !isSearching && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Nu am găsit rezultate pentru "{searchTerm}"
          </h3>
          <p className="text-gray-500 mb-4">Încearcă un termen diferit sau explorează categoriile noastre</p>
          <Button
            onClick={() => handleFullSearch()}
            variant="outline"
          >
            Caută în toate produsele
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
