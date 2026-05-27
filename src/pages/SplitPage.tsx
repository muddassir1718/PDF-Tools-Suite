import React, { useState } from 'react';
import { ShieldCheck, Scissors, Download, Sparkles, SlidersHorizontal, Layers, FolderHeart } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { splitPDF, getPageCountOfPDF } from '../utils/pdfUtils';
import { downloadBytesAsPDF, downloadBlob } from '../utils/fileUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';
import JSZip from 'jszip';

type SplitMode = 'range' | 'every' | 'extract';

export const SplitPage: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [splitMode, setSplitMode] = useState<SplitMode>('range');
  const [ranges, setRanges] = useState('');
  const [everyN, setEveryN] = useState(1);
  const [pages, setPages] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'split-pdf')!;

  const handleFileSelected = async (selected: File[]) => {
    if (selected.length === 0) return;
    const file = selected[0]; // Split only supports 1 PDF
    showToast('Loading PDF document metadata...', 'info');

    let pageCount = 1;
    try {
      pageCount = await getPageCountOfPDF(file);
      showToast('PDF loaded successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error occurred reading file. It might be encrypted.', 'error');
    }

    setFileMeta({
      file,
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
      pageCount,
    });
    
    // Auto populate defaults
    setRanges(`1-${pageCount}`);
    setPages('1,3');
  };

  const handleSplit = async () => {
    if (!fileMeta) {
      showToast('Please upload a PDF file first.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    showToast('Processing split operation...', 'info');

    try {
      const results = await splitPDF(
        fileMeta.file,
        splitMode,
        { ranges, everyN, pages },
        (percent) => setProgress(percent)
      );

      if (results.length === 0) {
        throw new Error('No pages matched your splitting parameters.');
      }

      showToast('Compiling split outputs...', 'success');

      if (results.length === 1) {
        // Direct download single file
        downloadBytesAsPDF(results[0].bytes, results[0].name);
        showToast('Download complete!', 'success');
      } else {
        // Build a zip client-side
        const zip = new JSZip();
        for (const item of results) {
          zip.file(item.name, item.bytes);
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const suggestedZIPName = `${fileMeta.name.replace(/\.pdf$/i, '')}_split_bundle.zip`;
        downloadBlob(zipBlob, suggestedZIPName);
        showToast(`ZIP downloaded containing ${results.length} files.`, 'success');
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error splitting PDF. Inspect parameters and try again.', 'error');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Schema structured JSON-LD format
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Split PDF pages',
    'description': 'Extract specific ranges or convert each PDF page into separate PDFs.',
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Choose PDF file',
        'text': 'Ingest a file onto the split PDF canvas.'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Choose split config',
        'text': 'Pick range patterns like "1-3,4-8" or "every N pages".'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Download outputs',
        'text': 'Gather your resulting single file or a ZIP bundle instantly.'
      }
    ]
  };

  return (
    <div className="font-sans py-4">
      <SEO 
        title={toolInfo.seoTitle} 
        description={toolInfo.seoDesc} 
        path={toolInfo.path}
        schema={howToSchema}
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Core Workspace Wrapper */}
        <div className="flex-1 w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-3xl p-6 shadow-xs">
          
          {/* Header titles */}
          <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-500">
              <Scissors className="w-5 h-5 shrink-0" />
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
            <span>File split compiles locally on your CPU. Data is 100% safeguarded offline.</span>
          </div>

          {/* Load Drop Zone */}
          {!fileMeta ? (
            <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
          ) : (
            <div className="p-5 bg-gray-50 dark:bg-gray-900/45 rounded-2xl border border-gray-200 dark:border-gray-850 flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/25 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <Scissors className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-4">
                    {fileMeta.name}
                  </p>
                  <p className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5 font-bold uppercase tracking-wide">
                    {fileMeta.pageCount} page{fileMeta.pageCount !== 1 ? 's' : ''} • Ready
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setFileMeta(null)}
                className="font-bold border-gray-200"
              >
                Change File
              </Button>
            </div>
          )}

          {/* Config Area */}
          {fileMeta && (
            <div className="border border-gray-250/50 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                Configure Split Parameters
              </h3>

              {/* Mode Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900 p-1.5 rounded-xl border border-gray-100 dark:border-gray-850 mb-6">
                <button
                  onClick={() => setSplitMode('range')}
                  className={`py-2 px-3.5 rounded-lg text-2xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    splitMode === 'range'
                      ? 'bg-white dark:bg-gray-850 text-blue-600 dark:text-blue-450 shadow-xs'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                  <span>Split by Range</span>
                </button>

                <button
                  onClick={() => setSplitMode('every')}
                  className={`py-2 px-3.5 rounded-lg text-2xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    splitMode === 'every'
                      ? 'bg-white dark:bg-gray-850 text-blue-600 dark:text-blue-450 shadow-xs'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>Split Every N</span>
                </button>

                <button
                  onClick={() => setSplitMode('extract')}
                  className={`py-2 px-3.5 rounded-lg text-2xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    splitMode === 'extract'
                      ? 'bg-white dark:bg-gray-850 text-blue-600 dark:text-blue-450 shadow-xs'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FolderHeart className="w-3.5 h-3.5 shrink-0" />
                  <span>Extract Pages</span>
                </button>
              </div>

              {/* Range Inputs */}
              {splitMode === 'range' && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="text-2xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Enter Page Ranges (e.g. 1-3, 4-6)
                  </label>
                  <input
                    type="text"
                    value={ranges}
                    onChange={(e) => setRanges(e.target.value)}
                    placeholder={`e.g. 1-2, 3-${fileMeta.pageCount}`}
                    className="w-full text-xs py-3 px-4 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105"
                  />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    Creates separate PDF parts spanning requested pages. Maximum page is {fileMeta.pageCount}.
                  </p>
                </div>
              )}

              {/* Every N Inputs */}
              {splitMode === 'every' && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="text-2xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Split every N page(s)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={fileMeta.pageCount}
                      value={everyN}
                      onChange={(e) => setEveryN(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 text-center text-xs py-3 px-4 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105"
                    />
                    <span className="text-xs text-gray-450 dark:text-gray-400 font-medium">
                      pages. The document will be sliced into parts of {everyN} page{everyN !== 1 ? 's' : ''}.
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 pt-1">
                    Split indices: {Array.from({ length: Math.ceil((fileMeta.pageCount || 1) / everyN) })
                      .map((_, i) => `${i * everyN + 1}-${Math.min((i + 1) * everyN, fileMeta.pageCount || 1)}`)
                      .slice(0, 5)
                      .join(', ')}
                    {Math.ceil((fileMeta.pageCount || 1) / everyN) > 5 ? '...' : ''}
                  </p>
                </div>
              )}

              {/* Extract Inputs */}
              {splitMode === 'extract' && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="text-2xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Enter specific page numbers (e.g. 1, 3, 5)
                  </label>
                  <input
                    type="text"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    placeholder="e.g. 1, 3, 5, 7"
                    className="w-full text-xs py-3 px-4 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105"
                  />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    Extracts pages into one compiled PDF document. Valid boundaries: 1 to {fileMeta.pageCount}.
                  </p>
                </div>
              )}

              {/* Action Controls */}
              <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-900">
                {isProcessing && (
                  <ProgressBar progress={progress} label="Slicing pages stream..." className="mb-6" />
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleSplit}
                    disabled={isProcessing}
                    isLoading={isProcessing}
                    icon={<Download className="w-4 h-4" />}
                    className="flex-1 rounded-xl"
                  >
                    Split PDF
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setFileMeta(null);
                      setRanges('');
                      setPages('');
                    }}
                    disabled={isProcessing}
                    variant="outline"
                    className="rounded-xl border-gray-200"
                  >
                    Reset Action
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Ad banners below downloader */}
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

        {/* Sidebar Switch Navigation */}
        <Sidebar />
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};
