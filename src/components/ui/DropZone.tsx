import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileWarning, ShieldAlert } from 'lucide-react';
import { formatBytes } from '../../utils/fileUtils';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptType?: 'pdf' | 'images' | 'any';
  multiple?: boolean;
  maxSizeMb?: number;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFilesSelected,
  acceptType = 'any',
  multiple = true,
  maxSizeMb = 100,
}) => {
  const getAcceptConfig = () => {
    switch (acceptType) {
      case 'pdf':
        return { 'application/pdf': ['.pdf'] };
      case 'images':
        return { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] };
      case 'any':
      default:
        return {
          'application/pdf': ['.pdf'],
          'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
        };
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Pass standard accepted files up
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }

      if (rejectedFiles.length > 0) {
        const errorMsg = rejectedFiles[0]?.errors[0]?.message || 'Invalid file';
        console.warn('Files rejected by browser dropzone:', rejectedFiles, errorMsg);
      }
    },
    [onFilesSelected]
  );

  const maxSizeBytes = maxSizeMb * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: getAcceptConfig(),
    multiple,
    maxSize: maxSizeBytes,
  } as any);

  const getLabel = () => {
    if (acceptType === 'pdf') return 'PDF file';
    if (acceptType === 'images') return 'JPG, PNG or WEBP image';
    return 'PDF or image file';
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`w-full py-12 px-6 aspect-auto cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 text-center flex flex-col justify-center items-center ${
          isDragActive
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/10'
            : 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-700'
        }`}
      >
        <input {...getInputProps()} />
        <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-500 mb-4 animate-pulse">
          <Upload className="w-8 h-8" />
        </div>

        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1.5 leading-relaxed">
          {isDragActive ? 'Drop your files here!' : `Drag & drop your ${getLabel()}(s) here`}
        </h3>

        <p className="text-xs text-gray-400 dark:text-gray-555 max-w-sm mx-auto mb-4 leading-normal">
          Or <span className="text-blue-600 dark:text-blue-500 font-medium hover:underline">browse your folders</span> to seek matching files.
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-[11px] text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-850 pt-3.5 w-full max-w-md">
          <div className="flex items-center gap-1">
            <span>🔒 100% Client-Side Safeguarded</span>
          </div>
          <span>•</span>
          <div>
            <span>Max size: {maxSizeMb} MB</span>
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-3 p-3 bg-rose-50 border border-rose-100 dark:bg-rose-950/10 dark:border-rose-900/30 rounded-lg flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-rose-800 dark:text-rose-450">
              Some files were rejected:
            </h4>
            <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90 mt-0.5">
              Make sure they are under {formatBytes(maxSizeBytes)} and match the requested type ({getLabel()}).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
