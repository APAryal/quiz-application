import React from 'react';
import type { Team } from '../types';
import { Trophy, Medal } from 'lucide-react';

interface QuizResultsProps {
  teams: Team[];
  onPlayAgain: () => void;
}

export default function QuizResults({ teams, onPlayAgain }: QuizResultsProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Results</h1>
        <p className="text-xl text-gray-600">Congratulations to all teams!</p>
      </div>

      <div className="space-y-6">
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className={`bg-white rounded-lg shadow-md p-6 transform transition-all ${
              index === 0 ? 'scale-105' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {index === 0 && <Trophy className="w-8 h-8 text-yellow-500" />}
                {index === 1 && <Medal className="w-8 h-8 text-gray-400" />}
                {index === 2 && <Medal className="w-8 h-8 text-amber-600" />}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {team.name}
                  </h2>
                  <div className="text-gray-600">
                    {team.members.map(m => m.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {team.score} pts
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onPlayAgain}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}