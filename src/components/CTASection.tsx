const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-black text-foreground mb-6 uppercase tracking-tight">
            Spremni za automatizaciju upita?
          </h2>
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://app.upitomat.hr/auth"
              className="btn-brutal px-8 py-4 text-lg focus-brutal"
            >
              Isprobajte Upitomat
            </a>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Besplatno, bez obveze
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
