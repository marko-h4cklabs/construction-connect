import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  youtubeId: string;
  clientName: string;
  clientRole: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    youtubeId: "aGUxN86sdYg",
    clientName: "Mario",
    clientRole: "Render13",
  },
  {
    id: "2",
    youtubeId: "mmiIzEl6kbo",
    clientName: "Danijela",
    clientRole: "Edictus",
  },
  {
    id: "3",
    youtubeId: "62wwkhpzCDw",
    clientName: "Krešo",
    clientRole: "Ćakule",
  },
  {
    id: "4",
    youtubeId: "FisfEq0p2vQ",
    clientName: "Marita",
    clientRole: "Shiatsu Shen",
  },
];

const VideoTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getVisibleIndices = () => {
    const prev = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const next = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleIndices();

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tight">
            Što kažu naši <span className="text-gradient">klijenti</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Pogledajte iskustva firmi koje koriste Upitomat
          </p>
        </div>

        {/* Stories Carousel */}
        <div 
          className={`relative flex items-center justify-center gap-4 md:gap-8 max-w-6xl mx-auto transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-20 w-10 h-10 md:w-12 md:h-12 border-2 border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:border-primary hover:bg-muted/80 transition-all duration-300 focus-brutal group"
            aria-label="Prethodni video"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Stories Container */}
          <div className="flex items-center justify-center gap-3 md:gap-6 overflow-hidden py-4">
            {/* Previous Video (Left) */}
            <div
              className="hidden md:block flex-shrink-0 transition-all duration-500 opacity-30 scale-[0.75] hover:opacity-50 cursor-pointer"
              onClick={handlePrev}
            >
              <VideoCard testimonial={testimonials[prev]} isActive={false} />
            </div>

            {/* Current Video (Center) */}
            <div className="flex-shrink-0 transition-all duration-500 z-10">
              <VideoCard testimonial={testimonials[current]} isActive={true} />
            </div>

            {/* Next Video (Right) */}
            <div
              className="hidden md:block flex-shrink-0 transition-all duration-500 opacity-30 scale-[0.75] hover:opacity-50 cursor-pointer"
              onClick={handleNext}
            >
              <VideoCard testimonial={testimonials[next]} isActive={false} />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-20 w-10 h-10 md:w-12 md:h-12 border-2 border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:border-primary hover:bg-muted/80 transition-all duration-300 focus-brutal group"
            aria-label="Sljedeći video"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div 
          className={`flex justify-center gap-2 mt-6 transition-all duration-700 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`h-2 transition-all duration-300 border ${
                index === currentIndex
                  ? "bg-primary border-primary w-8 shadow-[0_0_10px_hsl(50_100%_50%/0.4)]"
                  : "bg-muted/50 border-border/50 w-2 hover:border-primary/50 hover:bg-muted"
              }`}
              aria-label={`Idi na video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface VideoCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const VideoCard = ({ testimonial, isActive }: VideoCardProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = `https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=${isActive ? 1 : 0}&mute=1&loop=1&playlist=${testimonial.youtubeId}&controls=1&modestbranding=1&rel=0&playsinline=1`;

  return (
    <div className="flex flex-col items-center">
      {/* Video Container with yellow border */}
      <div
        className={`relative overflow-hidden bg-muted transition-all duration-500 border-2 ${
          isActive
            ? "w-[220px] h-[390px] md:w-[280px] md:h-[500px] border-primary"
            : "w-[180px] h-[320px] md:w-[220px] md:h-[390px] border-border/50"
        }`}
        style={isActive ? {
          boxShadow: "0 0 40px 6px hsl(50 100% 50% / 0.25), 0 0 80px 15px hsl(50 100% 50% / 0.1)"
        } : {}}
      >
        <iframe
          ref={iframeRef}
          key={`${testimonial.id}-${isActive}`}
          src={embedUrl}
          title={`Video testimonial od ${testimonial.clientName}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Client Info */}
      <div className={`mt-4 text-center transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-50 translate-y-1"}`}>
        <p className="font-bold text-foreground uppercase tracking-tight">{testimonial.clientName}</p>
        <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
      </div>
    </div>
  );
};

export default VideoTestimonials;
