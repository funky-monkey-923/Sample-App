import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ProfileTool() {
  const [xp] = useLocalStorage('cozy-xp', 0);
  const [level] = useLocalStorage('cozy-level', 1);
  const [unlockedRewards, setUnlockedRewards] = useLocalStorage('cozy-rewards', []);
  const [totalFocusTime] = useLocalStorage('cozy-focus-time', 0);

  const REWARDS_DATABASE = [
    { level: 2, id: 'tea_cup', name: 'Cozy Tea Cup', emoji: '🍵', desc: 'You unlocked a warm drink for your journey!' },
    { level: 3, id: 'small_plant', name: 'Sproutling', emoji: '🌱', desc: 'Your productivity is starting to grow!' },
    { level: 5, id: 'golden_star', name: 'Golden Star', emoji: '⭐', desc: 'You are becoming a master of focus!' },
    { level: 10, id: 'cloud_castle', name: 'Cloud Castle', emoji: '🏰', desc: 'The ultimate sanctuary of productivity!' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white">
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-cozy-amber rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner border-4 border-white mb-4 transition-transform hover:scale-110 cursor-pointer">
          👤
        </div>
        <h2 className="text-3xl font-bold text-cozy-deep">Cozy Adventurer</h2>
        <p className="text-cozy-sage font-medium">Level {level} Productivity Master</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="p-4 bg-cozy-cream/50 rounded-2xl border border-cozy-sage/30 text-center">
          <p className="text-[10px] font-bold text-cozy-sage uppercase mb-1">Total XP</p>
          <p className="text-2xl font-black text-cozy-deep">{xp}</p>
        </div>
        <div className="p-4 bg-cozy-cream/50 rounded-2xl border border-cozy-sage/30 text-center">
          <p className="text-[10px] font-bold text-cozy-sage uppercase mb-1">Focus Time</p>
          <p className="text-2xl font-black text-cozy-deep">
            {Math.floor(totalFocusTime / 3600)}h {Math.floor((totalFocusTime % 3600) / 60)}m
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-bold text-cozy-sage uppercase mb-4 tracking-widest text-center">Trophy Room</p>
        <div className="grid grid-cols-4 gap-4">
          {REWARDS_DATABASE.map(reward => (
            <div key={reward.id} className="flex flex-col items-center gap-2">
              <div 
                title={unlockedRewards.includes(reward.id) ? reward.desc : `Unlock at Level ${reward.level}`}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 border-2 ${
                  unlockedRewards.includes(reward.id) 
                    ? 'bg-white border-cozy-amber shadow-sm' 
                    : 'bg-gray-100 border-gray-200 grayscale opacity-30'
                }`}
              >
                {reward.emoji}
              </div>
              <span className={`text-[10px] font-medium text-center ${unlockedRewards.includes(reward.id) ? 'text-cozy-deep' : 'text-gray-400'}`}>
                {reward.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
