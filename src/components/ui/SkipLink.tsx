import { cn } from "@/lib/utils";

interface SkipLinkProps {
  className?: string;
  children?: React.ReactNode;
  targetId?: string;
}

/**
 * Skip-to-content link for accessibility
 *
 * Allows keyboard users to skip navigation and go directly to main content.
 * Hidden by default, becomes visible on focus.
 *
 * @example
 * <SkipLink targetId="main-content" />
 */
export function SkipLink({
  className,
  children = "Skip to main content",
  targetId = "main-content",
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "focus:z-[100] focus:px-4 focus:py-2",
        "bg-[#ff3333] text-white",
        "border-2 border-white",
        "font-mono text-sm font-bold",
        "focus:shadow-[0_0_20px_rgba(255,51,51,0.5)]",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * Component to mark the main content target for skip links
 *
 * @example
 * <SkipTarget id="main-content" />
 * <main>Content here...</main>
 */
export function SkipTarget({ id = "main-content" }: { id?: string }) {
  return <span id={id} tabIndex={-1} className="sr-only" />;
}

export default SkipLink;
