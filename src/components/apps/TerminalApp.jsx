import React, { useState, useRef, useEffect } from 'react';
import { useSound } from '../../context/SoundContext';

export default function TerminalApp() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'Microsoft(R) Windows 95 / DOS Shell v4.00' },
    { type: 'sys', text: '(C)Copyright Microsoft Corp / Jedidiah Faith Gracio Console 1995-2026.' },
    { type: 'sys', text: 'Type "help" to view available system commands.' },
    { type: 'sys', text: '' }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const endRef = useRef(null);
  const { playBeep } = useSound();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      playBeep(700, 0.04, 'square');
      
      const newHistory = [...history, { type: 'user', text: `C:\\PORTFOLIO> ${inputVal}` }];

      if (cmd) {
        setCmdHistory((prev) => [...prev, cmd]);
        setCmdIdx(-1);
      }

      const lower = cmd.toLowerCase();

      switch (lower) {
        case 'help':
          newHistory.push(
            { type: 'output', text: 'AVAILABLE TERMINAL COMMANDS:' },
            { type: 'output', text: '  whoami    - Display developer identity and education' },
            { type: 'output', text: '  skills    - List core programming languages & IT tools' },
            { type: 'output', text: '  projects  - Show coding & campus projects' },
            { type: 'output', text: '  contact   - Display email, phone, location & socials' },
            { type: 'output', text: '  cat cv.txt- Print profile executive summary' },
            { type: 'output', text: '  matrix    - Toggle Matrix digital rain stream' },
            { type: 'output', text: '  date      - Display system time & environment' },
            { type: 'output', text: '  clear     - Clear terminal buffer screen' }
          );
          break;

        case 'whoami':
          newHistory.push(
            { type: 'output', text: 'USER: Jedidiah Faith Gracio' },
            { type: 'output', text: 'DEGREE: S1 Teknik Informatika at Esa Unggul University (GPA 3.2)' },
            { type: 'output', text: 'EXPERIENCE: Fullstack Developer, IT Support, Developer Assistant' },
            { type: 'output', text: 'GITHUB: github.com/JF-C0des' }
          );
          break;

        case 'skills':
          newHistory.push(
            { type: 'output', text: '=== JEDIDIAH FAITH GRACIO SKILLS MATRIX ===' },
            { type: 'output', text: '[PROGRAMMING] PHP, Python, JavaScript, HTML, CSS, C++, .Net, Java' },
            { type: 'output', text: '[IT & ELEC  ] Hardware Troubleshooting, Linux OS, Networking' },
            { type: 'output', text: '[DEV TOOLS  ] VS Code, Antigravity IDE, Git, Production Tools' }
          );
          break;

        case 'projects':
          newHistory.push(
            { type: 'output', text: '=== CODING & CAMPUS PROJECTS ===' },
            { type: 'output', text: '1. Clems Grafter Enterprise ERP System (Fullstack PHP)' },
            { type: 'output', text: '2. Dama Integra Software & Scripting Suite (PHP/Python)' },
            { type: 'output', text: '3. Esa Unggul OS Simulator & Process Management (Campus)' },
            { type: 'output', text: '4. Esa Unggul Web Portal & Relational Database (Campus)' },
            { type: 'output', text: '5. Retro Windows OS Interactive Portfolio System (React 19)' }
          );
          break;

        case 'contact':
          newHistory.push(
            { type: 'output', text: '=== CONTACT CHANNELS ===' },
            { type: 'output', text: 'EMAIL   : jdf1258@gmail.com' },
            { type: 'output', text: 'PHONE   : 085921359035' },
            { type: 'output', text: 'LOCATION: Tangerang Selatan, Indonesia' },
            { type: 'output', text: 'GITHUB  : https://github.com/JF-C0des' },
            { type: 'output', text: 'LINKEDIN: https://linkedin.com/in/jedidiah-faith-1828b8306' }
          );
          break;

        case 'cat cv.txt':
        case 'cat about.txt':
          newHistory.push(
            { type: 'output', text: '=== EXECUTIVE SUMMARY ===' },
            { type: 'output', text: '4th-Semester Informatics Engineering student at Esa Unggul University.' },
            { type: 'output', text: 'Possesses over 2 years of technical experience managing IT infrastructure,' },
            { type: 'output', text: 'hardware maintenance, and software development using PHP and Python.' }
          );
          break;

        case 'matrix':
          setIsMatrixMode(!isMatrixMode);
          newHistory.push({
            type: 'output',
            text: isMatrixMode ? 'Matrix digital rain deactivated.' : 'MATRIX DIGITAL RAIN INITIALIZED [PRESS MATRIX AGAIN TO STOP]'
          });
          break;

        case 'date':
          newHistory.push({ type: 'output', text: `CURRENT SYSTEM TIME: ${new Date().toLocaleString()}` });
          break;

        case 'clear':
        case 'cls':
          setHistory([]);
          setInputVal('');
          return;

        case '':
          break;

        default:
          newHistory.push({
            type: 'output',
            text: `'${cmd}' is not recognized as an internal command. Type 'help' for available commands.`
          });
          break;
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const nextIdx = cmdIdx < cmdHistory.length - 1 ? cmdIdx + 1 : cmdIdx;
        setCmdIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (cmdIdx > 0) {
        const nextIdx = cmdIdx - 1;
        setCmdIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else if (cmdIdx === 0) {
        setCmdIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="h-full flex flex-col p-3 font-vt323 text-lg select-text overflow-hidden bg-black text-green-400">
      {isMatrixMode && (
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden flex justify-around text-xs font-mono">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-2 text-green-500">
              <div>01101001</div>
              <div>JEDIDIAH</div>
              <div>ESA_UNGGUL</div>
              <div>00110101</div>
              <div>PHP_PYTHON</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-1">
        {history.map((item, index) => (
          <div key={index} className={item.type === 'user' ? 'text-white' : 'text-green-400'}>
            {item.text}
          </div>
        ))}
        
        <div className="flex items-center text-white">
          <span className="text-green-500 mr-2">C:\PORTFOLIO&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-vt323 text-lg focus:ring-0"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
