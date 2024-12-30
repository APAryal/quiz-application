import React from 'react';
import { RotateCcw } from 'lucide-react';

interface PlayAgainButtonProps {
  onClick: () => void;
}

export default function PlayAgainButton({ onClick }: PlayAgainButtonProps) {
  return (
    <div className="mt-12 text-center">
      <button
        onClick={onClick}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-lg font-semibold"
      >
        <RotateCcw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
}