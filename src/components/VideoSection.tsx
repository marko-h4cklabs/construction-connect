const VideoSection = () => {
  return (
    <section id="video" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
            <div className="aspect-video">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/images/video-thumbnail.png"
              >
                <source src="/videos/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
