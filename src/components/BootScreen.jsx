import React, { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';

export default function BootScreen({ onBootComplete }) {
  const [ram, setRam] = useState(0);
  const [loadedItems, setLoadedItems] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const { playBeep } = useSound();

  const RESOURCES = [
    { name: 'keyboardKeydown5', percent: '63%' },
    { name: 'keyboardKeydown6', percent: '68%' },
    { name: 'environmentTexture', percent: '74%' },
    { name: 'monitorSmudgeTexture', percent: '79%' },
    { name: 'monitorShadowTexture', percent: '84%' },
    { name: 'decorTexture', percent: '89%' },
    { name: 'startup', percent: '95%' },
    { name: 'office', percent: '100%' },
  ];

  useEffect(() => {
    // RAM Counter animation
    let currentRam = 0;
    const ramInterval = setInterval(() => {
      currentRam += 1000;
      if (currentRam >= 16000) {
        currentRam = 16000;
        clearInterval(ramInterval);
      }
      setRam(currentRam);
    }, 60);

    // Resource loading sequential stream
    RESOURCES.forEach((item, index) => {
      setTimeout(() => {
        setLoadedItems((prev) => [...prev, item]);
        playBeep(500 + index * 50, 0.03, 'square');

        if (index === RESOURCES.length - 1) {
          setIsFinished(true);
        }
      }, 800 + index * 250);
    });

    return () => clearInterval(ramInterval);
  }, []);

  const handleStartBoot = () => {
    playBeep(1200, 0.15, 'sine');
    onBootComplete();
  };

  return (
    <div
      onClick={handleStartBoot}
      className="fixed inset-0 bg-black text-white font-mono text-sm sm:text-base p-6 sm:p-12 flex flex-col justify-between z-50 cursor-pointer overflow-hidden select-none"
    >
      {/* Header Info */}
      <div className="space-y-6">
        {/* Top Branding Row */}
        <div className="flex justify-between items-start leading-tight">
          <div>
            <p className="font-bold">Jedidiah,</p>
            <p className="font-bold">JD Inc.</p>
          </div>
          <div className="text-right">
            <p>Released: 01/13/2000</p>
            <p>HHBIOS (C)2000 JD Inc.,</p>
          </div>
        </div>

        {/* System Specs & RAM */}
        <div className="space-y-1 pt-2">
          <p className="font-bold">HSP S13 2000-2025 Special UC131S</p>
          <p>HSP Showcase(tm) XX 113</p>
          <p>Checking RAM : {ram} OK</p>
        </div>

        {/* Resources Loading List */}
        <div className="pt-4 space-y-2">
          <p className="font-bold tracking-wider">FINISHED LOADING RESOURCES</p>
          <div className="space-y-1 pl-4">
            {loadedItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-56 truncate">Loaded {item.name}</span>
                <span className="text-gray-400">... {item.percent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Message */}
        {isFinished && (
          <div className="pt-4 space-y-3">
            <p className="font-bold text-white">
              All Content Loaded, launching <span className="underline">'Jedidiah Portfolio Showcase'</span> V1.0
            </p>
            
            <div className="animate-pulse bg-white/10 text-white p-3 border border-white text-center max-w-lg mt-4">
              [ CLICK ANYWHERE OR PRESS START TO BOOT ]
            </div>
          </div>
        )}
      </div>

      {/* Footer Instructions & Date */}
      <div className="pt-8 border-t border-gray-900 flex justify-between items-end text-xs text-gray-300">
        <div>
          Press <span className="font-bold text-white">DEL</span> to enter SETUP , <span className="font-bold text-white">ESC</span> to skip memory test
        </div>
        <div className="font-mono">
          07/24/2026
        </div>
      </div>
    </div>
  );
}
