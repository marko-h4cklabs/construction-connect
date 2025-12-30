import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Koliko vremena treba za postavljanje BuildPro-a?",
    answer:
      "Većina građevinskih tvrtki je spremna za rad unutar 2 sata. Naš tim za onboarding pomoći će vam uvesti postojeće projekte i obučiti vašu ekipu. Također nudimo obuku na licu mjesta za Poslovne korisnike.",
  },
  {
    question: "Moram li biti tehnički potkovan za korištenje?",
    answer:
      "Nikako! BuildPro je dizajniran posebno za građevinske profesionalce. Ako znate koristiti pametni telefon, znate koristiti BuildPro. Naše sučelje je jednostavno i intuitivno, bez kompliciranih izbornika ili tehničkog žargona.",
  },
  {
    question: "Može li moja ekipa koristiti aplikaciju na mobitelima?",
    answer:
      "Da! BuildPro radi na bilo kojem uređaju - pametnim telefonima, tabletima ili računalima. Vaša ekipa može se prijaviti, ažurirati napredak posla i slati fotografije direktno s gradilišta koristeći našu mobilnu aplikaciju, dostupnu za iOS i Android.",
  },
  {
    question: "Što se događa s mojim podacima ako otkažem?",
    answer:
      "Vaši podaci pripadaju vama. Ako odlučite otkazati, imat ćete 30 dana za izvoz svih podataka o projektima, dokumenata i izvještaja. Također možemo pružiti izvoz podataka u uobičajenim formatima kompatibilnim s drugim softverom.",
  },
  {
    question: "Postoji li ugovor ili mogu otkazati bilo kada?",
    answer:
      "Nema dugoročnih ugovora. Svi planovi su na mjesečnoj bazi i možete otkazati bilo kada iz postavki računa. Ako otkažete, imat ćete pristup do kraja trenutnog obračunskog razdoblja.",
  },
  {
    question: "Integrira li se BuildPro s QuickBooks-om?",
    answer:
      "Da! Naši Profesionalni i Poslovni planovi uključuju direktnu integraciju s QuickBooks Online i QuickBooks Desktop. Možete automatski sinkronizirati račune, troškove i podatke o klijentima, štedeći sate dvostrukog unosa.",
  },
  {
    question: "Kakvu podršku nudite?",
    answer:
      "Nudimo email podršku za sve planove, prioritetnu telefonsku podršku za Profesionalne planove i posvećenog voditelja računa za Poslovne korisnike. Naše prosječno vrijeme odgovora je manje od 2 sata tijekom radnog vremena.",
  },
  {
    question: "Mogu li isprobati BuildPro prije nego se obvežem?",
    answer:
      "Apsolutno! Svaki plan dolazi s 14-dnevnim besplatnim probnim razdobljem, bez potrebe za kreditnom karticom. Imat ćete puni pristup svim značajkama kako biste vidjeli točno kako će BuildPro raditi za vaše poslovanje.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Često Postavljana Pitanja
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Imate pitanja? Imamo odgovore. Ako ne možete pronaći ono što tražite,{" "}
            <button className="text-accent hover:underline font-medium">
              kontaktirajte naš tim
            </button>
            .
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-card data-[state=open]:shadow-card-hover transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
