import { Github, Linkedin, Code2, Trophy, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/hariharan-r06/hariharan-r06', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/hariharan-r06', label: 'LinkedIn' },
  { icon: Code2, href: 'https://leetcode.com/u/hariharan-r06/', label: 'LeetCode' },
  { icon: Trophy, href: 'https://www.hackerrank.com/profile/hari_2305032', label: 'HackerRank' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-12">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} <span className="text-foreground font-medium">Developed by Hariharan R</span> 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
