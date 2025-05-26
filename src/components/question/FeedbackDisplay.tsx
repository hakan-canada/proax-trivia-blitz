
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { translations } from '@/utils/translations';

interface FeedbackDisplayProps {
  isCorrect: boolean;
  timeLeft: number;
  points: number;
  correctAnswer: string;
  language: 'en' | 'fr';
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  isCorrect,
  timeLeft,
  points,
  correctAnswer,
  language
}) => {
  const t = translations[language];

  return (
    <div className="text-center mb-8 animate-bounce-in">
      {isCorrect ? (
        <div className="flex items-center justify-center text-green-600 mb-4">
          <CheckCircle className="mr-3 h-12 w-12" />
          <div>
            <h3 className="text-2xl font-bold">{t.common.correct}</h3>
            <p className="text-lg">+{points} {t.common.points}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-red-600 mb-4">
          <XCircle className="mr-3 h-12 w-12" />
          <div>
            <h3 className="text-2xl font-bold">
              {timeLeft === 0 ? t.common.timeUp : t.common.incorrect}
            </h3>
            <p className="text-lg break-words">{t.common.correctAnswerWas} {correctAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
