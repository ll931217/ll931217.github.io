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
 * Cyberpunk-styled empty state component
 *
 * Displays an ASCII art message when no results are found.
 * Commonly used for search results, error states, or empty lists.
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
      title: "NO_RESULTS_FOUND",
      message: "Try adjusting your search or filters",
      icon: Search,
      ascii: `
   ╔═════════════════════════════════╗
   ║  [NO_SIGNAL] - NO DATA DETECTED ║
   ╚═════════════════════════════════╝
      `,
    },
    error: {
      title: "SYSTEM_ERROR",
      message: "Something went wrong",
      icon: FileX,
      ascii: `
   ╔═════════════════════════════════╗
   ║  [ERROR] - CONNECTION LOST      ║
   ╚═════════════════════════════════╝
      `,
    },
    generic: {
      title: "NO_DATA",
      message: "Nothing to display",
      icon: FileX,
      ascii: `
   ╔═════════════════════════════════╗
   ║  [EMPTY] - VOID DETECTED        ║
   ╚═════════════════════════════════╝
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
        className
      )}
    >
      {/* ASCII Art Header */}
      <pre className="text-[#ff3333] text-xs md:text-sm mb-6 font-mono leading-tight opacity-80">
        {content.ascii}
      </pre>

      {/* Icon */}
      <div className="mb-4">
        <Icon className="w-12 h-12 text-[#666666]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#ff3333] mb-2 font-mono uppercase tracking-wider">
        [{displayTitle}]
      </h3>

      {/* Message */}
      <p className="text-[#666666] mb-6 text-center">
        {displayMessage}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={cn(
            "px-6 py-2 border border-[#ff3333] text-[#ff3333]",
            "hover:bg-[#ff3333]/10 hover:shadow-[0_0_15px_rgba(255,51,51,0.3)]",
            "transition-all duration-300 font-mono text-sm uppercase",
            "active:scale-95"
          )}
        >
          &gt; {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
