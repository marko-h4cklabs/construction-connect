import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Kako funkcionira probni poziv i zašto je važan?",
    answer: `To je kratak i vrijedan razgovor u kojem prvo želimo razumjeti kako trenutno rješavate upite, i koji su vam glavni problemi koje želite riješiti.

Zatim vam pokažemo kako bi Upitomat izgledao konkretno u vašem slučaju.

Cilj nam je da imate jasnu sliku:
• koliku prednost Upitomat vama može donijeti
• kako Upitomat izgleda u akciji
• bi li ovo imalo smisla za vašu tvrtku

Sve prije nego uložite vrijeme ili novac.`,
  },
  {
    question: "Postoji li ugovorna obveza?",
    answer: `Ne. Nema ugovora, nema skrivenih obveza.`,
  },
  {
    question: "Zašto bih ja odabrao vas?",
    answer: `Zato što nismo krenuli od alata, nego od problema.

Radeći s tvrtkama koje već dobivaju dosta upita, imamo dobru ideju gdje sve imaju najviše problema.

Upitomat nije generičko rješenje, nego sustav koji se prilagođava načinu na koji vi već radite i komunicirate.

Cilj je vratiti vama vrijeme i kontrolu, a ne dodati još jedan alat u cijeli kaos.`,
  },
  {
    question: "Što razlikuje Upitomat od ostalih alata?",
    answer: `Većina chatbotova odgovara generički. Postavljaju osnovna pitanja i vrlo brzo se osjeti da s druge strane nije stvarna osoba.

Upitomat radi drugačije.

Naš chatbot treniramo na temelju vaših stvarnih razgovora, vašeg tona i načina komunikacije. Zbog toga ne odgovara kao bot, nego komunicira kao vi.

To omogućuje dublje i prirodnije razgovore s potencijalnim kupcima. Ljudi imaju osjećaj da pričaju s vlasnikom ili nekim iz tima.

Cilj nije automatizirati odgovor, nego zadržati ljudski osjećaj razgovora, bez da vi morate biti stalno prisutni.`,
  },
  {
    question: "Koliko je komplicirano koristiti Upitomat?",
    answer: `Nimalo. Sve je napravljeno da bude jednostavno i razumljivo bez tehničkog znanja.

Mi postavimo sustav, prilagodimo ga vašim potrebama i pokažemo kako ga koristiti.`,
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
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed whitespace-pre-line">
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
