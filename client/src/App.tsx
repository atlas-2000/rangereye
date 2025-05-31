import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import About from "@/pages/About";
import SystemDesign from "@/pages/SystemDesign";
import Documentation from "@/pages/Documentation";
import Team from "@/pages/Team";
import SocialImpact from "@/pages/SocialImpact";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowInitialLoading(false);
  };

  // Show initial loading screen on first visit
  if (showInitialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        {isLoading ? (
          <Route path="*">
            <div className="min-h-screen flex items-center justify-center pt-16">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading...</p>
              </div>
            </div>
          </Route>
        ) : (
          <>
            <Route path="/" component={isAuthenticated ? Home : Landing} />
            <Route path="/about" component={About} />
            <Route path="/system" component={SystemDesign} />
            <Route path="/documentation" component={Documentation} />
            <Route path="/team" component={Team} />
            <Route path="/impact" component={SocialImpact} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
          </>
        )}
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
