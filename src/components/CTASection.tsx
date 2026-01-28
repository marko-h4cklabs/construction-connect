import StaggeredText from "@/components/StaggeredText";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <StaggeredText>
            <h2 className="text-xl md:text-3xl font-black text-foreground mb-6 uppercase tracking-tight">
              Spremni za automatizaciju upita?
            </h2>
          </StaggeredText>
          <StaggeredText delay={200} className="flex flex-col items-center gap-3">
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-primary focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_40px_8px_hsl(50_100%_50%/0.45)]"
              style={{ boxShadow: '0 0 30px 4px hsl(50 100% 50% / 0.3)' }}
            >
              Isprobajte Upitomat
            </a>
            <span className="text-sm text-muted-foreground">
              Besplatno, bez obveze
            </span>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
