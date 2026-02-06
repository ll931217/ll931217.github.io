import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { SkipLink, SkipTarget } from "@/components/ui/SkipLink";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Konami code easter egg
  useKonamiCode({
    onActivate: () => setTerminalOpen(true),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SkipLink />
        <CustomCursor />
        <ScrollProgress />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipTarget />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
