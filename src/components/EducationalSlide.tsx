
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface EducationalSlideProps {
  imageUrl: string;
  onContinue: () => void;
}

export const EducationalSlide: React.FC<EducationalSlideProps> = ({
  imageUrl,
  onContinue
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 md:p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-proax-navy mb-2">
            En savoir plus
          </h2>
          <p className="text-gray-600">
            Take a moment to explore this information before the next question
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <img
            src={imageUrl}
            alt="Educational content"
            className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>

        <div className="text-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300"
          >
            Continue to Question
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
