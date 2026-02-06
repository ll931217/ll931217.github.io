import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
}

interface NameParticlesProps {
  containerRef: React.RefObject<HTMLElement>;
  enabled?: boolean;
  color?: string;
  particleCount?: number;
}

/**
 * Matrix-style digital rain particles for the name
 *
 * Creates an always-active ambient particle effect of falling digital characters
 * around the name element. Automatically disables on touch devices and respects
 * prefers-reduced-motion for accessibility.
 */
export function NameParticles({
  containerRef,
  enabled = true,
  color = "#ff3333",
  particleCount = 80,
}: NameParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const observerRef = useRef<IntersectionObserver>();

  // Matrix-style character set (binary + katakana for authentic look)
  const charSet = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!enabled || !canvas || !container) return;

    // Detect touch device
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).msMaxTouchPoints > 0;

    if (isTouchDevice) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get container bounds and set canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Add padding around the name for particle spawn area
      const padding = 60;
      canvas.width = (rect.width + padding * 2) * dpr;
      canvas.height = (rect.height + padding * 3) * dpr;
      canvas.style.width = `${rect.width + padding * 2}px`;
      canvas.style.height = `${rect.height + padding * 3}px`;

      ctx.scale(dpr, dpr);

      return { width: rect.width + padding * 2, height: rect.height + padding * 3, padding };
    };

    let { width, height } = updateCanvasSize();

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 1.5,
        char: charSet[Math.floor(Math.random() * charSet.length)],
        opacity: 0.1 + Math.random() * 0.4,
      }));
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.y += particle.speed;

        // Respawn if below canvas
        if (particle.y > height) {
          particle.y = -20;
          particle.x = Math.random() * width;
          particle.speed = 0.5 + Math.random() * 1.5;
          particle.char = charSet[Math.floor(Math.random() * charSet.length)];
          particle.opacity = 0.1 + Math.random() * 0.4;
        }

        // Draw particle
        ctx.font = "14px IBM Plex Mono";
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity;
        ctx.fillText(particle.char, particle.x, particle.y);
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const dimensions = updateCanvasSize();
        width = dimensions.width;
        height = dimensions.height;
        initParticles();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    // Intersection Observer to pause when not visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
          } else {
            animate();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(resizeTimeout);
    };
  }, [containerRef, enabled, color, particleCount, charSet]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 pointer-events-none",
        "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      )}
      style={{ top: -60 }}
      aria-hidden="true"
    />
  );
}

export default NameParticles;
