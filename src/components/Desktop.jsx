import React, { useState } from 'react';
import { useWindow } from '../context/WindowContext';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import Window from './Window';
import { UserCheck, Shield, Cpu, Terminal, Mail, Monitor } from 'lucide-react';

const DESKTOP_ICONS = [
  {
    id: 'about',
    title: 'About Me & CV',
    icon: UserCheck,
    color: 'bg-blue-800'
  },
  {
    id: 'projects',
    title: 'Security Projects',
    icon: Shield,
    color: 'bg-indigo-900'
  },
  {
    id: 'skills',
    title: 'Skills Matrix',
    icon: Cpu,
    color: 'bg-teal-800'
  },
  {
    id: 'terminal',
    title: 'MS-DOS Prompt',
    icon: Terminal,
    color: 'bg-black text-green-400'
  },
  {
    id: 'contact',
    title: 'Contact Mailer',
    icon: Mail,
    color: 'bg-blue-900'
  },
  {
    id: 'display',
    title: 'Control Panel',
    icon: Monitor,
    color: 'bg-purple-900'
  }
];

export default function Desktop() {
  const { windows, openWindow } = useWindow();
  const { wallpaperConfig } = useTheme();
  const { playClick } = useSound();
  const [selectedIconId, setSelectedIconId] = useState(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleIconClick = (id) => {
    playClick();
    setSelectedIconId(id);
    if (isMobile) {
      openWindow(id);
    }
  };

  const handleIconDoubleClick = (id) => {
    if (!isMobile) {
      playClick();
      openWindow(id);
    }
  };

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedIconId(null);
    }
  };

  return (
    <div
      onClick={handleDesktopClick}
      style={wallpaperConfig.style}
      className="relative w-full h-[calc(100vh-36px)] h-[calc(100dvh-36px)] overflow-hidden select-none p-3 sm:p-4 transition-all duration-300 retro-desktop-screen"
    >
      <div className="flex flex-col flex-wrap max-h-[calc(100vh-60px)] max-h-[calc(100dvh-60px)] gap-2 sm:gap-4 w-max h-full">
        {DESKTOP_ICONS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedIconId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleIconClick(item.id)}
              onDoubleClick={() => handleIconDoubleClick(item.id)}
              className={`w-20 sm:w-24 p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 sm:gap-1.5 cursor-pointer rounded border border-transparent active:scale-95 transition-transform ${
                isSelected
                  ? 'bg-[#000080]/60 border-dashed border-cyan-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 win95-outset flex items-center justify-center ${item.color} text-white shadow-md`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span
                className={`text-[11px] sm:text-xs text-center font-bold px-1 py-0.5 rounded leading-tight ${
                  isSelected ? 'bg-[#000080] text-white' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {Object.values(windows).map((win) => (
        <Window key={win.id} windowData={win} />
      ))}
    </div>
  );
}
