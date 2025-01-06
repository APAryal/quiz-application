import React, { useState, useEffect } from 'react';
import type { Team, Question } from '../types';
import { Timer, CheckCircle, XCircle } from 'lucide-react';

interface QuizGameProps {
  teams: Team[];
  onGameComplete: (teams: Team[]) => void;
}

const QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1
  },
  {
    id: '3',
    text: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
    correctAnswer: 1
  },
  // Add more questions as needed
];

export default function QuizGame({ teams, onGameComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [activeTeam, setActiveTeam] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
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
    
    const isCorrect = answerIndex === QUESTIONS[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      const newTeams = [...updatedTeams];
      newTeams[activeTeam].score += 10;
      setUpdatedTeams(newTeams);
    }

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setActiveTeam((activeTeam + 1) % teams.length);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        onGameComplete(updatedTeams);
      }
    }, 2000);
  };

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">
          Team: {updatedTeams[activeTeam].name}
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-medium">{timeLeft}s</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </h2>
        
        <p className="text-xl mb-8">{question.text}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSubmit(index)}
              disabled={showResult}
              className={`p-4 text-left rounded-lg transition-all ${
                showResult
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-blue-50 hover:border-blue-500'
              } border-2 ${
                showResult && index === selectedAnswer
                  ? 'border-red-500'
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {updatedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`p-4 rounded-lg ${
                index === activeTeam ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <div className="font-medium">{team.name}</div>
              <div className="text-lg font-bold">{team.score} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}