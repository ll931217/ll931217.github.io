
import React from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  className?: string;
  children: React.ReactNode;
}

const GlowCard = ({ className, children }: GlowCardProps) => {
  return (
    <div 
      className={cn(
        "tokyo-card overflow-hidden relative group",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tokyo-accent/0 via-tokyo-accent/5 to-tokyo-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>
      {children}
    </div>
  );
};

export default GlowCard;
