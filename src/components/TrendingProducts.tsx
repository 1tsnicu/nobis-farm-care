import ProductCard from "./ProductCard";

// Mock data - în producție, acestea vor veni din API/database
const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
    brand: "Paracetamol",
    name: "Paracetamol 500mg - 20 tablete",
    price: 45,
    originalPrice: 60,
    rating: 4.5,
    reviews: 128,
    discount: 25,
    inStock: true
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550572017-4725f1f5b8f5?w=500&h=500&fit=crop",
    brand: "Vitamin C",
    name: "Vitamin C 1000mg - Complex cu zinc",
    price: 89,
    originalPrice: 120,
    rating: 5,
    reviews: 245,
    discount: 26,
    inStock: true
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop",
    brand: "Omega-3",
    name: "Omega-3 Fish Oil - 60 capsule",
    price: 129,
    rating: 4.8,
    reviews: 89,
    inStock: true
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
    brand: "Probiotice",
    name: "Probiotice Premium - 30 capsule",
    price: 159,
    originalPrice: 199,
    rating: 4.7,
    reviews: 156,
    discount: 20,
    inStock: true
  }
];

const TrendingProducts = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produse în trending
          </h2>
          <p className="text-lg text-muted-foreground">
            Cele mai căutate produse ale lunii
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
