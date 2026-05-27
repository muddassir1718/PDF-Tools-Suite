import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label = 'Processing files...',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full font-sans ${className}`}>
      <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-350">
        <span className="truncate pr-4">{label}</span>
        <span className="tabular-nums font-bold text-blue-600 dark:text-blue-500">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-150 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-blue-600 to-violet-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
