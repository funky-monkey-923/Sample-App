import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function PomodoroTool() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  
  const [totalFocusTime, setTotalFocusTime] = useLocalStorage('cozy-focus-time', 0);
  const [xp, setXp] = useLocalStorage('cozy-xp', 0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          handleTimerComplete();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      // Reward the user for finishing a work session
      setXp(prev => prev + 50); 
      setTotalFocusTime(prev => prev + (minutes * 60));
      alert("✨ Quest Complete! You've earned 50 XP. Time for a cozy break! ☕");
      setMode('break');
      setMinutes(5);
      setSeconds(0);
    } else {
      alert("☀️ Break over! Ready to dive back into your quests?");
      setMode('work');
      setMinutes(25);
      setSeconds(0);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setMinutes(newMode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white text-center">
      <h2 className="text-3xl font-bold text-cozy-deep mb-2 flex items-center justify-center gap-3">
        <span className="text-3xl">⏳</span> Focus Flow
      </h2>
      <p className="text-cozy-sage italic mb-8">Find your rhythm, one breath at a time.</p>

      {/* Mode Switcher */}
      <div className="flex justify-center gap-3 mb-8">
        <button 
          onClick={() => switchMode('work')}
          className={`px-6 py-2 rounded-full transition-all ${mode === 'work' ? 'bg-cozy-terracotta text-white shadow-md scale-105' : 'bg-white/50 text-cozy-deep hover:bg-white'}`}
        >
          Focus
        </button>
        <button 
          onClick={() => switchMode('break')}
          className={`px-6 py-2 rounded-full transition-all ${mode === 'break' ? 'bg-cozy-sage text-white shadow-md scale-105' : 'bg-white/50 text-cozy-deep hover:bg-white'}`}
        >
          Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative inline-block mb-10">
        {/* Decorative outer ring */}
        <div className="absolute inset-0 rounded-full border-8 border-cozy-sky/20 animate-pulse"></div>
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white shadow-inner border-4 border-white flex items-center justify-center">
          <span className="text-5xl sm:text-7xl font-black text-cozy-deep tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={toggleTimer}
          className={`px-10 py-4 rounded-full font-bold text-white transition-all active:scale-95 shadow-lg ${isActive ? 'bg-cozy-deep' : 'bg-cozy-terracotta'}`}
        >
          {isActive ? 'Pause' : 'Start Focus'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-6 py-4 rounded-full bg-white border-2 border-cozy-sky/30 text-cozy-sage hover:bg-cozy-sky/10 transition-all active:scale-95"
        >
          Reset
        </button>
      </div>

      {/* Focus Stats */}
      <div className="p-4 bg-cozy-cream/50 rounded-2xl border border-cozy-sage/30 flex justify-around items-center">
        <div className="text-center">
          <p className="text-[10px] font-bold text-cozy-sage uppercase">Total Focus</p>
          <p className="text-lg font-bold text-cozy-deep">
            {Math.floor(totalFocusTime / 3600)}h {Math.floor((totalFocusTime % 3600) / 60)}m
          </p>
        </div>
        <div className="w-px h-8 bg-cozy-sage/30"></div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-cozy-sage uppercase">Status</p>
          <p className="text-lg font-bold text-cozy-deep">
            {isActive ? (mode === 'work' ? 'Working 🌿' : 'Resting 🍵') : 'Ready ✨'}
          </p>
        </div>
      </div>
    </div>
  );
}
