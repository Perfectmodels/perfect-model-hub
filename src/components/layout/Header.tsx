import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Mannequins", href: "/models" },
  { name: "Casting", href: "/casting" },
  { name: "Services", href: "/services" },
  { name: "Magazine", href: "/magazine" },
  { name: "Fashion Day", href: "/fashion-day" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">PM</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-semibold text-foreground">Perfect Models</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Management</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  location.pathname === item.href
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Button asChild variant="default" className="font-medium">
              <Link to="/casting/apply">Postuler</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors rounded-md",
                    location.pathname === item.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Button asChild className="w-full">
                  <Link to="/casting/apply" onClick={() => setMobileMenuOpen(false)}>
                    Postuler au Casting
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
