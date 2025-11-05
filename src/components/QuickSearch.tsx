import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface QuickSearchProps {
  className?: string;
  showResults?: boolean;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  className,
  showResults = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showQuickResults, setShowQuickResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowQuickResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search direct din baza de date
  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowQuickResults(false);
      return;
    }

    setIsSearching(true);
    console.log('🔍 Searching for:', term);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, manufacturer')
        .ilike('name', `%${term}%`)
        .limit(10);

      if (error) {
        console.error('❌ Search error:', error);
        setSearchResults([]);
      } else if (data) {
        console.log('✅ Found products:', data.length);
        const mappedResults = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: parseFloat(p.price) || 0,
          image: p.image_url || '',
          brand: p.manufacturer || 'Unknown',
          category: 'Medicamente',
          description: p.name,
          inStock: true,
          rating: 4.5,
          reviews: 0
        }));
        console.log('📊 Mapped results:', mappedResults);
        setSearchResults(mappedResults);
        setShowQuickResults(true);
      } else {
        console.log('ℹ️ No data returned');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('❌ Error searching:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 1) {
      handleSearch(value);
    } else {
      setShowQuickResults(false);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchTerm);
    }
  };

  const handleProductClick = (productId: string) => {
    console.log('🛍️ Navigating to product:', productId);
    setShowQuickResults(false);
    navigate(`/produs/${productId}`);
  };

  const handleViewAllClick = () => {
    console.log('📋 Viewing all results for:', searchTerm);
    navigate(`/categorie/medicamente-otc?search=${encodeURIComponent(searchTerm)}`);
    setShowQuickResults(false);
  };

  return (
    <div className={cn("w-full relative", className)}>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={isSearching ? "Se cauta..." : "Cauta produse..."}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length > 1 && setShowQuickResults(true)}
            disabled={isSearching}
            className="pl-10 pr-10 py-2 w-full text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSearchResults([]);
                setShowQuickResults(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Results Dropdown */}
        {showQuickResults && searchResults.length > 0 && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          >
            <div className="max-h-96 overflow-y-auto">
              {searchResults.slice(0, 8).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full px-4 py-3 hover:bg-green-50 border-b last:border-b-0 text-left transition-colors"
                >
                  <div className="flex gap-3">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-green-600 font-semibold">{product.price} lei</span>
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50 border-t text-center">
              <button
                onClick={handleViewAllClick}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 w-full py-2"
              >
                Vedeti toate cele {searchResults.length} rezultate <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Popular Searches */}

        {/* No Results */}
        {showQuickResults && searchTerm && searchResults.length === 0 && !isSearching && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-center"
          >
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-600">Nu au fost găsite produse pentru "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickSearch;
