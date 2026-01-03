import { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Database, 
  Globe, 
  Server
} from 'lucide-react';
import {
  FaJava,
  FaJs,
  FaPython,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaShareAlt,
  FaGithub,
  FaAws,
  FaDocker,
  FaGlobe,
  FaTools,
  FaCode,
} from "react-icons/fa";
import {
  SiC,
  SiTailwindcss,
  SiSpringboot,
  SiMongodb,
  SiMysql,
  SiKubernetes,
  SiFirebase,
  SiJenkins,
} from "react-icons/si";

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: [
      { name: 'Java', icon: FaJava },
      { name: 'JavaScript', icon: FaJs },
      { name: 'C', icon: SiC },
      { name: 'Python', icon: FaPython },
      { name: 'SQL', icon: FaDatabase },
    ],
  },
  {
    title: 'Web & Frameworks',
    icon: Globe,
    skills: [
      { name: 'HTML', icon: FaHtml5 },
      { name: 'CSS', icon: FaCss3Alt },
      { name: 'React.js', icon: FaReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Bootstrap', icon: FaBootstrap },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'REST APIs', icon: FaShareAlt },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MongoDB Atlas', icon: SiMongodb },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Server,
    skills: [
      { name: 'Git & GitHub', icon: FaGithub },
      { name: 'Docker', icon: FaDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Jenkins', icon: SiJenkins },
      { name: 'AWS', icon: FaAws },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
];

// Skill Category Card Component with Interactive Hover Effect
const SkillCategoryCard = ({ 
  category, 
  categoryIndex, 
  isVisible 
}: { 
  category: typeof skillCategories[0]; 
  categoryIndex: number; 
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
      className={`glass-card p-6 lg:p-8 section-fade ${isVisible ? 'visible' : ''} transition-all duration-200 ease-out cursor-pointer`}
      style={{ 
        transitionDelay: `${0.1 + categoryIndex * 0.15}s`,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${-mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg) translateZ(5px) translateY(${-mousePosition.y * 3}px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-200"
          style={{
            transform: isHovered ? `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` : 'translate(0px, 0px)',
          }}
        >
          <category.icon className="text-primary" size={24} />
        </div>
        <h3 className="text-xl font-semibold text-foreground transition-all duration-200"
          style={{
            transform: isHovered ? `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` : 'translate(0px, 0px)',
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, skillIndex) => {
          const IconComponent = skill.icon;
          return (
            <div
              key={skill.name}
              className={`skill-badge stagger-item ${isVisible ? 'visible' : ''} transition-all duration-200`}
              style={{ 
                animationDelay: `${0.2 + categoryIndex * 0.1 + skillIndex * 0.05}s`,
                transform: isHovered 
                  ? `translate(${mousePosition.x * (skillIndex % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * (skillIndex % 2 === 0 ? 1 : -1)}px)`
                  : 'translate(0px, 0px)',
              }}
            >
              <IconComponent className="text-base" />
              <span>{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
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
      id="skills"
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              categoryIndex={categoryIndex}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
