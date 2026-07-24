import React, { useEffect, useState } from 'react';
import { useSound } from '../context/SoundContext';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const { playStartupSound } = useSound();

  useEffect(() => {
    playStartupSound();
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#008080] flex flex-col items-center justify-center z-50 p-4 select-none">
      <div className="win95-outset bg-[#c0c0c0] p-8 max-w-lg w-full text-center shadow-2xl space-y-6 border-4">
        
        <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white p-4 font-bold text-2xl tracking-wider uppercase border border-blue-900 shadow">
          Retro Windows 95
          <div className="text-xs font-normal tracking-normal text-cyan-200 mt-1">
            Cybersecurity & Portfolio Workstation Edition
          </div>
        </div>

        <div className="win95-inset bg-white p-4 text-left font-mono text-xs space-y-1 text-gray-800">
          <p><span className="font-bold text-blue-900">User:</span> Administrator / Security Researcher</p>
          <p><span className="font-bold text-blue-900">Environment:</span> React 19 + Vite + Tailwind</p>
          <p><span className="font-bold text-blue-900">Status:</span> Loading System Desktop...</p>
        </div>

        <div className="space-y-2">
          <div className="win95-inset h-7 bg-white p-1 flex gap-1 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 transition-opacity duration-150 ${
                  i < (progress / 100) * 12 ? 'bg-[#000080]' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-700">
            <span>Starting System Services...</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 italic">
          Copyright (C) Portfolio OS - All Rights Reserved
        </div>
      </div>
    </div>
  );
}
