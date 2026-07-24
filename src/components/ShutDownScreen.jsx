import React, { useState } from 'react';
import { Power } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import CRTGlitchOverlay from './CRTGlitchOverlay';

const SHUTDOWN_LOGS = [
  { time: '[ 0.0412 ]', text: 'Sending SIGTERM to active processes...' },
  { time: '[ 0.1834 ]', text: 'Unmounting Virtual File Systems (/dev/vda1)...' },
  { time: '[ 0.3591 ]', text: 'Clearing Volatile Memory (RAM) & Cache...' },
  { time: '[ 0.5210 ]', text: '26OS System Halted. Safe to Power Off.' },
];

export default function ShutDownScreen({ onPowerOn }) {
  const [isGlitching, setIsGlitching] = useState(true);
  const [isPoweringOn, setIsPoweringOn] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const { playBeep } = useSound();

  const handleGlitchComplete = () => {
    setIsGlitching(false);
    setLogs([]);
    // Stream shutdown logs sequentially (~450ms per step for comfortable reading)
    SHUTDOWN_LOGS.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => {
          if (prev.some((item) => item.text === log.text)) return prev;
          return [...prev, log];
        });
        playBeep(350 - index * 50, 0.05, 'square');

        if (index === SHUTDOWN_LOGS.length - 1) {
          setIsComplete(true);
        }
      }, 200 + index * 450);
    });
  };

  const handlePowerOnClick = () => {
    playBeep(1000, 0.25, 'sine');
    setIsPoweringOn(true);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black text-amber-500 font-mono flex flex-col items-center justify-between p-8 z-50 select-none overflow-hidden">
      <div className="absolute inset-0 crt-overlay pointer-events-none z-30" />

      {isGlitching && (
        <CRTGlitchOverlay
          duration={1800}
          mode="shutdown"
          onComplete={handleGlitchComplete}
        />
      )}

      {isPoweringOn && (
        <CRTGlitchOverlay
          duration={1500}
          mode="wake"
          onComplete={onPowerOn}
        />
      )}

      <div className="w-full max-w-2xl pt-6 relative z-10 pointer-events-none">
        <div className="border-b border-amber-900/60 pb-2 text-amber-700 flex justify-between items-center text-xs">
          <span>26OS TERMINATION PROTOCOL</span>
          <span>SHUTDOWN_SEQUENCE_OK</span>
        </div>
      </div>

      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center my-6 space-y-6 relative z-10">
        <div className="space-y-2.5 bg-amber-950/20 p-6 border border-amber-900/60 font-mono text-xs sm:text-sm shadow-inner">
          {logs.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-amber-700 font-bold">{item.time}</span>
              <span className={idx === SHUTDOWN_LOGS.length - 1 ? 'text-amber-300 font-bold' : 'text-amber-500'}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="flex flex-col items-center space-y-6 pt-4 relative z-50 pointer-events-auto">
            <div className="text-center space-y-2 pointer-events-none">
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-amber-400">
                It is now safe to turn off your computer.
              </h1>
              <p className="text-xs text-amber-600 font-mono">
                26OS Workstation Session Terminated safely.
              </p>
            </div>

            <button
              onClick={handlePowerOnClick}
              className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 active:bg-gray-400 text-black px-8 py-3.5 font-bold text-sm flex items-center gap-3 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow-2xl cursor-pointer transition-transform hover:scale-105 active:scale-95 z-50 relative pointer-events-auto"
            >
              <Power className="w-5 h-5 text-red-700" />
              <span>Power On / Reboot System</span>
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl pt-3 pb-2 border-t border-amber-900/60 flex justify-between items-center text-xs text-amber-600 font-mono relative z-10 pointer-events-none">
        <span>26OS SECURITY CORE v2.4.0</span>
        <span>SYSTEM POWERED DOWN</span>
      </div>
    </div>
  );
}
