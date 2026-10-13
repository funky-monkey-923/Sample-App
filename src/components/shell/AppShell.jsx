import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TOOL_CONFIG } from '../../config/toolConfig';
import WelcomeModal from './WelcomeModal';

export default function AppShell() {
  const [activeTool, setActiveTool] = useState('todos');
  const [theme, setTheme] = useLocalStorage('cozy-theme', 'cream');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage('cozy-has-seen-welcome', false);
  const [userName, setUserName] = useLocalStorage('cozy-username', 'Adventurer');
  const [level, setLevel] = useLocalStorage('cozy-level', 1);

  const themeClasses = {
    cream: 'bg-cozy-cream',
    sky: 'bg-cozy-sky',
    sage: 'bg-cozy-sage',
    amber: 'bg-cozy-amber',
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", emoji: "☀️" };
    if (hour < 18) return { text: "Good afternoon", emoji: "☁️" };
    return { text: "Good evening", emoji: "🌙" };
  };

  const greeting = getGreeting();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-cream', 'theme-sky', 'theme-sage', 'theme-amber');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const ActiveToolComponent = TOOL_CONFIG.find(tool => tool.id === activeTool)?.component;

  return (
    <div className={`min-h-screen text-cozy-deep p-4 sm:p-6 md:p-8 font-sans transition-colors duration-500 ${themeClasses[theme] || 'bg-cozy-cream'}`}>
      {!hasSeenWelcome && (
        <WelcomeModal onComplete={() => setHasSeenWelcome(true)} />
      )}
      
      <header className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center mb-8 md:mb-12 gap-6">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="text-2xl">{greeting.emoji}</span>
            <p className="text-cozy-sage font-bold tracking-wide uppercase text-xs">
              {greeting.text}, {userName}!
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-cozy-deep tracking-tight flex items-center justify-center lg:justify-start gap-3">
            <span className="text-3xl md:text-4xl">☁️</span>
            Cozy <span className="text-cozy-terracotta">Toolbox</span>
          </h1>
          <p className="text-cozy-sage font-medium mt-2 italic text-base md:text-lg">
            "One small step at a time, with a cup of tea."
          </p>
        </div>
        
        <div className="flex flex-col items-center lg:items-end gap-4">
          {/* Quick Stat Badge */}
          <div className="flex items-center gap-2 bg-white/80 px-4 py-1 rounded-full shadow-sm border border-white/50 animate-bounce-slow">
            <span className="text-sm">⭐ Level {level}</span>
          </div>
          
          <nav className="flex gap-2 sm:gap-3 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-cozy border border-white/50 overflow-x-auto max-w-full no-scrollbar">
            {TOOL_CONFIG.map(tool => (
              <button 
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`px-5 py-2 md:px-8 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTool === tool.id 
                    ? `${tool.color} text-white shadow-glow scale-105` 
                    : 'text-cozy-deep hover:bg-cozy-sky/40'
                }`}
              >
                {tool.icon} {tool.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="hidden sm:block absolute -top-10 -left-10 w-32 h-32 bg-cozy-sky/30 rounded-full blur-3xl -z-10"></div>
          <div className="hidden sm:block absolute -bottom-10 -right-10 w-32 h-32 bg-cozy-amber/30 rounded-full blur-3xl -z-10"></div>
          
          {/* Smooth Transition Wrapper */}
          <div key={activeTool} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {ActiveToolComponent ? (
              <ActiveToolComponent />
            ) : (
              <div className="text-center py-20 text-cozy-sage italic">
                Tool not found... please return to the hub.
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-12 md:mt-20 text-center text-cozy-sage font-semibold text-xs md:text-sm">
        <div className="inline-block px-4 py-1 rounded-full bg-white/60 border border-white/80">
          Built with cozy vibes & Circuit AI ☁️
        </div>
      </footer>
    </div>
  );
}
