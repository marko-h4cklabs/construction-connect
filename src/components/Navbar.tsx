import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { id: "klijenti", label: "Klijenti" },
    { id: "kalkulator", label: "Kalkulator" },
    { id: "nasa-prica", label: "Naša priča" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-[0_4px_30px_hsl(0_0%_0%/0.3)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Upitomat logo" 
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
            />
            <span className="font-black text-xl text-foreground uppercase tracking-tight">Upitomat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="relative text-muted-foreground hover:text-foreground transition-all duration-300 font-semibold uppercase text-sm tracking-wide py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://app.upitomat.hr/auth"
              className="px-5 py-2 text-sm font-bold uppercase tracking-wide bg-primary text-primary-foreground border border-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(50_100%_50%/0.35)] hover:translate-y-[-1px]"
              style={{ boxShadow: '0 0 15px hsl(50 100% 50% / 0.2)' }}
            >
              Isprobajte Upitomat
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground border border-border/50 hover:border-primary/50 transition-all duration-300 focus-brutal bg-background/50 backdrop-blur-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/30 bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 font-semibold uppercase text-sm tracking-wide py-3 px-4 border-l-2 border-transparent hover:border-primary"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-border/30 px-4">
                <a 
                  href="https://app.upitomat.hr/auth"
                  className="px-5 py-3 text-sm w-full text-center block font-bold uppercase tracking-wide bg-primary text-primary-foreground border border-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(50_100%_50%/0.35)]"
                  style={{ boxShadow: '0 0 15px hsl(50 100% 50% / 0.2)' }}
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
