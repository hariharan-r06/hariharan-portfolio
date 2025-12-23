import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Calendar, CheckCircle, Clock } from 'lucide-react';

// Project Card Component with Interactive Hover Effect
const ProjectCard = ({ 
  project, 
  index, 
  isVisible 
}: { 
  project: typeof projects[0]; 
  index: number; 
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate position relative to center (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relativeX = (x - centerX) / centerX;
    const relativeY = (y - centerY) / centerY;
    
    setMousePosition({ x: relativeX, y: relativeY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`group glass-card overflow-hidden section-fade ${isVisible ? 'visible' : ''} transition-all duration-200 ease-out cursor-pointer`}
      style={{ 
        transitionDelay: `${0.1 + index * 0.15}s`,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${-mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg) translateZ(5px) translateY(${-mousePosition.y * 3}px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

      <div className="p-6 lg:p-8">
        {/* Status & Date */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
              project.status === 'Completed' ? 'text-primary' : 'text-yellow-500'
            }`}
            style={{
              transform: isHovered ? `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` : 'translate(0px, 0px)',
            }}
          >
            {project.status === 'Completed' ? (
              <CheckCircle size={16} />
            ) : (
              <Clock size={16} />
            )}
            {project.status}
          </div>
          <div 
            className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200"
            style={{
              transform: isHovered ? `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` : 'translate(0px, 0px)',
            }}
          >
            <Calendar size={14} />
            {project.date}
          </div>
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200"
          style={{
            transform: isHovered ? `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` : 'translate(0px, 0px)',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-200"
              style={{
                transform: isHovered 
                  ? `translate(${mousePosition.x * (techIndex % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * (techIndex % 2 === 0 ? 1 : -1)}px)`
                  : 'translate(0px, 0px)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            style={{
              transform: isHovered ? `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` : 'translate(0px, 0px)',
            }}
          >
            <Github size={18} />
            View Code
          </a>
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: 'CharityConnect – Charity Community Platform',
    status: 'Completed',
    date: 'Feb 2025',
    description: 'A MERN-based platform connecting donors with NGOs. Features NGO verification, JWT-secured authentication, and real-time donation tracking.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/hariharan-r06/CharityCommunityWeb',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'AI-Powered DevSecOps Forensics',
    status: 'In Progress',
    date: '2025',
    description: 'A Kubernetes-based CI/CD forensic monitoring system with real-time anomaly detection, automated incident response, and evidence preservation.',
    tech: ['Kubernetes', 'Jenkins', 'Docker', 'Prometheus', 'ELK Stack', 'Grafana', 'Python', 'ML'],
    github: 'https://github.com/hariharan-r06/ai-devsecops-forensics',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'DevTrack Backend',
    status: 'Completed',
    date: 'Jan 2025',
    description: 'Backend service providing secure REST APIs for authentication, user management, and task operations.',
    tech: ['Java 17+', 'Spring Boot', 'MySQL', 'JWT', 'Maven'],
    github: 'https://github.com/hariharan-r06/devtrack-system',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: "Sieger's Image Processing System (IPS)",
    status: 'In Progress',
    date: '2025',
    description: 'Industry consultancy project for automated defect detection in yarn cones. Contribution focused on frontend development and system integration.',
    tech: ['React.js', 'JavaScript', 'REST APIs', 'Image Processing'],
    github: 'https://github.com/hariharan-r06/yarn_detection',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
];

const Projects = () => {
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
      id="projects"
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
