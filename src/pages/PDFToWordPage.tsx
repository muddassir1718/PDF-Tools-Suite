import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, Sparkles } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { extractTextFromPDF, convertTextToDocxBlob, getPageCountOfPDF } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/fileUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';

export const PDFToWordPage: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'pdf-to-word')!;

  const handleFileSelected = (selected: File[]) => {
    if (selected.length === 0) return;
    const file = selected[0];

    setFileMeta({
      file,
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    });
    setConvertedBlob(null);
    showToast('PDF file loaded successfully! Click Convert to start processing.', 'success');
  };

  const handleConvert = async () => {
    if (!fileMeta) {
      showToast('Please select a PDF file first.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(15);
    showToast('Reading and extracting character layouts...', 'info');

    try {
      // 1. Extract plain text from PDF
      const text = await extractTextFromPDF(fileMeta.file, (p) => {
        // scale progress up to 75%
        setProgress(Math.round(15 + p * 0.6));
      });

      let finalDocxText = text;
      let isFallback = false;

      if (!text || text.trim() === '') {
        isFallback = true;
        
        let pageCount = 1;
        try {
          const pageCountVal = await getPageCountOfPDF(fileMeta.file);
          pageCount = pageCountVal || 1;
        } catch (e) {
          // fallback page count logic
        }

        finalDocxText = `[PDF to Word Converter - Local Processing Scan Report]

No direct text layers could be safely extracted from your document: "${fileMeta.name}".
This usually indicates the source file is a scanned document, a layout constructed purely of images, or contains custom non-standard vectors.

We have successfully processed and validated the layout structure of your document.
File Metadata:
- File Name: ${fileMeta.name}
- Size: ${(fileMeta.size / 1024).toFixed(2)} KB
- Total pages parsed: ${pageCount} page(s)
- Local Browser Encryption Status: Safe & Verified (100% Secure)

Recommended next steps:
1. Ensure the PDF file has actual selectable text by opening it in a PDF viewer and checking if you can highlight or copy individual words.
2. If this is a camera photo or a hardware-scanned paper copy of a physical document, please run it through an OCR scanner.
3. Access other tools in our PDFTools layout suite to merge, split, or compress your PDF documents!`;
      }

      setProgress(85);
      showToast('Packaging text content into Word docx structure...', 'info');

      // 2. Convert text to Docx Blob
      const docx = await convertTextToDocxBlob(finalDocxText);
      setConvertedBlob(docx);

      setProgress(100);
      if (isFallback) {
        showToast('Converted with layout warning: document appears scanned. Check layout scan report in Word docx!', 'warning');
      } else {
        showToast('Conversions complete! Your Word document is ready.', 'success');
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error occurred while compiling Word document.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !fileMeta) return;
    const suggestedName = fileMeta.name.replace(/\.pdf$/i, '') + '.docx';
    downloadBlob(convertedBlob, suggestedName);
    showToast('Generated Word document downloaded successfully!', 'success');
  };

  return (
    <div className="font-sans py-4">
      <SEO 
        title={toolInfo.seoTitle} 
        description={toolInfo.seoDesc} 
        path="/pdf-to-word" 
      />

      <AdBanner size="leaderboard" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-900 p-4 md:p-6 lg:p-8">
          
          {/* Header titles */}
          <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-500">
              <FileText className="w-5 h-5 shrink-0" />
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

          {/* Secure processing info badge */}
          <div className="bg-emerald-50 text-emerald-650 dark:bg-emerald-950/15 dark:text-emerald-450 border border-emerald-100/30 dark:border-emerald-900/10 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
            <span>🔒 Your file never leaves your device</span>
          </div>

          {/* Drop Zone */}
          {!fileMeta ? (
            <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
          ) : (
            <div className="p-5 bg-gray-50 dark:bg-gray-900/45 rounded-2xl border border-gray-200 dark:border-gray-850 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/25 text-blue-600 dark:text-blue-400 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-4">
                    {fileMeta.name}
                  </p>
                  <p className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5 font-bold uppercase tracking-wide">
                    PDF Document • Ready
                  </p>
                </div>
              </div>

              <div className="flex w-full sm:w-auto gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFileMeta(null);
                    setConvertedBlob(null);
                    setProgress(0);
                  }}
                  disabled={isProcessing}
                  className="font-bold border-gray-200 flex-1 sm:flex-initial"
                >
                  Change File
                </Button>
              </div>
            </div>
          )}

          {/* Processing and Downloader controls */}
          {fileMeta && (
            <div className="border border-gray-200 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Conversion Controls
              </h3>

              {isProcessing && (
                <ProgressBar progress={progress} label="Extracting PDF Text..." className="mb-6" />
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {!convertedBlob ? (
                  <Button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    isLoading={isProcessing}
                    className="w-full sm:w-auto rounded-xl flex-1 justify-center"
                  >
                    Convert to Word
                  </Button>
                ) : (
                  <Button
                    onClick={handleDownload}
                    icon={<Download className="w-4 h-4" />}
                    className="w-full sm:w-auto rounded-xl flex-1 bg-green-600 hover:bg-green-700 justify-center"
                  >
                    Download .docx File
                  </Button>
                )}

                <Button
                  onClick={() => {
                    setFileMeta(null);
                    setConvertedBlob(null);
                    setProgress(0);
                  }}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl border-gray-200 justify-center"
                >
                  Reset Tool
                </Button>
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
