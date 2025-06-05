
import React, { useState, useEffect } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { UserInfoForm } from '@/components/UserInfoForm';
import { QuestionScreen } from '@/components/QuestionScreen';
import { WebsiteBonusScreen } from '@/components/WebsiteBonusScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { Confetti } from '@/components/Confetti';
import { UserInfo, GameState, Question, AppConfig } from '@/types/trivia';
import { getQuestions, getConfig } from '@/utils/storage';
import { saveParticipant, saveQuizResult } from '@/utils/supabaseOperations';
import { useToast } from '@/hooks/use-toast';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

type AppScreen = 
  | 'language'
  | 'welcome'
  | 'userInfo'
  | 'question'
  | 'websiteBonus'
  | 'results';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('language');
  const [questions, setQuestionsState] = useState<Question[]>([]);
  const [config, setConfigState] = useState<AppConfig>({ bonusPoints: 25 });
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    userInfo: null,
    isComplete: false,
    hasProaxAccount: null,
    language: 'en'
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  // Background music should play during question screens and website bonus
  const shouldPlayMusic = currentScreen === 'question' || currentScreen === 'websiteBonus';
  const { stopMusic } = useBackgroundMusic(shouldPlayMusic);

  useEffect(() => {
    setQuestionsState(getQuestions());
    setConfigState(getConfig());
  }, []);

  const handleLanguageSelect = (language: 'en' | 'fr') => {
    console.log('Language selected:', language);
    setGameState(prev => ({ ...prev, language }));
    setCurrentScreen('welcome');
  };

  const handleStartTrivia = () => {
    setCurrentScreen('userInfo');
  };

  const handleBackToLanguage = () => {
    setCurrentScreen('language');
  };

  const handleUserInfoSubmit = async (userInfo: UserInfo) => {
    console.log('Saving participant to Supabase:', userInfo, 'Language:', gameState.language);
    
    // Save participant to Supabase
    const participantIdResult = await saveParticipant(userInfo, gameState.language);
    
    if (participantIdResult) {
      setParticipantId(participantIdResult);
      setGameState(prev => ({ ...prev, userInfo }));
      setCurrentScreen('question');
      console.log('Participant saved with ID:', participantIdResult, 'Language:', gameState.language);
    } else {
      toast({
        title: "Error",
        description: "Failed to save participant information. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleQuestionAnswer = (answer: string, isCorrect: boolean) => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    const points = isCorrect ? currentQuestion.points : 0;

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      answers: [...prev.answers, answer]
    }));

    // Check if this was the last question
    if (gameState.currentQuestionIndex >= questions.length - 1) {
      // Move to website bonus screen
      setTimeout(() => {
        setCurrentScreen('websiteBonus');
      }, 500);
    } else {
      // Move to next question
      const nextIndex = gameState.currentQuestionIndex + 1;
      
      setTimeout(() => {
        setGameState(prev => ({ ...prev, currentQuestionIndex: nextIndex }));
        setCurrentScreen('question');
      }, 500);
    }
  };

  const handleFinishQuiz = () => {
    // Stop music when finishing quiz
    stopMusic();
  };

  const handleWebsiteBonusAnswer = async (hasAccount: boolean) => {
    console.log('Website bonus answer:', hasAccount, 'Language:', gameState.language);
    
    setGameState(prev => ({ 
      ...prev, 
      hasProaxAccount: hasAccount,
      isComplete: true 
    }));

    // Save quiz result to Supabase with correct total score
    if (participantId) {
      console.log('Saving quiz result to Supabase');
      console.log('Base score:', gameState.score);
      console.log('Has Proax account:', hasAccount);
      console.log('Bonus points:', config.bonusPoints);
      console.log('Language:', gameState.language);
      
      await saveQuizResult(
        participantId, 
        gameState.score, // base score from quiz
        hasAccount,
        config.bonusPoints // pass bonus points for calculation
      );
    }

    // Stop music when moving to results
    stopMusic();
    setCurrentScreen('results');
  };

  const handleVisitWebsite = () => {
    window.open('https://proax.ca', '_blank');
  };

  const handleBackToHome = () => {
    console.log('Returning to home, resetting language to default');
    // Stop music when going back to home
    stopMusic();
    setCurrentScreen('language');
    setParticipantId(null);
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      userInfo: null,
      isComplete: false,
      hasProaxAccount: null,
      language: 'en' // Reset to default
    });
  };

  const handleShowConfetti = () => {
    setShowConfetti(true);
  };

  const renderCurrentScreen = () => {
    console.log('Rendering screen:', currentScreen, 'Language:', gameState.language);
    
    switch (currentScreen) {
      case 'language':
        return (
          <LanguageSelector
            onLanguageSelect={handleLanguageSelect}
          />
        );

      case 'welcome':
        return (
          <WelcomeScreen
            onStartTrivia={handleStartTrivia}
            onBack={handleBackToLanguage}
            language={gameState.language}
          />
        );

      case 'userInfo':
        return (
          <UserInfoForm
            onSubmit={handleUserInfoSubmit}
            onBack={() => setCurrentScreen('welcome')}
            language={gameState.language}
          />
        );

      case 'question':
        if (questions.length === 0) {
          return (
            <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-proax-navy mb-4">No Questions Available</h1>
                <p className="text-gray-600 mb-4">Please contact the administrator to add questions.</p>
                <button 
                  onClick={() => setCurrentScreen('welcome')}
                  className="text-proax-primary hover:text-proax-blue"
                >
                  Back to Home
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <QuestionScreen
            question={questions[gameState.currentQuestionIndex]}
            questionNumber={gameState.currentQuestionIndex + 1}
            totalQuestions={questions.length}
            language={gameState.language}
            onAnswer={handleQuestionAnswer}
            onShowConfetti={handleShowConfetti}
            onFinishQuiz={handleFinishQuiz}
          />
        );

      case 'websiteBonus':
        return (
          <WebsiteBonusScreen
            bonusPoints={config.bonusPoints}
            language={gameState.language}
            onAnswer={handleWebsiteBonusAnswer}
          />
        );

      case 'results':
        return gameState.userInfo ? (
          <ResultsScreen
            score={gameState.score}
            userInfo={gameState.userInfo}
            hasProaxAccount={gameState.hasProaxAccount || false}
            bonusPoints={config.bonusPoints}
            language={gameState.language}
            onVisitWebsite={handleVisitWebsite}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <div>Error: User info not found</div>
        );

      default:
        return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
    }
  };

  return (
    <div className="relative">
      {renderCurrentScreen()}
      <Confetti 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
};

export default Index;
