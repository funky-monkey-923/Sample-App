import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function SettingsTool() {
  const [userName, setUserName] = useLocalStorage('cozy-username', 'Adventurer');
  const [themeColor, setThemeColor] = useLocalStorage('cozy-theme', 'cream');
  const [notifications, setNotifications] = useLocalStorage('cozy-notifications', true);

  const saveSettings = () => {
    alert("Settings saved! Your cozy space is updated. ✨");
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-cozy shadow-cozy border-4 border-white">
      <h2 className="text-3xl font-bold text-cozy-deep mb-8 flex items-center justify-center gap-3">
        <span className="text-3xl">⚙️</span> Settings
      </h2>

      <div className="space-y-6">
        {/* User Profile Section */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-cozy-sage uppercase tracking-widest">Profile</label>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border-2 border-cozy-sky/30 focus:outline-none focus:border-cozy-terracotta bg-white/90 text-cozy-deep"
              placeholder="Your name..."
            />
          </div>
        </div>

        {/* Appearance Section */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-cozy-sage uppercase tracking-widest">Appearance</label>
          <div className="flex gap-4 justify-center">
            {[
              { id: 'cream', color: '#FDFCF0' },
              { id: 'sky', color: '#B9D9EB' },
              { id: 'sage', color: '#B2C9AB' },
              { id: 'amber', color: '#FFBF00' },
            ].map(option => (
              <button 
                key={option.id}
                onClick={() => setThemeColor(option.id)}
                className={`w-10 h-10 rounded-full border-4 transition-all ${themeColor === option.id ? 'border-cozy-deep scale-125 shadow-md' : 'border-white shadow-sm'}`}
                style={{ backgroundColor: option.color }}
                title={option.id}
              ></button>
            ))}
          </div>
        </div>

        {/* System Section */}
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-cozy-sage/30">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔔</span>
            <span className="text-sm font-medium text-cozy-deep">Notifications</span>
          </div>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-cozy-terracotta' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>

        <button 
          onClick={saveSettings}
          className="w-full py-4 bg-cozy-deep text-white rounded-full font-bold hover:bg-cozy-deep/90 transition-all active:scale-95 shadow-md mt-4"
        >
          Save Changes ✨
        </button>
      </div>
    </div>
  );
}
