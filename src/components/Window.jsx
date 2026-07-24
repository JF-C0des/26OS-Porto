import React from 'react';
import { Rnd } from 'react-rnd';
import { useWindow } from '../context/WindowContext';
import { useSound } from '../context/SoundContext';
import { UserCheck, Shield, Cpu, Terminal, Mail, Minus, Square, Copy, X } from 'lucide-react';

import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import SkillsApp from './apps/SkillsApp';
import TerminalApp from './apps/TerminalApp';
import ContactApp from './apps/ContactApp';

const APP_COMPONENTS = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  terminal: TerminalApp,
  contact: ContactApp
};

const ICON_MAP = {
  UserCheck,
  Shield,
  Cpu,
  Terminal,
  Mail
};

export default function Window({ windowData }) {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition
  } = useWindow();
  const { playClick } = useSound();

  const { id, title, iconName, isOpen, isMinimized, isMaximized, zIndex, position } = windowData;

  if (!isOpen || isMinimized) return null;

  const isActive = activeWindowId === id;
  const IconComponent = ICON_MAP[iconName] || Terminal;
  const AppComponent = APP_COMPONENTS[id];

  return (
    <Rnd
      size={
        isMaximized
          ? { width: '100%', height: '100%' }
          : { width: position.width, height: position.height }
      }
      position={
        isMaximized
          ? { x: 0, y: 0 }
          : { x: position.x, y: position.y }
      }
      dragHandleClassName="drag-handle"
      cancel=".no-drag"
      onDragStart={() => focusWindow(id)}
      onDragStop={(e, d) => {
        if (!isMaximized) {
          updateWindowPosition(id, { x: d.x, y: d.y });
        }
      }}
      onResizeStart={() => focusWindow(id)}
      onResizeStop={(e, direction, ref, delta, pos) => {
        if (!isMaximized) {
          updateWindowPosition(id, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...pos
          });
        }
      }}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      bounds="parent"
      minWidth={320}
      minHeight={240}
      style={{ zIndex }}
      className="absolute flex flex-col"
    >
      <div
        onMouseDown={() => focusWindow(id)}
        onClick={() => focusWindow(id)}
        className="win95-outset w-full h-full flex flex-col p-1 shadow-xl bg-[#c0c0c0]"
      >
        {/* Title Bar - Drag Handle */}
        <div
          onDoubleClick={() => {
            playClick();
            toggleMaximizeWindow(id);
          }}
          className={`drag-handle flex items-center justify-between px-2 py-1 select-none font-bold text-xs cursor-move ${
            isActive ? 'win95-titlebar-active' : 'win95-titlebar-inactive'
          }`}
        >
          <div className="flex items-center gap-1.5 overflow-hidden pointer-events-none">
            <IconComponent className="w-4 h-4 shrink-0" />
            <span className="truncate">{title}</span>
          </div>

          {/* Window Control Buttons */}
          <div
            className="no-drag flex items-center gap-1 shrink-0"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                minimizeWindow(id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="no-drag win95-outset bg-[#c0c0c0] hover:bg-gray-300 w-5 h-4 flex items-center justify-center text-black font-bold border border-gray-600 cursor-pointer"
              title="Minimize"
            >
              <Minus className="w-3 h-3 stroke-[3]" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                toggleMaximizeWindow(id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="no-drag win95-outset bg-[#c0c0c0] hover:bg-gray-300 w-5 h-4 flex items-center justify-center text-black font-bold border border-gray-600 cursor-pointer"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <Copy className="w-2.5 h-2.5 stroke-[3]" />
              ) : (
                <Square className="w-2.5 h-2.5 stroke-[3]" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                closeWindow(id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="no-drag win95-outset bg-[#c0c0c0] hover:bg-red-600 hover:text-white w-5 h-4 flex items-center justify-center text-black font-bold border border-gray-600 cursor-pointer"
              title="Close"
            >
              <X className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Window Content Container */}
        <div className="flex-1 w-full h-full overflow-hidden mt-1 cursor-default">
          {AppComponent ? <AppComponent /> : null}
        </div>
      </div>
    </Rnd>
  );
}
