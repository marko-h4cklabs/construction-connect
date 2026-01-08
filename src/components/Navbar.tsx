import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
            <button
              onClick={() => scrollToSection("nasa-prica")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Naša priča
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Sistem
            </button>
            <button
              onClick={() => scrollToSection("klijenti")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Klijenti
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Česta pitanja
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="accent" onClick={() => scrollToSection("kontakt")}>Kontaktirajte nas</Button>
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
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("nasa-prica")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-left py-2"
              >
                Naša priča
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-left py-2"
              >
                Sistem
              </button>
              <button
                onClick={() => scrollToSection("klijenti")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-left py-2"
              >
                Klijenti
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-left py-2"
              >
                Česta pitanja
              </button>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="accent" onClick={() => scrollToSection("kontakt")}>Kontaktirajte nas</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
