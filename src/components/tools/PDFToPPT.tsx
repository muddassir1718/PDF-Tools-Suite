import React, { useState } from 'react';
import { ShieldCheck, Presentation, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { DropZone } from '../ui/DropZone';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { FileWithMeta } from '../../types';
import { useToast } from '../../hooks/useToast';
import { loadPdfjs } from '../../utils/imageUtils';
import { downloadBlob, formatBytes, checkFileSizeLimit } from '../../utils/fileUtils';
import { toolsRegistry } from '../../utils/toolRegistry';
import pptxgen from 'pptxgenjs';

export const PDFToPPT: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [convertedPPT, setConvertedPPT] = useState<Blob | null>(null);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'pdf-to-ppt')!;

  const handleFileSelected = (selected: File[]) => {
    if (selected.length === 0) return;
    const file = selected[0];

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (ext !== 'pdf') {
       showToast('Invalid file format. PowerPoint converter only templates PDF sources.', 'error');
       return;
    }

    if (!checkFileSizeLimit(file, 100)) {
       showToast('Warning: Extremely large PDF files may require significant canvas render memory.', 'warning');
    }

    setFileMeta({
      file,
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    });
    setConvertedPPT(null);
    setCurrentStep('');
    showToast('PDF slides uploaded successfully! Tap Convert to generate presentation slides.', 'success');
  };

  const handleConvert = async () => {
    if (!fileMeta) {
      showToast('Please upload a PDF file first.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    setCurrentStep('Initializing PDF presentation engines...');
    showToast('Booting slide compiler...', 'info');

    try {
      // 1. Initialize pdf.js
      await loadPdfjs();
      const pdfjsLib = (window as any).pdfjsLib;
      const arrayBuffer = await fileMeta.file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      // 2. Initialize pptxgenjs slide deck
      const pptxDeck = new pptxgen();
      pptxDeck.layout = 'LAYOUT_WIDE'; // widescreen 16:9

      // 3. Render and capture each page to ppt slide
      for (let i = 1; i <= numPages; i++) {
        setCurrentStep(`Rendering page ${i} of ${numPages} onto canvas context...`);
        const percent = Math.round((i / numPages) * 85);
        setProgress(Math.max(10, percent));

        const page = await pdf.getPage(i);
        // Ask scale 1.5 as per specification for optimum sharpness
        const viewport = page.getViewport({ scale: 1.5 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;

        const canvasDataURL = canvas.toDataURL('image/png', 0.9);

        // Map as wide slide image cover
        const slide = pptxDeck.addSlide();
        slide.addImage({
          data: canvasDataURL,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
        });
      }

      setCurrentStep('Packaging binary pptx slide bundles...');
      setProgress(90);

      // Write presentation pack directly as Blob to protect sandboxing outputs
      const pptxData = await pptxDeck.write('blob' as any) as Blob;
      setConvertedPPT(pptxData);
      
      setProgress(100);
      setCurrentStep('PowerPoint compilation completed successfully!');
      showToast('Conversion complete! Click Download to open your slides.', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error occurred during PowerPoint slide generations.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedPPT || !fileMeta) return;
    const outputName = fileMeta.name.replace(/\.pdf$/i, '') + '.pptx';
    downloadBlob(convertedPPT, outputName);
    showToast('PowerPoint deck downloaded!', 'success');
  };

  return (
    <div className="w-full">
      {/* Header element */}
      <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
        <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-500">
          <Presentation className="w-5 h-5 shrink-0" />
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

      {/* Encrypted security notice */}
      <div className="bg-emerald-50 text-emerald-650 dark:bg-emerald-950/15 dark:text-emerald-450 border border-emerald-100/30 dark:border-emerald-900/10 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6">
        <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
        <span>🔒 Your file never leaves your device</span>
      </div>

      {/* Drop Zone */}
      {!fileMeta ? (
        <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
      ) : (
        <div className="p-5 bg-gray-50 dark:bg-gray-905 rounded-2xl border border-gray-200 dark:border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
            <div className="p-2 bg-orange-50 dark:bg-orange-950/25 text-orange-600 dark:text-orange-400 rounded-lg">
              <Presentation className="w-5 h-5" />
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
                setConvertedPPT(null);
                setProgress(0);
                setCurrentStep('');
              }}
              disabled={isProcessing}
              className="font-bold border-gray-200 dark:border-gray-800 flex-1 sm:flex-initial"
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Compiler Trigger actions & download panel */}
      {fileMeta && (
        <div className="border border-gray-200 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
          <h3 className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider mb-4">
            Slide Deck Parameters
          </h3>

          {isProcessing && (
            <ProgressBar 
              progress={progress} 
              label={currentStep || "Processing PowerPoint slides..."} 
              className="mb-6" 
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {!convertedPPT ? (
              <Button
                onClick={handleConvert}
                disabled={isProcessing}
                isLoading={isProcessing}
                className="w-full sm:w-auto rounded-xl flex-1 justify-center font-bold bg-orange-500 hover:bg-orange-600 hover:shadow-md transition-all text-white"
              >
                Convert to PPT
              </Button>
            ) : (
              <Button
                onClick={handleDownload}
                icon={<Download className="w-4 h-4" />}
                className="w-full sm:w-auto rounded-xl flex-1 bg-green-600 hover:bg-green-700 justify-center font-bold text-white"
              >
                Download PowerPoint
              </Button>
            )}

            <button
              onClick={() => {
                setFileMeta(null);
                setConvertedPPT(null);
                setProgress(0);
                setCurrentStep('');
              }}
              disabled={isProcessing}
              className="px-5 py-3 h-11 border border-gray-200 text-gray-700 dark:border-gray-850 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 text-xs font-bold shadow-xs flex items-center justify-center transition-all bg-white dark:bg-transparent"
            >
              Reset Tool
            </button>
          </div>

          {convertedPPT && (
            <div className="mt-4 flex items-center gap-2 bg-emerald-50/50 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl border border-emerald-100/10">
              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
              <span className="text-[11px] font-bold">Successfully transformed PDF slides into standard 16:9 PowerPoint structure. Enjoy!</span>
            </div>
          )}
        </div>
      )}

      {/* FAQs details block */}
      <div className="mt-10 border-t border-gray-100 dark:border-gray-950 pt-8 font-sans">
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          Frequently Asked Questions (F.A.Q)
        </h3>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {toolInfo.faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-950 font-sans">
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
