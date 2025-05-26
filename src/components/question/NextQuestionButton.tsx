
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { translations } from '@/utils/translations';

interface NextQuestionButtonProps {
  questionNumber: number;
  totalQuestions: number;
  language: 'en' | 'fr';
  onNextQuestion: () => void;
}

export const NextQuestionButton: React.FC<NextQuestionButtonProps> = ({
  questionNumber,
  totalQuestions,
  language,
  onNextQuestion
}) => {
  const t = translations[language];

  return (
    <div className="text-center">
      <Button
        onClick={onNextQuestion}
        size="lg"
        className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300"
      >
        {questionNumber === totalQuestions ? t.common.finishQuiz : t.common.nextQuestion}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
