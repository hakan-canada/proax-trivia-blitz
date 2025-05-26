
import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { UserInfoForm } from '@/components/UserInfoForm';
import { QuestionScreen } from '@/components/QuestionScreen';
import { WebsiteBonusScreen } from '@/components/WebsiteBonusScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { AdminPanel } from '@/components/AdminPanel';
import { Confetti } from '@/components/Confetti';
import { UserInfo, GameState, Question, AppConfig } from '@/types/trivia';
import { getQuestions, setQuestions, addToLeaderboard, getConfig, setConfig } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

type AppScreen = 
  | 'welcome'
  | 'userInfo'
  | 'question'
  | 'websiteBonus'
  | 'results'
  | 'admin';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [questions, setQuestionsState] = useState<Question[]>([]);
  const [config, setConfigState] = useState<AppConfig>({ bonusPoints: 25 });
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    userInfo: null,
    isComplete: false,
    hasProaxAccount: null
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setQuestionsState(getQuestions());
    setConfigState(getConfig());
  }, []);

  const handleStartTrivia = () => {
    setCurrentScreen('userInfo');
  };

  const handleUserInfoSubmit = (userInfo: UserInfo) => {
    setGameState(prev => ({ ...prev, userInfo }));
    setCurrentScreen('question');
  };

  const handleQuestionAnswer = (answer: string, isCorrect: boolean) => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    const points = isCorrect ? currentQuestion.points : 0;
    
    if (isCorrect) {
      setShowConfetti(true);
    }

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

  const handleWebsiteBonusAnswer = (hasAccount: boolean) => {
    setGameState(prev => ({ 
      ...prev, 
      hasProaxAccount: hasAccount,
      isComplete: true 
    }));
    setCurrentScreen('results');
  };

  const handleEnterGrandPrize = () => {
    if (gameState.userInfo) {
      const finalScore = gameState.score + (gameState.hasProaxAccount ? config.bonusPoints : 0);
      addToLeaderboard({
        firstName: gameState.userInfo.firstName,
        score: finalScore,
        timestamp: Date.now()
      });
      toast({
        title: "Entered Grand Prize Draw!",
        description: "Good luck! Winner will be announced at the event.",
      });
    }
  };

  const handleVisitWebsite = () => {
    window.open('https://proax.ca', '_blank');
  };

  const handleBackToHome = () => {
    setCurrentScreen('welcome');
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      userInfo: null,
      isComplete: false,
      hasProaxAccount: null
    });
  };

  const handleOpenAdmin = () => {
    setCurrentScreen('admin');
  };

  const handleSaveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    setQuestionsState(newQuestions);
    toast({
      title: "Questions Updated",
      description: "Questions have been saved successfully.",
    });
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    setConfigState(newConfig);
    toast({
      title: "Configuration Updated", 
      description: "Configuration has been saved successfully.",
    });
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStartTrivia={handleStartTrivia}
            onOpenAdmin={handleOpenAdmin}
          />
        );

      case 'userInfo':
        return (
          <UserInfoForm
            onSubmit={handleUserInfoSubmit}
            onBack={() => setCurrentScreen('welcome')}
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
            onAnswer={handleQuestionAnswer}
          />
        );

      case 'websiteBonus':
        return (
          <WebsiteBonusScreen
            bonusPoints={config.bonusPoints}
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
            onEnterGrandPrize={handleEnterGrandPrize}
            onVisitWebsite={handleVisitWebsite}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <div>Error: User info not found</div>
        );

      case 'admin':
        return (
          <AdminPanel
            questions={questions}
            config={config}
            onSaveQuestions={handleSaveQuestions}
            onSaveConfig={handleSaveConfig}
            onBack={() => setCurrentScreen('welcome')}
          />
        );

      default:
        return <WelcomeScreen onStartTrivia={handleStartTrivia} onOpenAdmin={handleOpenAdmin} />;
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
