
import React from 'react';
import { Button } from '@/components/ui/button';

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: string;
  showFeedback: boolean;
  isTimerActive: boolean;
  correctAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedAnswer,
  showFeedback,
  isTimerActive,
  correctAnswer,
  onAnswerSelect
}) => {
  const getButtonStyle = (option: string) => {
    if (!showFeedback) {
      if (option === selectedAnswer) {
        return "bg-proax-primary text-white border-proax-primary";
      }
      return "bg-white hover:bg-proax-bg border-2 border-proax-primary text-proax-primary hover:text-proax-blue transition-all duration-200 transform hover:scale-105";
    }
    
    if (option === correctAnswer) {
      return "bg-green-500 text-white border-green-500";
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return "bg-red-500 text-white border-red-500";
    }
    
    return "bg-gray-200 text-gray-500 border-gray-300";
  };

  if (options.length === 0) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong>Debug:</strong> No answer options available for this question.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswerSelect(option)}
          disabled={showFeedback || !isTimerActive}
          className={`min-h-16 md:min-h-20 p-4 text-base md:text-lg lg:text-xl font-semibold leading-tight break-words whitespace-normal ${getButtonStyle(option)}`}
          style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
        >
          <span className="text-center w-full">{option}</span>
        </Button>
      ))}
    </div>
  );
};
