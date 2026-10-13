import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function IntentionsTool() {
  const today = new Date().toISOString().split('T')[0];
  const storageKey = `cozy-intentions-${today}`;
  
  const [intentions, setIntentions] = useLocalStorage(storageKey, [
    { id: 1, text: 'Drink a glass of water', completed: false },
    { id: 2, text: 'Take a 5-minute stretch', completed: false },
    { id: 3, text: 'Write one thing I am grateful for', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addIntention = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (intentions.length >= 3) {
      alert("Keep it simple! Focus on just 3 big intentions for today. ✨");
      return;
    }
    
    const newIntention = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    
    setIntentions([...intentions, newIntention]);
    setInputValue('');
  };

  const toggleIntention = (id) => {
    setIntentions(intentions.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteIntention = (id) => {
    setIntentions(intentions.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cozy-deep flex items-center justify-center gap-3">
          <span className="text-3xl">✨</span> Daily Intentions
        </h2>
        <p className="text-cozy-sage italic mt-2">Three simple things to make today wonderful.</p>
      </div>

      {intentions.length < 3 && (
        <form onSubmit={addIntention} className="flex gap-3 mb-10">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What is your intention?"
            className="flex-1 px-6 py-3 rounded-full border-2 border-cozy-sky/30 focus:outline-none focus:border-cozy-terracotta transition-all bg-white/90 placeholder-cozy-sage text-cozy-deep"
          />
          <button 
            type="submit"
            className="bg-cozy-terracotta hover:bg-cozy-terracotta/80 text-white px-6 py-3 rounded-full transition-all active:scale-95 shadow-md font-bold"
          >
            Add
          </button>
        </form>
      )}

      <div className="space-y-6">
        {intentions.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-6 bg-white/80 rounded-3xl border-2 border-transparent hover:border-cozy-amber/50 transition-all shadow-sm group relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <span className="text-cozy-sage font-black text-xl opacity-30">0{index + 1}</span>
              <button 
                onClick={() => toggleIntention(item.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  item.completed ? 'bg-cozy-sage border-cozy-sage text-white' : 'border-cozy-sky/40 hover:border-cozy-terracotta'
                }`}
              >
                {item.completed && '✓'}
              </button>
              <span className={`text-lg ${item.completed ? 'line-through text-cozy-sage' : 'text-cozy-deep'} transition-all`}>
                {item.text}
              </span>
            </div>
            <button 
              onClick={() => deleteIntention(item.id)}
              className="text-cozy-sage hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
            >
              ✕
            </button>
            {item.completed && (
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-cozy-sage"></div>
            )}
          </div>
        ))}
        
        {intentions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">☁️</div>
            <p className="text-cozy-sage italic">Your day is a blank canvas.<br/>What do you intend to create?</p>
          </div>
        )}
      </div>

      {intentions.length === 3 && intentions.every(i => i.completed) && (
        <div className="mt-10 p-6 bg-cozy-amber/20 rounded-3xl border-2 border-dashed border-cozy-amber text-center animate-bounce">
          <p className="text-cozy-deep font-bold">✨ All intentions fulfilled! You've had a beautiful day. ✨</p>
        </div>
      )}
    </div>
  );
}
