import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Question } from '@/types/trivia';
import { translations } from '@/utils/translations';
import { QuestionTimer } from './question/QuestionTimer';
import { EducationalSlide } from './question/EducationalSlide';
import { QuestionText } from './question/QuestionText';
import { AnswerOptions } from './question/AnswerOptions';
import { FeedbackDisplay } from './question/FeedbackDisplay';
import { NextQuestionButton } from './question/NextQuestionButton';
import { useQuestionTimer } from './question/useQuestionTimer';

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
  const [showEducationalSlide, setShowEducationalSlide] = useState(false);

  const t = translations[language];

  const handleTimeUp = () => {
    if (!showFeedback) {
      const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;
      const correct = selectedAnswer === correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);
    }
  };

  const { timeLeft, isTimerActive, stopTimer } = useQuestionTimer(
    questionNumber,
    question.id,
    handleTimeUp
  );

  // Reset state when question changes
  useEffect(() => {
    console.log('QuestionScreen: New question loaded', {
      questionNumber,
      questionId: question.id,
      questionType: question.questionType,
      hasOptions: !!question.options,
      optionsLength: question.options?.length,
      hasOptionsFr: !!question.optionsFr,
      optionsFrLength: question.optionsFr?.length,
      language
    });
    
    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setShowEducationalSlide(false);
  }, [questionNumber, question.id]);

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback || !isTimerActive) return;
    
    console.log('Answer selected:', answer);
    
    setSelectedAnswer(answer);
    const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    stopTimer();

    if (correct && onShowConfetti) {
      onShowConfetti();
    }
  };

  const handleNextQuestion = () => {
    // If this question has an educational slide and we haven't shown it yet
    if (question.imageSlideBefore && !showEducationalSlide) {
      setShowEducationalSlide(true);
      return;
    }

    // Otherwise proceed to next question or finish quiz
    if (questionNumber === totalQuestions && onFinishQuiz) {
      onFinishQuiz();
    }
    onAnswer(selectedAnswer, isCorrect);
  };

  const getAnswerOptions = () => {
    if (question.questionType === 'yesno') {
      const yesNoOptions = language === 'fr' ? ['Oui', 'Non'] : ['Yes', 'No'];
      console.log('YesNo options:', yesNoOptions);
      return yesNoOptions;
    }
    
    const options = language === 'fr' && question.optionsFr ? question.optionsFr : (question.options || []);
    console.log('Multiple choice options:', {
      language,
      hasOptionsFr: !!question.optionsFr,
      hasOptions: !!question.options,
      finalOptions: options
    });
    return options;
  };

  const currentQuestionText = language === 'fr' && question.questionTextFr ? question.questionTextFr : question.questionText;
  const correctAnswer = language === 'fr' && question.correctAnswerFr ? question.correctAnswerFr : question.correctAnswer;
  const answerOptions = getAnswerOptions();

  console.log('QuestionScreen render state:', {
    showEducationalSlide,
    showFeedback,
    answerOptionsLength: answerOptions.length,
    questionNumber
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 md:p-8 shadow-2xl animate-fade-in">
        <QuestionTimer
          timeLeft={timeLeft}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          points={question.points}
          language={language}
        />

        {/* Educational Slide - Show only when user clicked next and there's an educational slide */}
        {showEducationalSlide && question.imageSlideBefore && (
          <EducationalSlide
            imageUrl={question.imageSlideBefore}
            language={language}
          />
        )}

        {/* Question Content - Show when educational slide is NOT being displayed */}
        {!showEducationalSlide && (
          <>
            <QuestionText questionText={currentQuestionText} />

            {/* Answer Options - Only show when no feedback is displayed */}
            {!showFeedback && (
              <AnswerOptions
                options={answerOptions}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
                isTimerActive={isTimerActive}
                correctAnswer={correctAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            )}

            {/* Feedback - Show after answer is selected or time runs out */}
            {showFeedback && (
              <FeedbackDisplay
                isCorrect={isCorrect}
                timeLeft={timeLeft}
                points={question.points}
                correctAnswer={correctAnswer}
                language={language}
              />
            )}
          </>
        )}

        {/* Next Question Button - Show after feedback or when educational slide is shown */}
        {(showFeedback || showEducationalSlide) && (
          <NextQuestionButton
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            language={language}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </Card>
    </div>
  );
};
