import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: string;
  showGlitchAtComplete?: boolean;
}

/**
 * Scroll progress indicator bar
 *
 * Displays a thin progress bar at the top of the page that fills
 * as the user scrolls down. Features a cyberpunk glitch effect
 * when scrolling reaches 100%.
 */
export function ScrollProgress({
  className,
  color = "#ff3333",
  height = "2px",
  showGlitchAtComplete = true,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
      setIsComplete(currentProgress >= 99);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Background track */}
      <div
        className="absolute inset-0 bg-[#666666]/20"
        style={{ height }}
      />

      {/* Progress bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 transition-all duration-150 ease-out",
          showGlitchAtComplete && isComplete && "animate-glitch-progress"
        )}
        style={{
          width: `${progress}%`,
          height,
          backgroundColor: color,
          boxShadow: progress > 0
            ? `0 0 10px ${color}80, 0 0 20px ${color}40`
            : "none",
        }}
      />

      {/* Glitch overlay at 100% */}
      {showGlitchAtComplete && isComplete && (
        <>
          <div
            className="absolute top-0 bottom-0 w-full animate-glitch-shift-1"
            style={{
              height,
              backgroundColor: "#00ff00",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-full animate-glitch-shift-2"
            style={{
              height,
              backgroundColor: "#0000ff",
              opacity: 0.5,
            }}
          />
        </>
      )}
    </div>
  );
}

export default ScrollProgress;
