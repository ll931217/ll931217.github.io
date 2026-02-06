import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useCursor } from "@/hooks/useCursor";

interface CustomCursorProps {
  color?: string;
  size?: number;
  hoverSize?: number;
  enabled?: boolean;
}

/**
 * Custom cyberpunk-styled cursor
 *
 * Replaces the default cursor with a crosshair design that:
 * - Shows a small crosshair by default
 * - Expands with a glitch effect on hoverable elements
 * - Creates a shockwave ring effect on click
 * - Automatically hides on touch devices
 */
export function CustomCursor({
  color = "#ff3333",
  size = 20,
  hoverSize = 32,
  enabled = true,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Manage cursor CSS class
  useCursor({ enabled });
  const ringRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [ringAnimation, setRingAnimation] = useState(false);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener("touchstart", checkTouch, { once: true });
    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  // Track cursor position
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch]);

  // Detect hoverable elements
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.onclick !== null ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("pointer-events-auto");

      setIsHovering(!!hoverable);
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, [isTouch]);

  // Handle click animation
  useEffect(() => {
    if (isTouch) return;

    const handleMouseDown = () => {
      setIsClicking(true);
      setRingAnimation(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTouch]);

  // Reset ring animation
  useEffect(() => {
    if (ringAnimation) {
      const timeout = setTimeout(() => setRingAnimation(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [ringAnimation]);

  if (isTouch) return null;

  const currentSize = isHovering ? hoverSize : size;

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999]",
          "mix-blend-difference",
          "transition-transform duration-150 ease-out"
        )}
        style={{
          transform: `translate(${position.x - currentSize / 2}px, ${position.y - currentSize / 2}px)`,
        }}
      >
        {/* Crosshair cursor */}
        <svg
          width={currentSize}
          height={currentSize}
          viewBox="0 0 20 20"
          className={cn(
            "transition-all duration-150 ease-out",
            isClicking && "scale-90"
          )}
        >
          {/* Horizontal line */}
          <line
            x1="0"
            y1="10"
            x2="8"
            y2="10"
            stroke={color}
            strokeWidth="1"
          />
          <line
            x1="12"
            y1="10"
            x2="20"
            y2="10"
            stroke={color}
            strokeWidth="1"
          />
          {/* Vertical line */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="8"
            stroke={color}
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="12"
            x2="10"
            y2="20"
            stroke={color}
            strokeWidth="1"
          />
          {/* Center dot */}
          <circle
            cx="10"
            cy="10"
            r={isHovering ? "2" : "1"}
            fill={color}
            className={cn(
              isHovering && "animate-pulse"
            )}
          />
        </svg>

        {/* Glitch effect on hover */}
        {isHovering && (
          <>
            <svg
              width={currentSize}
              height={currentSize}
              viewBox="0 0 20 20"
              className="absolute top-0 left-0 animate-glitch-cursor-1"
            >
              <line x1="0" y1="10" x2="8" y2="10" stroke="#00ff00" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="8" stroke="#00ff00" strokeWidth="1" />
            </svg>
            <svg
              width={currentSize}
              height={currentSize}
              viewBox="0 0 20 20"
              className="absolute top-0 left-0 animate-glitch-cursor-2"
            >
              <line x1="12" y1="10" x2="20" y2="10" stroke="#0000ff" strokeWidth="1" />
              <line x1="10" y1="12" x2="10" y2="20" stroke="#0000ff" strokeWidth="1" />
            </svg>
          </>
        )}
      </div>

      {/* Click ring effect */}
      {ringAnimation && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
          }}
        >
          <div
            className={cn(
              "w-20 h-20 rounded-full border-2",
              "animate-shockwave-ring"
            )}
            style={{ borderColor: color }}
          />
        </div>
      )}
    </>
  );
}

export default CustomCursor;
