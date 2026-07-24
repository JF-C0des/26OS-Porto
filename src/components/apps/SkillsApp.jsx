import React, { useState } from 'react';
import { Code, Cpu, Wrench, Users, Terminal } from 'lucide-react';

const SKILLS_CATEGORIES = [
  {
    id: 'prog_lang',
    name: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'PHP (ERP & Web Systems)', level: 65, status: 'INTERMEDIATE' },
      { name: 'Python (Scripting & Automation)', level: 62, status: 'INTERMEDIATE' },
      { name: 'JavaScript / HTML / CSS / React', level: 60, status: 'INTERMEDIATE' },
      { name: 'C++ (Programming Logic)', level: 55, status: 'INTERMEDIATE' },
      { name: '.NET / C#', level: 50, status: 'INTERMEDIATE' },
      { name: 'Java (Object-Oriented)', level: 58, status: 'INTERMEDIATE' },
    ]
  },
  {
    id: 'it_elec',
    name: 'IT & Hardware Electronics',
    icon: Cpu,
    skills: [
      { name: 'Hardware Repair & Troubleshooting', level: 95, status: 'EXPERT' },
      { name: 'Linux OS Administration', level: 88, status: 'ADVANCED' },
      { name: 'Networking Essentials & Setup', level: 85, status: 'ADVANCED' },
      { name: 'Electronic Device Maintenance', level: 92, status: 'EXPERT' },
      { name: 'Multimedia & Live Stream Ops', level: 90, status: 'ADVANCED' },
    ]
  },
  {
    id: 'dev_tools',
    name: 'Developer Tools & IDEs',
    icon: Wrench,
    skills: [
      { name: 'VS Code & Antigravity IDE', level: 65, status: 'INTERMEDIATE' },
      { name: 'Git & Version Control', level: 60, status: 'INTERMEDIATE' },
      { name: 'MySQL & Relational Databases', level: 58, status: 'INTERMEDIATE' },
      { name: 'Production & Streaming Hardware', level: 52, status: 'INTERMEDIATE' },
    ]
  },
  {
    id: 'soft_skills',
    name: 'Professional Capabilities',
    icon: Users,
    skills: [
      { name: 'Technical Problem-Solving', level: 95, status: 'EXPERT' },
      { name: 'Rapid Adaptability', level: 95, status: 'EXPERT' },
      { name: 'Team Communication & Support', level: 92, status: 'EXPERT' },
      { name: 'System Debugging & QA Testing', level: 90, status: 'ADVANCED' },
    ]
  }
];

export default function SkillsApp() {
  const [selectedCat, setSelectedCat] = useState('prog_lang');

  const activeCategory = SKILLS_CATEGORIES.find(c => c.id === selectedCat) || SKILLS_CATEGORIES[0];

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black text-sm select-text">
      <div className="win95-outset bg-[#c0c0c0] p-2 flex flex-wrap gap-1 border-b">
        {SKILLS_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 ${
                selectedCat === cat.id
                  ? 'win95-outset-active bg-[#000080] text-white'
                  : 'win95-outset hover:bg-gray-200 text-black'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="flex-1 win95-inset bg-white p-4 overflow-y-auto space-y-4">
        <div className="border-b pb-2">
          <h2 className="text-base font-bold text-[#000080] flex items-center gap-2">
            <activeCategory.icon className="w-5 h-5 text-blue-900" />
            Jedidiah Faith Gracio — {activeCategory.name}
          </h2>
          <p className="text-xs text-gray-600 font-mono mt-0.5">
            Technical competency matrix based on S1 Informatics coursework & 2+ years IT experience.
          </p>
        </div>

        <div className="space-y-4">
          {activeCategory.skills.map((skill, index) => (
            <div key={index} className="win95-outset p-3 bg-gray-50 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-blue-955 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-800 rounded-full inline-block" />
                  {skill.name}
                </span>
                <div className="flex gap-2 items-center">
                  <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 border border-blue-400 font-mono text-[10px]">
                    {skill.status}
                  </span>
                  <span className="font-mono text-gray-700">{skill.level}%</span>
                </div>
              </div>

              <div className="win95-inset h-5 bg-white p-0.5 flex gap-0.5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 ${
                      i < (skill.level / 100) * 20
                        ? 'bg-[#000080] border-r border-blue-400'
                        : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="win95-outset bg-[#c0c0c0] px-2 py-0.5 text-xs flex justify-between text-gray-700 font-mono">
        <span>Active Matrix: {activeCategory.name}</span>
        <span>ESA UNGGUL S1 INFORMATICS</span>
      </div>
    </div>
  );
}
