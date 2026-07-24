import React, { createContext, useContext, useState, useRef } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playBeep = (freq = 800, duration = 0.08, type = 'square') => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  };

  const playClick = () => {
    playBeep(600, 0.04, 'triangle');
  };

  const playErrorSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const playTone = (freq, start, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };

      playTone(150, 0, 0.15);
      playTone(110, 0.12, 0.25);
    } catch (e) {}
  };

  const playStartupSound = () => {
    playBeep(800, 0.15, 'square');
  };

  const playWin95StartupSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // 2-second retro synth arpeggio chord chime (C4 -> E4 -> G4 -> C5 -> E5)
      const notes = [
        { freq: 261.63, start: 0.0,  dur: 2.0, type: 'triangle', gain: 0.10 },
        { freq: 329.63, start: 0.20, dur: 1.8, type: 'sine',     gain: 0.12 },
        { freq: 392.00, start: 0.40, dur: 1.6, type: 'sine',     gain: 0.12 },
        { freq: 523.25, start: 0.60, dur: 1.4, type: 'sine',     gain: 0.14 },
        { freq: 659.25, start: 0.85, dur: 1.15, type: 'sine',    gain: 0.10 },
      ];

      notes.forEach(({ freq, start, dur, type, gain: maxGain }) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gainNode.gain.linearRampToValueAtTime(maxGain, ctx.currentTime + start + 0.06);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      });
    } catch (e) {
      console.warn('Win95 startup sound error', e);
    }
  };

  const playGlitchSound = (duration = 0.5) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {}
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled, playBeep, playClick, playErrorSound, playStartupSound, playWin95StartupSound, playGlitchSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
