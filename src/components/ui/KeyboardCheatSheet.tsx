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
 * Modal dialog showing keyboard shortcuts
 *
 * Displays a cyberpunk-styled keyboard shortcut cheat sheet.
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
          "relative bg-[#0a0a0a] border-2 border-[#ff3333]",
          "max-w-md w-full mx-4 p-6",
          "shadow-[0_0_30px_rgba(255,51,51,0.3)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="keyboard-shortcuts-title"
            className="text-xl font-bold text-[#ff3333] uppercase tracking-wider"
          >
            [ KEYBOARD_SHORTCUTS ]
          </h2>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-[#ff3333] transition-colors"
            aria-label="Close keyboard shortcuts"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.03)_1px,rgba(255,255,255,0.03)_2px)]" />

        {/* Shortcuts List */}
        <div className="space-y-3 relative z-10">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between py-2 border-b border-[#666666]/30 last:border-0"
            >
              <span className="text-[#cccccc]">{shortcut.description}</span>
              <kbd
                className={cn(
                  "px-3 py-1 text-sm font-mono",
                  "bg-[#666666]/20 border border-[#666666]",
                  "text-[#ff3333] rounded",
                  "shadow-[0_0_10px_rgba(255,51,51,0.2)]"
                )}
              >
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-6 pt-4 border-t border-[#666666]/30 text-center">
          <p className="text-xs text-[#666666]">
            Press <kbd className="px-1.5 py-0.5 bg-[#666666]/20 border border-[#666666] text-[#ff3333] rounded text-xs">Esc</kbd> or click outside to close
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
        "bg-[#ff3333]/10 border border-[#ff3333]/30",
        "text-[#ff3333] hover:bg-[#ff3333]/20",
        "transition-all duration-300",
        "flex items-center justify-center",
        "shadow-[0_0_15px_rgba(255,51,51,0.2)]",
        "hover:shadow-[0_0_20px_rgba(255,51,51,0.4)]",
        "font-mono text-sm font-bold"
      )}
      aria-label="Show keyboard shortcuts"
      title="Keyboard shortcuts (press ?)"
    >
      ?
    </button>
  );
}
