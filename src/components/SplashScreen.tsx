import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Logo animation sequence
    const logoTimer = setTimeout(() => setLogoScale(1), 200);
    const textTimer = setTimeout(() => setTextOpacity(1), 800);
    
    // Progress bar animation
    const progressTimer = setTimeout(() => {
      setProgressWidth(100);
    }, 1000);

    // Hide splash screen after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 4000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(progressTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main splash content */}
      <div className="text-center text-white relative z-10">
        {/* Logo with scale animation */}
        <div 
          className="mb-8 transform transition-transform duration-1000 ease-out"
          style={{ transform: `scale(${logoScale})` }}
        >
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* App name with fade in */}
        <div 
          className="transition-opacity duration-1000 ease-out"
          style={{ opacity: textOpacity }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            CareerTrack
          </h1>
          <p className="text-lg text-white/80 mb-8">Your Professional Journey</p>
        </div>

        {/* Loading progress bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full transition-all duration-3000 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-sm text-white/60 mt-4 animate-pulse">Loading your career dashboard...</p>
      </div>

      {/* Rotating border effect */}
      <div className="absolute inset-4 border border-white/10 rounded-3xl animate-spin" style={{ animationDuration: '20s' }} />
    </div>
  );
};

export default SplashScreen;