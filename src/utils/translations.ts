
import { Translations } from '@/types/trivia';

export const translations: Record<'en' | 'fr', Translations> = {
  en: {
    welcome: {
      title: 'Laval Open House',
      subtitle: 'Trivia Challenge',
      description: 'Test your knowledge, learn about Proax products, and win amazing prizes!',
      startTrivia: 'Start Trivia'
    },
    common: {
      points: 'points',
      timeLeft: 's',
      question: 'Question',
      of: 'of',
      correct: 'Correct!',
      incorrect: 'Not quite!',
      timeUp: 'Time\'s up!',
      correctAnswerWas: 'The correct answer was:',
      nextQuestion: 'Next Question',
      finishQuiz: 'Finish Quiz',
      backToHome: 'Back to Home',
      learnMore: 'Learn More'
    },
    userInfo: {
      title: 'Tell us about yourself',
      firstName: 'First Name',
      companyName: 'Company Name',
      email: 'Email Address',
      continue: 'Continue',
      back: 'Back',
      firstNamePlaceholder: 'Enter your first name',
      companyPlaceholder: 'Enter your company name',
      emailPlaceholder: 'Enter your email address'
    },
    websiteBonus: {
      title: 'Bonus Question!',
      description: 'Do you already have a Proax.ca account?',
      points: 'bonus points',
      question: 'Answer honestly to earn bonus points:',
      yes: 'Yes',
      no: 'No',
      joinProax: 'Join Proax.ca Today!',
      registerMessage: 'Create your free account to access exclusive content, technical resources, and special offers.',
      registerNow: 'Register now and earn',
      toward: 'toward the grand prize!',
      scanQr: 'Scan QR Code or Click Button',
      registerButton: 'Register at Proax.ca',
      opensNewTab: 'Opens in a new tab',
      continueWithout: 'Continue Without Registering'
    },
    results: {
      congratulations: 'Congratulations',
      points: 'POINTS',
      includes: 'Includes',
      bonusPoints: 'Proax.ca bonus points!',
      excellent: "Outstanding! You're a Proax expert! 🏆",
      great: "Great job! You know your Proax products! 🌟",
      good: "Good work! Keep learning about Proax! 👏",
      thanks: "Thanks for playing! Discover more at proax.ca! 💡",
      prizeInfo: 'Prize Information',
      prizeDescription: '🎁 Check the prize table at the booth to see what you\'re eligible for!',
      registerHint: '💡 Register on proax.ca to earn extra points toward the big prize!',
      grandPrize: 'Enter Grand Prize Draw',
      visitWebsite: 'Visit Proax.ca',
      thankYou: 'Thank you for visiting Proax at the Laval Open House!',
      company: 'Company:'
    }
  },
  fr: {
    welcome: {
      title: 'Journée portes ouvertes Laval',
      subtitle: 'Défi Trivia',
      description: 'Testez vos connaissances, découvrez les produits Proax et gagnez des prix incroyables!',
      startTrivia: 'Commencer le Trivia'
    },
    common: {
      points: 'points',
      timeLeft: 's',
      question: 'Question',
      of: 'de',
      correct: 'Correct!',
      incorrect: 'Pas tout à fait!',
      timeUp: 'Temps écoulé!',
      correctAnswerWas: 'La bonne réponse était:',
      nextQuestion: 'Question suivante',
      finishQuiz: 'Terminer le quiz',
      backToHome: 'Retour à l\'accueil',
      learnMore: 'En savoir plus'
    },
    userInfo: {
      title: 'Parlez-nous de vous',
      firstName: 'Prénom',
      companyName: 'Nom de l\'entreprise',
      email: 'Adresse courriel',
      continue: 'Continuer',
      back: 'Retour',
      firstNamePlaceholder: 'Entrez votre prénom',
      companyPlaceholder: 'Entrez le nom de votre entreprise',
      emailPlaceholder: 'Entrez votre adresse courriel'
    },
    websiteBonus: {
      title: 'Question bonus!',
      description: 'Avez-vous déjà un compte Proax.ca?',
      points: 'points bonus',
      question: 'Répondez honnêtement pour gagner des points bonus:',
      yes: 'Oui',
      no: 'Non',
      joinProax: 'Rejoignez Proax.ca dès aujourd\'hui!',
      registerMessage: 'Créez votre compte gratuit pour accéder au contenu exclusif, aux ressources techniques et aux offres spéciales.',
      registerNow: 'Inscrivez-vous maintenant et gagnez',
      toward: 'pour le grand prix!',
      scanQr: 'Scannez le code QR ou cliquez sur le bouton',
      registerButton: 'S\'inscrire sur Proax.ca',
      opensNewTab: 'S\'ouvre dans un nouvel onglet',
      continueWithout: 'Continuer sans s\'inscrire'
    },
    results: {
      congratulations: 'Félicitations',
      points: 'POINTS',
      includes: 'Inclut',
      bonusPoints: 'points bonus Proax.ca!',
      excellent: "Exceptionnel! Vous êtes un expert Proax! 🏆",
      great: "Excellent travail! Vous connaissez bien les produits Proax! 🌟",
      good: "Bon travail! Continuez à apprendre sur Proax! 👏",
      thanks: "Merci d'avoir joué! Découvrez plus sur proax.ca! 💡",
      prizeInfo: 'Information sur les prix',
      prizeDescription: '🎁 Consultez le tableau des prix au kiosque pour voir ce à quoi vous êtes admissible!',
      registerHint: '💡 Inscrivez-vous sur proax.ca pour gagner des points supplémentaires pour le grand prix!',
      grandPrize: 'Participer au tirage du grand prix',
      visitWebsite: 'Visiter Proax.ca',
      thankYou: 'Merci de visiter Proax à la journée portes ouvertes de Laval!',
      company: 'Entreprise:'
    }
  }
};
