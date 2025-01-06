import React, { useState } from 'react';
import type { Team } from './types';
import WelcomePage from './components/welcome/WelcomePage';
import TeamRegistration from './components/registration/TeamRegistration';
import QuizGame from './components/game/QuizGame';
import QuizResults from './components/results/QuizResults';

type GameState = 'welcome' | 'registration' | 'playing' | 'results';

function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [teams, setTeams] = useState<Team[]>([]);

  const handleStart = () => {
    setGameState('registration');
  };

  const handleTeamsSubmit = (registeredTeams: Team[]) => {
    setTeams(registeredTeams);
    setGameState('playing');
  };

  const handleGameComplete = (finalTeams: Team[]) => {
    setTeams(finalTeams);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setTeams([]);
    setGameState('welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {gameState === 'welcome' && (
        <WelcomePage onStart={handleStart} />
      )}
      {gameState === 'registration' && (
        <TeamRegistration onTeamsSubmit={handleTeamsSubmit} />
      )}
      {gameState === 'playing' && (
        <QuizGame teams={teams} onGameComplete={handleGameComplete} />
      )}
      {gameState === 'results' && (
        <QuizResults teams={teams} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;