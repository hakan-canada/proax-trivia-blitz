
import { useEffect, useRef } from 'react';

export const useBackgroundMusic = (shouldPlay: boolean, volume: number = 0.3) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/quiz-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;

    if (shouldPlay) {
      // Try to play the audio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio autoplay prevented:', error);
        });
      }
    } else {
      audio.pause();
    }

    // Cleanup function
    return () => {
      if (audio && !audio.paused) {
        audio.pause();
      }
    };
  }, [shouldPlay, volume]);

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { stopMusic };
};
