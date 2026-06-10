import { cn } from "@/lib/utils";

interface LanguageBadgeProps {
  language: string;
  className?: string;
}

const LanguageBadge = ({ language, className }: LanguageBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-mono border border-white/10 text-night-muted hover:border-emerald-400/60 hover:text-emerald-400 transition-colors whitespace-nowrap",
        className,
      )}
    >
      {language}
    </span>
  );
};

export default LanguageBadge;
