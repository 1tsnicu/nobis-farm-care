import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import DeliveryInfo from "@/components/DeliveryInfo";
import TrendingProducts from "@/components/TrendingProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <TrendingProducts />
        <LoyaltyProgram />
        <DeliveryInfo />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
