import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroCategories from "@/components/HeroCategories";
import BestSellers from "@/components/BestSellers";
import HotOffers from "@/components/HotOffers";
import AboutPreview from "@/components/AboutPreview";
import PickupInfo from "@/components/DeliveryInfo";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import DeliveryTimeline from "@/components/DeliveryTimeline";
import WhyChooseUs from "@/components/WhyChooseUs";
import LatestNews from "@/components/LatestNews";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HeroCategories />
        <BestSellers />
        <PickupInfo />
        <HotOffers />
        <AboutPreview />
        <LoyaltyProgram />
        <DeliveryTimeline />
        <WhyChooseUs />
        <LatestNews />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
