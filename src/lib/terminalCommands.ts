export interface TerminalCommand {
  name: string;
  description: string;
  handler: (args: string[]) => TerminalOutput;
  aliases?: string[];
}

export interface TerminalOutput {
  type: "text" | "success" | "error" | "info" | "ascii";
  content: string;
}

/**
 * Available terminal commands for the easter egg terminal
 */
export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    name: "help",
    description: "List all available commands",
    handler: () => ({
      type: "text",
      content: `
AVAILABLE COMMANDS:
==================
  help          - Show this help message
  about         - Display information about the developer
  skills        - List technical skills
  projects      - Show project count
  contact       - Display contact information
  clear         - Clear the terminal
  matrix        - ??? (try it and see)
  exit          - Close the terminal

Type any command and press Enter to execute.
      `,
    }),
  },
  {
    name: "about",
    description: "Display information about the developer",
    aliases: ["whoami"],
    handler: () => ({
      type: "info",
      content: `
╔══════════════════════════════════════════════════════════════╗
║  LIANG-SHIH LIN                                               ║
║                                                              ║
║  Full Stack Developer | Taiwan                                ║
║                                                              ║
║  Passionate about building exceptional                       ║
║  web experiences with modern technologies.                    ║
║                                                              ║
║  Current Stack: React, TypeScript, Node.js, Python           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
      `,
    }),
  },
  {
    name: "skills",
    description: "List technical skills",
    handler: () => ({
      type: "success",
      content: `
TECHNICAL ARSENAL:
==================
Frontend:
  React, Vue, TypeScript, Tailwind CSS, Next.js, Vite

Backend:
  Node.js, Python, Go, PostgreSQL, MongoDB

DevOps & Tools:
  Git, Docker, CI/CD, AWS, Vercel, Linux

3D & Graphics:
  Three.js, WebGL, GSAP, Framer Motion
      `,
    }),
  },
  {
    name: "projects",
    description: "Show project count",
    handler: () => ({
      type: "info",
      content: `
PROJECT DATABASE:
================
Total Repositories: Scanning...
Featured Projects: Available at /projects

Tip: Visit the Projects page for full details with
     GitHub integration and live demos.
      `,
    }),
  },
  {
    name: "contact",
    description: "Display contact information",
    handler: () => ({
      type: "text",
      content: `
COMMUNICATION CHANNELS:
========================
GitHub:  @ll931217
Email:   Available on GitHub profile

Feel free to reach out for collaborations!
      `,
    }),
  },
  {
    name: "clear",
    description: "Clear the terminal",
    handler: () => ({ type: "text", content: "" }),
  },
  {
    name: "matrix",
    description: "Enter the Matrix",
    handler: () => ({
      type: "ascii",
      content: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░██░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░██░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    THE MATRIX HAS YOU...
                    FOLLOW THE WHITE RABBIT
      `,
    }),
  },
  {
    name: "exit",
    description: "Close the terminal",
    handler: () => ({
      type: "text",
      content: "Terminating session...",
    }),
  },
];

/**
 * Execute a terminal command
 */
export function executeCommand(input: string): TerminalOutput {
  const trimmedInput = input.trim();
  const parts = trimmedInput.split(/\s+/);
  const commandName = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  if (!commandName) {
    return { type: "text", content: "" };
  }

  const command = TERMINAL_COMMANDS.find(
    (cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName)
  );

  if (!command) {
    return {
      type: "error",
      content: `Command not found: ${commandName}\nType 'help' for available commands.`,
    };
  }

  return command.handler(args);
}

/**
 * Get all command names and aliases for tab completion
 */
export function getAllCommandNames(): string[] {
  const names: string[] = [];
  TERMINAL_COMMANDS.forEach((cmd) => {
    names.push(cmd.name);
    if (cmd.aliases) {
      names.push(...cmd.aliases);
    }
  });
  return names.sort();
}
