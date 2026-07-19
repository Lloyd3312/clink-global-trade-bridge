import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Phone, User, LogOut, LayoutDashboard, Home, Info, Package, Building2, HelpCircle, Mail, FileText, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, isSeller, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Products", path: "/products", icon: Package },
    { name: "Real Estate", path: "/real-estate", icon: Building2 },
    { name: "Study in Türkiye", path: "/study-in-turkiye", icon: GraduationCap },
    { name: "How It Works", path: "/how-it-works", icon: HelpCircle },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Get Quote", path: "/quote", icon: FileText },
  ];

  return (
    <>
      <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Hamburger tray trigger (always visible) + Logo */}
            <div className="flex items-center gap-2">
              <Sheet open={trayOpen} onOpenChange={setTrayOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-background z-[60]">
                  <SheetHeader className="p-6 border-b border-border">
                    <SheetTitle className="flex items-center gap-2">
                      <Globe className="h-6 w-6 text-primary" />
                      <div className="text-left">
                        <div className="font-bold text-base">CLINK</div>
                        <div className="text-xs text-muted-foreground font-normal">GLOBAL SERVICES</div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setTrayOpen(false)}
                          className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors hover:bg-accent ${
                            isActive(item.path) ? "text-primary bg-accent" : "text-foreground/80"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                    <div className="border-t border-border mt-2 pt-2">
                      {user ? (
                        <>
                          {isSeller && <Link to="/seller/products" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent"><LayoutDashboard className="h-4 w-4" />Upload Products</Link>}
                          {isSeller && <Link to="/seller/properties" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent"><Building2 className="h-4 w-4" />Upload Property</Link>}
                          {!isSeller && <Link to="/seller/apply" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent"><User className="h-4 w-4" />Become a Seller</Link>}
                          {isAdmin && <Link to="/admin" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent"><LayoutDashboard className="h-4 w-4" />Admin · Quotes</Link>}
                          {isAdmin && <Link to="/admin/catalog" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent"><LayoutDashboard className="h-4 w-4" />Admin · Catalog</Link>}
                          <button onClick={() => { signOut(); setTrayOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent text-left"><LogOut className="h-4 w-4" />Sign Out</button>
                        </>
                      ) : (
                        <Link to="/auth" onClick={() => setTrayOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-accent"><User className="h-4 w-4" />Sign In</Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Link to="/" className="flex items-center gap-2">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-bold text-lg text-foreground">CLINK</div>
                  <div className="text-xs text-muted-foreground">GLOBAL SERVICES</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right CTA */}
            <div className="flex items-center gap-2">
              <Button variant="cta-outline" size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/quote">Get Quote</Link>
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2"><User className="h-4 w-4" /><span className="hidden sm:inline">Account</span></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background z-50">
                    {isSeller && <DropdownMenuItem asChild><Link to="/seller/products"><LayoutDashboard className="h-4 w-4 mr-2" />Upload Products</Link></DropdownMenuItem>}
                    {isSeller && <DropdownMenuItem asChild><Link to="/seller/properties">Upload Property</Link></DropdownMenuItem>}
                    {!isSeller && <DropdownMenuItem asChild><Link to="/seller/apply">Become a Seller</Link></DropdownMenuItem>}
                    {isAdmin && <DropdownMenuItem asChild><Link to="/admin">Admin · Quotes</Link></DropdownMenuItem>}
                    {isAdmin && <DropdownMenuItem asChild><Link to="/admin/catalog">Admin · Catalog</Link></DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}><LogOut className="h-4 w-4 mr-2" />Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" asChild><Link to="/auth">Sign In</Link></Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating side tab to reopen tray when scrolled (visible on non-home pages) */}
      {location.pathname !== "/" && !trayOpen && (
        <button
          onClick={() => setTrayOpen(true)}
          aria-label="Open navigation"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-primary-foreground rounded-r-lg shadow-lg p-2 hover:pl-3 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default Navigation;
