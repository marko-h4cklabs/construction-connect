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
    clientName: "Marko",
    clientRole: "Render13",
  },
  {
    id: "2",
    youtubeId: "mmiIzEl6kbo",
    clientName: "Ana",
    clientRole: "Simper Tech",
  },
  {
    id: "3",
    youtubeId: "62wwkhpzCDw",
    clientName: "Ivan",
    clientRole: "Edictus",
  },
  {
    id: "4",
    youtubeId: "FisfEq0p2vQ",
    clientName: "Petra",
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Što kažu naši klijenti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pogledajte iskustva firmi koje koriste Upitomat
          </p>
        </div>

        {/* Stories Carousel */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-muted transition-all hover:scale-110"
            aria-label="Prethodni video"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Stories Container */}
          <div className="flex items-center justify-center gap-3 md:gap-6 overflow-hidden py-4">
            {/* Previous Video (Left) */}
            <div
              className="hidden md:block flex-shrink-0 transition-all duration-400 ease-out opacity-40 scale-[0.75] hover:opacity-60 cursor-pointer"
              onClick={handlePrev}
            >
              <VideoCard testimonial={testimonials[prev]} isActive={false} />
            </div>

            {/* Current Video (Center) */}
            <div className="flex-shrink-0 transition-all duration-400 ease-out z-10">
              <VideoCard testimonial={testimonials[current]} isActive={true} />
            </div>

            {/* Next Video (Right) */}
            <div
              className="hidden md:block flex-shrink-0 transition-all duration-400 ease-out opacity-40 scale-[0.75] hover:opacity-60 cursor-pointer"
              onClick={handleNext}
            >
              <VideoCard testimonial={testimonials[next]} isActive={false} />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-muted transition-all hover:scale-110"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
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

  // YouTube Shorts embed URL with autoplay for active card
  const embedUrl = `https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=${isActive ? 1 : 0}&mute=1&loop=1&playlist=${testimonial.youtubeId}&controls=1&modestbranding=1&rel=0&playsinline=1`;

  return (
    <div className="flex flex-col items-center">
      {/* Video Container - 9:16 aspect ratio */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-muted transition-all duration-400 ${
          isActive
            ? "w-[220px] h-[390px] md:w-[280px] md:h-[500px] ring-2 ring-primary/50 shadow-2xl"
            : "w-[180px] h-[320px] md:w-[220px] md:h-[390px]"
        }`}
      >
        {/* Instagram-style gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-primary opacity-20 pointer-events-none" />
        
        <iframe
          ref={iframeRef}
          key={`${testimonial.id}-${isActive}`}
          src={embedUrl}
          title={`Video testimonial od ${testimonial.clientName}`}
          className="absolute inset-0 w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Client Info */}
      <div className={`mt-4 text-center transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}>
        <p className="font-semibold text-foreground">{testimonial.clientName}</p>
        <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
      </div>
    </div>
  );
};

export default VideoTestimonials;
