import { Github, Linkedin, Code2, Trophy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const socialLinks = [
  { icon: Github, href: 'https://github.com/hariharan-r06', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/hariharan-r', label: 'LinkedIn' },
  { icon: Code2, href: 'https://leetcode.com/hariharan-r', label: 'LeetCode' },
  { icon: Trophy, href: 'https://hackerrank.com/hariharan-r', label: 'HackerRank' },
];

const SocialBar = () => {
  return (
    <>
      {/* Desktop - Fixed Left Vertical Bar */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        
        {socialLinks.map((social) => (
          <Tooltip key={social.label}>
            <TooltipTrigger asChild>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-2 rounded-lg hover:bg-primary/10"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs font-medium">
              {social.label}
            </TooltipContent>
          </Tooltip>
        ))}
        
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Mobile - Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/50">
        <div className="flex items-center justify-center gap-8 py-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-3"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialBar;
