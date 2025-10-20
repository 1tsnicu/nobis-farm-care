import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? "Bine ai venit înapoi!" : "Crează cont"}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Intră în contul tău pentru a continua" 
                  : "Completează formularul pentru a crea un cont nou"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nume complet</Label>
                  <Input id="name" placeholder="Ion Popescu" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email / Telefon</Label>
                <Input id="email" type="email" placeholder="ion@exemplu.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parola</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ascunde" : "Arată"}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmă parola</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm cursor-pointer">
                      Ține-mă minte
                    </label>
                  </div>
                  <Link to="/reset-password" className="text-sm text-primary hover:underline">
                    Am uitat parola?
                  </Link>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <label htmlFor="terms" className="text-sm cursor-pointer leading-tight">
                      Accept{" "}
                      <Link to="/termeni" className="text-primary hover:underline">
                        termenii și condițiile
                      </Link>
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="newsletter" className="mt-1" />
                    <label htmlFor="newsletter" className="text-sm cursor-pointer leading-tight">
                      Subscribe la newsletter pentru oferte exclusive
                    </label>
                  </div>
                </div>
              )}

              <Button className="w-full bg-primary hover:bg-primary/90 font-semibold" size="lg">
                {isLogin ? "Intră în cont" : "Crează cont"}
              </Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                  SAU
                </span>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Intră cu Google
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Intră cu Facebook
                </Button>
              </div>

              <div className="text-center text-sm">
                {isLogin ? (
                  <span>
                    Nu ai cont?{" "}
                    <button 
                      onClick={() => setIsLogin(false)} 
                      className="text-primary font-semibold hover:underline"
                    >
                      Creează cont
                    </button>
                  </span>
                ) : (
                  <span>
                    Ai deja cont?{" "}
                    <button 
                      onClick={() => setIsLogin(true)} 
                      className="text-primary font-semibold hover:underline"
                    >
                      Intră aici
                    </button>
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
