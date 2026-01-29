import { MapPin, Instagram, Facebook, Linkedin, Youtube, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border/50">
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(45 30% 8% / 0.5) 0%, transparent 100%)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8">
          {/* Top row - Logo and Location */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Upitomat logo" 
                className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" 
              />
              <span className="font-black text-lg uppercase tracking-tight text-foreground">Upitomat</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm tracking-wide">
              <MapPin className="w-4 h-4" />
              <span>Sjedište u Zagrebu</span>
            </div>
          </div>

          {/* Social Links - 3x2 grid */}
          <div className="flex flex-col items-center gap-3">
            {/* First row - 3 icons */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/upitomat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/5 hover:shadow-[0_0_15px_hsl(50_100%_50%/0.15)]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586263463876"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/5 hover:shadow-[0_0_15px_hsl(50_100%_50%/0.15)]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/upitomat/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/5 hover:shadow-[0_0_15px_hsl(50_100%_50%/0.15)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            {/* Second row - 3 icons */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://www.youtube.com/@Upitomat/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/5 hover:shadow-[0_0_15px_hsl(50_100%_50%/0.15)]"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@upitomat.hr"
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/5 hover:shadow-[0_0_15px_hsl(50_100%_50%/0.15)]"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="sms:+385992526237"
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/5 hover:shadow-[0_0_15px_hsl(50_100%_50%/0.15)]"
                aria-label="SMS"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* Copyright */}
          <p className="text-muted-foreground/60 text-sm tracking-wide text-center">
            © {currentYear} Upitomat. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
