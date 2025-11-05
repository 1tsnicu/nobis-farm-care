import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import { Checkout } from "./pages/Checkout";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import ProductsManagement from "./pages/ProductsManagement";
import ImportProducts from "./pages/ImportProducts";
import CategoryPage from "./pages/CategoryPage";
import AdminProducts from "./pages/AdminProducts";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WishlistProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categorie/:slug" element={<CategoryPage />} />
            <Route path="/produse" element={<Navigate to="/categorie/medicamente-otc" replace />} />
            <Route path="/produs/:id" element={<ProductDetail />} />
            <Route path="/cos" element={<Cart />} />
            <Route path="/favorite" element={<Wishlist />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/despre" element={<About />} />
            <Route path="/servicii" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/produse" element={<ProductsManagement />} />
        <Route path="/admin/import" element={<ImportProducts />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
