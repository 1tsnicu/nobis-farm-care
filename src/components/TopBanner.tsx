import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const TopBanner = () => {
  return (
    <div className="bg-gradient-banner text-primary-foreground py-2.5 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
      <div className="container mx-auto flex items-center justify-between text-sm relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline font-medium">Prețuri exclusive online • Ridicare gratuită din farmacie</span>
          <span className="sm:hidden font-medium">Ridicare gratuită farmacie</span>
        </div>
        <Badge variant="secondary" className="bg-white text-primary-dark font-bold shadow-md hover:scale-105 transition-transform">
          GRATUIT
        </Badge>
      </div>
    </div>
  );
};

export default TopBanner;
