import React from 'react';
import type { Team } from '../../types/game';
import { Trophy } from 'lucide-react';

interface ScoreboardProps {
  teams: Team[];
  activeTeam: number;
  phase: 'firstAttempt' | 'secondAttempt' | 'massRound';
}

export default function Scoreboard({ teams, activeTeam, phase }: ScoreboardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className={`p-4 rounded-xl transition-all duration-300 transform
            ${index === activeTeam && phase !== 'massRound' ? 'scale-105' : ''}
            ${team.color}`}
        >
          <div className="flex items-center gap-2">
            {index === 0 && team.score > 0 && (
              <Trophy className="w-5 h-5 text-yellow-500" />
            )}
            <div className="font-medium truncate">{team.name}</div>
          </div>
          <div className="text-2xl font-bold mt-1">{team.score} pts</div>
        </div>
      ))}
    </div>
  );
}