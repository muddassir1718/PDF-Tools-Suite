import React, { useState } from 'react';
import { ShieldCheck, Combine, Download, Sparkles, PlusCircle } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { FileCard } from '../components/ui/FileCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { mergePDFs, getPageCountOfPDF } from '../utils/pdfUtils';
import { downloadBytesAsPDF } from '../utils/fileUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';

export const MergePage: React.FC = () => {
  const [files, setFiles] = useState<FileWithMeta[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toasts, showToast, removeToast } = useToast();

  const toolInfo = toolsRegistry.find((t) => t.id === 'merge-pdf')!;

  const handleFilesSelected = async (newFiles: File[]) => {
    const parsed: FileWithMeta[] = [];
    showToast(`Adding ${newFiles.length} file(s)...`, 'info');

    for (const file of newFiles) {
      const id = Math.random().toString(36).substring(2, 9);
      let pageCount: number | undefined;
      
      try {
        pageCount = await getPageCountOfPDF(file);
      } catch (err) {
        showToast(`Could not count pages for ${file.name}. It might be protected.`, 'warning');
      }

      parsed.push({
        file,
        id,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'pending',
        pageCount,
      });
    }

    setFiles((prev) => [...prev, ...parsed]);
    showToast('Files added successfully. Reorder as needed.', 'success');
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    showToast('File removed from list.', 'info');
  };

  const moveUp = (id: string) => {
    const idx = files.findIndex((f) => f.id === id);
    if (idx === 0) return;
    const clone = [...files];
    const temp = clone[idx];
    clone[idx] = clone[idx - 1];
    clone[idx - 1] = temp;
    setFiles(clone);
  };

  const moveDown = (id: string) => {
    const idx = files.findIndex((f) => f.id === id);
    if (idx === files.length - 1) return;
    const clone = [...files];
    const temp = clone[idx];
    clone[idx] = clone[idx + 1];
    clone[idx + 1] = temp;
    setFiles(clone);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      showToast('Please upload at least 2 PDF files to merge.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    showToast('Starting PDF compilation...', 'info');

    try {
      const actualFiles = files.map((f) => f.file);
      const mergedBytes = await mergePDFs(actualFiles, (percent) => {
        setProgress(percent);
      });

      setProgress(100);
      showToast('PDF compilation complete! Downloading merged PDF.', 'success');
      
      const suggestedName = `merged_${Date.now()}.pdf`;
      downloadBytesAsPDF(mergedBytes, suggestedName);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error occurred during PDF merge operation.', 'error');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const totalPages = files.reduce((acc, current) => acc + (current.pageCount || 0), 0);

  // HowTo Schema Markup
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Merge PDF Files',
    'description': 'Combine multiple PDFs into a single document on your device.',
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Upload files',
        'text': 'Drag and drop multiple PDF files into our secure WebAssembly upload card.'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Reorder and organize',
        'text': 'Reorder documents using the arrow keys so they merge in perfect chronological order.'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Merge and download',
        'text': 'Click "Merge PDF" to execute local compilation and download the output PDF.'
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

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Core Workspace Wrapper */}
        <div className="flex-1 w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-3xl p-6 shadow-xs">
          
          {/* Header titles */}
          <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-500">
              <Combine className="w-5 h-5 shrink-0" />
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
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-650 shrink-0" />
            <span>Files stay entirely inside your browser memory. We never transmit them client-to-cloud.</span>
          </div>

          {/* Upload Drop Zone */}
          <DropZone onFilesSelected={handleFilesSelected} acceptType="pdf" />

          {/* Dynamic Loaded File list */}
          {files.length > 0 && (
            <div className="mt-8 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Uploaded files ({files.length})
                </h2>
                <span className="text-xs text-blue-600 dark:text-blue-450 font-bold bg-blue-50 dark:bg-blue-950/30 px-2 rounded-md">
                  Total pages: {totalPages}
                </span>
              </div>

              <div className="space-y-2.5">
                {files.map((fileMeta, idx) => (
                  <FileCard
                    key={fileMeta.id}
                    fileMeta={fileMeta}
                    onRemove={removeFile}
                    onMoveUp={moveUp}
                    onMoveDown={moveDown}
                    index={idx}
                    totalCount={files.length}
                  />
                ))}
              </div>

              {/* Convert Trigger and Progress */}
              <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-900">
                {isProcessing && (
                  <ProgressBar progress={progress} label="Merging and saving objects streams..." className="mb-6" />
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleMerge}
                    disabled={files.length < 2 || isProcessing}
                    isLoading={isProcessing}
                    icon={<Download className="w-4 h-4" />}
                    className="flex-1 rounded-xl"
                  >
                    Merge PDF Document
                  </Button>
                  
                  <Button
                    onClick={() => setFiles([])}
                    disabled={isProcessing}
                    variant="outline"
                    className="rounded-xl font-bold border-gray-200"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Ad banner inside converter layout */}
          <AdBanner size="leaderboard" className="mt-8" />

          {/* FAQ Sections */}
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

        {/* Sidebar Navigations */}
        <Sidebar />
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};
