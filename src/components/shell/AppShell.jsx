import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import TodoTool from '../tools/TodoTool';
import PomodoroTool from '../tools/PomodoroTool';
import ProfileTool from '../tools/ProfileTool';
import SettingsTool from '../tools/SettingsTool';

export default function AppShell() {
  const [activeTool, setActiveTool] = useState('todos');
  const [theme, setTheme] = useLocalStorage('cozy-theme', 'cream');

  // Mapping for Tailwind to ensure classes are picked up by the compiler
  const themeClasses = {
    cream: 'bg-cozy-cream',
    sky: 'bg-cozy-sky',
    sage: 'bg-cozy-sage',
    amber: 'bg-cozy-amber',
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-cream', 'theme-sky', 'theme-sage', 'theme-amber');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className={`min-h-screen text-cozy-deep p-4 sm:p-6 md:p-8 font-sans transition-colors duration-500 ${themeClasses[theme] || 'bg-cozy-cream'}`}>
      <header className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center mb-8 md:mb-12 gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-cozy-deep tracking-tight flex items-center justify-center lg:justify-start gap-3">
            <span className="text-3xl md:text-4xl">☁️</span>
            Cozy <span className="text-cozy-terracotta">Toolbox</span>
          </h1>
          <p className="text-cozy-sage font-medium mt-2 italic text-base md:text-lg">
            "One small step at a time, with a cup of tea."
          </p>
        </div>
        
        <nav className="flex gap-2 sm:gap-3 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-cozy border border-white overflow-x-auto max-w-full no-scrollbar">
          <button 
            onClick={() => setActiveTool('todos')}
            className={`px-5 py-2 md:px-8 rounded-full transition-all duration-300 whitespace-nowrap ${
              activeTool === 'todos' 
                ? 'bg-cozy-terracotta text-white shadow-glow scale-105' 
                : 'text-cozy-deep hover:bg-cozy-sky/40'
            }`}
          >
            📝 Tasks
          </button>
          <button 
            onClick={() => setActiveTool('pomodoro')}
            className={`px-5 py-2 md:px-8 rounded-full transition-all duration-300 whitespace-nowrap ${
              activeTool === 'pomodoro' 
                ? 'bg-cozy-sage text-white shadow-glow scale-105' 
                : 'text-cozy-deep hover:bg-cozy-sky/40'
            }`}
          >
            ⏳ Focus
          </button>
          <button 
            onClick={() => setActiveTool('profile')}
            className={`px-5 py-2 md:px-8 rounded-full transition-all duration-300 whitespace-nowrap ${
              activeTool === 'profile' 
                ? 'bg-cozy-amber text-white shadow-glow scale-105' 
                : 'text-cozy-deep hover:bg-cozy-sky/40'
            }`}
          >
            👤 Profile
          </button>
          <button 
            onClick={() => setActiveTool('settings')}
            className={`px-5 py-2 md:px-8 rounded-full transition-all duration-300 whitespace-nowrap ${
              activeTool === 'settings' 
                ? 'bg-cozy-deep text-white shadow-glow scale-105' 
                : 'text-cozy-deep hover:bg-cozy-sky/40'
            }`}
          >
            ⚙️ Settings
          </button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative">
          <div className="hidden sm:block absolute -top-10 -left-10 w-32 h-32 bg-cozy-sky/30 rounded-full blur-3xl -z-10"></div>
          <div className="hidden sm:block absolute -bottom-10 -right-10 w-32 h-32 bg-cozy-amber/30 rounded-full blur-3xl -z-10"></div>
          {activeTool === 'todos' && <TodoTool />}
          {activeTool === 'pomodoro' && <PomodoroTool />}
          {activeTool === 'profile' && <ProfileTool />}
          {activeTool === 'settings' && <SettingsTool />}
        </div>
      </main>
      
      <footer className="mt-12 md:mt-20 text-center text-cozy-sage text-xs md:text-sm font-medium">
        <div className="inline-block px-4 py-1 rounded-full bg-white/40 border border-white/60">
          Built with cozy vibes & Circuit AI ☁️
        </div>
      </footer>
    </div>
  );
}
