
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LeaderboardEntry } from '@/types/trivia';
import { Trophy, Medal, Award, ArrowLeft, Crown } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onBack }) => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400" />;
      case 2: return <Award className="h-6 w-6 text-yellow-600" />;
      default: return <span className="text-xl font-bold text-proax-primary">#{index + 1}</span>;
    }
  };

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 1: return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 2: return "bg-gradient-to-r from-yellow-600 to-yellow-800 text-white";
      default: return "bg-white border-2 border-proax-primary text-proax-navy";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 text-proax-primary hover:text-proax-blue"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="p-6 md:p-8 shadow-2xl animate-fade-in">
          <div className="text-center mb-8">
            <Trophy className="mx-auto h-16 w-16 text-proax-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-proax-navy mb-4">
              Leaderboard
            </h1>
            <p className="text-lg text-gray-600">
              Top performers at the Proax Laval Open House
            </p>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No scores yet!</p>
              <p className="text-lg text-gray-400 mt-2">Be the first to complete the trivia!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.slice(0, 5).map((entry, index) => (
                <div
                  key={`${entry.firstName}-${entry.timestamp}`}
                  className={`flex items-center justify-between p-4 md:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-102 ${getRankStyle(index)}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {entry.firstName}
                      </h3>
                      <p className="text-sm opacity-75">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold">
                      {entry.score}
                    </div>
                    <div className="text-sm opacity-75">points</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {entries.length > 5 && (
            <div className="text-center mt-6 text-gray-500">
              <p>Showing top 5 of {entries.length} participants</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
