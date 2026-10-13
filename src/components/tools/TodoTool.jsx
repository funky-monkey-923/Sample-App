import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function TodoTool() {
  const [todos, setTodos] = useLocalStorage('cozy-todos', []);
  const [inputValue, setInputValue] = useState('');
  
  const [xp, setXp] = useLocalStorage('cozy-xp', 0);
  const [level, setLevel] = useLocalStorage('cozy-level', 1);
  const [unlockedRewards, setUnlockedRewards] = useLocalStorage('cozy-rewards', []);

  const REWARDS_DATABASE = [
    { level: 2, id: 'tea_cup', name: 'Cozy Tea Cup', emoji: '🍵', desc: 'You unlocked a warm drink for your journey!' },
    { level: 3, id: 'small_plant', name: 'Sproutling', emoji: '🌱', desc: 'Your productivity is starting to grow!' },
    { level: 5, id: 'golden_star', name: 'Golden Star', emoji: '⭐', desc: 'You are becoming a master of focus!' },
    { level: 10, id: 'cloud_castle', name: 'Cloud Castle', emoji: '🏰', desc: 'The ultimate sanctuary of productivity!' },
  ];

  useEffect(() => {
    const nextLevelThreshold = level * 100;
    if (xp >= nextLevelThreshold) {
      setLevel(prev => prev + 1);
    }
  }, [xp, level]);

  useEffect(() => {
    const newUnlocks = REWARDS_DATABASE.filter(r => r.level <= level && !unlockedRewards.includes(r.id));
    if (newUnlocks.length > 0) {
      setUnlockedRewards(prev => [...prev, ...newUnlocks.map(r => r.id)]);
    }
  }, [level, unlockedRewards]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), text: inputValue, completed: false, createdAt: new Date().toISOString() };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const isCompleting = !todo.completed;
        if (isCompleting) setXp(prev => prev + 20);
        else setXp(prev => Math.max(0, prev - 10));
        return { ...todo, completed: isCompleting };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const xpProgress = ((xp % 100) / 100) * 100;

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white">
      {/* Game Stats Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-cozy-cream/50 p-4 rounded-2xl border border-cozy-sage/30">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cozy-amber rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-inner border-2 border-white">
            🌟
          </div>
          <div className="flex-1 sm:flex-none">
            <p className="text-[10px] sm:text-xs font-bold text-cozy-sage uppercase tracking-tighter">Level {level} Adventurer</p>
            <div className="w-full sm:w-32 h-2 sm:h-3 bg-cozy-sage/20 rounded-full mt-1 overflow-hidden border border-cozy-sage/30">
              <div className="h-full bg-cozy-terracotta transition-all duration-500 ease-out" style={{ width: `${xpProgress}%` }}></div>
            </div>
          </div>
        </div>
        <div className="text-center sm:text-right w-full sm:w-auto">
          <p className="text-[10px] sm:text-xs font-bold text-cozy-sage uppercase">Current XP</p>
          <p className="text-lg sm:text-xl font-black text-cozy-deep">{xp} <span className="text-xs font-normal text-cozy-sage">/ {level * 100}</span></p>
        </div>
      </div>

      {/* Rewards Gallery */}
      <div className="mb-8">
        <p className="text-[10px] sm:text-xs font-bold text-cozy-sage uppercase mb-3 tracking-widest text-center">Trophy Room</p>
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {REWARDS_DATABASE.map(reward => (
            <div 
              key={reward.id}
              title={unlockedRewards.includes(reward.id) ? reward.desc : `Unlock at Level ${reward.level}`}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-500 border-2 ${
                unlockedRewards.includes(reward.id)
                  ? 'bg-white border-cozy-amber shadow-sm scale-110'
                  : 'bg-gray-100 border-gray-200 grayscale opacity-40'
              }`}
            >
              {reward.emoji}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-cozy-deep flex items-center gap-3">
          <span className="text-2xl sm:text-3xl">🌿</span> Quest Log
        </h2>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cozy-sage bg-cozy-sage/20 px-3 py-1 rounded-full">
          {todos.filter(t => !t.completed).length} Left
        </span>
      </div>
      
      <form onSubmit={addTodo} className="flex gap-2 sm:gap-3 mb-10">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new little quest..."
          className="flex-1 px-4 sm:px-6 py-3 rounded-full border-2 border-cozy-sky/30 focus:outline-none focus:border-cozy-terracotta transition-all bg-white/90 placeholder-cozy-sage text-cozy-deep text-sm sm:text-base"
        />
        <button type="submit" className="bg-cozy-terracotta hover:bg-cozy-terracotta/80 text-white px-4 sm:px-6 py-3 rounded-full transition-all active:scale-95 shadow-md font-bold text-sm sm:text-base">
          Add
        </button>
      </form>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🍵</div>
            <p className="text-cozy-sage italic text-base sm:text-lg">Your quest log is empty.<br/>Time for a tea break!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="flex items-center justify-between p-3 sm:p-4 bg-white/80 rounded-2xl border-2 border-transparent hover:border-cozy-sky/50 transition-all shadow-sm group">
              <div className="flex items-center gap-3 sm:gap-4">
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.completed ? 'bg-cozy-sage border-cozy-sage text-white' : 'border-cozy-sky/40 hover:border-cozy-terracotta'
                  }`}
                >
                  {todo.completed && '✓'}
                </button>
                <span className={`${todo.completed ? 'line-through text-cozy-sage' : 'text-cozy-deep'} font-medium transition-all text-sm sm:text-base`}>
                  {todo.text}
                </span>
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="text-cozy-sage hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1">
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

