
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Play, Settings } from 'lucide-react';

interface WelcomeScreenProps {
  onStartTrivia: () => void;
  onViewLeaderboard: () => void;
  onOpenAdmin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartTrivia,
  onViewLeaderboard,
  onOpenAdmin
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl animate-fade-in">
        {/* Logo placeholder - replace with actual Proax logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-proax-primary to-proax-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white font-bold text-3xl">PROAX</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-proax-navy mb-4">
            Laval Open House
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-proax-primary mb-2">
            Trivia Challenge
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Test your knowledge, learn about Proax products, and win amazing prizes!
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onStartTrivia}
            size="lg"
            className="w-full max-w-sm h-16 text-xl font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Play className="mr-3 h-6 w-6" />
            Start Trivia
          </Button>

          <Button
            onClick={onViewLeaderboard}
            variant="outline"
            size="lg"
            className="w-full max-w-sm h-14 text-lg font-medium border-2 border-proax-primary text-proax-primary hover:bg-proax-primary hover:text-white transition-all duration-300"
          >
            <Trophy className="mr-3 h-5 w-5" />
            View Leaderboard
          </Button>

          {/* Hidden admin button - click on logo 5 times to reveal */}
          <div className="pt-8">
            <Button
              onClick={onOpenAdmin}
              variant="ghost"
              size="sm"
              className="opacity-20 hover:opacity-60 transition-opacity"
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
