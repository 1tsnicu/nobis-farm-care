import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Tombola from "@/components/Tombola";
import TrendingProducts from "@/components/TrendingProducts";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import DeliveryTimeline from "@/components/DeliveryTimeline";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Tombola />
        <TrendingProducts />
        <LoyaltyProgram />
        <DeliveryTimeline />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
