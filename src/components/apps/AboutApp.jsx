import React, { useState } from 'react';
import { useWindow } from '../../context/WindowContext';
import { UserCheck, Briefcase, GraduationCap, Download, Printer, Heart, Mail } from 'lucide-react';

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState('welcome');
  const { openWindow } = useWindow();

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black text-sm select-text">

      <div className="flex border-b border-gray-400 bg-[#c0c0c0] px-2 py-1 text-xs space-x-4">
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      <div className="flex-1 flex overflow-hidden p-2 gap-2">

        <div className="w-48 win95-outset bg-[#c0c0c0] p-2 flex flex-col gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('welcome')}
            className={`w-full text-left px-3 py-2 flex items-center gap-2 font-bold text-xs ${
              activeTab === 'welcome' ? 'win95-outset-active bg-[#000080] text-white' : 'win95-outset hover:bg-gray-300'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Welcome & Story
          </button>
          
          <button
            onClick={() => setActiveTab('experience')}
            className={`w-full text-left px-3 py-2 flex items-center gap-2 font-bold text-xs ${
              activeTab === 'experience' ? 'win95-outset-active bg-[#000080] text-white' : 'win95-outset hover:bg-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Work Experience
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`w-full text-left px-3 py-2 flex items-center gap-2 font-bold text-xs ${
              activeTab === 'education' ? 'win95-outset-active bg-[#000080] text-white' : 'win95-outset hover:bg-gray-300'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Education & Specs
          </button>
        </div>


        <div className="flex-1 win95-inset bg-[#e8e5dc] text-gray-900 p-6 overflow-y-auto font-serif selection:bg-purple-900 selection:text-white">
          {activeTab === 'welcome' && (
            <div className="max-w-2xl mx-auto space-y-6 leading-relaxed">
              
  
              <div className="space-y-2">
                <h1 className="text-5xl font-black font-serif text-black tracking-tight drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)]">
                  Welcome
                </h1>
                <h2 className="text-xl font-bold font-mono text-gray-900">
                  I'm Jedidiah Faith G
                </h2>
                <p className="text-base italic text-gray-700 font-serif">
                  I'm a Student!
                </p>
              </div>

              <p className="text-base text-gray-800 font-serif">
                Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it as much as I enjoyed building it. If you have any questions or comments, feel free to contact me using{' '}
                <button
                  onClick={() => openWindow('contact')}
                  className="text-purple-800 font-semibold underline hover:text-purple-950 cursor-pointer"
                >
                  this form
                </button>{' '}
                or shoot me an email at{' '}
                <a
                  href="mailto:jdf1258@gmail.com"
                  className="text-purple-800 font-semibold underline hover:text-purple-950"
                >
                  jdf1258@gmail.com
                </a>.
              </p>

              <div className="my-6 py-3 border-y-2 border-black flex items-center gap-4 bg-black/5 px-4 rounded-sm">
                <div className="p-2 win95-outset bg-gray-200 text-black">
                  <Printer className="w-7 h-7 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black font-serif">
                    Looking for my resume?
                  </h3>
                  <button
                    onClick={() => alert("CV Download Initiated: Jedidiah Faith Gracio (jdf1258@gmail.com)")}
                    className="text-purple-800 font-bold underline hover:text-purple-950 text-sm flex items-center gap-1 mt-0.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Click here to download it!
                  </button>
                </div>
              </div>


              <div className="space-y-3 pt-2">
                <h2 className="text-2xl font-bold font-serif text-black border-b border-gray-400 pb-1">
                  About Me
                </h2>
                <p className="text-base text-gray-800">
                  From when I was a kid, I loved anything that required me to explore how things worked, and that led me to discover computers, photography, and motorcycles. I love building things around me.
                </p>
                <p className="text-base text-gray-800">
                  I started programming in high school, learning how to build websites and apps. Now in college, I'm still striving to create cool projects with code.
                </p>
              </div>


              <div className="space-y-3 pt-2">
                <h2 className="text-2xl font-bold font-serif text-black border-b border-gray-400 pb-1 flex items-center gap-2">
                  My Hobbies
                </h2>
                <p className="text-base text-gray-800">
                  Beyond software, I have a lot of hobbies that I enjoy doing in my free time—for example, photography and tuning an engine. I love driving and riding around!
                </p>
              </div>

              <div className="pt-4 border-t border-gray-400 space-y-2 text-sm italic text-gray-700">
                <p>
                  Thanks for reading about me! I hope you enjoy exploring the rest of my portfolio website and everything it has to offer. If you have any comments I would love to hear them—you can reach me through the{' '}
                  <button
                    onClick={() => openWindow('contact')}
                    className="text-purple-800 font-semibold underline hover:text-purple-950 not-italic cursor-pointer"
                  >
                    contact page
                  </button>{' '}
                  or send me an email to{' '}
                  <a
                    href="mailto:jdf1258@gmail.com"
                    className="text-purple-800 font-semibold underline hover:text-purple-950 not-italic"
                  >
                    jdf1258@gmail.com
                  </a>.
                </p>
              </div>

            </div>
          )}

          {activeTab === 'experience' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold font-serif text-black border-b border-gray-400 pb-1">
                Work Experience
              </h2>
              
              <div className="space-y-4 text-sm font-sans">
                <div className="win95-outset p-4 bg-white text-black">
                  <div className="flex flex-wrap justify-between font-bold text-blue-900 font-mono mb-1 text-sm">
                    <span>Fullstack Developer — Clems Grafter Creative</span>
                    <span>02/2026 – 05/2026</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800 space-y-1 mt-2 text-xs leading-relaxed">
                    <li>Developed the back-end of an ERP application and ensured code quality met established standards.</li>
                    <li>Built and engineered responsive front-end user interfaces using modern web technologies, significantly improving user experience and system navigation.</li>
                    <li>Conducted rigorous application testing and debugging phases to identify technical bottlenecks.</li>
                  </ul>
                </div>

                <div className="win95-outset p-4 bg-white text-black">
                  <div className="flex flex-wrap justify-between font-bold text-blue-900 font-mono mb-1 text-sm">
                    <span>General Affair IT Support — Talent-Tech</span>
                    <span>07/2024 – 01/2026</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800 space-y-1 mt-2 text-xs leading-relaxed">
                    <li>Responsible for maintenance, repair, and installation of electronic devices and computer systems.</li>
                    <li>Successfully identified and repaired over 20 hardware issues monthly with a 100% success rate.</li>
                    <li>Managed technical inventory and ensured all devices functioned optimally for operational needs.</li>
                  </ul>
                </div>

                <div className="win95-outset p-4 bg-white text-black">
                  <div className="flex flex-wrap justify-between font-bold text-blue-900 font-mono mb-1 text-sm">
                    <span>Developer Assistant — Dama Integra Solusindo</span>
                    <span>11/2023 – 06/2024</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800 space-y-1 mt-2 text-xs leading-relaxed">
                    <li>Supported coding, testing, and documentation processes for software projects in PHP and Python.</li>
                    <li>Performed debugging and ensured code quality adhered to specified standards.</li>
                  </ul>
                </div>

                <div className="win95-outset p-4 bg-white text-black">
                  <div className="flex flex-wrap justify-between font-bold text-blue-900 font-mono mb-1 text-sm">
                    <span>Production Staff — GBI Jakarta</span>
                    <span>07/2023 – PRESENT</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800 space-y-1 mt-2 text-xs leading-relaxed">
                    <li>Operated and set up technical equipment to ensure smooth weekly Live Streaming and Multimedia events.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold font-serif text-black border-b border-gray-400 pb-1">
                Education & Specifications
              </h2>
              
              <div className="space-y-4 text-sm font-sans">
                <div className="win95-outset p-4 bg-white text-black space-y-2">
                  <div className="flex flex-wrap justify-between font-bold text-blue-900 font-mono text-sm">
                    <span>S1 Teknik Informatika — Universitas Esa Unggul</span>
                    <span>2024 – PRESENT</span>
                  </div>
                  <p className="text-xs text-gray-800">GPA: <span className="font-bold text-blue-900">3.2</span></p>
                  <p className="text-xs text-gray-700">Relevant Coursework: Operating Systems, Web Development, Databases, Software Engineering.</p>
                </div>

                <div className="win95-outset p-4 bg-white text-black space-y-2">
                  <div className="flex flex-wrap justify-between font-bold text-blue-900 font-mono text-sm">
                    <span>Rekayasa Perangkat Lunak (RPL) — SMK Bina Informatika</span>
                    <span>2020 – 2023</span>
                  </div>
                  <p className="text-xs text-gray-700">Focused on software development, database design, and programming logic.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="win95-outset bg-[#c0c0c0] px-2 py-0.5 text-xs flex justify-between text-gray-700 font-mono">
        <span>Jedidiah Faith Gracio - Portfolio Page</span>
        <span>ESA UNGGUL UNIVERSITY S1</span>
      </div>
    </div>
  );
}
