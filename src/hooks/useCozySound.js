import { useEffect } from 'react';

export const useCozySound = () => {
  const playSound = (soundFile) => {
    const audio = new Audio(`/assets/audio/${soundFile}`);
    audio.volume = 0.4; // Keep it soft and cozy
    audio.play().catch(e => console.log("Audio play blocked by browser until user interaction."));
  };

  return { playSound };
};
