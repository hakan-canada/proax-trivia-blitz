
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, ArrowLeft } from 'lucide-react';
import { translations } from '@/utils/translations';

interface WelcomeScreenProps {
  onStartTrivia: () => void;
  onBack: () => void;
  language: 'en' | 'fr';
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartTrivia,
  onBack,
  language
}) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl animate-fade-in">
        {/* Back button */}
        <div className="flex justify-start mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </Button>
        </div>

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
            {t.welcome.title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-proax-primary mb-2">
            {t.welcome.subtitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {t.welcome.description}
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onStartTrivia}
            size="lg"
            className="w-full max-w-sm h-16 text-xl font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Play className="mr-3 h-6 w-6" />
            {t.welcome.startTrivia}
          </Button>
        </div>
      </Card>
    </div>
  );
};
