import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Award } from 'lucide-react';

const certifications = [
  {
    institution: 'MongoDB',
    title: 'MongoDB Basics for Students',
    description: 'Comprehensive training covering MongoDB fundamentals, data modeling, and database operations.',
    certificateUrl: 'https://qkinmnpr8gzqyfly.public.blob.vercel-storage.com/mongodb.pdf',
    color: 'from-green-500 to-emerald-600',
    logo: '/mongodb-atlas-google-cloud-partnership-nosql-databases-integrations-2 (1).jpg',
  },
  {
    institution: 'Celonis',
    title: 'Process Mining and Execution Management',
    description: 'Advanced certification in process mining, data analysis, and business process optimization.',
    certificateUrl: 'https://qkinmnpr8gzqyfly.public.blob.vercel-storage.com/Celonis.pdf',
    color: 'from-blue-500 to-cyan-600',
    logo: '/Celonis.png',
  },
  {
    institution: "Snowflake",
    title: "Snowflake Associate Certificate",
    description: "Foundational certification on the Snowflake platform and cloud data concepts.",
    certificateUrl:
      "https://qkinmnpr8gzqyfly.public.blob.vercel-storage.com/SNOWPRO%20ASSOCIATE%20Certificate.pdf",
    color: "from-sky-300 to-blue-500",
    logo: "/snowflake-logo.png"
  }
  
  ,
  {
    institution: 'Infosys Springboard',
    title: 'Digital Skills and Technology Training',
    description: 'Comprehensive program covering modern software development practices and technologies.',
    certificateUrl: 'https://qkinmnpr8gzqyfly.public.blob.vercel-storage.com/Infosys%20springboard.pdf',
    color: 'from-orange-500 to-amber-600',
    logo: '/infosys.jpg',
  },
  

  {
    institution: 'Coding Platform',
    title: 'Programming and Problem Solving',
    description: 'Recognition for excellence in competitive programming and algorithmic problem solving.',
    certificateUrl: 'https://qkinmnpr8gzqyfly.public.blob.vercel-storage.com/Certificate.pdf',
    color: 'from-purple-500 to-violet-600',
    logo: '/best-coding-platforms.jpeg',
  }
  
];

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className={`group glass-card-hover overflow-hidden section-fade ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${cert.color}`} />

              <div className="p-6">
                {/* Logo/Icon */}
                <div className="w-28 h-28 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <img 
                    src={cert.logo} 
                    alt={cert.institution}
                    className="w-full h-full object-contain p-3"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      objectPosition: 'center',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                </div>

                {/* Institution */}
                <p className="text-sm font-medium text-primary mb-2">{cert.institution}</p>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {cert.description}
                </p>

                {/* View Button */}
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group/link"
                >
                  <Award size={16} />
                  View Certificate
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
