import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Pitanje 1 - Čeka vaš sadržaj",
    answer: "Odgovor na prvo pitanje će biti dodan.",
  },
  {
    question: "Pitanje 2 - Čeka vaš sadržaj",
    answer: "Odgovor na drugo pitanje će biti dodan.",
  },
  {
    question: "Pitanje 3 - Čeka vaš sadržaj",
    answer: "Odgovor na treće pitanje će biti dodan.",
  },
  {
    question: "Pitanje 4 - Čeka vaš sadržaj",
    answer: "Odgovor na četvrto pitanje će biti dodan.",
  },
  {
    question: "Pitanje 5 - Čeka vaš sadržaj",
    answer: "Odgovor na peto pitanje će biti dodan.",
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
