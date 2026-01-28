import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  const navLinks = [
    { id: "proces", label: "Proces" },
    { id: "kalkulator", label: "Kalkulator" },
    { id: "klijenti", label: "Klijenti" },
    { id: "cijene", label: "Cijene" },
    { id: "nasa-prica", label: "Naša priča" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Upitomat logo" className="w-10 h-10" />
            <span className="font-black text-xl text-foreground uppercase tracking-tight">Upitomat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-semibold uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-primary pb-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://app.upitomat.hr/auth"
              className="btn-brutal px-5 py-2 text-sm focus-brutal"
            >
              Isprobajte Upitomat
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground border-2 border-border hover:border-primary transition-colors duration-150 focus-brutal"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t-2 border-border bg-background">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 font-semibold uppercase text-sm tracking-wide py-3 px-4 border-l-2 border-transparent hover:border-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t-2 border-border px-4">
                <a 
                  href="https://app.upitomat.hr/auth"
                  className="btn-brutal px-5 py-3 text-sm w-full text-center block focus-brutal"
                >
                  Isprobajte Upitomat
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
