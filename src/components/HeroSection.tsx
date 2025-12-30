import { Button } from "@/components/ui/button";
import { Play, ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
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
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            The all-in-one platform that helps construction companies manage projects, 
            track crews, and get paid faster. No tech experience needed.
          </p>

          {/* Video Container */}
          <div 
            className="relative rounded-2xl overflow-hidden shadow-card-hover bg-primary mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="aspect-video relative">
              {/* Replace this div with your actual video embed */}
              {/* Example YouTube embed: */}
              {/* <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="BuildPro Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
              
              {/* Placeholder until video is added */}
              <div className="absolute inset-0 bg-hero-gradient flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-accent/30 transition-colors group">
                    <div className="w-16 h-16 rounded-full bg-accent-gradient flex items-center justify-center shadow-accent group-hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 text-accent-foreground ml-1" />
                    </div>
                  </div>
                  <p className="text-primary-foreground text-lg font-medium">
                    Add your video URL here
                  </p>
                  <p className="text-primary-foreground/60 text-sm mt-2">
                    Supports YouTube, Vimeo, or direct video files
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Start Your Free Trial
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="w-full sm:w-auto"
            >
              <Play className="mr-2" />
              Request Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.5s" }}
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
