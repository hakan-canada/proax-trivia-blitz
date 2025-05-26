
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';
import { translations } from '@/utils/translations';

interface QuestionTimerProps {
  timeLeft: number;
  questionNumber: number;
  totalQuestions: number;
  points: number;
  language: 'en' | 'fr';
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({
  timeLeft,
  questionNumber,
  totalQuestions,
  points,
  language
}) => {
  const t = translations[language];
  const progressPercentage = ((15 - timeLeft) / 15) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-proax-primary">
          {t.common.question} {questionNumber} {t.common.of} {totalQuestions}
        </span>
        <span className="text-sm font-medium text-gray-600 flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          {timeLeft}{t.common.timeLeft} • {points} {t.common.points}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-3" />
    </div>
  );
};
