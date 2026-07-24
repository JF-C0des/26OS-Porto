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

  const handleIconClick = (id) => {
    playClick();
    setSelectedIconId(id);
  };

  const handleIconDoubleClick = (id) => {
    playClick();
    openWindow(id);
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
      className="relative w-full h-[calc(100vh-36px)] overflow-hidden select-none p-4 transition-all duration-300 retro-desktop-screen"
    >
      <div className="grid grid-flow-col grid-rows-6 auto-cols-max gap-4 w-max h-full">
        {DESKTOP_ICONS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedIconId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleIconClick(item.id)}
              onDoubleClick={() => handleIconDoubleClick(item.id)}
              className={`w-24 p-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded border border-transparent ${
                isSelected
                  ? 'bg-[#000080]/60 border-dashed border-cyan-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className={`w-12 h-12 win95-outset flex items-center justify-center ${item.color} text-white shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`text-xs text-center font-bold px-1 py-0.5 rounded leading-tight ${
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
