import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Menu, 
  X, 
  User, 
  LogOut,
  AlertTriangle,
  Home,
  Info,
  Settings,
  FileText,
  Users,
  Heart,
  Mail
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SystemStats } from "@/types";
import logoPath from "@assets/black_logo (1).png";

export default function Navigation() {
  const [location] = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: stats } = useQuery<SystemStats>({
    queryKey: ["/api/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const mainNavItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/system", label: "System Design" },
    { href: "/team", label: "Team" },
  ];

  const sidebarNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/team", label: "Team", icon: Users },
    { href: "/system", label: "System Design", icon: Settings },
    { href: "/documentation", label: "Documentation", icon: FileText },
    { href: "/impact", label: "Social Impact", icon: Heart },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const sidebarExtraItems = [
    { label: "Join Us", action: () => window.open("mailto:join@rangereye.org"), icon: Users },
  ];

  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
            <div className="relative">
              <img 
                src={logoPath} 
                alt="RangerEye Logo" 
                className="h-8 w-8 invert group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative">
              <span className="font-bold text-xl tracking-wider text-white group-hover:text-white transition-colors duration-300">
                RANGEREYE
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-500"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {mainNavItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 group ${
                    location === item.href 
                      ? "text-red-400 font-semibold" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="text-xs ml-1 opacity-50">+</span>
                </Link>
                {index < mainNavItems.length - 1 && (
                  <div className="h-6 w-px bg-white/20"></div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center">
            <div className="h-6 w-px bg-white/20 mr-6"></div>

            {/* Auth section */}
            {isLoading ? (
              <div className="w-8 h-8 bg-white/20 animate-pulse rounded"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">User</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = "/api/logout"}
                  className="text-gray-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-white hover:bg-gray-200 text-black text-sm font-medium px-4 py-2">
                  Login
                </Button>
              </Link>
            )}

            {/* Sidebar menu button - hidden on mobile */}
            <div className="hidden md:block h-6 w-px bg-white/20 mx-6"></div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden md:block p-2 text-gray-300 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile menu button - only visible on mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden ml-4"
              onClick={handleMobileToggle}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location === item.href 
                    ? "text-red-400 bg-white/10" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="RangerEye Logo" 
                className="h-7 w-7 invert" 
              />
              <span className="font-bold text-lg tracking-wider text-white">
                RANGEREYE
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {sidebarNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location === item.href 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Additional Actions */}
            {sidebarExtraItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setSidebarOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-white/5 w-full text-left"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* System Status in Sidebar */}
          {stats && (
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white font-medium mb-3">System Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Drones:</span>
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white">PROTOTYPE</span>
                </div>
              </div>
            </div>
          )}

          {/* Auth Section in Sidebar */}
          <div className="mt-8">
            {!isAuthenticated ? (
              <Link href="/login">
                <Button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full bg-white hover:bg-gray-200 text-black font-medium"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">User</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/api/logout";
                    setSidebarOpen(false);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
