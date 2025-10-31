import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  manufacturer_id: string | null;
  country: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  description: string | null;
  category_id: string;
  is_available: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(id || '');

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    
    try {
      // Încarcă produsul din baza de date
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('id', id)
        .eq('is_available', true)
        .single();

      if (productError) {
        console.error('Product error:', productError);
        setProduct(null);
      } else {
        setProduct(productData);
        setCategory(productData.categories);
        // Încarcă produsele similare după ce produsul a fost încărcat
        fetchSimilarProducts(productData.category_id, productData.id);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    }

    setLoading(false);
  };

  const fetchSimilarProducts = async (categoryId: string, currentProductId: string) => {
    setLoadingSimilar(true);
    
    try {
      const { data: similarData, error: similarError } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_available', true)
        .neq('id', currentProductId) // Exclude current product
        .limit(3);

      if (similarError) {
        console.error('Similar products error:', similarError);
      } else {
        setSimilarProducts(similarData || []);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }

    setLoadingSimilar(false);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      image: product.image_url || '/placeholder.svg',
      brand: product.manufacturer,
      name: product.name,
      price: product.price,
      inStock: product.stock_quantity > 0
    });
    toast({
      title: "Produs adăugat în coș",
      description: `${quantity} x ${product.name}`,
    });
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    
    toggleWishlist({
      id: product.id,
      image: product.image_url || '/placeholder.svg',
      brand: product.manufacturer,
      name: product.name,
      price: product.price,
      originalPrice: undefined,
      rating: 4.5, // Default rating
      reviews: Math.floor(Math.random() * 200) + 10,
      discount: undefined,
      inStock: product.stock_quantity > 0
    });
    toast({
      title: isFavorite ? "Eliminat din favorite" : "Adăugat la favorite",
      description: product.name,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="bg-muted/30 py-4">
            <div className="container mx-auto px-4">
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Skeleton className="h-6 w-32 mb-6" />
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <Skeleton className="aspect-square rounded-lg mb-4" />
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-lg" />
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Produs negăsit</h1>
          <Link to="/produse" className="text-primary hover:underline">
            ← Înapoi la produse
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

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
              {category && (
                <>
                  <Link to={`/categorie/${category.slug}`} className="hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-foreground">{product.name}</span>
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
                  <img
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-muted-foreground mb-2">{product.manufacturer}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 // Default rating 4
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    4.5 ({Math.floor(Math.random() * 200) + 10} recenzii)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {product.price} MDL
                  </span>
                </div>

                {/* Stock */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-2 w-32 rounded-full ${product.stock_quantity > 0 ? 'bg-primary/20' : 'bg-destructive/20'}`}>
                      <div 
                        className={`h-full rounded-full ${product.stock_quantity > 0 ? 'bg-primary' : 'bg-destructive'}`}
                        style={{ width: `${Math.min((product.stock_quantity / 100) * 100, 100)}%` }}
                      />
                    </div>
                    <span className={`font-medium ${product.stock_quantity > 0 ? 'text-primary' : 'text-destructive'}`}>
                      {product.stock_quantity} în stoc
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
                          onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                          disabled={quantity >= product.stock_quantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 h-14 text-lg font-semibold"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={product.stock_quantity === 0}
                    >
                      <ShoppingCart className="h-6 w-6 mr-3" />
                      Adaugă în coș
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleToggleFavorite}
                      className={`h-14 px-6 ${isFavorite ? "border-primary bg-primary/5" : ""}`}
                    >
                      <Heart className={`h-6 w-6 ${isFavorite ? "fill-primary text-primary" : ""}`} />
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
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="description">Descriere</TabsTrigger>
                <TabsTrigger value="specifications">Specificații</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Despre produs</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description || "Descrierea produsului nu este disponibilă momentan."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <dl className="space-y-4">
                      <div className="flex justify-between py-3 border-b">
                        <dt className="font-medium text-foreground">Producător</dt>
                        <dd className="text-muted-foreground">{product.manufacturer}</dd>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <dt className="font-medium text-foreground">Țara de origine</dt>
                        <dd className="text-muted-foreground">{product.country}</dd>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <dt className="font-medium text-foreground">Preț</dt>
                        <dd className="text-muted-foreground">{product.price} MDL</dd>
                      </div>
                      <div className="flex justify-between py-3 border-b last:border-0">
                        <dt className="font-medium text-foreground">Stoc disponibil</dt>
                        <dd className="text-muted-foreground">{product.stock_quantity} bucăți</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
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
            
            {loadingSimilar ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            ) : similarProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProducts.map((similarProduct) => (
                  <ProductCard 
                    key={similarProduct.id}
                    id={similarProduct.id}
                    name={similarProduct.name}
                    brand={similarProduct.manufacturer}
                    price={similarProduct.price}
                    image={similarProduct.image_url || '/placeholder.svg'}
                    rating={4.5}
                    reviews={Math.floor(Math.random() * 200) + 10}
                    inStock={similarProduct.stock_quantity > 0}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nu s-au găsit produse similare.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
