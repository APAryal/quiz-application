export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  score: number;
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

export interface QuizState {
  currentQuestion: number;
  teams: Team[];
  activeTeam: number;
  questions: Question[];
  gameStarted: boolean;
  gameFinished: boolean;
}