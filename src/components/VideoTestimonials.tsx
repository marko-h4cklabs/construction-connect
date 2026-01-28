import { useState, useRef } from "react";
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

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const getVisibleIndices = () => {
    const prev = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const next = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleIndices();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tight">
            Što kažu naši klijenti
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Pogledajte iskustva firmi koje koriste Upitomat
          </p>
        </div>

        {/* Stories Carousel */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-20 w-10 h-10 md:w-12 md:h-12 border-2 border-border bg-background flex items-center justify-center text-foreground hover:border-primary hover:bg-muted transition-all duration-150 focus-brutal"
            aria-label="Prethodni video"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Stories Container */}
          <div className="flex items-center justify-center gap-3 md:gap-6 overflow-hidden py-4">
            {/* Previous Video (Left) */}
            <div
              className="hidden md:block flex-shrink-0 transition-all duration-300 opacity-40 scale-[0.75] hover:opacity-60 cursor-pointer"
              onClick={handlePrev}
            >
              <VideoCard testimonial={testimonials[prev]} isActive={false} />
            </div>

            {/* Current Video (Center) */}
            <div className="flex-shrink-0 transition-all duration-300 z-10">
              <VideoCard testimonial={testimonials[current]} isActive={true} />
            </div>

            {/* Next Video (Right) */}
            <div
              className="hidden md:block flex-shrink-0 transition-all duration-300 opacity-40 scale-[0.75] hover:opacity-60 cursor-pointer"
              onClick={handleNext}
            >
              <VideoCard testimonial={testimonials[next]} isActive={false} />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-20 w-10 h-10 md:w-12 md:h-12 border-2 border-border bg-background flex items-center justify-center text-foreground hover:border-primary hover:bg-muted transition-all duration-150 focus-brutal"
            aria-label="Sljedeći video"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 400);
                }
              }}
              className={`h-2 transition-all duration-150 border ${
                index === currentIndex
                  ? "bg-primary border-primary w-8"
                  : "bg-muted border-border w-2 hover:border-primary"
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
      {/* Video Container */}
      <div
        className={`relative overflow-hidden bg-muted transition-all duration-300 border-2 ${
          isActive
            ? "w-[220px] h-[390px] md:w-[280px] md:h-[500px] border-primary"
            : "w-[180px] h-[320px] md:w-[220px] md:h-[390px] border-border"
        }`}
        style={isActive ? {
          boxShadow: "0 0 10px 2px hsl(50 100% 50% / 0.25), 0 0 20px 4px hsl(50 100% 50% / 0.12)"
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
      <div className={`mt-4 text-center transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-60"}`}>
        <p className="font-bold text-foreground uppercase tracking-tight">{testimonial.clientName}</p>
        <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
      </div>
    </div>
  );
};

export default VideoTestimonials;
