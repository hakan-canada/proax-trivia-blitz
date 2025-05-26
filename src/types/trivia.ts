
export interface Question {
  id: string;
  questionText: string;
  questionType: 'yesno' | 'multiple';
  options?: string[];
  correctAnswer: string;
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
}

export interface LeaderboardEntry {
  firstName: string;
  score: number;
  timestamp: number;
}

export interface AppConfig {
  bonusPoints: number;
}
