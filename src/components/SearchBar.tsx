import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: (term: string) => void;
  onClear: () => void;
  suggestions?: string[];
  searchHistory?: string[];
  onRemoveFromHistory?: (term: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onClear,
  suggestions = [],
  searchHistory = [],
  onRemoveFromHistory,
  placeholder = "Caută medicamente, vitamine, suplimente...",
  className,
  showSuggestions = true,
  isLoading = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dbSuggestions, setDbSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Închide dropdown-ul când se face click în afara componentei
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cauta in baza de date pentru sugestii
  const fetchSuggestionsFromDb = async (term: string) => {
    if (!term.trim() || term.length < 2) {
      setDbSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    console.log('🔍 Fetching suggestions for:', term);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('name')
        .ilike('name', `%${term}%`)
        .limit(8);

      if (error) {
        console.error('❌ Error fetching suggestions:', error);
        setDbSuggestions([]);
      } else if (data) {
        console.log('✅ Suggestions found:', data.length);
        const uniqueNames = [...new Set(data.map((p: any) => p.name))];
        setDbSuggestions(uniqueNames.slice(0, 5));
        console.log('📊 Unique suggestions:', uniqueNames.slice(0, 5));
      } else {
        console.log('ℹ️ No suggestions data');
        setDbSuggestions([]);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setDbSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowDropdown(true);
    fetchSuggestionsFromDb(value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Întârziem închiderea pentru a permite click-urile pe sugestii
    setTimeout(() => setShowDropdown(false), 150);
  };

  const handleSearch = (term?: string) => {
    const searchValue = term || searchTerm;
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onClear();
    setShowDropdown(false);
    setDbSuggestions([]);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    handleSearch(suggestion);
  };

  const handleHistoryRemove = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    onRemoveFromHistory?.(term);
  };

  // Popularitate pentru sugestii (simulat)
  const getPopularityIcon = (index: number) => {
    if (index < 2) return <TrendingUp className="h-3 w-3 text-orange-500" />;
    return null;
  };

  // Combina sugestii din DB si search history
  const allSuggestions = dbSuggestions.length > 0 ? dbSuggestions : suggestions;
  const hasContent = showSuggestions && (allSuggestions.length > 0 || searchHistory.length > 0);

  return (
    <div className={cn("relative w-full max-w-lg", className)}>
      {/* Search Input */}
      <div className={cn(
        "relative flex items-center",
        "transition-all duration-200",
        isFocused ? "ring-2 ring-green-500 ring-offset-2" : ""
      )}>
        <Search className={cn(
          "absolute left-3 h-4 w-4 transition-colors",
          isFocused ? "text-green-600" : "text-gray-400"
        )} />
        
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-20 py-2 text-sm",
            "border-2 border-gray-200 rounded-lg",
            "focus:border-green-500 focus:ring-0",
            "placeholder:text-gray-400",
            "transition-all duration-200"
          )}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
          </div>
        )}        {/* Clear Button */}
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}

        {/* Search Button */}
        <Button
          type="button"
          onClick={() => handleSearch()}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
        >
          <ArrowRight className="h-3 w-3 text-white" />
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && hasContent && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "bg-white border border-gray-200 rounded-lg shadow-lg",
            "max-h-80 overflow-y-auto",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
          {/* Current Suggestions */}
          {allSuggestions.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <Search className="h-3 w-3" />
                {dbSuggestions.length > 0 ? 'Produse găsite' : `Sugestii pentru "${searchTerm}"`}
              </div>
              <div className="space-y-1">
                {allSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md",
                      "hover:bg-green-50 hover:text-green-700",
                      "transition-colors duration-150",
                      "flex items-center justify-between"
                    )}
                  >
                    <span className="text-sm">{suggestion}</span>
                    <div className="flex items-center gap-1">
                      {getPopularityIcon(index)}
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Căutări recente
              </div>
              <div className="space-y-1">
                {searchHistory.slice(0, 5).map((term) => (
                  <div
                    key={term}
                    className={cn(
                      "flex items-center justify-between",
                      "px-3 py-2 rounded-md",
                      "hover:bg-gray-50",
                      "transition-colors duration-150"
                    )}
                  >
                    <button
                      onClick={() => handleSuggestionClick(term)}
                      className="flex-1 text-left text-sm text-gray-600 hover:text-gray-900"
                    >
                      {term}
                    </button>
                    {onRemoveFromHistory && (
                      <button
                        onClick={(e) => handleHistoryRemove(e, term)}
                        className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X className="h-3 w-3 text-gray-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {allSuggestions.length === 0 && searchHistory.length === 0 && searchTerm && (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Nu am găsit sugestii pentru "{searchTerm}"</p>
              <p className="text-xs text-gray-400 mt-1">Încercați un termen diferit</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
