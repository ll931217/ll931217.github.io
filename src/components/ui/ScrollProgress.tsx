import { useEffect, useState } from "react";

/**
 * Minimal scroll progress indicator.
 *
 * A fixed 2px bar at the top of the viewport that fills with the
 * scroll percentage. Hidden when the page isn't scrollable.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(null);
        return;
      }

      const percentage = (window.scrollY / scrollableHeight) * 100;
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (progress === null) return null;

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-emerald-400/70 z-50 pointer-events-none"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

export default ScrollProgress;
