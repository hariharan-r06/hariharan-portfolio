import { useEffect } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update page title
    document.title = 'Hariharan R | Full Stack Developer';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio of Hariharan R - A passionate Full Stack Developer specializing in React, Java, Spring Boot, and modern web technologies.');
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* 3D Particles Background */}
      <ParticlesBackground />

      {/* Navigation */}
      <Navbar />

      {/* Social Bar */}
      <SocialBar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
