
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserInfo } from '@/types/trivia';
import { Trophy, Award, ExternalLink, Gift, Star } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  userInfo: UserInfo;
  hasProaxAccount: boolean;
  bonusPoints: number;
  onEnterGrandPrize: () => void;
  onVisitWebsite: () => void;
  onBackToHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  userInfo,
  hasProaxAccount,
  bonusPoints,
  onEnterGrandPrize,
  onVisitWebsite,
  onBackToHome
}) => {
  const totalScore = score + (hasProaxAccount ? bonusPoints : 0);

  const getScoreMessage = () => {
    if (totalScore >= 80) return "Outstanding! You're a Proax expert! 🏆";
    if (totalScore >= 60) return "Great job! You know your Proax products! 🌟";
    if (totalScore >= 40) return "Good work! Keep learning about Proax! 👏";
    return "Thanks for playing! Discover more at proax.ca! 💡";
  };

  const getScoreColor = () => {
    if (totalScore >= 80) return "text-yellow-600";
    if (totalScore >= 60) return "text-green-600";
    if (totalScore >= 40) return "text-blue-600";
    return "text-proax-primary";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 md:p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <Trophy className={`mx-auto h-20 w-20 mb-4 ${getScoreColor()}`} />
          <h1 className="text-4xl md:text-5xl font-bold text-proax-navy mb-4">
            Congratulations, {userInfo.firstName}!
          </h1>
          <div className="bg-gradient-to-r from-proax-primary to-proax-blue rounded-2xl p-6 mb-6 text-white">
            <div className="text-6xl md:text-7xl font-bold mb-2">{totalScore}</div>
            <div className="text-xl font-semibold">POINTS</div>
            {hasProaxAccount && (
              <div className="mt-2 text-lg">
                <Star className="inline mr-1" />
                Includes {bonusPoints} Proax.ca bonus points!
              </div>
            )}
          </div>
          <p className="text-xl font-semibold text-proax-navy">
            {getScoreMessage()}
          </p>
        </div>

        {/* Prize Information */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-3">
            <Gift className="h-8 w-8 text-yellow-600 mr-2" />
            <h3 className="text-2xl font-bold text-yellow-800">Prize Information</h3>
          </div>
          <p className="text-lg text-yellow-800 text-center">
            🎁 Check the prize table at the booth to see what you're eligible for!
          </p>
          {!hasProaxAccount && (
            <p className="text-md text-yellow-700 text-center mt-2">
              💡 Register on proax.ca to earn extra points toward the big prize!
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {userInfo.email && (
            <Button
              onClick={onEnterGrandPrize}
              size="lg"
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <Award className="mr-3 h-6 w-6" />
              Enter Grand Prize Draw
            </Button>
          )}

          <Button
            onClick={onVisitWebsite}
            size="lg"
            variant="outline"
            className="w-full h-14 text-lg font-semibold border-2 border-proax-primary text-proax-primary hover:bg-proax-primary hover:text-white transition-all duration-300"
          >
            <ExternalLink className="mr-3 h-5 w-5" />
            Visit Proax.ca
          </Button>

          <Button
            onClick={onBackToHome}
            size="lg"
            variant="ghost"
            className="w-full h-12 text-lg text-proax-primary hover:text-proax-blue transition-all duration-300"
          >
            Back to Home
          </Button>
        </div>

        {/* Company Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for visiting Proax at the Laval Open House!</p>
          <p className="mt-1">Company: {userInfo.companyName}</p>
        </div>
      </Card>
    </div>
  );
};
