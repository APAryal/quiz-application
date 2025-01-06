import React, { useState } from 'react';
import { Users } from 'lucide-react';
import type { Team, TeamMember } from '../types';

interface TeamRegistrationProps {
  onTeamsSubmit: (teams: Team[]) => void;
}

export default function TeamRegistration({ onTeamsSubmit }: TeamRegistrationProps) {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: '', members: [], score: 0 }
  ]);

  const addTeam = () => {
    setTeams([...teams, { 
      id: (teams.length + 1).toString(),
      name: '',
      members: [],
      score: 0
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Registration</h1>
        <p className="text-gray-600">Register your teams to start the quiz!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-6 h-6 text-blue-500" />
              <input
                type="text"
                placeholder="Team Name"
                value={team.name}
                onChange={(e) => updateTeamName(team.id, e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-3 ml-8">
              {team.members.map(member => (
                <input
                  key={member.id}
                  type="text"
                  placeholder="Member Name"
                  value={member.name}
                  onChange={(e) => updateMemberName(team.id, member.id, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => addMember(team.id)}
              className="mt-3 ml-8 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Team Member
            </button>
          </div>
        ))}

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={addTeam}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Add Another Team
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
}