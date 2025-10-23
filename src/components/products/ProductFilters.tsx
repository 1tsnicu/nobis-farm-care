import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductFiltersProps {
  countries: string[];
  manufacturers: string[];
  priceRange: { min: number; max: number };
  selectedCountries: string[];
  selectedManufacturers: string[];
  selectedPriceRange: [number, number];
  onCountryChange: (country: string, checked: boolean) => void;
  onManufacturerChange: (manufacturer: string, checked: boolean) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export const ProductFilters = ({
  countries,
  manufacturers,
  priceRange,
  selectedCountries,
  selectedManufacturers,
  selectedPriceRange,
  onCountryChange,
  onManufacturerChange,
  onPriceRangeChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const hasActiveFilters = 
    selectedCountries.length > 0 || 
    selectedManufacturers.length > 0 ||
    selectedPriceRange[0] !== priceRange.min ||
    selectedPriceRange[1] !== priceRange.max;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filtre</CardTitle>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Resetează
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium mb-4 block">
            Preț: {selectedPriceRange[0].toFixed(0)} - {selectedPriceRange[1].toFixed(0)} MDL
          </Label>
          <Slider
            min={priceRange.min}
            max={priceRange.max}
            step={10}
            value={selectedPriceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="mt-2"
          />
        </div>

        <Separator />

        {/* Country Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Țară de origine</Label>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {countries.slice(0, 20).map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={selectedCountries.includes(country)}
                    onCheckedChange={(checked) => 
                      onCountryChange(country, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`country-${country}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        {/* Manufacturer Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Producător</Label>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {manufacturers.slice(0, 20).map((manufacturer) => (
                <div key={manufacturer} className="flex items-center space-x-2">
                  <Checkbox
                    id={`manufacturer-${manufacturer}`}
                    checked={selectedManufacturers.includes(manufacturer)}
                    onCheckedChange={(checked) => 
                      onManufacturerChange(manufacturer, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`manufacturer-${manufacturer}`}
                    className="text-sm font-normal cursor-pointer line-clamp-2"
                  >
                    {manufacturer}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
