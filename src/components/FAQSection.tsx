import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Kako funkcionira prvobitan poziv i zašto je važan?",
    answer: "Odgovor će biti dodan.",
  },
  {
    question: "Postoji li ugovorna obveza?",
    answer: "Odgovor će biti dodan.",
  },
  {
    question: "Zašto bih ja odabrao vas?",
    answer: "Odgovor će biti dodan.",
  },
  {
    question: "Što razlikuje Upitomat od ostalih alata?",
    answer: "Odgovor će biti dodan.",
  },
  {
    question: "Koliko je komplicirano koristiti Upitomat?",
    answer: "Odgovor će biti dodan.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Često Postavljana Pitanja
          </h2>
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
