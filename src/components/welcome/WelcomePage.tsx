import React from 'react';
import { Brain, Timer, Users, Award, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Interactive Team Quiz
          </h1>
          <p className="text-xl text-gray-600">
            Test your knowledge in this exciting team-based quiz game!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Play</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Team Play</h3>
                <p className="text-gray-600">Form teams and compete together to earn the highest score</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50">
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Scoring System</h3>
                <p className="text-gray-600">First attempt: 5 points<br />Second attempt: 3 points</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Timer className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Time Limit</h3>
                <p className="text-gray-600">30 seconds per question to keep the excitement high</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Mass Rounds</h3>
                <p className="text-gray-600">If both teams miss, everyone gets a chance to answer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Game Rules</h2>
          
          <ol className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">1</span>
              <span>Each team takes turns answering questions. The starting team gets the first attempt.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">2</span>
              <span>Correct answers on first attempt earn 5 points. If the first team fails, the question passes to the next team.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">3</span>
              <span>The second team can earn 3 points for a correct answer. If they also fail, the question opens to all teams.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">4</span>
              <span>In mass rounds, any team can answer, but no points are awarded. It's a learning opportunity!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">5</span>
              <span>After each question, the turn moves to the next team in sequence.</span>
            </li>
          </ol>
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-lg font-semibold"
          >
            Start Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}