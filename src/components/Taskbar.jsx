import React, { useState, useEffect, useRef } from 'react';
import { useWindow } from '../context/WindowContext';
import { useSound } from '../context/SoundContext';
import {
  UserCheck,
  Shield,
  Cpu,
  Terminal,
  Mail,
  Volume2,
  VolumeX,
  Power,
  Info,
  Monitor,
  FolderOpen
} from 'lucide-react';

const ICON_MAP = {
  UserCheck,
  Shield,
  Cpu,
  Terminal,
  Mail
};

export default function Taskbar({ onRestartOS }) {
  const { windows, activeWindowId, toggleWindow, openWindow } = useWindow();
  const { soundEnabled, setSoundEnabled, playClick } = useSound();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const menuRef = useRef(null);

  // Clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside start menu listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAppLaunch = (appId) => {
    playClick();
    openWindow(appId);
    setStartMenuOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-9 win95-outset bg-[#c0c0c0] flex items-center justify-between px-1 z-40 select-none">
      
      {/* Left Area: Start Button & Open Windows */}
      <div className="flex items-center gap-1.5 h-full py-0.5 overflow-x-auto flex-1">
        
        {/* Start Button */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => {
              playClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`h-7 px-2 flex items-center gap-1.5 font-bold text-xs ${
              startMenuOpen ? 'win95-outset-active bg-gray-300' : 'win95-outset hover:bg-gray-200'
            }`}
          >
            {/* Retro 4-color Windows Flag */}
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
              <div className="bg-red-600 h-full w-full" />
              <div className="bg-green-600 h-full w-full" />
              <div className="bg-blue-600 h-full w-full" />
              <div className="bg-yellow-500 h-full w-full" />
            </div>
            <span className="text-black font-extrabold tracking-wide">Start</span>
          </button>

          {/* Start Menu Flyout */}
          {startMenuOpen && (
            <div className="absolute bottom-9 left-0 w-64 win95-outset bg-[#c0c0c0] shadow-2xl p-1 z-50 flex border-2 border-black">
              {/* Left Side Banner */}
              <div className="bg-gradient-to-t from-[#000080] via-[#1084d0] to-[#000080] w-7 flex items-end justify-center pb-3 text-white font-bold tracking-widest text-xs select-none">
                <span className="-rotate-90 whitespace-nowrap uppercase text-gray-200">
                  Retro Windows 95
                </span>
              </div>

              {/* Menu Items List */}
              <div className="flex-1 py-1 space-y-0.5 text-xs text-black">
                <div className="px-3 py-1 font-bold text-blue-900 border-b border-gray-400 font-mono mb-1">
                  Jedidiah Sec Workstation
                </div>

                <button
                  onClick={() => handleAppLaunch('about')}
                  className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left"
                >
                  <UserCheck className="w-4 h-4 text-blue-900" />
                  <span>About Me & CV</span>
                </button>

                <button
                  onClick={() => handleAppLaunch('projects')}
                  className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left"
                >
                  <Shield className="w-4 h-4 text-blue-900" />
                  <span>Security Projects</span>
                </button>

                <button
                  onClick={() => handleAppLaunch('skills')}
                  className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left"
                >
                  <Cpu className="w-4 h-4 text-blue-900" />
                  <span>Skills & Tools Matrix</span>
                </button>

                <button
                  onClick={() => handleAppLaunch('terminal')}
                  className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left"
                >
                  <Terminal className="w-4 h-4 text-green-700" />
                  <span>MS-DOS Prompt</span>
                </button>

                <button
                  onClick={() => handleAppLaunch('contact')}
                  className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left"
                >
                  <Mail className="w-4 h-4 text-blue-900" />
                  <span>Contact Mailer</span>
                </button>

                <div className="border-t border-gray-400 my-1" />

                <button
                  onClick={() => {
                    playClick();
                    setStartMenuOpen(false);
                    onRestartOS();
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-red-700 hover:text-white text-left font-bold text-red-900"
                >
                  <Power className="w-4 h-4" />
                  <span>Shut Down / Reboot System</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="w-0.5 h-6 bg-gray-400 border-r border-white mx-0.5" />

        {/* Task Buttons for Open Windows */}
        <div className="flex gap-1 overflow-x-auto">
          {Object.values(windows).map((win) => {
            if (!win.isOpen) return null;
            const isActive = activeWindowId === win.id && !win.isMinimized;
            const Icon = ICON_MAP[win.iconName] || Terminal;

            return (
              <button
                key={win.id}
                onClick={() => {
                  playClick();
                  toggleWindow(win.id);
                }}
                className={`h-7 max-w-[160px] min-w-[110px] px-2 flex items-center gap-1.5 text-xs truncate ${
                  isActive
                    ? 'win95-outset-active bg-gray-200 font-bold border-black'
                    : 'win95-outset bg-[#c0c0c0] hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate text-black">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Area: System Tray */}
      <div className="win95-inset h-7 px-2 bg-[#c0c0c0] flex items-center gap-2 text-xs font-mono shrink-0 ml-2">
        <button
          onClick={() => {
            playClick();
            setSoundEnabled(!soundEnabled);
          }}
          className="hover:opacity-75 focus:outline-none"
          title={soundEnabled ? "Audio On (Click to Mute)" : "Audio Muted (Click to Unmute)"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-blue-900" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-red-700" />
          )}
        </button>

        <span className="text-gray-700 font-bold">{currentTime}</span>
      </div>
    </div>
  );
}
