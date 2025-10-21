import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AboutPreview from "@/components/AboutPreview";
import Tombola from "@/components/Tombola";
import TrendingProducts from "@/components/TrendingProducts";
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
        <Categories />
        <AboutPreview />
        <Tombola />
        <TrendingProducts />
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
