import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  executeCommand,
  getAllCommandNames,
  TerminalOutput,
} from "@/lib/terminalCommands";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLine {
  id: string;
  type: TerminalOutput["type"];
  content: string;
  isInput?: boolean;
  inputText?: string;
}

/**
 * Terminal easter egg modal
 *
 * Triggered by Konami code (↑↑↓↓←→←→BA)
 * Features a retro-style terminal with executable commands.
 */
export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "info",
      content: `
╔══════════════════════════════════════════════════════════════════╗
║  ███████╗██╗   ██╗████████╗██╗   ██╗██████╗                      ║
║  ██╔════╝██║   ██║╚══██╔══╝██║   ██║██╔══██╗                     ║
║  ███████╗██║   ██║   ██║   ██║   ██║██████╔╝                     ║
║  ╚════██║██║   ██║   ██║   ██║   ██║██╔══██╗                     ║
║  ███████║╚██████╔╝   ██║   ╚██████╔╝██████╔╝                     ║
║  ╚══════╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═════╝                      ║
║                                                                ║
║  HACKER TERMINAL v1.0.0                                        ║
║  Type 'help' for available commands                            ║
║  Press 'Esc' or type 'exit' to close                            ║
╚══════════════════════════════════════════════════════════════════╝
      `,
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = input.trim();

      // Add input line
      setLines((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "text",
          content: `$ ${trimmedInput}`,
          isInput: true,
          inputText: trimmedInput,
        },
      ]);

      if (trimmedInput) {
        // Execute command
        const result = executeCommand(trimmedInput);
        setLines((prev) => [
          ...prev,
          {
            id: `${Date.now()}-output`,
            type: result.type,
            content: result.content,
          },
        ]);

        // Add to history
        setCommandHistory((prev) => [...prev, trimmedInput]);
        setHistoryIndex(-1);

        // Handle exit command
        if (trimmedInput.toLowerCase() === "exit") {
          setTimeout(() => onClose(), 500);
        }

        // Handle clear command
        if (trimmedInput.toLowerCase() === "clear") {
          setLines([]);
        }
      }

      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex === commandHistory.length - 1 ? -1 : newIndex);
        setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const matches = getAllCommandNames().filter((name) =>
        name.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "info",
            content: matches.join("  "),
          },
        ]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Get text color based on line type
  const getLineClass = (type: TerminalOutput["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "info":
        return "text-cyan-400";
      case "ascii":
        return "text-green-500 font-bold";
      default:
        return "text-gray-300";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
    >
      <div
        className={cn(
          "relative w-[90vw] max-w-3xl h-[70vh]",
          "bg-[#0a0a0a] border-2 border-[#ff3333]",
          "shadow-[0_0_50px_rgba(255,51,51,0.3)]",
          "flex flex-col font-mono text-sm"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#ff3333] bg-[#ff3333]/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span
            id="terminal-title"
            className="text-[#ff3333] font-bold uppercase tracking-wider text-xs"
          >
            [ TERMINAL ]
          </span>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-[#ff3333] transition-colors"
            aria-label="Close terminal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#ff3333 #0a0a0a" }}
        >
          {lines.map((line) => (
            <div key={line.id} className={cn("whitespace-pre-wrap", getLineClass(line.type))}>
              {line.content}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center text-[#ff3333]">
            <span className="mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-gray-300"
              autoFocus
              autoComplete="off"
            />
          </div>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.03)_1px,rgba(255,255,255,0.03)_2px)]" />
      </div>
    </div>
  );
}

export default TerminalModal;
