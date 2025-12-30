import { Button } from "@/components/ui/button";
import { Play, ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  const scrollToVideo = () => {
    const element = document.getElementById("video");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Trusted by 500+ Construction Companies
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Run Your Construction Business{" "}
            <span className="text-gradient">Smarter, Not Harder</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            The all-in-one platform that helps construction companies manage projects, 
            track crews, and get paid faster. No tech experience needed.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Start Your Free Trial
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="w-full sm:w-auto"
              onClick={scrollToVideo}
            >
              <Play className="mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
