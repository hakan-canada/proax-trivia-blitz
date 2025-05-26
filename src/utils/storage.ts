
import { Question, LeaderboardEntry, AppConfig } from '@/types/trivia';

const STORAGE_KEYS = {
  QUESTIONS: 'proax_trivia_questions',
  LEADERBOARD: 'proax_trivia_leaderboard',
  CONFIG: 'proax_trivia_config'
};

// Default questions with French translations
const defaultQuestions: Question[] = [
  {
    id: '1',
    questionText: "What is Proax's new campaign name?",
    questionTextFr: "Quel est le nom de la nouvelle campagne de Proax?",
    questionType: 'multiple',
    options: ['Power to the Panel', 'Industry First', 'Boots on the Ground', 'Smart Automation'],
    optionsFr: ['Power to the Panel', 'Industry First', 'Boots on the Ground', 'Smart Automation'],
    correctAnswer: 'Boots on the Ground',
    correctAnswerFr: 'Boots on the Ground',
    points: 20,
    imageSlideBefore: 'https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/boots-on-the-ground-french.png'
  },
  {
    id: '2',
    questionText: 'What year was Proax founded?',
    questionTextFr: 'En quelle année Proax a-t-elle été fondée?',
    questionType: 'multiple',
    options: ['1955', '1962', '1965', '1970'],
    optionsFr: ['1955', '1962', '1965', '1970'],
    correctAnswer: '1962',
    correctAnswerFr: '1962',
    points: 15,
  },
  {
    id: '3',
    questionText: "Which of the following are part of Proax's Custom Enclosure Services?",
    questionTextFr: "Lesquels des éléments suivants font partie des services d'enceintes personnalisées de Proax?",
    questionType: 'multiple',
    options: ['Precision drilling, tapping, and milling', 'Custom cutouts for plates, doors, and housing', 'Pre-assembly with accessories', 'All of the above'],
    optionsFr: ['Perçage, taraudage et fraisage de précision', 'Découpes personnalisées pour plaques, portes et boîtiers', 'Pré-assemblage avec accessoires', 'Tout ce qui précède'],
    correctAnswer: 'All of the above',
    correctAnswerFr: 'Tout ce qui précède',
    points: 15,
    imageSlideBefore: 'https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/remlive.png'
  },
  {
    id: '4',
    questionText: 'Which product category is NOT offered by Proax?',
    questionTextFr: 'Quelle catégorie de produit n\'est PAS offerte par Proax?',
    questionType: 'multiple',
    options: ['Industrial Communication & Networking', 'Extrusions', 'Hydraulics', 'Machine Safety'],
    optionsFr: ['Communication et réseautage industriels', 'Extrusions', 'Hydraulique', 'Sécurité des machines'],
    correctAnswer: 'Hydraulics',
    correctAnswerFr: 'Hydraulique',
    points: 20,
  },
  {
    id: '5',
    questionText: 'Which of these Proax campaigns offers in-stock items shipped the same day?',
    questionTextFr: 'Laquelle de ces campagnes Proax offre des articles en stock expédiés le jour même?',
    questionType: 'multiple',
    options: ['Phoenix Contact Switches', 'ABB Circuit Breakers', 'SMC AC-D Series FRL', 'All of them'],
    optionsFr: ['Commutateurs Phoenix Contact', 'Disjoncteurs ABB', 'SMC AC-D Series FRL', 'Toutes ces réponses'],
    correctAnswer: 'All of them',
    correctAnswerFr: 'Toutes ces réponses',
    points: 10,
  },
  {
    id: '6',
    questionText: 'Is Proax proudly Canadian owned and operated?',
    questionTextFr: 'Proax est-elle fièrement détenue et exploitée par des Canadiens?',
    questionType: 'yesno',
    correctAnswer: 'Yes',
    correctAnswerFr: 'Oui',
    points: 10,
    imageSlideBefore: 'https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/proudly-canadian.png'
  },
  {
    id: '7',
    questionText: 'How many locations does Proax have in Canada?',
    questionTextFr: 'Combien d\'emplacements Proax a-t-elle au Canada?',
    questionType: 'multiple',
    options: ['10', '11', '13', '15'],
    optionsFr: ['10', '11', '13', '15'],
    correctAnswer: '13',
    correctAnswerFr: '13',
    points: 10,
    imageSlideBefore: 'https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/locations-fr.png'
  },
  {
    id: '8',
    questionText: 'What is the official website address of Proax?',
    questionTextFr: 'Quelle est l\'adresse officielle du site web de Proax?',
    questionType: 'multiple',
    options: ['proax.com', 'proax.ca', 'shop.proax.ca', 'proaxglobal.com'],
    optionsFr: ['proax.com', 'proax.ca', 'shop.proax.ca', 'proaxglobal.com'],
    correctAnswer: 'proax.ca',
    correctAnswerFr: 'proax.ca',
    points: 10,
    imageSlideBefore: 'https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/proax.png'
  },
  {
    id: '9',
    questionText: 'How many PROOF OF CONCEPT CENTERS does Proax operate?',
    questionTextFr: 'Combien de CENTRES DE PREUVE DE CONCEPT Proax exploite-t-elle?',
    questionType: 'multiple',
    options: ['3', '4', '6', '8'],
    optionsFr: ['3', '4', '6', '8'],
    correctAnswer: '6',
    correctAnswerFr: '6',
    points: 10,
  },
  {
    id: '10',
    questionText: 'How many DESIGN & BUILD SHOPS does Proax have?',
    questionTextFr: 'Combien d\'ATELIERS DE CONCEPTION ET CONSTRUCTION Proax a-t-elle?',
    questionType: 'multiple',
    options: ['2', '4', '6', '8'],
    optionsFr: ['2', '4', '6', '8'],
    correctAnswer: '4',
    correctAnswerFr: '4',
    points: 10,
  },
  {
    id: '11',
    questionText: "What's the next Proax solution coming really soon?",
    questionTextFr: "Quelle est la prochaine solution Proax qui arrive très bientôt?",
    questionType: 'multiple',
    options: ['Vision inspection', 'Wireless sensors', 'Proax Conveyor solutions', 'Robotics-as-a-service'],
    optionsFr: ['Inspection de vision', 'Capteurs sans fil', 'Solutions de convoyeurs Proax', 'Robotique en tant que service'],
    correctAnswer: 'Proax Conveyor solutions',
    correctAnswerFr: 'Solutions de convoyeurs Proax',
    points: 10,
    imageSlideBefore: 'https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/conveyors.png'
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
