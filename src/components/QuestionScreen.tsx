
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Question } from '@/types/trivia';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timeout when component unmounts or question changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [question.id]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [question.id]);

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Auto-advance after 2 seconds
    timeoutRef.current = setTimeout(() => {
      onAnswer(answer, correct);
    }, 2000);
  };

  const getAnswerOptions = () => {
    if (question.questionType === 'yesno') {
      return ['Yes', 'No'];
    }
    return question.options || [];
  };

  const getButtonStyle = (option: string) => {
    if (!showFeedback) {
      return "bg-white hover:bg-proax-bg border-2 border-proax-primary text-proax-primary hover:text-proax-blue transition-all duration-200 transform hover:scale-105";
    }
    
    if (option === question.correctAnswer) {
      return "bg-green-500 text-white border-green-500";
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return "bg-red-500 text-white border-red-500";
    }
    
    return "bg-gray-200 text-gray-500 border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 md:p-8 shadow-2xl animate-fade-in">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-proax-primary">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {question.points} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-proax-primary to-proax-blue h-3 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-proax-navy mb-4">
            {question.questionText}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {getAnswerOptions().map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showFeedback}
              className={`h-16 md:h-20 text-lg md:text-xl font-semibold ${getButtonStyle(option)}`}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="text-center animate-bounce-in">
            {isCorrect ? (
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="mr-3 h-12 w-12" />
                <div>
                  <h3 className="text-2xl font-bold">Correct!</h3>
                  <p className="text-lg">+{question.points} points</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-red-600">
                <XCircle className="mr-3 h-12 w-12" />
                <div>
                  <h3 className="text-2xl font-bold">Not quite!</h3>
                  <p className="text-lg">The correct answer was: {question.correctAnswer}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
