
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/trivia';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { translations } from '@/utils/translations';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  language: 'en' | 'fr';
  onAnswer: (answer: string, isCorrect: boolean) => void;
  onShowConfetti?: () => void;
  onFinishQuiz?: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  language,
  onAnswer,
  onShowConfetti,
  onFinishQuiz
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showEducationalSlide, setShowEducationalSlide] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const t = translations[language];

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setTimeLeft(15);
    setIsTimerActive(true);
    setShowEducationalSlide(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [questionNumber]);

  // Timer countdown effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !showFeedback) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            // Auto-lock when time runs out
            handleTimeUp();
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
  }, [isTimerActive, timeLeft, showFeedback]);

  const handleTimeUp = () => {
    if (!showFeedback) {
      const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;
      const correct = selectedAnswer === correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);
      
      // Show educational slide after feedback is shown and there's an image
      if (question.imageSlideBefore) {
        setTimeout(() => {
          setShowEducationalSlide(true);
        }, 2000);
      }
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback || !isTimerActive) return;
    
    setSelectedAnswer(answer);
    const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setIsTimerActive(false);

    // Trigger confetti immediately for correct answers
    if (correct && onShowConfetti) {
      onShowConfetti();
    }

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Show educational slide after feedback is shown and there's an image
    if (question.imageSlideBefore) {
      setTimeout(() => {
        setShowEducationalSlide(true);
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    // Stop music before finishing quiz
    if (questionNumber === totalQuestions && onFinishQuiz) {
      onFinishQuiz();
    }
    onAnswer(selectedAnswer, isCorrect);
  };

  const getAnswerOptions = () => {
    if (question.questionType === 'yesno') {
      return language === 'fr' ? ['Oui', 'Non'] : ['Yes', 'No'];
    }
    return language === 'fr' && question.optionsFr ? question.optionsFr : (question.options || []);
  };

  const getButtonStyle = (option: string) => {
    if (!showFeedback) {
      if (option === selectedAnswer) {
        return "bg-proax-primary text-white border-proax-primary";
      }
      return "bg-white hover:bg-proax-bg border-2 border-proax-primary text-proax-primary hover:text-proax-blue transition-all duration-200 transform hover:scale-105";
    }
    
    const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;
    if (option === correctAnswer) {
      return "bg-green-500 text-white border-green-500";
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return "bg-red-500 text-white border-red-500";
    }
    
    return "bg-gray-200 text-gray-500 border-gray-300";
  };

  const progressPercentage = ((15 - timeLeft) / 15) * 100;
  const currentQuestionText = language === 'fr' && question.questionTextFr ? question.questionTextFr : question.questionText;
  const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 md:p-8 shadow-2xl animate-fade-in">
        {/* Timer Progress Bar Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-proax-primary">
              {t.common.question} {questionNumber} {t.common.of} {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {timeLeft}{t.common.timeLeft} • {question.points} {t.common.points}
            </span>
          </div>
          {/* Timer Progress Bar */}
          <Progress 
            value={progressPercentage} 
            className="h-3"
          />
        </div>

        {/* Question or Educational Slide */}
        {showEducationalSlide && question.imageSlideBefore ? (
          <div className="text-center mb-8 animate-fade-in">
            <h3 className="text-xl font-bold text-proax-navy mb-4">
              {t.common.learnMore}
            </h3>
            <div className="flex justify-center mb-6">
              <img
                src={question.imageSlideBefore}
                alt="Educational content"
                className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-proax-navy mb-4 leading-tight px-2">
              {currentQuestionText}
            </h2>
          </div>
        )}

        {/* Answer Options - Hidden when educational slide is shown */}
        {!showEducationalSlide && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {getAnswerOptions().map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback || !isTimerActive}
                className={`min-h-16 md:min-h-20 p-4 text-base md:text-lg lg:text-xl font-semibold leading-tight break-words whitespace-normal ${getButtonStyle(option)}`}
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              >
                <span className="text-center w-full">{option}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Feedback */}
        {showFeedback && !showEducationalSlide && (
          <div className="text-center mb-8 animate-bounce-in">
            {isCorrect ? (
              <div className="flex items-center justify-center text-green-600 mb-4">
                <CheckCircle className="mr-3 h-12 w-12" />
                <div>
                  <h3 className="text-2xl font-bold">{t.common.correct}</h3>
                  <p className="text-lg">+{question.points} {t.common.points}</p>
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
        )}

        {/* Next Question Button */}
        {showFeedback && (
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300"
            >
              {questionNumber === totalQuestions ? t.common.finishQuiz : t.common.nextQuestion}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
