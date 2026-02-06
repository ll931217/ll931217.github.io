
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
        "bg-[#0a0a0a] border-2 border-[#333333] p-6 overflow-hidden relative group hover:border-[#ff3333] transition-colors duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlowCard;
