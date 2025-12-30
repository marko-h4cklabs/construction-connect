import { Button } from "@/components/ui/button";
import { Phone, Calendar, Clock } from "lucide-react";

const ScheduleCallSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
            <Phone className="w-8 h-8 text-accent" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Zakažite Besplatan Poziv s Našim Timom
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Imate pitanja? Želite vidjeti kako BuildPro može raditi za vašu građevinsku tvrtku? 
            Rezervirajte besplatan poziv od 15 minuta s našim timom.
          </p>

          <Button variant="hero" size="xl" className="mb-10">
            <Calendar className="mr-2" />
            Zakažite Besplatan Poziv
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">15 minuta</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Bez obveza</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Odaberite svoje vrijeme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCallSection;
