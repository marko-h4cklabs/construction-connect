import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to set up BuildPro?",
    answer:
      "Most construction companies are up and running within 2 hours. Our onboarding team will help you import your existing projects and train your crew. We also offer on-site training for Enterprise customers.",
  },
  {
    question: "Do I need to be tech-savvy to use this?",
    answer:
      "Not at all! BuildPro is designed specifically for construction professionals. If you can use a smartphone, you can use BuildPro. Our interface is simple and intuitive, with no complicated menus or technical jargon.",
  },
  {
    question: "Can my crew use it on their phones?",
    answer:
      "Yes! BuildPro works on any device - smartphones, tablets, or computers. Your crew can clock in, update job progress, and submit photos right from the job site using our mobile app, available for both iOS and Android.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data belongs to you. If you decide to cancel, you'll have 30 days to export all your project data, documents, and reports. We can also provide data exports in common formats compatible with other software.",
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer:
      "There are no long-term contracts. All plans are month-to-month, and you can cancel anytime from your account settings. If you cancel, you'll have access until the end of your current billing period.",
  },
  {
    question: "Does BuildPro integrate with QuickBooks?",
    answer:
      "Yes! Our Professional and Enterprise plans include direct integration with QuickBooks Online and QuickBooks Desktop. You can sync invoices, expenses, and customer data automatically, saving hours of double-entry work.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer email support for all plans, priority phone support for Professional plans, and a dedicated account manager for Enterprise customers. Our average response time is under 2 hours during business hours.",
  },
  {
    question: "Can I try BuildPro before committing?",
    answer:
      "Absolutely! Every plan comes with a 14-day free trial, no credit card required. You'll have full access to all features so you can see exactly how BuildPro will work for your business.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for,{" "}
            <button className="text-accent hover:underline font-medium">
              contact our team
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
