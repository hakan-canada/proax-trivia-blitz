
import React from 'react';

interface QuestionTextProps {
  questionText: string;
}

export const QuestionText: React.FC<QuestionTextProps> = ({ questionText }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-proax-navy mb-4 leading-tight px-2">
        {questionText}
      </h2>
    </div>
  );
};
