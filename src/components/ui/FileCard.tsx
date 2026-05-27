import React from 'react';
import { FileText, Image as ImageIcon, Trash2, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { FileWithMeta } from '../../types';
import { formatBytes } from '../../utils/fileUtils';

interface FileCardProps {
  fileMeta: FileWithMeta;
  onRemove: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  index: number;
  totalCount: number;
}

export const FileCard: React.FC<FileCardProps> = ({
  fileMeta,
  onRemove,
  onMoveUp,
  onMoveDown,
  index,
  totalCount,
}) => {
  const isPDF = fileMeta.file.type === 'application/pdf' || fileMeta.name.endsWith('.pdf');

  return (
    <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-150">
      {/* File Icon Selector */}
      <div className={`p-2.5 rounded-lg ${
        isPDF 
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-500' 
          : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-500'
      }`}>
        {isPDF ? <FileText className="w-5 h-5 shrink-0" /> : <ImageIcon className="w-5 h-5 shrink-0" />}
      </div>

      {/* File Metadata Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate pr-2" title={fileMeta.name}>
          {fileMeta.name}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-gray-450 dark:text-gray-500 font-medium">
          <span>{formatBytes(fileMeta.size)}</span>
          {fileMeta.pageCount !== undefined && (
            <>
              <span>•</span>
              <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded dark:bg-blue-950/30 dark:text-blue-400">
                {fileMeta.pageCount} page{fileMeta.pageCount !== 1 ? 's' : ''}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Reordering and Removal Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        {onMoveUp && (
          <button
            onClick={() => onMoveUp(fileMeta.id)}
            disabled={index === 0}
            className={`p-1.5 rounded transition-all ${
              index === 0 
                ? 'text-gray-200 dark:text-gray-800 cursor-not-allowed' 
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-650'
            }`}
            title="Move Up"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {onMoveDown && (
          <button
            onClick={() => onMoveDown(fileMeta.id)}
            disabled={index === totalCount - 1}
            className={`p-1.5 rounded transition-all ${
              index === totalCount - 1 
                ? 'text-gray-200 dark:text-gray-800 cursor-not-allowed' 
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-650'
            }`}
            title="Move Down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}

        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800 mx-0.5" />

        <button
          onClick={() => onRemove(fileMeta.id)}
          className="p-1.5 rounded text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-500 transition-all cursor-pointer"
          title="Remove"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
