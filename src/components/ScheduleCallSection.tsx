import { Button } from "@/components/ui/button";
import { Phone, Calendar, CheckCircle2 } from "lucide-react";

const ScheduleCallSection = () => {
  const handleScheduleClick = () => {
    // Opens Calendly or your preferred scheduling tool
    // Replace with your actual Calendly link
    window.open("https://calendly.com/your-link", "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
            <Phone className="w-8 h-8 text-accent" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Želite vidjeti kako bi Upitomat radio za vašu tvrtku?
          </h2>

          <Button variant="hero" size="xl" className="mb-10" onClick={handleScheduleClick}>
            <Calendar className="mr-2" />
            <span className="hidden md:inline">Zakažite besplatan poziv sa našim timom</span>
            <span className="md:hidden">Besplatne konzultacije</span>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">14 dana probno razdoblje</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Za hrvatske tvrtke</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Bez ugovorne obveze</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCallSection;
