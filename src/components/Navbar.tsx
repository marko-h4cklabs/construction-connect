import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Handle hash navigation on page load and hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, '', `#${id}`);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Upitomat logo" className="w-10 h-10" />
            <span className="font-bold text-xl text-foreground">Upitomat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#proces"
              onClick={(e) => handleNavClick(e, "proces")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Proces
            </a>
            <a
              href="#kalkulator"
              onClick={(e) => handleNavClick(e, "kalkulator")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Kalkulator
            </a>
            <a
              href="#klijenti"
              onClick={(e) => handleNavClick(e, "klijenti")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Klijenti
            </a>
            <a
              href="#cijene"
              onClick={(e) => handleNavClick(e, "cijene")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Cijene
            </a>
            <a
              href="#nasa-prica"
              onClick={(e) => handleNavClick(e, "nasa-prica")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Naša priča
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="accent" asChild>
              <a href="https://app.upitomat.hr/auth">Isprobajte Upitomat</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in bg-background">
            <div className="flex flex-col gap-4 items-center text-center">
              <a
                href="#proces"
                onClick={(e) => handleNavClick(e, "proces")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Proces
              </a>
              <a
                href="#kalkulator"
                onClick={(e) => handleNavClick(e, "kalkulator")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Kalkulator
              </a>
              <a
                href="#klijenti"
                onClick={(e) => handleNavClick(e, "klijenti")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Klijenti
              </a>
              <a
                href="#cijene"
                onClick={(e) => handleNavClick(e, "cijene")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Cijene
              </a>
              <a
                href="#nasa-prica"
                onClick={(e) => handleNavClick(e, "nasa-prica")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Naša priča
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border w-full items-center">
                <Button variant="accent" asChild>
                  <a href="https://app.upitomat.hr/auth">Isprobajte Upitomat</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
