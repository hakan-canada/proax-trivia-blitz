
import { useState, useRef, useEffect } from 'react';

export const useQuestionTimer = (
  questionNumber: number,
  questionId: string,
  onTimeUp: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(15);
    setIsTimerActive(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [questionNumber, questionId]);

  // Timer countdown effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, timeLeft, onTimeUp]);

  const stopTimer = () => {
    setIsTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return {
    timeLeft,
    isTimerActive,
    stopTimer
  };
};
