
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MoleculeBackground from "@/components/ui/MoleculeBackground";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // You can add additional loading logic here if needed
    // For example, preloading images or data
    
    // Simulate a minimum loading time for better UX
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds minimum loading time
    
    return () => clearTimeout(minLoadingTime);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          {/* Molecule background animation across the entire site */}
          <MoleculeBackground nodeCount={70} opacity={0.25} />
          
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
