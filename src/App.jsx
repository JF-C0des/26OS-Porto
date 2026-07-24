import React, { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import { WindowProvider } from './context/WindowContext';
import { ThemeProvider } from './context/ThemeContext';
import BootScreen from './components/BootScreen';
import SplashScreen from './components/SplashScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import ShutDownScreen from './components/ShutDownScreen';

export default function App() {
  const [bootStep, setBootStep] = useState('bios'); // 'bios' | 'splash' | 'desktop' | 'shutdown'

  const handleRestartOS = () => {
    setBootStep('bios');
  };

  const handleShutDownOS = () => {
    setBootStep('shutdown');
  };

  return (
    <SoundProvider>
      <ThemeProvider>
        <WindowProvider>
          <div className="w-screen h-screen overflow-hidden bg-black font-sans antialiased relative retro-screen">
            {bootStep === 'bios' && (
              <BootScreen onBootComplete={() => setBootStep('splash')} />
            )}

            {bootStep === 'splash' && (
              <SplashScreen onFinish={() => setBootStep('desktop')} />
            )}

            {bootStep === 'desktop' && (
              <>
                <Desktop />
                <Taskbar onRestartOS={handleRestartOS} onShutDownOS={handleShutDownOS} />
              </>
            )}

            {bootStep === 'shutdown' && (
              <ShutDownScreen onPowerOn={() => setBootStep('bios')} />
            )}
          </div>
        </WindowProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}
