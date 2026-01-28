import StaggeredText from "@/components/StaggeredText";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <StaggeredText>
            <h2 className="text-xl md:text-3xl font-black text-[rgb(43,43,43)] mb-6 uppercase tracking-tight">
              Spremni za automatizaciju upita?
            </h2>
          </StaggeredText>
          <StaggeredText delay={200} className="flex flex-col items-center gap-3">
            <a
              href="https://app.upitomat.hr/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg bg-[rgb(120,95,50)] text-white font-bold uppercase tracking-wide border-[2px] border-[rgb(90,70,35)] focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:bg-[rgb(140,110,55)] hover:shadow-[0_0_35px_6px_rgba(180,140,60,0.4)]"
              style={{ boxShadow: '0 0 25px 4px rgba(180,140,60,0.3)' }}
            >
              Isprobajte Upitomat
            </a>
            <span className="text-sm text-[rgb(43,43,43)] opacity-70">
              Besplatno, bez obveze
            </span>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
