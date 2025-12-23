import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles - reduced for professional look
    const particleCount = Math.min(30, Math.floor((window.innerWidth * window.innerHeight) / 50000));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.02;
          particle.vy -= (dy / distance) * force * 0.02;
        }

        // Boundary check with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Calculate 3D projection
        const perspective = 400;
        const scale = perspective / (perspective + particle.z);
        const projectedX = particle.x * scale + (canvas.width / 2) * (1 - scale);
        const projectedY = particle.y * scale + (canvas.height / 2) * (1 - scale);
        const projectedSize = particle.size * scale;

        // Draw particle - reduced opacity for professional look
        const gradient = ctx.createRadialGradient(
          projectedX, projectedY, 0,
          projectedX, projectedY, projectedSize * 2
        );
        gradient.addColorStop(0, `rgba(74, 222, 128, ${particle.opacity * scale * 0.4})`);
        gradient.addColorStop(0.5, `rgba(34, 197, 94, ${particle.opacity * scale * 0.2})`);
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

        ctx.beginPath();
        ctx.arc(projectedX, projectedY, projectedSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(index + 1).forEach((other) => {
          const otherScale = perspective / (perspective + other.z);
          const otherX = other.x * otherScale + (canvas.width / 2) * (1 - otherScale);
          const otherY = other.y * otherScale + (canvas.height / 2) * (1 - otherScale);
          
          const lineDist = Math.sqrt(
            Math.pow(projectedX - otherX, 2) + Math.pow(projectedY - otherY, 2)
          );

          if (lineDist < 120) {
            ctx.beginPath();
            ctx.moveTo(projectedX, projectedY);
            ctx.lineTo(otherX, otherY);
            const lineOpacity = (1 - lineDist / 120) * 0.08 * Math.min(scale, otherScale);
            ctx.strokeStyle = `rgba(74, 222, 128, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticlesBackground;
