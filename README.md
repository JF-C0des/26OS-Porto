# 💻 26OS Portfolio — Retro Windows OS Interactive Web Simulator

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> An interactive retro operating system desktop environment web portfolio designed to simulate a classic Windows (95/98) workstation. Built with **React 19**, **Vite**, **Tailwind CSS**, and **`react-rnd`**, featuring authentic BIOS boot sequences, multi-window management, an MS-DOS prompt simulator, and Web Audio API PC speaker sound synthesis.

---

## 🌟 Features

### 🖥️ 1. Boot Screen & Audio Synthesizer
* **Retro BIOS Initialization (`BootScreen.jsx`)**: Simulates memory checks, IDE hard drive detection, resource loading streams, and user initialization prompts.
* **OS Splash Screen (`SplashScreen.jsx`)**: Classic 90s startup screen with a segmented progress bar and synthesized startup chord.
* **Web Audio API Sound Engine (`SoundContext.jsx`)**: Native browser PC speaker audio synthesizer providing retro clicks, error chimes, and startup chords without relying on external media files.

### 🪟 2. Window Management & Desktop System
* **Desktop Workspace (`Desktop.jsx`)**: Interactive desktop icons with single-click highlight and double-click app launching.
* **Window System (`Window.jsx` & `WindowContext.jsx`)**: Powered by `react-rnd`.
  * **Title Bar Drag Constraint**: Dragging is restricted exclusively to the title bar (`.drag-handle`), keeping window content readable and selectable.
  * **Dynamic Z-Index Depth**: Clicking or dragging any window automatically brings it to the top active layer.
  * **Controls**: Minimize (`_`), Maximize (`□`), Restore (`❐`), and Close (`X`) controls with event stop propagation.
  * **Bounds Checking**: Enforces parent boundaries so windows cannot be dragged off-screen or underneath the bottom taskbar.
* **Taskbar & Start Menu (`Taskbar.jsx`)**: Classic Start button, multi-tiered retro Start Menu, task buttons with active/minimized toggles, system tray audio mute button, and live digital clock.

### 📦 3. Built-in Applications

#### 👤 `AboutApp` — User Profile & Story
* **Retro Paper Document Design**: Vintage parchment paper styling with serif headers and purple underlined hyperlinks.
* **Welcome Story**: Personal journey in software development, computers, photography, and engine tuning.
* **Career & Education**: Details S1 Teknik Informatika coursework at **Universitas Esa Unggul** (GPA 3.2), RPL background at **SMK Bina Informatika**, and work experience (Clems Grafter Creative, Talent-Tech, Dama Integra Solusindo, GBI Jakarta).
* **Resume Download**: Quick action button for CV access.

#### 🚀 `ProjectsApp` — Coding & Campus Projects Showcase
* **Filtered Portfolio**: Browse by *All Projects*, *Coding Projects*, or *Campus Projects*.
* **Status Badges**: Project lifecycle indicators (`PRODUCTION`, `STABLE`, `CAMPUS_PROJECT`, `LIVE`, `PLANNED`).
* **Specification Dialog**: Popup modal detailing key architectural highlights, tech stacks, and direct GitHub repository links.

#### 📊 `SkillsApp` — Technical Tools & Skills Matrix
* Categorized breakdown across *Programming Languages*, *IT & Hardware Electronics*, *Developer Tools & IDEs*, and *Professional Capabilities*.
* Visual retro segmented progress bars with percentage indicators.

#### 💻 `TerminalApp` — Interactive MS-DOS Prompt CLI
* Functional CLI shell supporting commands: `help`, `whoami`, `skills`, `projects`, `contact`, `cat cv.txt`, `matrix` (digital rain animation), `date`, `sudo`, and `clear`.
* Command history navigation using Up/Down arrow keys.

#### ✉️ `ContactApp` — Outlook Mailer
* Retro mail composer with sender form validation and direct contact channels (Email, Phone, Location, GitHub, LinkedIn).

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Frontend component hierarchy & UI render engine |
| **[Vite](https://vitejs.dev/)** | High-performance build tool & development server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling & retro Win95 custom bevel classes |
| **[react-rnd](https://github.com/bokuweb/react-rnd)** | Draggable and resizable window modal engine |
| **[Lucide React](https://lucide.dev/)** | Retro-styled iconography |
| **Web Audio API** | Browser-native PC speaker audio synthesizer |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### Installation & Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JF-C0des/26OS-Porto.git
   cd 26OS-Porto
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   The compiled static bundle will be generated in the `dist/` directory.

---

## 📁 Project Structure

```
26OS-Porto/
├── index.html                           # SEO metadata & document root
├── vite.config.js                       # Vite configuration & process polyfill
├── package.json                         # Dependencies & npm scripts
├── src/
│   ├── main.jsx                         # App entry point with window.process polyfill
│   ├── App.jsx                          # Root shell orchestrating Boot -> Splash -> Desktop states
│   ├── index.css                        # Tailwind imports & custom Win95 outset/inset borders
│   ├── context/
│   │   ├── SoundContext.jsx             # Web Audio API sound synthesizer
│   │   └── WindowContext.jsx            # Window manager state (zIndex, position, size, focus)
│   ├── components/
│   │   ├── BootScreen.jsx               # BIOS terminal initialization screen
│   │   ├── SplashScreen.jsx             # Windows startup splash loading bar
│   │   ├── Desktop.jsx                  # Main desktop canvas & icon grid
│   │   ├── Taskbar.jsx                  # Start menu, window tabs, system tray, & clock
│   │   └── Window.jsx                   # Draggable & resizable window wrapper (react-rnd)
│   └── components/apps/
│       ├── AboutApp.jsx                 # User profile & story page
│       ├── ProjectsApp.jsx              # Coding & Campus projects catalog
│       ├── SkillsApp.jsx                # Technical skills matrix
│       ├── TerminalApp.jsx              # Interactive MS-DOS prompt CLI
│       └── ContactApp.jsx               # Outlook Express style mail composer
```

---

## 👤 Author & Contact Info

**Jedidiah Faith Gracio (Jed)**  
*Informatics Engineering Student & Software Engineer*

* 📧 **Email:** [jdf1258@gmail.com](mailto:jdf1258@gmail.com)
* 🐙 **GitHub:** [@JF-C0des](https://github.com/JF-C0des)
* 💼 **LinkedIn:** [jedidiah-faith-1828b8306](https://linkedin.com/in/jedidiah-faith-1828b8306)
* 📍 **Location:** Tangerang Selatan, Indonesia

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and customize it for your own portfolio workspace!
