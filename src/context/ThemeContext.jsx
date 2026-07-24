import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const WALLPAPERS = {
  teal: {
    id: 'teal',
    name: 'Teal Solid (Default)',
    style: { backgroundColor: '#008080' }
  },
  classic_blue: {
    id: 'classic_blue',
    name: 'Classic Blue Gradient',
    style: { background: 'linear-gradient(135deg, #00223E 0%, #1D976C 100%)' }
  },
  clouds: {
    id: 'clouds',
    name: 'Windows 98 Sky',
    style: { background: 'linear-gradient(180deg, #1d6fa5 0%, #60a5fa 100%)' }
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Dark Green',
    style: { backgroundColor: '#021a08', backgroundImage: 'radial-gradient(#00ff66 15%, transparent 16%)', backgroundSize: '16px 16px' }
  },
  retro_grid: {
    id: 'retro_grid',
    name: 'Retro 90s Grid',
    style: { backgroundColor: '#181824', backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
  }
};

export const THEMES = {
  win95: {
    id: 'win95',
    name: 'Windows 95 Classic',
    titlebarActive: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
    titlebarTextColor: '#ffffff',
    taskbarBg: '#c0c0c0',
    windowBg: '#c0c0c0'
  },
  xp_blue: {
    id: 'xp_blue',
    name: 'Windows XP Royale Blue',
    titlebarActive: 'linear-gradient(180deg, #0055ea 0%, #002d96 100%)',
    titlebarTextColor: '#ffffff',
    taskbarBg: '#245edb',
    windowBg: '#ece9d8'
  },
  dark_cyber: {
    id: 'dark_cyber',
    name: 'Cyberpunk Dark',
    titlebarActive: 'linear-gradient(90deg, #11111e 0%, #2a1147 100%)',
    titlebarTextColor: '#00ffcc',
    taskbarBg: '#181824',
    windowBg: '#212130'
  },
  high_contrast: {
    id: 'high_contrast',
    name: 'High Contrast Black',
    titlebarActive: '#ffffff',
    titlebarTextColor: '#000000',
    taskbarBg: '#000000',
    windowBg: '#000000'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentWallpaper, setCurrentWallpaper] = useState('teal');
  const [currentTheme, setCurrentTheme] = useState('win95');

  const wallpaperConfig = WALLPAPERS[currentWallpaper] || WALLPAPERS.teal;
  const themeConfig = THEMES[currentTheme] || THEMES.win95;

  return (
    <ThemeContext.Provider
      value={{
        currentWallpaper,
        setCurrentWallpaper,
        currentTheme,
        setCurrentTheme,
        wallpaperConfig,
        themeConfig
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
