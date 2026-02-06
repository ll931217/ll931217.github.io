
import { cn } from '@/lib/utils';

interface LanguageBadgeProps {
  language: string;
  className?: string;
}

const LanguageBadge = ({ language, className }: LanguageBadgeProps) => {
  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs font-mono border border-[#444444] text-[#888888] hover:border-[#ff3333] hover:text-[#ff3333] transition-colors whitespace-nowrap',
        className
      )}
    >
      {language}
    </span>
  );
};

export default LanguageBadge;
