import React, { useState, useEffect } from 'react';

export default function WelcomeModal({ onComplete }) {
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsVisible(false);
      onComplete();
    }
  };

  if (!isVisible) return null;

  const steps = [
    {
      title: "Welcome Home ☁️",
      text: "Take a deep breath. You've entered your cozy sanctuary for productivity and peace.",
      emoji: "🍵",
      color: "bg-cozy-amber"
    },
    {
      title: "How it Works ✨",
      text: "Set your daily intentions, track your quests, and flow through your work with the Pomodoro timer.",
      emoji: "🌿",
      color: "bg-cozy-sage"
    },
    {
      title: "Your Journey Begins 🌟",
      text: "Earn XP by completing tasks and unlock cozy rewards as you level up your focus.",
      emoji: "🏰",
      color: "bg-cozy-terracotta"
    }
  ];

  const current = steps[step - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cozy-deep/40 backdrop-blur-sm animate-in fade-in duration-500"></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md p-8 bg-white rounded-cozy shadow-2xl border-4 border-white animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <div className={`w-20 h-20 ${current.color} rounded-full mx-auto flex items-center justify-center text-4xl mb-6 shadow-inner border-4 border-white transition-all duration-500`}>
          {current.emoji}
        </div>
        
        <h2 className="text-3xl font-black text-cozy-deep text-center mb-4">
          {current.title}
        </h2>
        
        <p className="text-cozy-deep/80 text-center text-lg leading-relaxed mb-8 px-4">
          {current.text}
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={nextStep}
            className="w-full py-4 bg-cozy-terracotta text-white rounded-full font-bold hover:bg-cozy-terracotta/90 transition-all active:scale-95 shadow-md"
          >
            {step === 3 ? 'Start My Journey' : 'Continue'}
          </button>
          
          {/* Progress Dots */}
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'bg-cozy-terracotta w-4' : 'bg-cozy-sage/30'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
