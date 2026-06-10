// PROTOTYPE — floating variant switcher for throwaway UI prototypes.
// Dev-only: renders nothing in production builds. Delete together with
// src/pages/prototype-redesign/ once a winner is picked.
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export interface PrototypeVariant {
  key: string;
  name: string;
}

interface PrototypeSwitcherProps {
  variants: PrototypeVariant[];
  /** Variant used when no ?variant= param is present. */
  defaultKey: string;
}

export function PrototypeSwitcher({ variants, defaultKey }: PrototypeSwitcherProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKey = searchParams.get("variant") ?? defaultKey;
  const currentIndex = Math.max(
    0,
    variants.findIndex((v) => v.key === currentKey),
  );
  const current = variants[currentIndex];

  const cycle = useCallback(
    (direction: 1 | -1) => {
      const next =
        variants[(currentIndex + direction + variants.length) % variants.length];
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next.key === defaultKey) {
            params.delete("variant");
          } else {
            params.set("variant", next.key);
          }
          return params;
        },
        { replace: true },
      );
    },
    [currentIndex, defaultKey, setSearchParams, variants],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") cycle(-1);
      if (event.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycle]);

  if (!import.meta.env.DEV) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-1 rounded-full bg-fuchsia-600 text-white shadow-2xl shadow-black/50 px-2 py-1.5 font-sans text-sm select-none pointer-events-auto"
      style={{ cursor: "auto" }}
    >
      <button
        type="button"
        onClick={() => cycle(-1)}
        aria-label="Previous variant"
        className="rounded-full px-2.5 py-1 hover:bg-white/20 transition-colors"
      >
        ←
      </button>
      <span className="px-2 whitespace-nowrap tabular-nums">
        <span className="font-bold">{current.key}</span>
        <span className="opacity-80"> — {current.name}</span>
        <span className="opacity-60 ml-2 text-xs">
          {currentIndex + 1}/{variants.length}
        </span>
      </span>
      <button
        type="button"
        onClick={() => cycle(1)}
        aria-label="Next variant"
        className="rounded-full px-2.5 py-1 hover:bg-white/20 transition-colors"
      >
        →
      </button>
    </div>
  );
}
