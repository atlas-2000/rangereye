import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import patchLogoPath from "@assets/1.png";

export default function Login() {
  const [showConstruction, setShowConstruction] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConstruction(true);
  };

  if (showConstruction) {
    return (
      <div className="min-h-screen bg-black pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <Card className="border-white/20 bg-black">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Page Under Construction
              </h2>
              <p className="text-white/70 mb-6">
                Authentication system is currently being developed. Please check back later.
              </p>
              <Button 
                onClick={() => setShowConstruction(false)}
                variant="outline" 
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="max-w-md w-full">
          
          {/* Header */}
          <div className="text-center mb-8">
            {/* Patch Logo */}
            <div className="mb-6">
              <img 
                src={patchLogoPath}
                alt="RangerEye Mission Patch"
                className="w-32 h-32 mx-auto mb-4"
              />
            </div>
            <h1 className="text-3xl font-semibold text-white mb-2">
              Sign In
            </h1>
            <p className="text-white/70">
              Access your RangerEye account
            </p>
          </div>

          {/* Login Form */}
          <Card className="border-white/20 bg-black">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white/90">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border-white/30 text-white placeholder:text-white/50 focus:border-white/60"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white/90">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border-white/30 text-white placeholder:text-white/50 focus:border-white/60"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full mt-6 bg-white text-black hover:bg-white/90"
                >
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}