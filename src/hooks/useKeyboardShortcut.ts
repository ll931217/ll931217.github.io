import { useEffect, useRef } from "react";

interface KeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  handler: (event: KeyboardEvent) => void;
  enabled?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook for registering keyboard shortcuts
 *
 * @example
 * useKeyboardShortcut({
 *   key: '/',
 *   handler: () => searchInputRef.current?.focus(),
 *   preventDefault: true,
 * })
 */
export function useKeyboardShortcut(options: KeyboardShortcutOptions) {
  const {
    key,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
    metaKey = false,
    handler,
    enabled = true,
    preventDefault = true,
  } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key combination matches
      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      const ctrlMatches = event.ctrlKey === ctrlKey;
      const shiftMatches = event.shiftKey === shiftKey;
      const altMatches = event.altKey === altKey;
      const metaMatches = event.metaKey === metaKey;

      // Ignore if user is typing in an input field (unless it's the specific shortcut)
      const isTyping =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable;

      // Special case: '/' shortcut should only work when not typing
      if (key === '/' && isTyping) return;

      if (
        keyMatches &&
        ctrlMatches &&
        shiftMatches &&
        altMatches &&
        metaMatches
      ) {
        if (preventDefault) {
          event.preventDefault();
        }
        handlerRef.current(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, ctrlKey, shiftKey, altKey, metaKey, enabled, preventDefault]);
}

/**
 * Hook for multiple keyboard shortcuts
 *
 * @example
 * useKeyboardShortcuts({
 *   '/': () => searchInputRef.current?.focus(),
 *   'Escape': () => setIsModalOpen(false),
 * })
 */
export function useKeyboardShortcuts(
  shortcuts: Record<string, (event: KeyboardEvent) => void>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcutKey = Object.keys(shortcuts).find((key) => {
        // Handle special keys
        const normalizedKey = key.toLowerCase();
        const eventKey = event.key.toLowerCase();

        // Map special keys
        const specialKeys: Record<string, string> = {
          escape: "escape",
          esc: "escape",
          " ": "space",
          spacebar: " ",
          arrowup: "arrowup",
          arrowdown: "arrowdown",
          arrowleft: "arrowleft",
          arrowright: "arrowright",
          enter: "enter",
        };

        const matchedKey = specialKeys[normalizedKey] || normalizedKey;
        return matchedKey === eventKey;
      });

      if (shortcutKey) {
        // Check if user is typing in an input field
        const isTyping =
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          (event.target as HTMLElement).isContentEditable;

        // '/' shortcut should only work when not typing
        if (shortcutKey === "/" && isTyping) return;

        event.preventDefault();
        shortcuts[shortcutKey](event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, enabled]);
}
