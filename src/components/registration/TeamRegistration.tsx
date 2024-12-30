import React, { useState } from 'react';
import { Users, UserPlus, Plus } from 'lucide-react';
import type { Team } from '../../types/game';
import { teamColors } from '../../utils/colors';

interface TeamRegistrationProps {
  onTeamsSubmit: (teams: Team[]) => void;
}

export default function TeamRegistration({ onTeamsSubmit }: TeamRegistrationProps) {
  const [teams, setTeams] = useState<Team[]>([
    { 
      id: '1',
      name: '',
      members: [],
      score: 0,
      color: teamColors[0].bg
    }
  ]);

  const addTeam = () => {
    if (teams.length >= teamColors.length) return;
    
    setTeams([...teams, { 
      id: (teams.length + 1).toString(),
      name: '',
      members: [],
      score: 0,
      color: teamColors[teams.length].bg
    }]);
  };

  const addMember = (teamId: string) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: [...team.members, { 
            id: (team.members.length + 1).toString(),
            name: ''
          }]
        };
      }
      return team;
    }));
  };

  const updateTeamName = (teamId: string, name: string) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, name } : team
    ));
  };

  const updateMemberName = (teamId: string, memberId: string, name: string) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.map(member =>
            member.id === memberId ? { ...member, name } : member
          )
        };
      }
      return team;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teams.every(team => team.name && team.members.length > 0 && 
        team.members.every(member => member.name))) {
      onTeamsSubmit(teams);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Team Registration</h1>
        <p className="text-xl text-gray-600">Register your teams to start the quiz!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${teamColors[index].bg}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <Users className={`w-6 h-6 ${teamColors[index].text}`} />
              <input
                type="text"
                placeholder="Team Name"
                value={team.name}
                onChange={(e) => updateTeamName(team.id, e.target.value)}
                className="flex-1 p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-4 ml-10">
              {team.members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Member Name"
                    value={member.name}
                    onChange={(e) => updateMemberName(team.id, member.id, e.target.value)}
                    className="flex-1 p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addMember(team.id)}
              className={`mt-4 ml-10 px-4 py-2 rounded-lg flex items-center gap-2 ${teamColors[index].text} hover:bg-white/30 transition-colors`}
            >
              <UserPlus className="w-4 h-4" />
              Add Team Member
            </button>
          </div>
        ))}

        <div className="flex gap-4 justify-center">
          {teams.length < teamColors.length && (
            <button
              type="button"
              onClick={addTeam}
              className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Another Team
            </button>
          )}
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
}