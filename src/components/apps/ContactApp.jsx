import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export default function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const { playClick, playBeep } = useSound();

  const handleSubmit = (e) => {
    e.preventDefault();
    playBeep(1000, 0.15, 'sine');
    setIsSent(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black text-sm select-text">
      {/* Mailer Header Bar */}
      <div className="win95-outset bg-[#c0c0c0] p-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-900" />
          <span className="font-bold text-xs text-[#000080]">Contact Jedidiah Faith Gracio - Outlook Mailer</span>
        </div>
      </div>

      <div className="flex-1 win95-inset bg-white p-4 overflow-y-auto space-y-4">
        {/* Contact Info Header */}
        <div className="win95-outset bg-gray-50 p-3 text-xs space-y-1.5 font-mono border-l-4 border-blue-800">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <Mail className="w-3.5 h-3.5" /> Email: jdf1258@gmail.com
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Phone className="w-3.5 h-3.5 text-green-700" /> Phone: 085921359035
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <MapPin className="w-3.5 h-3.5 text-red-600" /> Location: Tangerang Selatan, Indonesia
          </div>
        </div>

        {isSent ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-6">
            <div className="win95-outset bg-emerald-100 p-4 rounded-full border border-emerald-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#000080]">Message Dispatched!</h2>
              <p className="text-xs text-gray-600 font-mono mt-1">Your message has been queued for Jedidiah Faith Gracio.</p>
            </div>
            <button
              onClick={() => { setIsSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
              className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-6 py-2 text-xs font-bold text-black border border-gray-600"
            >
              Compose Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name:</label>
                <div className="win95-inset bg-white p-1">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs outline-none bg-transparent"
                    placeholder="e.g. Recruiter / Collaborator"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Email Address:</label>
                <div className="win95-inset bg-white p-1">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs outline-none bg-transparent"
                    placeholder="e.g. recruiter@company.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject:</label>
              <div className="win95-inset bg-white p-1">
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs outline-none bg-transparent"
                  placeholder="Software Developer Opportunity / Campus Project / Inquiry"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Message Details:</label>
              <div className="win95-inset bg-white p-1">
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs outline-none bg-transparent resize-none"
                  placeholder="Write your message here..."
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              <div className="flex gap-2">
                <a
                  href="https://github.com/JF-C0des"
                  target="_blank"
                  rel="noreferrer"
                  className="win95-outset bg-[#c0c0c0] p-1.5 hover:bg-gray-200 text-black flex items-center gap-1.5 text-xs font-bold"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub Profile
                </a>
                <a
                  href="https://linkedin.com/in/jedidiah-faith-1828b8306"
                  target="_blank"
                  rel="noreferrer"
                  className="win95-outset bg-[#c0c0c0] p-1.5 hover:bg-gray-200 text-black flex items-center gap-1.5 text-xs font-bold"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-800" /> LinkedIn
                </a>
              </div>

              <button
                type="submit"
                onClick={playClick}
                className="win95-outset bg-[#c0c0c0] hover:bg-gray-200 px-6 py-2 font-bold text-xs flex items-center gap-2 text-black border border-gray-600 shadow"
              >
                <Send className="w-4 h-4 text-blue-900" /> Send Message
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="win95-outset bg-[#c0c0c0] px-2 py-0.5 text-xs flex justify-between text-gray-700 font-mono">
        <span>jdf1258@gmail.com</span>
        <span>github.com/JF-C0des</span>
      </div>
    </div>
  );
}
