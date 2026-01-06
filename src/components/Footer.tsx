import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src={logo} alt="Upitomat logo" className="w-8 h-8" />
            <span className="font-bold text-lg">Upitomat</span>
          </div>
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Upitomat. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
