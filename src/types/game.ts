export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  score: number;
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export type GamePhase = 'firstAttempt' | 'secondAttempt' | 'massRound';

export interface GameState {
  currentQuestion: number;
  activeTeam: number;
  originalTeam: number;
  phase: GamePhase;
  timeLeft: number;
  selectedAnswer: number | null;
  showResult: boolean;
}