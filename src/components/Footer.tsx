import { MapPin, Instagram, Facebook, Linkedin, Youtube, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground border-t-2 border-primary-foreground/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Top row - Logo and Location */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logo} alt="Upitomat logo" className="w-8 h-8" />
              <span className="font-black text-lg uppercase tracking-tight">Upitomat</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm tracking-wide">
              <MapPin className="w-4 h-4" />
              <span>Sjedište u Zagrebu</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://www.instagram.com/upitomat/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150 p-2 border border-primary-foreground/30 hover:border-primary-foreground/60"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61586140888256"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150 p-2 border border-primary-foreground/30 hover:border-primary-foreground/60"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150 p-2 border border-primary-foreground/30 hover:border-primary-foreground/60"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150 p-2 border border-primary-foreground/30 hover:border-primary-foreground/60"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150 p-2 border border-primary-foreground/30 hover:border-primary-foreground/60"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-150 p-2 border border-primary-foreground/30 hover:border-primary-foreground/60"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-primary-foreground/60 text-sm tracking-wide text-center">
            © {currentYear} Upitomat. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
