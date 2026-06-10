import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortcutItem {
  key: string;
  description: string;
}

interface KeyboardCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts?: ShortcutItem[];
}

const defaultShortcuts: ShortcutItem[] = [
  { key: "/", description: "Focus search" },
  { key: "Esc", description: "Close modals / clear search" },
  { key: "↑ ↓", description: "Navigate search results" },
  { key: "Enter", description: "Open selected result" },
  { key: "?", description: "Show this help" },
];

/**
 * Modal dialog showing keyboard shortcuts.
 * Press '?' or click the help button to open.
 */
export function KeyboardCheatSheet({
  isOpen,
  onClose,
  shortcuts = defaultShortcuts,
}: KeyboardCheatSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-shortcuts-title"
    >
      <div
        className={cn(
          "relative bg-night border border-white/10",
          "max-w-md w-full mx-4 p-6",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="keyboard-shortcuts-title"
            className="text-lg font-bold text-emerald-400 tracking-wide"
          >
            keyboard shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-night-muted hover:text-emerald-400 transition-colors"
            aria-label="Close keyboard shortcuts"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
            >
              <span className="text-night-fg">{shortcut.description}</span>
              <kbd
                className={cn(
                  "px-3 py-1 text-sm font-mono rounded",
                  "bg-white/5 border border-white/10 text-emerald-400",
                )}
              >
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-night-muted">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-emerald-400 rounded text-xs">
              Esc
            </kbd>{" "}
            or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Small button to trigger the keyboard cheat sheet
 */
export function KeyboardHelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-4 right-4 z-40",
        "w-10 h-10 rounded-full",
        "bg-emerald-400/10 border border-emerald-400/30",
        "text-emerald-400 hover:bg-emerald-400/20",
        "transition-colors duration-300",
        "flex items-center justify-center",
        "font-mono text-sm font-bold",
      )}
      aria-label="Show keyboard shortcuts"
      title="Keyboard shortcuts (press ?)"
    >
      ?
    </button>
  );
}
