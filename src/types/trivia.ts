
export interface Question {
  id: string;
  questionText: string;
  questionTextFr?: string;
  questionType: 'yesno' | 'multiple';
  options?: string[];
  optionsFr?: string[];
  correctAnswer: string;
  correctAnswerFr?: string;
  points: number;
  imageSlideBefore?: string;
}

export interface UserInfo {
  firstName: string;
  companyName: string;
  email: string;
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  answers: string[];
  userInfo: UserInfo | null;
  isComplete: boolean;
  hasProaxAccount: boolean | null;
  language: 'en' | 'fr';
}

export interface LeaderboardEntry {
  firstName: string;
  score: number;
  timestamp: number;
}

export interface AppConfig {
  bonusPoints: number;
}

export interface Translations {
  welcome: {
    title: string;
    subtitle: string;
    description: string;
    startTrivia: string;
  };
  common: {
    points: string;
    timeLeft: string;
    question: string;
    of: string;
    correct: string;
    incorrect: string;
    timeUp: string;
    correctAnswerWas: string;
    nextQuestion: string;
    finishQuiz: string;
    backToHome: string;
    learnMore: string;
    back: string;
  };
  userInfo: {
    title: string;
    firstName: string;
    companyName: string;
    email: string;
    continue: string;
    back: string;
    firstNamePlaceholder: string;
    companyPlaceholder: string;
    emailPlaceholder: string;
  };
  websiteBonus: {
    title: string;
    description: string;
    points: string;
    question: string;
    yes: string;
    no: string;
    joinProax: string;
    registerMessage: string;
    registerNow: string;
    toward: string;
    scanQr: string;
    registerButton: string;
    opensNewTab: string;
    continueWithout: string;
  };
  results: {
    congratulations: string;
    points: string;
    includes: string;
    bonusPoints: string;
    excellent: string;
    great: string;
    good: string;
    thanks: string;
    prizeInfo: string;
    prizeDescription: string;
    registerHint: string;
    grandPrize: string;
    visitWebsite: string;
    thankYou: string;
    company: string;
  };
}
