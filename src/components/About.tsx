import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Rocket, Brain } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: '3rd year IT student at Sri Ramakrishna Engineering College, Coimbatore',
  },
  {
    icon: Rocket,
    title: 'Focus',
    description: 'Full Stack Development, Java, and DSA-driven problem solving',
  },
  {
    icon: Brain,
    title: 'Approach',
    description: 'Clean code, performance optimization, and real-world engineering practices',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* About Text */}
          <div className={`glass-card p-8 section-fade ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I'm a pre-final (3rd) year Information Technology student at Sri Ramakrishna Engineering College, Coimbatore.
              </p>
              <p>
                I specialize in building modern, scalable, and user-focused web applications using technologies like React, Java, Spring Boot, Node.js, and strong expertise in Java. I enjoy working across the full stack from crafting clean, responsive user interfaces to designing secure, efficient backend systems.
              </p>
              <p>
                Currently, I'm focused on Data Structures and Algorithms in Java and consistently solving problems. My projects often involve real-world problem solving, performance optimization, and applying best engineering practices.
              </p>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="space-y-6">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`glass-card-hover p-6 flex items-start gap-5 stagger-item ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${0.3 + index * 0.15}s` }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <highlight.icon className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
