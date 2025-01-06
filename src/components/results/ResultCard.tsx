import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import type { Team } from '../../types/game';

interface ResultCardProps {
  team: Team;
  position: number;
}

export default function ResultCard({ team, position }: ResultCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transform transition-all ${
      position === 0 ? 'scale-105' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {position === 0 && <Trophy className="w-8 h-8 text-yellow-500" />}
          {position === 1 && <Medal className="w-8 h-8 text-gray-400" />}
          {position === 2 && <Medal className="w-8 h-8 text-amber-600" />}
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
  );
}