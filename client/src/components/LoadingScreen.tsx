import { useEffect, useState } from "react";
import rangerEyePatch from "@assets/1.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING RANGEREYE SYSTEM");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Change loading text at different progress points
    const textInterval = setInterval(() => {
      setProgress(current => {
        if (current < 25) {
          setLoadingText("INITIALIZING RANGEREYE SYSTEM");
        } else if (current < 50) {
          setLoadingText("LOADING AUTONOMOUS PROTOCOLS");
        } else if (current < 75) {
          setLoadingText("ESTABLISHING SURVEILLANCE NETWORK");
        } else if (current < 95) {
          setLoadingText("WILDFIRE DETECTION READY");
        } else {
          setLoadingText("SYSTEM OPERATIONAL");
        }
        return current;
      });
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 15s linear infinite'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* RangerEye Patch */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={rangerEyePatch} 
              alt="RangerEye Patch"
              className="w-64 h-64 object-contain animate-pulse"
            />
            {/* Glowing effect */}
            <div className="absolute inset-0 w-64 h-64 rounded-full bg-red-500/20 blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            RANGEREYE
          </h1>
          <p className="text-cyan-400 text-lg font-mono tracking-wide">
            {loadingText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 border border-gray-600">
            <div 
              className="bg-gradient-to-r from-red-500 to-cyan-400 h-2 rounded-full transition-all duration-300 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* System indicators */}
        <div className="flex justify-center space-x-8 text-sm font-mono">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-green-500' : 'bg-gray-600'} animate-pulse`}></div>
            <span className="text-gray-400">CORE SYSTEMS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-green-500' : 'bg-gray-600'} animate-pulse`}></div>
            <span className="text-gray-400">SENSORS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-green-500' : 'bg-gray-600'} animate-pulse`}></div>
            <span className="text-gray-400">NETWORK</span>
          </div>
        </div>

        {/* Mission statement */}
        <div className="mt-8 max-w-md mx-auto">
          <p className="text-gray-500 text-sm font-mono">
            ADVANCING THROUGH AUTONOMY & FIT AEROSPACE ENGINEERING
          </p>
          <p className="text-gray-600 text-xs mt-2">
            WATCHING OVER OUR NATURAL TREASURES
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 4) * 20}%`,
              animation: `float 3s ease-in-out infinite ${i * 0.4}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}