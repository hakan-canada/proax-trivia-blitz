
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (language: 'en' | 'fr') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageSelect
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
          <div className="flex items-center justify-center mb-6">
            <Globe className="mr-3 h-8 w-8 text-proax-primary" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-proax-navy mb-2">
                Trivia Challenge / Défi Trivia
              </h1>
              <p className="text-lg text-gray-600">
                Choose Your Language / Choisissez votre langue
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            onClick={() => onLanguageSelect('en')}
            size="lg"
            className="h-20 text-xl font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            English
          </Button>
          
          <Button
            onClick={() => onLanguageSelect('fr')}
            size="lg"
            className="h-20 text-xl font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Français
          </Button>
        </div>
      </Card>
    </div>
  );
};
