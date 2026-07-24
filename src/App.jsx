import React, { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import { WindowProvider } from './context/WindowContext';
import BootScreen from './components/BootScreen';
import SplashScreen from './components/SplashScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';

export default function App() {
  const [bootStep, setBootStep] = useState('bios'); // 'bios' | 'splash' | 'desktop'

  const handleRestartOS = () => {
    setBootStep('bios');
  };

  return (
    <SoundProvider>
      <WindowProvider>
        <div className="w-screen h-screen overflow-hidden bg-[#008080] font-sans antialiased relative">
          {bootStep === 'bios' && (
            <BootScreen onBootComplete={() => setBootStep('splash')} />
          )}

          {bootStep === 'splash' && (
            <SplashScreen onFinish={() => setBootStep('desktop')} />
          )}

          {bootStep === 'desktop' && (
            <>
              <Desktop />
              <Taskbar onRestartOS={handleRestartOS} />
            </>
          )}
        </div>
      </WindowProvider>
    </SoundProvider>
  );
}
