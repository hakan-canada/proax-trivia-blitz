
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QRCodeComponent } from './QRCode';
import { ExternalLink, Gift, Globe } from 'lucide-react';
import { translations } from '@/utils/translations';

interface WebsiteBonusScreenProps {
  bonusPoints: number;
  language: 'en' | 'fr';
  onAnswer: (hasAccount: boolean) => void;
}

export const WebsiteBonusScreen: React.FC<WebsiteBonusScreenProps> = ({
  bonusPoints,
  language,
  onAnswer
}) => {
  const t = translations[language];
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

  const handleAccountAnswer = (hasAccount: boolean) => {
    if (hasAccount) {
      onAnswer(true);
    } else {
      setShowRegisterPrompt(true);
    }
  };

  const handleRegisterLater = () => {
    onAnswer(false);
  };

  if (showRegisterPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl p-6 md:p-8 shadow-2xl animate-fade-in">
          <div className="text-center mb-8">
            <Globe className="mx-auto h-16 w-16 text-proax-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-proax-navy mb-4">
              Join Proax.ca Today!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Create your free account to access exclusive content, technical resources, and special offers.
            </p>
            <div className="bg-proax-bg rounded-lg p-6 mb-6">
              <p className="text-xl font-semibold text-proax-primary">
                🎁 Register now and earn <span className="text-proax-blue">{bonusPoints} {t.websiteBonus.points}</span> toward the grand prize!
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-lg font-medium text-proax-navy mb-4">
                Scan QR Code or Click Button
              </p>
              <QRCodeComponent 
                value="https://proax.ca/register" 
                size={200}
                className="mx-auto mb-4"
              />
            </div>

            <div className="text-center">
              <Button
                onClick={() => window.open('https://proax.ca/register', '_blank')}
                size="lg"
                className="h-16 px-8 text-xl font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300 transform hover:scale-105 mb-4"
              >
                <ExternalLink className="mr-3 h-6 w-6" />
                Register at Proax.ca
              </Button>
              <p className="text-sm text-gray-500">
                Opens in a new tab
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleRegisterLater}
              variant="outline"
              size="lg"
              className="h-14 px-6 text-lg border-2 border-proax-primary text-proax-primary hover:bg-proax-primary hover:text-white transition-all duration-300"
            >
              Continue Without Registering
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 md:p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <Gift className="mx-auto h-16 w-16 text-proax-primary mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-proax-navy mb-4">
            {t.websiteBonus.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.websiteBonus.description}
          </p>
        </div>

        <div className="bg-proax-bg rounded-lg p-6 mb-8 text-center">
          <p className="text-xl font-semibold text-proax-primary">
            🎁 {t.websiteBonus.question} <span className="text-proax-blue">{bonusPoints} {t.websiteBonus.points}!</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => handleAccountAnswer(true)}
            size="lg"
            className="h-16 text-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            {t.websiteBonus.yes}
          </Button>

          <Button
            onClick={() => handleAccountAnswer(false)}
            size="lg"
            variant="outline"
            className="h-16 text-xl font-semibold border-2 border-proax-primary text-proax-primary hover:bg-proax-primary hover:text-white transition-all duration-300"
          >
            {t.websiteBonus.no}
          </Button>
        </div>
      </Card>
    </div>
  );
};
