import { cn } from "@/lib/utils";
import { Search, FileX } from "lucide-react";

interface EmptyStateProps {
  type?: "search" | "error" | "generic";
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Terminal-styled empty state component
 *
 * Displays an ASCII box when no results are found. Commonly used for
 * search results, error states, or empty lists.
 */
export function EmptyState({
  type = "generic",
  title,
  message,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const defaultContent = {
    search: {
      title: "no results found",
      message: "Try adjusting your search or filters",
      icon: Search,
      ascii: `
   ╔═══════════════════════════╗
   ║  $ grep … | wc -l → 0     ║
   ╚═══════════════════════════╝
      `,
    },
    error: {
      title: "something went wrong",
      message: "The request failed — try again",
      icon: FileX,
      ascii: `
   ╔═══════════════════════════╗
   ║  $ curl … → exit code 1   ║
   ╚═══════════════════════════╝
      `,
    },
    generic: {
      title: "nothing here",
      message: "Nothing to display",
      icon: FileX,
      ascii: `
   ╔═══════════════════════════╗
   ║  $ ls → (empty)           ║
   ╚═══════════════════════════╝
      `,
    },
  };

  const content = defaultContent[type];
  const Icon = content.icon;
  const displayTitle = title || content.title;
  const displayMessage = message || content.message;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4",
        className,
      )}
    >
      <pre className="text-night-faint text-xs md:text-sm mb-6 font-mono leading-tight">
        {content.ascii}
      </pre>

      <div className="mb-4">
        <Icon className="w-12 h-12 text-night-faint" />
      </div>

      <h3 className="text-xl font-bold text-emerald-400 mb-2 font-mono tracking-wide">
        {displayTitle}
      </h3>

      <p className="text-night-muted mb-6 text-center">{displayMessage}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={cn(
            "px-6 py-2 border border-emerald-400/40 text-emerald-400",
            "hover:bg-emerald-400/10 transition-colors font-mono text-sm",
          )}
        >
          $ {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
