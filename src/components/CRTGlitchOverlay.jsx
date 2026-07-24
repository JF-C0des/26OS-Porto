import React, { useEffect } from 'react';
import { useSound } from '../context/SoundContext';

export default function CRTGlitchOverlay({ duration = 1800, onComplete, mode = 'shutdown' }) {
  const { playGlitchSound } = useSound();

  useEffect(() => {
    if (playGlitchSound) {
      playGlitchSound(duration / 1000);
    }
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete, playGlitchSound]);

  const getAnimationClass = () => {
    if (mode === 'shutdown') return 'animate-crt-shutdown';
    if (mode === 'wake') return 'animate-crt-wake';
    return 'animate-crt-flicker';
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-black/90 flex items-center justify-center select-none">
      <div className="absolute inset-0 crt-static-bg opacity-60 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 crt-overlay opacity-90 pointer-events-none" />

      <div className={`w-full h-full relative pointer-events-none ${getAnimationClass()}`}>
        <div className="absolute top-1/4 left-0 right-0 h-6 bg-cyan-500/30 mix-blend-color-dodge transform -translate-x-4 pointer-events-none" />
        <div className="absolute top-2/3 left-0 right-0 h-10 bg-fuchsia-500/30 mix-blend-difference transform translate-x-6 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/80 shadow-[0_0_25px_#fff] pointer-events-none" />
      </div>
    </div>
  );
}
