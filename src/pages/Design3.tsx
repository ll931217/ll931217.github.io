
import DesignNav from "@/components/DesignNav";
import { useEffect, useState } from "react";

const commands = [
  { cmd: "whoami", delay: 120, output: "Liang-Shih Lin\\nFull-stack Developer | Taiwan\\nBuilding systems that work since 2016" },
  { cmd: "ls skills/", delay: 150, output: "frontend/  backend/  database/  devops/" },
  { cmd: "cat experience.log", delay: 200, output: "[2023] Founding Backend Engineer @ HR Startup\\n[2018] Freelance Full-stack Developer\\n[2016] Started coding journey" },
  { cmd: "ls projects/ --featured", delay: 250, output: "> project-1   ★ 45  TypeScript\\n> project-2   ★ 32  Python\\n> project-3   ★ 28  Vue" }
];

const useTypingEffect = (text: string, speed: number, onComplete?: () => void) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text) {
      let i = 0;
      setDisplayedText('');
      const intervalId = setInterval(() => {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed, onComplete]);

  return displayedText;
};

const Command = ({ cmd, output, onComplete }: { cmd: string, output: string, onComplete: () => void }) => {
    const [isCommandVisible, setIsCommandVisible] = useState(false);
    const typedCmd = useTypingEffect(`lsl@portfolio:~$ ${cmd}`, 50, () => {
        setTimeout(() => {
            setIsCommandVisible(true);
            onComplete();
        }, 100)
    });

    return (
        <div>
            <span className="text-[#39ff14]">{typedCmd}</span>
            {isCommandVisible && <pre className="text-[#39ff14] whitespace-pre-wrap leading-relaxed mt-1 mb-4">{output}</pre>}
        </div>
    );
};

const Design3 = () => {
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const bootMessages = ["INITIALIZING PORTFOLIO v2.0...", "LOADING SYSTEM...", "READY."];

  const [commandIndex, setCommandIndex] = useState(0);

  useEffect(() => {
    if (booting) {
      if (bootStep < bootMessages.length) {
        const timeout = setTimeout(() => {
          setBootStep(prev => prev + 1);
        }, bootStep === 0 ? 500 : 800);
        return () => clearTimeout(timeout);
      } else {
        const finalTimeout = setTimeout(() => setBooting(false), 500);
        return () => clearTimeout(finalTimeout);
      }
    }
  }, [booting, bootStep, bootMessages.length]);

  const handleCommandComplete = () => {
    if (commandIndex < commands.length - 1) {
        setTimeout(() => setCommandIndex(prev => prev + 1), commands[commandIndex].delay);
    }
  }

  const displayedBootText = useTypingEffect(booting ? bootMessages[bootStep] || '' : '', 75);

  return (
    <div className="bg-[#0d1117] text-[#39ff14] font-vt323 min-h-screen flex flex-col relative overflow-hidden">
      <DesignNav />
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none z-10 scanline-animation"></div>

      {booting ? (
        <div className="flex-grow flex items-center justify-center text-2xl md:text-4xl">
            <p>{displayedBootText}<span className="blinking-cursor">█</span></p>
        </div>
      ) : (
        <main className="flex-grow p-4 md:p-8 flex flex-col">
          <pre className="text-sm md:text-base">
            SYSTEM: portfolio.lsl | UPTIME: 8+ years | LOCATION: Taiwan | STATUS: <span className="text-[#00ff88]">OK</span>
          </pre>
          <div className="my-4 border-t-2 border-[#1a472a]"></div>

          <div className="w-full max-w-4xl mx-auto flex-grow">
            <pre className="text-center text-lg md:text-xl mb-8 whitespace-pre">
{`▀█▀ █▀▀ █▀█ █▀▄▀█ █ █▄ █ ▄▀█ █
 █  ██▄ █▀▄ █ ▀ █ █ █ ▀█ █▀█ █▄▄`}
            </pre>
            
            <div className="text-lg md:text-xl">
                {commands.slice(0, commandIndex + 1).map((c, i) => (
                    <Command key={i} cmd={c.cmd} output={c.output} onComplete={i === commandIndex ? handleCommandComplete : () => {}} />
                ))}
            </div>

            {commandIndex === commands.length - 1 && (
                <div className="text-lg md:text-xl">
                    <span className="text-[#39ff14]">lsl@portfolio:~$ </span><span className="blinking-cursor">█</span>
                </div>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t-2 border-[#1a472a]">
            <div className="flex justify-center items-center gap-x-4 md:gap-x-8 text-sm md:text-base">
                <span>[F1]Help</span>
                <span>[F2]GitHub</span>
                <span>[F3]Blog</span>
                <span>[F4]Contact</span>
                <span className="hidden md:inline">[F10]Exit</span>
            </div>
          </div>
        </main>
      )}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        .font-vt323 { font-family: 'VT323', monospace; }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .scanline-animation {
            background: linear-gradient(to bottom, rgba(13, 17, 23, 0), rgba(13, 17, 23, 0.75) 50%, rgba(13, 17, 23, 0));
            background-size: 100% 4px;
            animation: scanline 8s linear infinite;
        }
        @keyframes scanline {
            0% { background-position: 0 0; }
            100% { background-position: 0 100vh; }
        }
      `}</style>
    </div>
  );
};

export default Design3;
