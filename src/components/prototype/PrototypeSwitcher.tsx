// PROTOTYPE — floating variant switcher for the awwwards-redesign
// exploration. Deliberately high-contrast so it reads as a tool, not part of
// the design being judged. Renders nothing in production builds.
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PARAM = "variant";

interface PrototypeSwitcherProps {
  variants: { key: string; name: string }[];
  current: string;
}

const PrototypeSwitcher = ({ variants, current }: PrototypeSwitcherProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  );

  const cycle = (dir: number) => {
    const next = variants[(index + dir + variants.length) % variants.length];
    const params = new URLSearchParams(searchParams);
    if (next.key === variants[0].key) {
      params.delete(PARAM);
    } else {
      params.set(PARAM, next.key);
    }
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      const dir = event.key === "ArrowRight" ? 1 : -1;
      const next =
        variants[(index + dir + variants.length) % variants.length];
      const params = new URLSearchParams(searchParams);
      if (next.key === variants[0].key) {
        params.delete(PARAM);
      } else {
        params.set(PARAM, next.key);
      }
      setSearchParams(params, { replace: true });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, variants, searchParams, setSearchParams]);

  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-white px-4 py-2 font-mono text-xs text-black shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <button
        type="button"
        aria-label="Previous variant"
        onClick={() => cycle(-1)}
        className="px-1 text-base leading-none hover:opacity-60"
      >
        ←
      </button>
      <span className="whitespace-nowrap">
        {variants[index].key} — {variants[index].name}
      </span>
      <button
        type="button"
        aria-label="Next variant"
        onClick={() => cycle(1)}
        className="px-1 text-base leading-none hover:opacity-60"
      >
        →
      </button>
    </div>
  );
};

export default PrototypeSwitcher;
