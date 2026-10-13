import React, { useState } from 'react';
import TodoTool from '../tools/TodoTool';

export default function AppShell() {
  const [activeTool, setActiveTool] = useState('todos');

  return (
    <div className="min-h-screen bg-cozy-cream text-cozy-deep p-4 md:p-8 font-sans transition-colors duration-500">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black text-cozy-deep tracking-tight flex items-center justify-center md:justify-start gap-3">
            <span className="text-4xl">☁️</span>
            Cozy <span className="text-cozy-terracotta">Toolbox</span>
          </h1>
          <p className="text-cozy-sage font-medium mt-2 italic text-lg">
            "One small step at a time, with a cup of tea."
          </p>
        </div>
        
        <nav className="flex gap-3 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-cozy border border-white">
          <button 
            onClick={() => setActiveTool('todos')}
            className={`px-8 py-2 rounded-full transition-all duration-300 ${
              activeTool === 'todos' 
                ? 'bg-cozy-terracotta text-white shadow-glow scale-105' 
                : 'text-cozy-deep hover:bg-cozy-sky/40'
            }`}
          >
            📝 Tasks
          </button>
          <button 
            disabled
            className="px-8 py-2 rounded-full text-cozy-sage cursor-not-allowed opacity-60"
          >
            ⏳ Coming Soon
          </button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        {activeTool === 'todos' && (
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-cozy-sky/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cozy-amber/30 rounded-full blur-3xl -z-10"></div>
            <TodoTool />
          </div>
        )}
      </main>
      
      <footer className="mt-20 text-center text-cozy-sage text-sm font-medium">
        <div className="inline-block px-4 py-1 rounded-full bg-white/40 border border-white/60">
          Built with cozy vibes & Circuit AI ☁️
        </div>
      </footer>
    </div>
  );
}
