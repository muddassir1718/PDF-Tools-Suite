import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, Sparkles, Copy, Check, CheckCircle2 } from 'lucide-react';
import { DropZone } from '../ui/DropZone';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { FileWithMeta } from '../../types';
import { useToast } from '../../hooks/useToast';
import { loadPdfjs } from '../../utils/imageUtils';
import { downloadBlob, formatBytes, checkFileSizeLimit } from '../../utils/fileUtils';
import { toolsRegistry } from '../../utils/toolRegistry';

export const PDFToText: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [copied, setCopied] = useState(false);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'pdf-to-text')!;

  const handleFileSelected = (selected: File[]) => {
    if (selected.length === 0) return;
    const file = selected[0];

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (ext !== 'pdf') {
       showToast('Invalid file format. Text extraction only accommodates PDF source documents.', 'error');
       return;
    }

    if (!checkFileSizeLimit(file, 100)) {
       showToast('Warning: High density documents will require substantial rendering memory processing pages.', 'warning');
    }

    setFileMeta({
      file,
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    });
    setExtractedText('');
    setCopied(false);
    showToast('PDF loaded! Tap Extract to begin character stream compilation.', 'success');
  };

  const handleExtractText = async () => {
    if (!fileMeta) {
      showToast('Please upload a PDF file first.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    showToast('Booting PDF text layout layer parser...', 'info');

    try {
      await loadPdfjs();
      const pdfjsLib = (window as any).pdfjsLib;
      const arrayBuffer = await fileMeta.file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let compiledText = '';

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');

        compiledText += `--- Page ${i} ---\n${pageText || '[No readable text layers on this page]'}\n\n`;
        setProgress(Math.round(10 + (i / numPages) * 90));
      }

      setExtractedText(compiledText);
      showToast('Character parsing succeeded! Text is ready for preview.', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error occurred while compiling selectable text structures.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText)
      .then(() => {
        setCopied(true);
        showToast('Text copied to your device clipboard!', 'success');
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((e) => {
        console.error(e);
        showToast('Clipboard permissions denied. Select all and copy manually.', 'warning');
      });
  };

  const handleDownloadTxt = () => {
    if (!extractedText || !fileMeta) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const outputName = fileMeta.name.replace(/\.pdf$/i, '') + '.txt';
    downloadBlob(blob, outputName);
    showToast('Text document downloaded successfully!', 'success');
  };

  // Safe metrics generators
  const charCount = extractedText ? extractedText.length : 0;
  const wordCount = extractedText 
    ? extractedText.replace(/[\s\r\n]+/g, ' ').trim().split(' ').filter(Boolean).length 
    : 0;

  return (
    <div className="w-full font-sans">
      {/* Tool Header Title with Icon */}
      <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400">
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

      {/* Security Shield badge */}
      <div className="bg-emerald-50 text-emerald-650 dark:bg-emerald-950/15 dark:text-emerald-450 border border-emerald-100/30 dark:border-emerald-900/10 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6">
        <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
        <span>🔒 Your file never leaves your device</span>
      </div>

      {/* Drop Zone Upload Box */}
      {!fileMeta ? (
        <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
      ) : (
        <div className="p-5 bg-gray-50 dark:bg-gray-905 rounded-2xl border border-gray-200 dark:border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
            <div className="p-2 bg-cyan-100/70 dark:bg-cyan-950/25 text-cyan-600 dark:text-cyan-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-4">
                {fileMeta.name}
              </p>
              <p className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5 font-bold uppercase tracking-wide">
                PDF Document • {formatBytes(fileMeta.size)} • Ready
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFileMeta(null);
                setExtractedText('');
                setProgress(0);
              }}
              disabled={isProcessing}
              className="font-bold border-gray-200 dark:border-gray-800 flex-1 sm:flex-initial"
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Live extraction panel and preview state */}
      {fileMeta && (
        <div className="border border-gray-200 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
          <h3 className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider mb-4">
            Text Extraction Controls
          </h3>

          {isProcessing && (
            <ProgressBar progress={progress} label="Mapping layout text channels..." className="mb-6" />
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {!extractedText ? (
              <Button
                onClick={handleExtractText}
                disabled={isProcessing}
                isLoading={isProcessing}
                className="w-full sm:w-auto rounded-xl flex-1 justify-center font-bold bg-cyan-600 hover:bg-cyan-750 active:scale-95 text-white"
              >
                Extract All Text
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={handleDownloadTxt}
                  icon={<Download className="w-4 h-4" />}
                  className="w-full sm:w-auto rounded-xl flex-1 bg-green-600 hover:bg-green-700 justify-center font-bold"
                >
                  Download .txt File
                </Button>
                <Button
                  onClick={handleCopyToClipboard}
                  variant="outline"
                  icon={copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  className="w-full sm:w-auto rounded-xl flex-1 justify-center font-bold border-gray-200 dark:border-gray-800"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
              </div>
            )}

            <button
              onClick={() => {
                setFileMeta(null);
                setExtractedText('');
                setProgress(0);
                setCopied(false);
              }}
              disabled={isProcessing}
              className="px-5 py-3 h-11 border border-gray-200 text-gray-700 dark:border-gray-850 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 text-xs font-bold shadow-xs flex items-center justify-center transition-all bg-white dark:bg-transparent shrink-0"
            >
              Reset
            </button>
          </div>

          {/* Extracted preview window with statistics counts */}
          {extractedText && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 dark:text-gray-400 bg-gray-55/40 dark:bg-gray-900/40 p-3 rounded-xl border border-gray-100 dark:border-gray-900">
                <div className="flex gap-4">
                  <span>Characters count: <strong className="text-gray-900 dark:text-white font-black">{charCount}</strong></span>
                  <span>Words count: <strong className="text-gray-900 dark:text-white font-black">{wordCount}</strong></span>
                </div>
                <span className="text-green-500 dark:text-green-455 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Parsed Securely
                </span>
              </div>

              {/* Live Preview Textarea */}
              <div className="relative">
                <textarea
                  readOnly
                  value={extractedText}
                  className="w-full h-80 p-4 border border-gray-200 dark:border-gray-850 dark:bg-gray-950 dark:text-gray-100 rounded-2xl text-xs font-mono focus:outline-hidden resize-none overflow-y-auto leading-relaxed shadow-inner"
                  placeholder="Extracted character layouts will load right here..."
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAQs list details */}
      <div className="mt-10 border-t border-gray-100 dark:border-gray-950 pt-8">
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          Frequently Asked Questions (F.A.Q)
        </h3>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {toolInfo.faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-905">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Q: {faq.question}
              </h4>
              <p className="text-[11px] text-gray-450 dark:text-gray-400 mt-1.5 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
