import { Badge } from "@/components/ui/badge";

const TopBanner = () => {
  return (
    <div className="bg-primary-dark text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <span className="hidden sm:inline">Prețuri exclusive online • Livrare gratuită de la 350 MDL</span>
        <span className="sm:hidden">Livrare gratuită de la 350 MDL</span>
        <Badge variant="secondary" className="bg-white text-primary font-bold">
          350 MDL
        </Badge>
      </div>
    </div>
  );
};

export default TopBanner;
