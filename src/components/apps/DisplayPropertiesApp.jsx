import React, { useState } from 'react';
import { useTheme, WALLPAPERS, THEMES } from '../../context/ThemeContext';
import { useWindow } from '../../context/WindowContext';
import { useSound } from '../../context/SoundContext';
import { Monitor, Check, Palette, Image as ImageIcon } from 'lucide-react';

export default function DisplayPropertiesApp() {
  const { currentWallpaper, setCurrentWallpaper, currentTheme, setCurrentTheme, wallpaperConfig, themeConfig } = useTheme();
  const { closeWindow } = useWindow();
  const { playClick } = useSound();

  const [activeTab, setActiveTab] = useState('background'); // 'background' | 'appearance'
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleApply = () => {
    playClick();
    setCurrentWallpaper(selectedWallpaper);
    setCurrentTheme(selectedTheme);
  };

  const handleOK = () => {
    handleApply();
    closeWindow('display');
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black text-xs select-none p-3 space-y-3">
      <div className="flex border-b border-gray-400 gap-1 pt-1">
        <button
          onClick={() => { playClick(); setActiveTab('background'); }}
          className={`px-3 py-1.5 font-bold flex items-center gap-1.5 rounded-t ${
            activeTab === 'background'
              ? 'win95-outset bg-[#c0c0c0] -mb-px border-b-transparent z-10'
              : 'bg-gray-300 hover:bg-gray-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> Background
        </button>

        <button
          onClick={() => { playClick(); setActiveTab('appearance'); }}
          className={`px-3 py-1.5 font-bold flex items-center gap-1.5 rounded-t ${
            activeTab === 'appearance'
              ? 'win95-outset bg-[#c0c0c0] -mb-px border-b-transparent z-10'
              : 'bg-gray-300 hover:bg-gray-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" /> Appearance & Theme
        </button>
      </div>

      <div className="win95-outset bg-[#c0c0c0] p-3 flex-1 flex flex-col justify-between space-y-3">
        <div className="flex flex-col items-center justify-center">
          <div className="win95-outset bg-gray-400 p-2 rounded-t-lg shadow-inner w-56 h-36 flex flex-col items-center justify-center relative">
            <div
              className="w-48 h-28 win95-inset overflow-hidden flex items-center justify-center relative transition-all duration-300"
              style={WALLPAPERS[selectedWallpaper]?.style || WALLPAPERS.teal.style}
            >
              <div className="w-28 h-16 win95-outset bg-[#c0c0c0] p-0.5 flex flex-col shadow-md">
                <div
                  className="px-1 text-[8px] font-bold truncate text-white flex justify-between items-center"
                  style={{ background: THEMES[selectedTheme]?.titlebarActive || THEMES.win95.titlebarActive }}
                >
                  <span>Sample Window</span>
                  <span>✕</span>
                </div>
                <div className="flex-1 bg-white p-1 text-[7px] text-gray-700 font-mono">
                  26OS Custom Theme Preview
                </div>
              </div>
            </div>
          </div>
          <div className="w-16 h-3 bg-gray-400 win95-outset border-t-0" />
          <div className="w-24 h-2 bg-gray-500 win95-outset rounded-b-md" />
        </div>

        {activeTab === 'background' && (
          <div className="space-y-2">
            <label className="font-bold text-gray-800 block">Select Desktop Wallpaper Preset:</label>
            <div className="win95-inset bg-white p-2 h-28 overflow-y-auto space-y-1">
              {Object.values(WALLPAPERS).map((wp) => (
                <div
                  key={wp.id}
                  onClick={() => { playClick(); setSelectedWallpaper(wp.id); }}
                  className={`p-1.5 flex items-center justify-between cursor-pointer text-xs font-mono ${
                    selectedWallpaper === wp.id
                      ? 'bg-[#000080] text-white font-bold'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <span>{wp.name}</span>
                  {selectedWallpaper === wp.id && <Check className="w-3.5 h-3.5" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-2">
            <label className="font-bold text-gray-800 block">Select OS Color Scheme Theme:</label>
            <div className="win95-inset bg-white p-2 h-28 overflow-y-auto space-y-1">
              {Object.values(THEMES).map((th) => (
                <div
                  key={th.id}
                  onClick={() => { playClick(); setSelectedTheme(th.id); }}
                  className={`p-1.5 flex items-center justify-between cursor-pointer text-xs font-mono ${
                    selectedTheme === th.id
                      ? 'bg-[#000080] text-white font-bold'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <span>{th.name}</span>
                  {selectedTheme === th.id && <Check className="w-3.5 h-3.5" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-400">
          <button
            onClick={handleOK}
            className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-4 py-1 font-bold text-xs text-black border border-gray-600"
          >
            OK
          </button>

          <button
            onClick={() => { playClick(); closeWindow('display'); }}
            className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-4 py-1 font-bold text-xs text-black border border-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-4 py-1 font-bold text-xs text-black border border-gray-600"
          >
            Apply
          </button>
        </div>

      </div>
    </div>
  );
}
