import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";

interface ProtectedContentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function ProtectedContent({ 
  children, 
  fallback, 
  className = "" 
}: ProtectedContentProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={className}>
        {fallback || (
          <Card className="border-border relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center space-y-4">
                  <Lock className="w-12 h-12 text-primary mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
                    <p className="text-muted-foreground mb-4 max-w-sm">
                      Access to live demo data, technical reports, and real-time analytics 
                      requires secure authentication.
                    </p>
                    <Button 
                      onClick={() => window.location.href = "/api/login"}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login to Access
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Blurred content preview */}
              <div className="opacity-30 pointer-events-none">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-muted rounded"></div>
                    <div className="h-20 bg-muted rounded"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}
