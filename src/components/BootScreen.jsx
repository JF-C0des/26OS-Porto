import React, { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';
import CRTGlitchOverlay from './CRTGlitchOverlay';

const BOOT_LOGS = [
  { text: 'Initializing 26OS CyberSec Core Kernel v2.4.0...', percent: '15%' },
  { text: 'Checking CPU Registers & Memory Allocation...', percent: '28%' },
  { text: 'Loading Cryptographic Modules & SHA-256 Keypairs...', percent: '42%' },
  { text: 'Mounting Virtual File System (/dev/vda1)...', percent: '58%' },
  { text: 'Initializing Network Interfaces & Firewall Rules (IPTABLES)...', percent: '71%' },
  { text: 'Preloading System Sound Engine & CRT Shaders...', percent: '85%' },
  { text: 'Spawning GUI Window Manager & Desktop Environment...', percent: '96%' },
  { text: 'System Status: 100% OK - Welcome User.', percent: '100%' },
];

export default function BootScreen({ onBootComplete }) {
  const [ram, setRam] = useState(0);
  const [loadedLogs, setLoadedLogs] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { playBeep, playStartupSound } = useSound();

  useEffect(() => {
    setLoadedLogs([]);
    const timeouts = [];

 
    let currentRam = 0;
    const ramInterval = setInterval(() => {
      currentRam += 4000;
      if (currentRam >= 64000) {
        currentRam = 64000;
        clearInterval(ramInterval);
      }
      setRam(currentRam);
    }, 40);

   
    BOOT_LOGS.forEach((log, index) => {
      const t = setTimeout(() => {
        setLoadedLogs((prev) => {
          if (prev.some((item) => item.text === log.text)) return prev;
          return [...prev, log];
        });
        playBeep(600, 0.04, 'square');

        if (index === BOOT_LOGS.length - 1) {
          setIsFinished(true);
          playStartupSound();
        }
      }, 600 + index * 520);
      timeouts.push(t);
    });

    return () => {
      clearInterval(ramInterval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleStartBoot = () => {
    if (isGlitching) return;
    setRam(64000);
    setLoadedLogs(BOOT_LOGS);
    setIsFinished(true);
    setIsGlitching(true);
  };

  return (
    <div
      onClick={handleStartBoot}
      className="fixed inset-0 min-h-screen h-screen w-full flex flex-col justify-between p-6 sm:p-8 bg-black text-green-400 font-mono text-xs sm:text-sm z-50 cursor-pointer overflow-hidden select-none pointer-events-auto relative"
    >
      <div className="absolute inset-0 crt-overlay pointer-events-none" />


      {isGlitching && (
        <CRTGlitchOverlay
          duration={1200}
          mode="shutdown"
          onComplete={onBootComplete}
        />
      )}


<div className="flex-1 space-y-4 w-full overflow-y-auto pb-16 pr-2">
  

  <div className="flex justify-between items-start leading-tight border-b border-green-800 pb-2 text-green-500 w-full">
    <div>
      <p className="font-bold text-white text-sm sm:text-base">26OS JD WORKSTATION</p>
      <p className="text-gray-400 text-xs">Jedidiah Sec Architecture Inc.</p>
    </div>
    <div className="text-right text-gray-400 text-xs">
      <p>Kernel: v2.4.0-release</p>
      <p>BIOS Version: 26OS-SEC-2026</p>
    </div>
  </div>

        <div className="space-y-0.5 text-gray-300 text-xs sm:text-sm">
          <p className="font-bold text-green-300">PROCESSOR: Quad-Core SOC @ 3.40GHz</p>
          <p>Checking System RAM : <span className="text-white font-bold">{ram} KB OK</span></p>
        </div>

    
        <div className="space-y-1 font-mono">
          <p className="font-bold text-white tracking-widest border-b border-green-900 pb-0.5 text-xs">
            [ SYSTEM INITIALIZATION STREAM ]
          </p>
          <div className="space-y-1 pt-0.5 pl-2">
            {loadedLogs.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 max-w-3xl">
                <span className={idx === BOOT_LOGS.length - 1 ? 'text-cyan-300 font-bold' : 'text-green-400'}>
                  &gt; {item.text}
                </span>
                <span className="text-green-600 font-bold shrink-0">[{item.percent}]</span>
              </div>
            ))}
          </div>
        </div>

   
        {isFinished && (
          <div className="pt-3 space-y-3">
            <p className="font-bold text-cyan-300 text-xs sm:text-sm animate-pulse">
              ✓ ALL SECURITY MODULES LOADED SUCCESSFULLY.
            </p>
            
            <div className="bg-green-950/60 border-2 border-green-500 text-green-200 p-3 text-center max-w-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <p className="font-bold text-white tracking-wider text-xs sm:text-sm animate-bounce">
                [ CLICK ANYWHERE TO BOOT WORKSTATION ]
              </p>
            </div>
          </div>
        )}
      </div>

 
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 pt-3 border-t border-green-900 flex justify-between items-center text-xs text-green-600 font-mono z-10 pointer-events-none">
        <div>
          <span className="font-bold text-white">CLICK ANYWHERE</span> to Boot / Skip
        </div>
        <div>
          STATUS: <span className="text-green-400 font-bold">READY</span> | {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
