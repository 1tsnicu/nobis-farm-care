import React from 'react';
import { Search, TrendingUp, Clock, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  results: any[];
  searchTerm: string;
  isLoading: boolean;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchTerm,
  isLoading,
  onAddToCart,
  className
}) => {
  // Funcție pentru highlighting text-ului căutat
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (isLoading) {
    return (
      <div className={cn("p-8 text-center", className)}>
        <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Se caută produse...</p>
      </div>
    );
  }

  if (!searchTerm) {
    return (
      <div className={cn("p-8 text-center text-gray-500", className)}>
        <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium mb-2">Începe să cauți</p>
        <p className="text-sm">Introdu un termen pentru a găsi produsele dorite</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={cn("p-8 text-center", className)}>
        <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Nu am găsit produse pentru "{searchTerm}"
        </h3>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Sugestii:</p>
          <ul className="space-y-1">
            <li>• Verifică ortografia</li>
            <li>• Încearcă cuvinte mai generale</li>
            <li>• Folosește sinonime</li>
            <li>• Caută după categoria produsului</li>
          </ul>
        </div>
        <div className="mt-6">
          <Link to="/categorie/medicamente-otc">
            <Button variant="outline">
              Vezi toate produsele
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header rezultate */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {results.length} {results.length === 1 ? 'rezultat' : 'rezultate'} pentru "{searchTerm}"
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Actualizat acum</span>
        </div>
      </div>

      {/* Lista rezultatelor */}
      <div className="space-y-3">
        {results.slice(0, 10).map((product, index) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Imagine produs */}
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>

              {/* Informații produs */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Ranking vizual */}
                    {index < 3 && (
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">
                          #{index + 1} Rezultat
                        </span>
                      </div>
                    )}

                    {/* Nume produs cu highlighting */}
                    <Link to={`/produs/${product.id}`}>
                      <h4 className="font-medium text-gray-900 hover:text-green-600 transition-colors">
                        {highlightText(product.name, searchTerm)}
                      </h4>
                    </Link>

                    {/* Brand și categorie */}
                    <div className="flex items-center gap-2 mt-1">
                      {product.brand && (
                        <Badge variant="secondary" className="text-xs">
                          {highlightText(product.brand, searchTerm)}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        în {highlightText(product.category, searchTerm)}
                      </span>
                    </div>

                    {/* Descriere cu highlighting */}
                    {product.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {highlightText(product.description, searchTerm)}
                      </p>
                    )}

                    {/* Rating și reviews */}
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Stoc */}
                      <div className="flex items-center gap-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          product.inStock ? "bg-green-500" : "bg-red-500"
                        )} />
                        <span className="text-xs text-gray-600">
                          {product.inStock ? "În stoc" : "Indisponibil"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Preț și acțiuni */}
                  <div className="text-right">
                    <div className="space-y-1">
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-xs text-gray-500 line-through">
                          {product.originalPrice.toFixed(2)} MDL
                        </div>
                      )}
                      <div className="text-lg font-bold text-green-600">
                        {product.price.toFixed(2)} MDL
                      </div>
                      {product.discount && (
                        <Badge variant="destructive" className="text-xs">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>

                    {/* Buton Adaugă în coș */}
                    {product.inStock && onAddToCart && (
                      <Button
                        size="sm"
                        onClick={() => onAddToCart(product.id)}
                        className="mt-2 h-8 px-3 text-xs"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Adaugă
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link pentru mai multe rezultate */}
      {results.length > 10 && (
        <div className="text-center pt-4">
          <Link to={`/categorie/medicamente-otc?search=${encodeURIComponent(searchTerm)}`}>
            <Button variant="outline">
              Vezi toate cele {results.length} rezultate
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
