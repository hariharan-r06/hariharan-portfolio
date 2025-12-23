import { ChevronDown, Download, Send, FolderOpen } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-primary font-mono text-sm sm:text-base mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Hello, I'm
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <span className="gradient-text gradient-text-animate">Hariharan R</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Full Stack Developer
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Passionate about building scalable, secure, and user-friendly applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary flex items-center gap-2"
              >
                <Send size={18} />
                <span className="relative z-10">Hire Me</span>
              </button>
              
              <a
                href="https://qkinmnpr8gzqyfly.public.blob.vercel-storage.com/Hariharan%20R_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Download size={18} />
                View Resume
              </a>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <FolderOpen size={18} />
                View Projects
              </button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="relative group">
              {/* Profile container with hover border effect */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/20 transition-all duration-300 ease-out hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  {/* Profile Image */}
                  {!imageError ? (
                    <img 
                      src="/linkdin%20passport.png" 
                      alt="Hariharan R" 
                      className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-6xl sm:text-7xl md:text-8xl font-bold gradient-text">HR</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-scroll-indicator">
        <span className="text-sm text-muted-foreground">Scroll Down</span>
        <ChevronDown className="text-primary" size={24} />
      </div>
    </section>
  );
};

export default Hero;
