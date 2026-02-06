import { useEffect, useState } from "react";

// Konami code: up, up, down, down, left, right, left, right, b, a
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

interface UseKonamiCodeOptions {
  onActivate: () => void;
  enabled?: boolean;
  resetTimeout?: number; // Time in ms before the code sequence resets
}

/**
 * Hook for detecting the Konami code sequence
 *
 * @example
 * useKonamiCode({
 *   onActivate: () => setTerminalOpen(true),
 * })
 */
export function useKonamiCode(options: UseKonamiCodeOptions) {
  const { onActivate, enabled = true, resetTimeout = 5000 } = options;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Check if the pressed key matches the current key in the sequence
      if (event.code === KONAMI_CODE[currentIndex]) {
        const nextIndex = currentIndex + 1;

        // Clear existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (nextIndex === KONAMI_CODE.length) {
          // Konami code completed!
          onActivate();
          setCurrentIndex(0);
        } else {
          // Move to next key in sequence
          setCurrentIndex(nextIndex);

          // Reset sequence after timeout
          timeoutId = setTimeout(() => {
            setCurrentIndex(0);
          }, resetTimeout);
        }
      } else {
        // Wrong key, reset sequence
        setCurrentIndex(0);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentIndex, enabled, onActivate, resetTimeout]);
}
