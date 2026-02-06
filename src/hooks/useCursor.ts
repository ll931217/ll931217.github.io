import { useEffect } from "react";

interface UseCursorOptions {
  enabled?: boolean;
  respectTouchDevices?: boolean;
}

/**
 * Hook to manage custom cursor behavior
 *
 * Adds/removes the 'custom-cursor' class from the body element
 * to hide the default cursor when the custom cursor is active.
 *
 * @example
 * useCursor({ enabled: true })
 */
export function useCursor(options: UseCursorOptions = {}) {
  const {
    enabled = true,
    respectTouchDevices = true,
  } = options;

  useEffect(() => {
    // Check if touch device
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).msMaxTouchPoints > 0;

    if (enabled && (!respectTouchDevices || !isTouchDevice)) {
      document.body.classList.add("custom-cursor");
    }

    return () => {
      document.body.classList.remove("custom-cursor");
    };
  }, [enabled, respectTouchDevices]);
}
