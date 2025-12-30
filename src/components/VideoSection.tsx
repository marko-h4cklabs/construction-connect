import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section id="video" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See How BuildPro Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch a quick overview of how our platform can transform your construction business operations
            </p>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover bg-primary">
            {/* Video Placeholder - Replace with actual video embed */}
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
                  <p className="text-primary-foreground/80 text-lg font-medium">
                    Add your video URL here
                  </p>
                  <p className="text-primary-foreground/60 text-sm mt-2">
                    Supports YouTube, Vimeo, or direct video files
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">2 min</div>
              <p className="text-muted-foreground">Quick setup time</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">50%</div>
              <p className="text-muted-foreground">Less paperwork</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-muted-foreground">Access anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
