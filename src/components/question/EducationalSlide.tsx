
import React from 'react';
import { translations } from '@/utils/translations';

interface EducationalSlideProps {
  imageUrl: string;
  language: 'en' | 'fr';
}

export const EducationalSlide: React.FC<EducationalSlideProps> = ({
  imageUrl,
  language
}) => {
  const t = translations[language];

  return (
    <div className="text-center mb-8 animate-fade-in">
      <h3 className="text-xl font-bold text-proax-navy mb-4">
        {t.common.learnMore}
      </h3>
      <div className="flex justify-center mb-6">
        <img
          src={imageUrl}
          alt="Educational content"
          className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
          }}
        />
      </div>
    </div>
  );
};
