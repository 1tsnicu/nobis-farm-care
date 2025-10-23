import { Link } from "react-router-dom";
import { Category } from "@/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick?: (slug: string) => void;
}

export const CategoryNav = ({ 
  categories, 
  activeCategory,
  onCategoryClick 
}: CategoryNavProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.slug;

        const content = (
          <Card className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105",
            isActive && "ring-2 ring-primary shadow-md"
          )}>
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className={cn(
                "p-3 rounded-full bg-primary/10",
                isActive && "bg-primary text-primary-foreground"
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm leading-tight">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.productCount} produse
                </Badge>
              </div>
            </CardContent>
          </Card>
        );

        if (onCategoryClick) {
          return (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.slug)}
            >
              {content}
            </div>
          );
        }

        return (
          <Link key={category.id} to={`/categorie/${category.slug}`}>
            {content}
          </Link>
        );
      })}
    </div>
  );
};
