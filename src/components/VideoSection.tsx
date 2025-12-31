import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section id="video" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
            {/* Video Placeholder - Replace with actual video embed */}
            <div className="aspect-video relative">
              {/* Thumbnail with play button overlay */}
              <img 
                src="/images/video-thumbnail.png" 
                alt="Upitomat demo video" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-accent-gradient flex items-center justify-center shadow-accent group-hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 text-accent-foreground ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
