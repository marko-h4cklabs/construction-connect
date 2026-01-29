import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

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
    handleClose();
  };

  const handleOpen = () => {
    setIsAnimating(true);
    setIsOpen(true);
    // Animation completes after 280ms
    setTimeout(() => setIsAnimating(false), 280);
  };

  const handleClose = () => {
    setIsClosing(true);
    // Close animation takes 220ms
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 220);
  };

  const navLinks = [
    { id: "proces", label: "Proces" },
    { id: "klijenti", label: "Klijenti" },
    { id: "kalkulator", label: "Kalkulator" },
    { id: "nasa-prica", label: "Naša priča" },
  ];

  return (
    <>
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
                className="px-4 py-2 text-sm font-bold uppercase tracking-wide bg-primary text-primary-foreground border border-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(50_100%_50%/0.35)] hover:translate-y-[-1px]"
                style={{ boxShadow: '0 0 15px hsl(50 100% 50% / 0.2)' }}
              >
                Isprobajte Upitomat
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground border border-border/50 hover:border-primary/50 transition-all duration-300 focus-brutal bg-background/50 backdrop-blur-sm"
              onClick={() => isOpen ? handleClose() : handleOpen()}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Premium Clip-path Morph Animation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40" style={{ top: '64px' }}>
          {/* Backdrop with blur + dim */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              background: 'hsl(0 0% 0% / 0.7)',
              backdropFilter: isAnimating || isClosing ? 'blur(0px)' : 'blur(8px)',
              transition: 'backdrop-filter 300ms ease-out, opacity 220ms ease-out',
            }}
            onClick={handleClose}
          />
          
          {/* Menu Container with Clip-path Morph */}
          <div className="absolute inset-0 flex items-start justify-center pt-4 px-4 overflow-hidden">
            <div
              ref={menuRef}
              className={`relative w-[80%] max-w-sm bg-background/95 backdrop-blur-md`}
              style={{
                // Enhanced yellow glow border
                border: '2px solid hsl(50 100% 50% / 0.5)',
                boxShadow: `
                  0 0 20px 2px hsl(50 100% 50% / 0.15),
                  0 0 40px 4px hsl(50 100% 50% / 0.1),
                  inset 0 0 20px hsl(50 100% 50% / 0.05),
                  0 20px 60px -10px hsl(0 0% 0% / 0.5)
                `,
                // Clip-path morph animation
                clipPath: isClosing 
                  ? 'circle(0% at 50% 0%)' 
                  : 'circle(150% at 50% 0%)',
                transform: isAnimating 
                  ? 'perspective(800px) rotateX(3deg) scale(0.97)' 
                  : isClosing 
                    ? 'perspective(800px) rotateX(-2deg) scale(0.98)' 
                    : 'perspective(800px) rotateX(0deg) scale(1)',
                opacity: isClosing ? 0 : 1,
                transition: isClosing
                  ? 'clip-path 220ms ease-in, transform 220ms ease-in, opacity 180ms ease-in'
                  : 'clip-path 280ms ease-out, transform 280ms ease-out, opacity 150ms ease-out',
              }}
            >
              <div className="flex flex-col py-5">
                {navLinks.map((link, index) => (
                  <div key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 font-semibold uppercase text-sm tracking-wide py-3 px-5 text-center block"
                      style={{ 
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating ? 'translateY(-8px)' : 'translateY(0)',
                        transition: `opacity 200ms ease-out ${150 + index * 40}ms, transform 200ms ease-out ${150 + index * 40}ms`,
                      }}
                    >
                      {link.label}
                    </a>
                    {/* Thin yellow centered separator (30% width) */}
                    {index < navLinks.length - 1 && (
                      <div 
                        className="mx-auto h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                        style={{ width: '30%' }}
                      />
                    )}
                  </div>
                ))}
                <div 
                  className="pt-5 mt-5 border-t border-border/30 px-5"
                  style={{ 
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'translateY(-8px)' : 'translateY(0)',
                    transition: `opacity 200ms ease-out ${150 + navLinks.length * 40}ms, transform 200ms ease-out ${150 + navLinks.length * 40}ms`,
                  }}
                >
                  <a 
                    href="https://app.upitomat.hr/auth"
                    className="px-6 py-3.5 text-sm w-full text-center block font-bold uppercase tracking-wide bg-primary text-primary-foreground border border-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(50_100%_50%/0.35)] whitespace-nowrap"
                    style={{ boxShadow: '0 0 15px hsl(50 100% 50% / 0.2)' }}
                  >
                    Isprobajte Upitomat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
