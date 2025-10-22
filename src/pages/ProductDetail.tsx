import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Minus, Plus, ChevronLeft, Shield, Truck, RefreshCw, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

// Mock data - în producție va veni din API/database
const productData = {
  id: 1,
  brand: "Vitamin C",
  name: "Vitamin C 1000mg - Complex cu zinc și echinacea",
  price: 89,
  originalPrice: 120,
  discount: 26,
  rating: 5,
  reviews: 245,
  inStock: true,
  stockQuantity: 47,
  images: [
    "https://images.unsplash.com/photo-1550572017-4725f1f5b8f5?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=800&fit=crop",
  ],
  description: "Supliment alimentar premium cu vitamina C 1000mg, îmbogățit cu zinc și echinacea pentru susținerea sistemului imunitar. Formula avansată asigură absorbție optimă și eficiență crescută.",
  specifications: {
    "Cantitate": "60 capsule",
    "Doza zilnică": "1-2 capsule",
    "Ingredients activi": "Vitamina C, Zinc, Echinacea",
    "Producător": "Health Plus",
    "Țara de origine": "Germania",
    "Data expirării": "12/2025"
  },
  benefits: [
    "Susține sistemul imunitar",
    "Antioxidant puternic",
    "Contribuie la producerea colagenului",
    "Reduce oboseala și fatigabilitatea",
    "Protecție împotriva stresului oxidativ"
  ]
};

const reviewsData = [
  {
    id: 1,
    author: "Maria P.",
    rating: 5,
    date: "15 Martie 2024",
    comment: "Produs excelent! Se simte diferența după 2 săptămâni de administrare. Îl recomand cu încredere.",
    verified: true
  },
  {
    id: 2,
    author: "Ion V.",
    rating: 5,
    date: "10 Martie 2024",
    comment: "Calitate superioară, ridicare rapidă. Exact ce căutam pentru sezonul rece.",
    verified: true
  },
  {
    id: 3,
    author: "Ana M.",
    rating: 4,
    date: "5 Martie 2024",
    comment: "Foarte bun produs, singura observație ar fi că capsulele sunt puțin mari.",
    verified: false
  }
];

const similarProducts = [
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop",
    brand: "Omega-3",
    name: "Omega-3 Fish Oil - 60 capsule",
    price: 129,
    rating: 4.8,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
    brand: "Probiotice",
    name: "Probiotice Premium - 30 capsule",
    price: 159,
    originalPrice: 199,
    rating: 4.7,
    reviews: 156,
    discount: 20,
    inStock: true
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
    brand: "Multivitamine",
    name: "Complex Multivitaminic Daily - 90 tablete",
    price: 99,
    rating: 4.6,
    reviews: 234,
    inStock: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(parseInt(id || '1'));

  const handleAddToCart = () => {
    addItem({
      id: productData.id,
      image: productData.images[0],
      brand: productData.brand,
      name: productData.name,
      price: productData.price,
      inStock: productData.inStock
    });
    toast({
      title: "Produs adăugat în coș",
      description: `${quantity} x ${productData.name}`,
    });
  };

  const handleToggleFavorite = () => {
    toggleWishlist({
      id: productData.id,
      image: productData.images[0],
      brand: productData.brand,
      name: productData.name,
      price: productData.price,
      originalPrice: productData.originalPrice,
      rating: productData.rating,
      reviews: productData.reviews,
      discount: productData.discount,
      inStock: productData.inStock
    });
    toast({
      title: isFavorite ? "Eliminat din favorite" : "Adăugat la favorite",
      description: productData.name,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Acasă</Link>
              <span>/</span>
              <Link to="/produse" className="hover:text-primary transition-colors">Produse</Link>
              <span>/</span>
              <span className="text-foreground">{productData.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Link to="/produse" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ChevronLeft className="h-4 w-4" />
              Înapoi la produse
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/30 mb-4">
                  {productData.discount && (
                    <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground text-lg px-3 py-1">
                      -{productData.discount}%
                    </Badge>
                  )}
                  <img
                    src={productData.images[selectedImage]}
                    alt={productData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${productData.name} - imagine ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-muted-foreground mb-2">{productData.brand}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {productData.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(productData.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {productData.rating} ({productData.reviews} recenzii)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {productData.price} MDL
                  </span>
                  {productData.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {productData.originalPrice} MDL
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-2 w-32 rounded-full ${productData.inStock ? 'bg-primary/20' : 'bg-destructive/20'}`}>
                      <div 
                        className={`h-full rounded-full ${productData.inStock ? 'bg-primary' : 'bg-destructive'}`}
                        style={{ width: `${(productData.stockQuantity / 100) * 100}%` }}
                      />
                    </div>
                    <span className={`font-medium ${productData.inStock ? 'text-primary' : 'text-destructive'}`}>
                      {productData.stockQuantity} în stoc
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Quantity & Actions */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cantitate</label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(Math.min(productData.stockQuantity, quantity + 1))}
                          disabled={quantity >= productData.stockQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!productData.inStock}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Adaugă în coș
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleToggleFavorite}
                      className={isFavorite ? "border-primary bg-primary/5" : ""}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Calitate<br />garantată</p>
                  </div>
                                    <div className="text-center">
                    <Package className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Ridicare<br />gratuită</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Retur<br />30 zile</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs: Description, Specifications, Reviews */}
            <Tabs defaultValue="description" className="mt-12">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="description">Descriere</TabsTrigger>
                <TabsTrigger value="specifications">Specificații</TabsTrigger>
                <TabsTrigger value="reviews">Recenzii ({productData.reviews})</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Despre produs</h3>
                      <p className="text-muted-foreground leading-relaxed">{productData.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Beneficii</h3>
                      <ul className="space-y-2">
                        {productData.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <dl className="space-y-4">
                      {Object.entries(productData.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-3 border-b last:border-0">
                          <dt className="font-medium text-foreground">{key}</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="text-center md:border-r md:pr-8">
                          <div className="text-5xl font-bold text-primary mb-2">{productData.rating}</div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(productData.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{productData.reviews} recenzii</p>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-3">
                              <span className="text-sm w-8">{stars}★</span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-amber-400"
                                  style={{ width: `${stars === 5 ? 85 : stars === 4 ? 10 : 5}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12">
                                {stars === 5 ? 85 : stars === 4 ? 10 : 5}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  {reviewsData.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{review.author}</p>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">Verificat</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Produse similare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
