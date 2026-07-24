import React, { useState, useEffect, useRef } from 'react';
import { useWindow } from '../context/WindowContext';
import { useTheme } from '../context/ThemeContext';
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
  Monitor,
  Settings,
  Folder,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  UserCheck,
  Shield,
  Cpu,
  Terminal,
  Mail,
  Monitor
};

export default function Taskbar({ onRestartOS, onShutDownOS }) {
  const { windows, activeWindowId, toggleWindow, openWindow } = useWindow();
  const { themeConfig } = useTheme();
  const { soundEnabled, setSoundEnabled, playClick } = useSound();
  
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [programsSubMenuOpen, setProgramsSubMenuOpen] = useState(false);
  const [showShutDownDialog, setShowShutDownDialog] = useState(false);
  const [shutDownOption, setShutDownOption] = useState('shutdown'); // 'shutdown' | 'restart'
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
        setIsStartOpen(false);
        setProgramsSubMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Physical Windows Key (Meta / OS key) listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Meta' || e.key === 'OS') {
        e.preventDefault();
        playClick();
        setIsStartOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsStartOpen(false);
        setProgramsSubMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAppLaunch = (appId) => {
    playClick();
    openWindow(appId);
    setIsStartOpen(false);
    setProgramsSubMenuOpen(false);
  };

  const handleConfirmShutDown = () => {
    playClick();
    setShowShutDownDialog(false);
    if (shutDownOption === 'shutdown') {
      onShutDownOS();
    } else {
      onRestartOS();
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: themeConfig.taskbarBg }}
        className="fixed bottom-0 left-0 right-0 h-9 win95-outset flex items-center justify-between px-1 z-40 select-none transition-colors duration-300"
      >
        <div className="flex items-center gap-1.5 h-full py-0.5 flex-1 min-w-0">
          <div ref={menuRef} className="relative shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setIsStartOpen(!isStartOpen);
                if (isStartOpen) setProgramsSubMenuOpen(false);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`h-7 px-2 flex items-center gap-1.5 font-bold text-xs cursor-pointer ${
                isStartOpen ? 'win95-outset-active bg-gray-300' : 'win95-outset hover:bg-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
                <div className="bg-red-600 h-full w-full" />
                <div className="bg-green-600 h-full w-full" />
                <div className="bg-blue-600 h-full w-full" />
                <div className="bg-yellow-500 h-full w-full" />
              </div>
              <span className="text-black font-extrabold tracking-wide">Start</span>
            </button>

            {isStartOpen && (
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="absolute bottom-full left-0 mb-0.5 w-64 bg-[#c0c0c0] shadow-2xl p-1 z-50 flex border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 select-none"
              >
                <div className="bg-gradient-to-t from-[#000080] via-[#1084d0] to-[#000080] w-8 flex items-end justify-center pb-3 text-white font-bold select-none shrink-0 overflow-hidden">
                  <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap uppercase font-mono font-extrabold text-xs tracking-widest text-white drop-shadow">
                    <span className="text-cyan-200 font-normal mr-1">26OS</span> WORKSTATION
                  </span>
                </div>

                <div className="flex-1 py-1 space-y-0.5 text-xs text-black">
                  <div className="px-3 py-1 font-bold text-blue-900 border-b border-gray-400 font-mono mb-1 truncate">
                    Jedidiah Sec Workstation
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setProgramsSubMenuOpen(true)}
                    onMouseLeave={() => setProgramsSubMenuOpen(false)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setProgramsSubMenuOpen((prev) => !prev);
                      }}
                      className={`w-full px-3 py-1.5 flex items-center justify-between hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors ${
                        programsSubMenuOpen ? 'bg-[#000080] text-white' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Folder className="w-4 h-4 text-yellow-600 fill-yellow-500 shrink-0" />
                        <span className="font-bold">Programs</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {programsSubMenuOpen && (
                      <div className="absolute left-full bottom-0 ml-0.5 w-60 bg-[#c0c0c0] p-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow-2xl z-50 space-y-0.5">
                        <button
                          onClick={() => handleAppLaunch('about')}
                          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors"
                        >
                          <UserCheck className="w-4 h-4 text-blue-900 shrink-0" />
                          <span>About Me & CV</span>
                        </button>

                        <button
                          onClick={() => handleAppLaunch('projects')}
                          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors"
                        >
                          <Shield className="w-4 h-4 text-blue-900 shrink-0" />
                          <span>Security & Coding Projects</span>
                        </button>

                        <button
                          onClick={() => handleAppLaunch('skills')}
                          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors"
                        >
                          <Cpu className="w-4 h-4 text-blue-900 shrink-0" />
                          <span>Skills & Tools Matrix</span>
                        </button>

                        <button
                          onClick={() => handleAppLaunch('terminal')}
                          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors"
                        >
                          <Terminal className="w-4 h-4 text-green-700 shrink-0" />
                          <span>MS-DOS Prompt</span>
                        </button>

                        <button
                          onClick={() => handleAppLaunch('contact')}
                          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors"
                        >
                          <Mail className="w-4 h-4 text-blue-900 shrink-0" />
                          <span>Contact Mailer</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAppLaunch('display')}
                    className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left cursor-pointer transition-colors"
                  >
                    <Monitor className="w-4 h-4 text-purple-900 shrink-0" />
                    <span className="font-bold">Control Panel & Settings</span>
                  </button>

                  <div className="border-t border-gray-400 my-1" />

                  <button
                    onClick={() => {
                      playClick();
                      setIsStartOpen(false);
                      setProgramsSubMenuOpen(false);
                      setShowShutDownDialog(true);
                    }}
                    className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left font-bold text-red-900 hover:text-white cursor-pointer transition-colors group"
                  >
                    <Power className="w-4 h-4 shrink-0 text-red-700 group-hover:text-white" />
                    <span>Shut Down...</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-0.5 h-6 bg-gray-400 border-r border-white mx-0.5 shrink-0" />

          <div className="flex gap-1 overflow-x-auto flex-1 min-w-0 h-full py-0.5">
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
                  className={`h-7 max-w-[160px] min-w-[110px] px-2 flex items-center gap-1.5 text-xs truncate cursor-pointer ${
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

        <div className="win95-inset h-7 px-2 bg-[#c0c0c0] flex items-center gap-2 text-xs font-mono shrink-0 ml-2 text-black">
          <button
            onClick={() => {
              playClick();
              setSoundEnabled(!soundEnabled);
            }}
            className="hover:opacity-75 focus:outline-none cursor-pointer"
            title={soundEnabled ? "Audio On (Click to Mute)" : "Audio Muted (Click to Unmute)"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-blue-900" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-red-700" />
            )}
          </button>

          <span className="font-bold">{currentTime}</span>
        </div>
      </div>

      {showShutDownDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="win95-outset bg-[#c0c0c0] w-full max-w-sm p-1 shadow-2xl">
            <div className="win95-titlebar-active p-1 flex justify-between items-center font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Power className="w-3.5 h-3.5" /> Shut Down Windows
              </span>
              <button
                onClick={() => setShowShutDownDialog(false)}
                className="win95-outset px-1.5 text-black bg-[#c0c0c0] hover:bg-red-500 hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4 text-xs text-black">
              <div className="flex items-center gap-3">
                <div className="win95-outset p-2 bg-gray-200">
                  <Power className="w-8 h-8 text-red-700" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">What do you want the computer to do?</h3>
                </div>
              </div>

              <div className="space-y-2 pl-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="shutdown"
                    value="shutdown"
                    checked={shutDownOption === 'shutdown'}
                    onChange={() => setShutDownOption('shutdown')}
                    className="accent-blue-900"
                  />
                  <span>Shut down the computer</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="shutdown"
                    value="restart"
                    checked={shutDownOption === 'restart'}
                    onChange={() => setShutDownOption('restart')}
                    className="accent-blue-900"
                  />
                  <span>Restart the computer</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-400">
                <button
                  onClick={handleConfirmShutDown}
                  className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-5 py-1 font-bold text-xs text-black border border-gray-600 cursor-pointer"
                >
                  OK
                </button>

                <button
                  onClick={() => setShowShutDownDialog(false)}
                  className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-5 py-1 font-bold text-xs text-black border border-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

