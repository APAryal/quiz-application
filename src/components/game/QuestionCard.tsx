import React from 'react';
import type { Question, GamePhase } from '../../types/game';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  phase: GamePhase;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswer: (index: number) => void;
}

export default function QuestionCard({
  question,
  phase,
  selectedAnswer,
  showResult,
  onAnswer
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {question.text}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctAnswer;
          const isSelected = index === selectedAnswer;
          
          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswer(index)}
              disabled={showResult}
              className={`p-6 text-left rounded-xl transition-all duration-300 
                ${
                  showResult && isCorrect && isSelected
                    ? 'bg-green-50 border-green-500'
                    : showResult && !isCorrect && isSelected
                    ? 'bg-red-50 border-red-500'
                    : 'bg-gray-50 hover:bg-blue-50 hover:border-blue-500'
                } border-2 ${
                  showResult && isSelected ? 'border-current' : 'border-transparent'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option}</span>
                {showResult && isCorrect && isSelected && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
                {showResult && !isCorrect && isSelected && (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {phase !== 'firstAttempt' && (
        <div className="mt-4 text-center">
          <span className={`inline-block px-4 py-2 rounded-full text-sm ${
            phase === 'secondAttempt' 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {phase === 'secondAttempt' ? 'Second Attempt (3 points)' : 'Mass Round (No points)'}
          </span>
        </div>
      )}
    </div>
  );
}