import React, { useState } from 'react';
import { Code2, Search, ExternalLink, Terminal, FolderPlus, Building2, BookOpen, Layers } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PROJECTS_DATA = [
  {
    id: 'proj-1',
    title: 'Clems Grafter Enterprise ERP System',
    category: 'coding',
    tags: ['.Net', 'Fullstack', 'ERP', 'REST API', 'JavaScript'],
    description: 'Enterprise Resource Planning (ERP) application developed at Clems Grafter Creative featuring backend API services, module integration, and responsive user interfaces.',
    highlights: [
      'Engineered backend ERP application modules using Js',
      'Built responsive front-end user navigation with modern web tech',
      'Conducted rigorous testing and debugging phases for code quality'
    ],
    github: 'https://github.com/JF-C0des',
    status: 'PRODUCTION'
  },
  {
    id: 'proj-2',
    title: 'Dama Integra Software Modules & Scripting',
    category: 'coding',
    tags: ['PHP', 'Python', 'Automation', 'Unit Testing'],
    description: 'Software development assistance for Dama Integra Solusindo, providing backend logic, automated scripts, and code quality testing.',
    highlights: [
      'Supported coding and documentation for PHP',
      'Executed systematic debugging and test suites',
      'Maintained code standard compliance across project repos'
    ],
    github: 'https://github.com/JF-C0des',
    status: 'STABLE'
  },
  {
    id: 'proj-3',
    title: 'POS & Sales Management Portal (Teras LA)',
    category: 'campus',
    tags: ['JavaScript', 'React', 'Tailwind CSS', 'REST API'],
    description: 'Point of Sale (POS) and cashier web application designed to streamline transaction processing, order tracking, and sales reporting with responsive front-end integration.',
    highlights: [
      'Engineered responsive cashier interface & POS checkout workflow',
      'Streamlined real-time transaction processing & order status tracking',
      'Integrated REST API endpoints for sales reporting and inventory management'
    ],
    github: 'https://github.com/JF-C0des/Teras-LA_FE.git',
    status: 'CAMPUS_PROJECT'
  },
  {
    id: 'proj-4',
    title: 'Task & Productivity Management Web App',
    category: 'campus',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    description: 'Interactive task management platform enabling structured activity tracking, state persistence, and deadline prioritization for personal workflow optimization.',
    highlights: [
      'Developed fullstack task management portal using PHP & MySQL',
      'Implemented structured activity tracking & deadline prioritization',
      'Created persistent state storage and responsive web interfaces'
    ],
    github: 'https://github.com/JF-C0des/PW-2026.git',
    status: 'CAMPUS_PROJECT'
  },
  {
    id: 'proj-5',
    title: 'Retro OS Interactive Portfolio Workspace',
    category: 'coding',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'Web Audio API'],
    description: 'Full Windows 95/98 interactive desktop environment portfolio built with React 19, Vite, Tailwind CSS, and Web Audio API sound synthesis.',
    highlights: [
      'Multi-window draggable and resizable state engine with react-rnd',
      'Custom synthesized PC speaker sound synthesizer',
      'Interactive MS-DOS CLI shell with custom command execution'
    ],
    github: 'https://github.com/JF-C0des/26OS-Porto.git',
    status: 'LIVE'
  },
  {
    id: 'proj-6',
    title: '[Campus Lab] Upcoming Software Project Slot',
    category: 'campus',
    tags: ['Campus Project', 'Informatics S1', 'Upcoming'],
    description: 'Reserved slot for upcoming 4th/5th semester Informatics Engineering projects at Esa Unggul University.',
    highlights: [
      'Ready to be populated with future campus assignments & thesis lab work'
    ],
    github: 'https://github.com/JF-C0des',
    status: 'PLANNED'
  },

  {
    id: 'proj-7',
    title: ' Interactive Audio Visualizer',
    category: 'coding',
    tags: ['Web Audio API', 'React', 'Canvas', 'Music'],
    description:'An interactive web-based audio visualizer that transforms sound frequencies into real-time dynamic canvas animations using Web Audio API.',
    highlights: [
      'Real-time frequency & waveform rendering with HTML5 Canvas',
      'Customizable visual themes & responsive audio sensitivity'
    ],
    github: 'https://github.com/JF-C0des/my-visualizer.git',
    status: 'LIVE'
  }
];

export default function ProjectsApp() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black text-sm select-text">
      <div className="win95-outset bg-[#c0c0c0] p-2 flex flex-wrap items-center justify-between gap-2 border-b">
        <div className="flex gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-bold ${
              filter === 'all'
                ? 'win95-outset-active bg-[#000080] text-white'
                : 'win95-outset hover:bg-gray-200 text-black'
            }`}
          >
            All Projects ({PROJECTS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('coding')}
            className={`px-3 py-1 text-xs font-bold flex items-center gap-1 ${
              filter === 'coding'
                ? 'win95-outset-active bg-[#000080] text-white'
                : 'win95-outset hover:bg-gray-200 text-black'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Coding Projects
          </button>
          <button
            onClick={() => setFilter('campus')}
            className={`px-3 py-1 text-xs font-bold flex items-center gap-1 ${
              filter === 'campus'
                ? 'win95-outset-active bg-[#000080] text-white'
                : 'win95-outset hover:bg-gray-200 text-black'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Campus Projects
          </button>
        </div>

        <div className="win95-inset bg-white px-2 py-0.5 flex items-center gap-1 w-48">
          <Search className="w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs focus:outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex-1 win95-inset bg-white p-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="win95-outset bg-[#c0c0c0] p-3 flex flex-col justify-between hover:border-blue-700 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-sm text-[#000080] flex items-center gap-1.5">
                  {project.category === 'campus' ? (
                    <BookOpen className="w-4 h-4 text-emerald-800" />
                  ) : (
                    <Code2 className="w-4 h-4 text-blue-900" />
                  )}
                  {project.title}
                </h3>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${
                  project.category === 'campus'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                    : 'bg-blue-100 text-blue-900 border-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-xs text-gray-800 line-clamp-3 mb-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="bg-white text-gray-800 text-[10px] px-1.5 py-0.5 border border-gray-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-400">
                <span className="text-[11px] font-bold text-blue-900 underline">View Specifications</span>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="win95-outset bg-[#c0c0c0] hover:bg-gray-300 p-1 text-black flex items-center gap-1 text-[10px] font-bold"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> Repo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="win95-outset bg-[#c0c0c0] w-full max-w-lg p-1 shadow-2xl">
            <div className="win95-titlebar-active p-1 flex justify-between items-center font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> Specification - {selectedProject.title}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="win95-outset px-1.5 text-black bg-[#c0c0c0] hover:bg-red-500 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-base font-bold text-[#000080]">{selectedProject.title}</h2>
                <p className="text-xs text-gray-600 font-mono mt-0.5">TYPE: {selectedProject.category.toUpperCase()} PROJECT</p>
              </div>

              <div className="win95-inset bg-white p-3 text-xs leading-relaxed text-gray-800">
                {selectedProject.description}
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#000080] mb-1">Project Details & Highlights:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-gray-800 font-mono">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-4 py-1.5 font-bold text-xs flex items-center gap-1.5 text-black"
                >
                  <GithubIcon className="w-4 h-4" /> Open GitHub
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-4 py-1.5 font-bold text-xs text-black"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="win95-outset bg-[#c0c0c0] px-2 py-0.5 text-xs flex justify-between text-gray-700 font-mono">
        <span>Jedidiah Portfolio | Showing {filteredProjects.length} Projects</span>
        <span>github.com/JF-C0des</span>
      </div>
    </div>
  );
}
