import React, { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import { WindowProvider } from './context/WindowContext';
import { ThemeProvider } from './context/ThemeContext';
import BootScreen from './components/BootScreen';
import SplashScreen from './components/SplashScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import ShutDownScreen from './components/ShutDownScreen';
import RebootScreen from './components/RebootScreen';

export default function App() {
  const [bootStep, setBootStep] = useState('bios'); // 'bios' | 'splash' | 'desktop' | 'reboot' | 'shutdown'

  const handleRestartOS = () => {
    setBootStep('reboot');
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

            {bootStep === 'reboot' && (
              <RebootScreen onRebootComplete={() => setBootStep('bios')} />
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
