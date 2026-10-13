import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function JournalTool() {
  const today = new Date().toISOString().split('T')[0];
  const storageKey = `cozy-journal-${today}`;
  
  const [entry, setEntry] = useLocalStorage(storageKey, '');
  const [mood, setMood] = useLocalStorage(`cozy-mood-${today}`, 'neutral');

  const moods = [
    { emoji: '☁️', label: 'Calm', value: 'calm' },
    { emoji: '☀️', label: 'Happy', value: 'happy' },
    { emoji: '🌙', label: 'Tired', value: 'tired' },
    { emoji: '🌧️', label: 'Gloomy', value: 'gloomy' },
    { emoji: '🍵', label: 'Cozy', value: 'cozy' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cozy-deep flex items-center justify-center gap-3">
          <span className="text-3xl">📖</span> Cozy Journal
        </h2>
        <p className="text-cozy-sage italic mt-2">Unwind and let your thoughts flow.</p>
      </div>

      {/* Mood Tracker */}
      <div className="mb-8">
        <p className="text-xs font-bold text-cozy-sage uppercase tracking-widest text-center mb-4">How was your day?</p>
        <div className="flex justify-center gap-4">
          {moods.map(m => (
            <button 
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                mood === m.value 
                  ? 'bg-white shadow-sm scale-110 border-2 border-cozy-amber' 
                  : 'bg-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-[10px] font-medium text-cozy-deep">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Writing Area */}
      <div className="relative">
        <textarea 
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Dear diary, today was..."
          className="w-full h-64 p-6 rounded-3xl border-2 border-cozy-sky/30 focus:outline-none focus:border-cozy-terracotta transition-all bg-white/90 text-cozy-deep placeholder-cozy-sage leading-relaxed resize-none shadow-inner"
        />
        <div className="absolute bottom-4 right-6 text-[10px] text-cozy-sage italic">
          Auto-saving to your cozy cloud...
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-cozy-sage italic">
          "Writing is the painting of the heart."
        </p>
      </div>
    </div>
  );
}
