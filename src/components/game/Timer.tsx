import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  total: number;
}

export default function Timer({ timeLeft, total }: TimerProps) {
  const percentage = (timeLeft / total) * 100;
  
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 flex items-center justify-center">
        <TimerIcon className="w-6 h-6 text-blue-500" />
      </div>
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 36}`}
          strokeDashoffset={`${((100 - percentage) / 100) * (2 * Math.PI * 36)}`}
          className={`${
            timeLeft > 10 ? 'text-blue-500' : 'text-red-500'
          } transition-all duration-1000 ease-linear`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center mt-6">
        <span className="text-lg font-semibold">{timeLeft}s</span>
      </div>
    </div>
  );
}