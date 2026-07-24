import React, { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';

export default function RebootScreen({ onRebootComplete }) {
  const { playBeep } = useSound();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Repeated beep effect every 150ms
    const beepInterval = setInterval(() => {
      playBeep(900, 0.05, 'square');
    }, 150);

    // Staggered log message steps
    const stepTimer1 = setTimeout(() => setStep(2), 600);
    const stepTimer2 = setTimeout(() => setStep(3), 1200);

    // Complete reboot after ~1.8 seconds
    const finishTimer = setTimeout(() => {
      clearInterval(beepInterval);
      if (onRebootComplete) {
        onRebootComplete();
      }
    }, 1800);

    return () => {
      clearInterval(beepInterval);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(finishTimer);
    };
  }, [onRebootComplete, playBeep]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-6 z-50 select-none overflow-hidden">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 crt-overlay pointer-events-none z-30 opacity-80" />
      <div className="absolute inset-0 crt-static-bg opacity-30 mix-blend-screen pointer-events-none z-20" />

      {/* Rebooting Tech Box */}
      <div className="relative z-40 w-full max-w-md bg-green-950/40 border-2 border-green-500/60 p-6 shadow-[0_0_30px_rgba(34,197,94,0.35)] space-y-4">
        <div className="border-b border-green-500/40 pb-2 flex items-center justify-between text-xs tracking-widest text-green-300">
          <span className="font-bold uppercase">[ REBOOT INITIATED ]</span>
          <span className="animate-pulse text-green-400 font-bold">WARM_RESET</span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm font-mono text-green-300">
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold">&gt;</span>
            <span className="animate-pulse">Performing Warm System Reset...</span>
          </div>

          {step >= 2 && (
            <div className="flex items-center gap-2 text-green-200">
              <span className="text-green-500 font-bold">&gt;</span>
              <span className="animate-pulse">Reloading 26OS Kernel...</span>
            </div>
          )}

          {step >= 3 && (
            <div className="flex items-center gap-2 text-cyan-300 font-bold pt-1">
              <span className="text-green-500 font-bold">&gt;</span>
              <span>Handing off to BIOS Boot Loader...</span>
            </div>
          )}
        </div>

        {/* Dynamic Scan line bar */}
        <div className="w-full bg-green-950 h-1.5 overflow-hidden rounded-sm relative border border-green-800">
          <div className="h-full bg-green-400 animate-pulse w-full shadow-[0_0_10px_#22c55e]" />
        </div>
      </div>

      <div className="absolute bottom-6 text-center text-xs text-green-700 font-mono z-40 tracking-wider">
        26OS WORKSTATION REBOOT SEQUENCE v2.4.0
      </div>
    </div>
  );
}
