import React, { useState } from 'react';
import { ShieldCheck, Minimize2, Download, Sparkles, AlertCircle, Percent } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { compressPDF } from '../utils/pdfUtils';
import { formatBytes, downloadBlob } from '../utils/fileUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';

export const CompressPage: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedResult, setCompressedResult] = useState<{
    originalSize: number;
    compressedSize: number;
    bytes: Uint8Array;
  } | null>(null);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'compress-pdf')!;

  const handleFileSelected = (selected: File[]) => {
    if (selected.length === 0) return;
    const file = selected[0]; // Supports 1 file
    setFileMeta({
      file,
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    });
    setCompressedResult(null);
    showToast('Document loaded. Select compression parameters below.', 'info');
  };

  const handleCompress = async () => {
    if (!fileMeta) return;

    setIsProcessing(true);
    setProgress(20);
    showToast('Executing object streamline arrays...', 'info');

    try {
      const result = await compressPDF(fileMeta.file, compressionLevel, (percent) => {
        setProgress(percent);
      });

      setCompressedResult(result);
      showToast('Compression successful! Download ready.', 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Could not compress current file assets.', 'error');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!compressedResult || !fileMeta) return;
    const blob = new Blob([compressedResult.bytes], { type: 'application/pdf' });
    const originalName = fileMeta.name.replace(/\.pdf$/i, '');
    downloadBlob(blob, `${originalName}_compressed.pdf`);
    showToast('File downloaded successfully!', 'success');
  };

  const savingRatio = compressedResult
    ? Math.round((1 - compressedResult.compressedSize / compressedResult.originalSize) * 100)
    : 0;

  return (
    <div className="font-sans py-4">
      <SEO 
        title={toolInfo.seoTitle} 
        description={toolInfo.seoDesc} 
        path={toolInfo.path}
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Core Workspace Wrapper */}
        <div className="flex-1 w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-3xl p-6 shadow-xs">
          
          {/* Header titles */}
          <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
            <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-500">
              <Minimize2 className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-950 dark:text-white leading-tight">
                {toolInfo.name}
              </h1>
              <p className="text-xs text-gray-550 dark:text-gray-400 mt-0.5">
                {toolInfo.shortDesc}
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 text-emerald-650 dark:bg-emerald-950/15 dark:text-emerald-450 border border-emerald-100/30 dark:border-emerald-900/10 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
            <span>PDF metadata streamlining operates offline. Fast, unshared, and fully secure.</span>
          </div>

          {/* Upload Drop Zone */}
          {!fileMeta ? (
            <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
          ) : (
            <div className="p-5 bg-gray-50 dark:bg-gray-900/45 rounded-2xl border border-gray-200 dark:border-gray-850 flex items-center justify-between mb-8 animate-fadeIn">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-violet-50 dark:bg-violet-950/25 text-violet-600 dark:text-violet-400 rounded-lg">
                  <Minimize2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-4">
                    {fileMeta.name}
                  </p>
                  <p className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5">
                    Original Size: <strong className="font-bold">{formatBytes(fileMeta.size)}</strong>
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFileMeta(null);
                  setCompressedResult(null);
                }}
                className="font-bold border-gray-200"
              >
                Change File
              </Button>
            </div>
          )}

          {/* Setting Inputs */}
          {fileMeta && !compressedResult && (
            <div className="border border-gray-250/50 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                Choose Compression Intensity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
                {[
                  {
                    level: 'low',
                    title: 'Low Compression',
                    desc: 'Prioritizes original visual definitions.',
                    rec: 'Highly suitable for artwork/detailed charts',
                  },
                  {
                    level: 'medium',
                    title: 'Recommended Medium',
                    desc: 'Optimized size shrink with crisp readability.',
                    rec: 'Perfect for books, guides, and corporate slides',
                  },
                  {
                    level: 'high',
                    title: 'Extreme High Compression',
                    desc: 'Reduces size drastically. May slightly lower resolution.',
                    rec: 'Excellent for email limits or slow networks',
                  },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setCompressionLevel(item.level as any)}
                    className={`p-4 text-left rounded-xl border-2 transition-all cursor-pointer ${
                      compressionLevel === item.level
                        ? 'border-blue-600 bg-blue-50/10 dark:border-blue-500'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-900 dark:hover:border-gray-800'
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {item.title}
                    </span>
                    <p className="text-[10px] text-gray-450 dark:text-gray-500 mt-1.5 leading-normal font-medium">
                      {item.desc}
                    </p>
                    <p className="text-[9px] text-blue-600 dark:text-blue-450 mt-2 italic font-medium">
                      {item.rec}
                    </p>
                  </button>
                ))}
              </div>

              {/* Compress Action buttons */}
              <div className="pt-6 border-t border-gray-150 dark:border-gray-900">
                {isProcessing && (
                  <ProgressBar progress={progress} label="Mapping nested object streams..." className="mb-6" />
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleCompress}
                    disabled={isProcessing}
                    isLoading={isProcessing}
                    icon={<Percent className="w-4 h-4" />}
                    className="flex-1 rounded-xl"
                  >
                    Compress PDF
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary and Download */}
          {compressedResult && (
            <div className="bg-blue-50/50 dark:bg-blue-950/10 p-5 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 mb-8 animate-fadeIn">
              <h3 className="text-sm font-extrabold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-1.5">
                <Percent className="w-4.5 h-4.5 animate-bounce text-blue-600 dark:text-blue-500" />
                Compression Ratio Accomplished!
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Original Size</span>
                  <p className="text-xs font-black text-gray-700 dark:text-gray-200 mt-1">
                    {formatBytes(compressedResult.originalSize)}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800">
                  <span className="text-[10px] text-gray-450 dark:text-gray-500 uppercase tracking-wider font-bold">Compressed Size</span>
                  <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    {formatBytes(compressedResult.compressedSize)}
                  </p>
                </div>

                <div className="bg-linear-to-br from-blue-600 to-violet-500 px-4 py-3 rounded-xl text-white shadow-xs">
                  <span className="text-[10px] text-white/80 uppercase tracking-wider font-bold">Percentage Saved</span>
                  <p className="text-xs font-black mt-1">
                    {savingRatio}% Shrunk
                  </p>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDownload}
                  icon={<Download className="w-4 h-4" />}
                  className="flex-1 rounded-xl"
                >
                  Download Compressed PDF
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setFileMeta(null);
                    setCompressedResult(null);
                  }}
                  className="rounded-xl font-bold border-gray-200"
                >
                  Compress Another File
                </Button>
              </div>
            </div>
          )}

          {/* Ad Slot */}
          <AdBanner size="leaderboard" className="mt-8" />

          {/* FAQs section */}
          <div className="mt-10 border-t border-gray-100 dark:border-gray-900 pt-8">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Frequently Asked Questions (F.A.Q)
            </h3>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
              {toolInfo.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-900">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    Q: {faq.question}
                  </h4>
                  <p className="text-[11px] text-gray-450 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};
