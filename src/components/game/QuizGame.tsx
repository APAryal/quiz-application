import React, { useState, useEffect } from 'react';
import type { Team, GamePhase } from '../../types/game';
import { questions } from '../../utils/questions';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import Scoreboard from './Scoreboard';

interface QuizGameProps {
  teams: Team[];
  onGameComplete: (teams: Team[]) => void;
}

const TIMER_DURATION = 30;
const RESULT_DISPLAY_DURATION = 2000;

export default function QuizGame({ teams, onGameComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [activeTeam, setActiveTeam] = useState(0);
  const [originalTeam, setOriginalTeam] = useState(0);
  const [phase, setPhase] = useState<GamePhase>('firstAttempt');
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [updatedTeams, setUpdatedTeams] = useState(teams);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswerSubmit(-1);
    }
  }, [timeLeft, showResult]);

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      const points = phase === 'firstAttempt' ? 5 : phase === 'secondAttempt' ? 3 : 0;
      if (points > 0) {
        const newTeams = [...updatedTeams];
        newTeams[activeTeam].score += points;
        setUpdatedTeams(newTeams);
      }
    }

    setTimeout(() => {
      if (!isCorrect) {
        if (phase === 'firstAttempt') {
          setPhase('secondAttempt');
          setActiveTeam((activeTeam + 1) % teams.length);
        } else if (phase === 'secondAttempt') {
          setPhase('massRound');
        }
        setTimeLeft(TIMER_DURATION);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setPhase('firstAttempt');
          const nextTeam = (originalTeam + 1) % teams.length;
          setActiveTeam(nextTeam);
          setOriginalTeam(nextTeam);
          setTimeLeft(TIMER_DURATION);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          onGameComplete(updatedTeams);
        }
      }
    }, RESULT_DISPLAY_DURATION);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Timer timeLeft={timeLeft} total={TIMER_DURATION} />
          {phase !== 'massRound' && (
            <div className="text-xl font-semibold text-gray-800">
              Team: {updatedTeams[activeTeam].name}
            </div>
          )}
        </div>
        <div className="text-lg font-medium text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <QuestionCard
        question={questions[currentQuestion]}
        phase={phase}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        onAnswer={handleAnswerSubmit}
      />

      <div className="mt-8">
        <Scoreboard
          teams={updatedTeams}
          activeTeam={activeTeam}
          phase={phase}
        />
      </div>
    </div>
  );
}