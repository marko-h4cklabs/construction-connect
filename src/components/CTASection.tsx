const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Spremni za automatizaciju upita?
          </h2>
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://app.upitomat.hr/auth"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Isprobajte Upitomat
            </a>
            <p className="text-sm text-muted-foreground">
              Besplatno, bez obveze
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
