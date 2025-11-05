import { Link } from "react-router-dom";
import { categories } from "@/lib/data/categories";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explorează categoriile
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Toate produsele de care ai nevoie, organizate pentru tine
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categorie/${category.slug}`}
              className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 border border-border/50 hover:border-primary/30"
            >
              {/* Background gradient overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${category.color}10 0%, ${category.color}05 100%)`
                }}
              />
              
              {/* Content */}
              <div className="relative p-8 flex flex-col items-center text-center min-h-[280px] justify-between">
                {/* Icon with glow effect */}
                <div className="relative mb-6">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      boxShadow: `0 8px 32px ${category.color}30`
                    }}
                  >
                    <category.icon className="w-12 h-12" style={{ color: category.color }} />
                  </div>
                  {/* Animated ring */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                    style={{ 
                      border: `2px solid ${category.color}40`
                    }}
                  />
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <h3 className="font-bold text-xl lg:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  {category.productCount && (
                    <p className="text-sm font-semibold text-primary">
                      {category.productCount} produse
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Explorează</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: category.color }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
