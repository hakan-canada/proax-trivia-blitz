import { Question, LeaderboardEntry, AppConfig } from '@/types/trivia';

const STORAGE_KEYS = {
  QUESTIONS: 'proax_trivia_questions',
  LEADERBOARD: 'proax_trivia_leaderboard',
  CONFIG: 'proax_trivia_config'
};

// Default questions
const defaultQuestions: Question[] = [
  {
    id: '1',
    questionText: 'Is Proax a leading distributor of industrial products in Canada?',
    questionType: 'yesno',
    correctAnswer: 'Yes',
    points: 10,
  },
  {
    id: '2',
    questionText: 'What year was Proax founded?',
    questionType: 'multiple',
    options: ['1985', '1990', '1995', '2000'],
    correctAnswer: '1990',
    points: 15,
  },
  {
    id: '3',
    questionText: 'Does Proax offer automation solutions?',
    questionType: 'yesno',
    correctAnswer: 'Yes',
    points: 10,
  },
  {
    id: '4',
    questionText: 'Which of these is a Proax service?',
    questionType: 'multiple',
    options: ['Technical Support', 'Custom Engineering', 'Training Programs', 'All of the above'],
    correctAnswer: 'All of the above',
    points: 20,
  }
];

const defaultConfig: AppConfig = {
  bonusPoints: 25
};

export const getQuestions = (): Question[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored questions:', error);
    }
  }
  
  // Set default questions if none exist
  setQuestions(defaultQuestions);
  return defaultQuestions;
};

export const setQuestions = (questions: Question[]): void => {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse leaderboard:', error);
    }
  }
  return [];
};

export const addToLeaderboard = (entry: LeaderboardEntry): void => {
  const leaderboard = getLeaderboard();
  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.score - a.score);
  // Keep only top 10
  const topEntries = leaderboard.slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(topEntries));
};

export const getConfig = (): AppConfig => {
  const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse config:', error);
    }
  }
  
  // Set default config if none exists
  setConfig(defaultConfig);
  return defaultConfig;
};

export const setConfig = (config: AppConfig): void => {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
};
