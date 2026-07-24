import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

const INITIAL_WINDOWS = {
  about: {
    id: 'about',
    title: 'About Me - System Profile',
    iconName: 'UserCheck',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 40, width: 680, height: 480 },
    component: 'AboutApp'
  },
  projects: {
    id: 'projects',
    title: 'Cybersecurity Projects & Portfolio',
    iconName: 'Shield',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 140, y: 60, width: 720, height: 500 },
    component: 'ProjectsApp'
  },
  skills: {
    id: 'skills',
    title: 'Skills & Security Tools Matrix',
    iconName: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 180, y: 80, width: 660, height: 460 },
    component: 'SkillsApp'
  },
  terminal: {
    id: 'terminal',
    title: 'MS-DOS Prompt [C:\\PORTFOLIO]',
    iconName: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 220, y: 100, width: 640, height: 420 },
    component: 'TerminalApp'
  },
  contact: {
    id: 'contact',
    title: 'Contact Mailer (v1.0)',
    iconName: 'Mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 260, y: 120, width: 560, height: 440 },
    component: 'ContactApp'
  },
  display: {
    id: 'display',
    title: 'Display Properties & Themes',
    iconName: 'Monitor',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 70, width: 580, height: 460 },
    component: 'DisplayPropertiesApp'
  }
};

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState('about');
  const [maxZIndex, setMaxZIndex] = useState(10);

  const focusWindow = (id) => {
    if (!windows[id]) return;
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: newZ,
      },
    }));
  };

  const openWindow = (id) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: newZ,
      },
    }));
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
      },
    }));
    if (activeWindowId === id) {
      const remainingOpen = Object.values(windows).filter(
        (w) => w.id !== id && w.isOpen && !w.isMinimized
      );
      if (remainingOpen.length > 0) {
        const nextTop = remainingOpen.reduce((max, w) =>
          w.zIndex > max.zIndex ? w : max
        );
        setActiveWindowId(nextTop.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMaximizeWindow = (id) => {
    focusWindow(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const updateWindowPosition = (id, newPosition) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: {
          ...prev[id].position,
          ...newPosition,
        },
      },
    }));
  };

  const toggleWindow = (id) => {
    const win = windows[id];
    if (!win) return;
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        toggleWindow,
        updateWindowPosition,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => useContext(WindowContext);
