
import React from 'react';
import { cn } from '@/lib/utils';

interface LanguageBadgeProps {
  language: string;
  className?: string;
}

const LanguageBadge = ({ language, className }: LanguageBadgeProps) => {
  const getLanguageColor = (lang: string): string => {
    const colors: Record<string, string> = {
      javascript: 'bg-tokyo-yellow/20 text-tokyo-yellow',
      typescript: 'bg-tokyo-blue/20 text-tokyo-blue',
      python: 'bg-tokyo-green/20 text-tokyo-green',
      java: 'bg-tokyo-orange/20 text-tokyo-orange',
      'c#': 'bg-tokyo-purple/20 text-tokyo-purple',
      php: 'bg-tokyo-magenta/20 text-tokyo-magenta',
      go: 'bg-tokyo-cyan/20 text-tokyo-cyan',
      ruby: 'bg-tokyo-magenta/20 text-tokyo-magenta',
      rust: 'bg-tokyo-orange/20 text-tokyo-orange',
      html: 'bg-tokyo-orange/20 text-tokyo-orange',
      css: 'bg-tokyo-blue/20 text-tokyo-blue',
    };

    const lowerLang = lang.toLowerCase();
    return colors[lowerLang] || 'bg-tokyo-comment/20 text-tokyo-comment';
  };

  return (
    <span 
      className={cn(
        'tokyo-badge whitespace-nowrap',
        getLanguageColor(language),
        className
      )}
    >
      {language}
    </span>
  );
};

export default LanguageBadge;
