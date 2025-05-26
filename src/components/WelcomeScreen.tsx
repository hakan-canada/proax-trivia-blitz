
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStartTrivia: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartTrivia
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl animate-fade-in">
        {/* Proax Logo */}
        <div className="mb-8">
          <div className="w-48 h-32 mx-auto mb-6 flex items-center justify-center">
            <img
              src="https://3958257.fs1.hubspotusercontent-na1.net/hubfs/3958257/Email%20logo-1.png"
              alt="Proax Logo"
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-32 h-32 bg-gradient-to-br from-proax-primary to-proax-blue rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">PROAX</span>
            </div>
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
        </div>
      </Card>
    </div>
  );
};
