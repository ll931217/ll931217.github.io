import React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  className?: string;
  children: React.ReactNode;
}

const GlowCard = ({ className, children }: GlowCardProps) => {
  return (
    <div
      className={cn(
        "bg-night border border-white/10 p-6 overflow-hidden relative group hover:border-emerald-400 transition-colors duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlowCard;
