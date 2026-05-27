import React, { useState } from 'react';
import { ShieldCheck, FileImage, Download, Sparkles, SlidersHorizontal, ImageDown } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { convertPDFToImages, PDFPageImage } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/fileUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';
import JSZip from 'jszip';

type Quality = 'low' | 'medium' | 'high';

export const PDFToJPGPage: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [quality, setQuality] = useState<Quality>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedImages, setConvertedImages] = useState<PDFPageImage[]>([]);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'pdf-to-jpg')!;

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
    setConvertedImages([]);
    showToast('PDF loaded. Ready to split page canvases to JPG.', 'info');
  };

  const handleConvert = async () => {
    if (!fileMeta) return;

    setIsProcessing(true);
    setProgress(5);
    showToast('Initializing PDF pages renderer...', 'info');

    try {
      const results = await convertPDFToImages(fileMeta.file, quality, (percent) => {
        setProgress(percent);
      });

      setConvertedImages(results);
      showToast(`Successfully converted ${results.length} pages to images!`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Error occurred rendering PDF page. Please ensure PDF is not password restricted.', 'error');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownloadZip = async () => {
    if (convertedImages.length === 0 || !fileMeta) return;

    showToast('Compiling ZIP package...', 'info');
    try {
      const zip = new JSZip();
      const baseName = fileMeta.name.replace(/\.pdf$/i, '');

      for (const img of convertedImages) {
        // extract base64 raw bytes
        const base64Data = img.dataUrl.split(',')[1];
        zip.file(`${baseName}_page_${img.pageIndex}.jpg`, base64Data, { base64: true });
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(zipBlob, `${baseName}_pages_jpg.zip`);
      showToast('Download complete!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Could not compile download ZIP.', 'error');
    }
  };

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
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-500">
              <FileImage className="w-5 h-5 shrink-0" />
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
            <span>Core raster conversions compile inside browser canvas context. Your pages are fully secure.</span>
          </div>

          {/* Upload Drop Zone */}
          {!fileMeta ? (
            <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
          ) : (
            <div className="p-5 bg-gray-50 dark:bg-gray-900/45 rounded-2xl border border-gray-200 dark:border-gray-850 flex items-center justify-between mb-8 animate-fadeIn">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-rose-50 dark:bg-rose-950/25 text-rose-600 dark:text-rose-400 rounded-lg">
                  <FileImage className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-4">
                    {fileMeta.name}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-555 mt-0.5 uppercase font-bold tracking-wider">
                    Ready to convert PDF
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFileMeta(null);
                  setConvertedImages([]);
                }}
                className="font-bold border-gray-200"
              >
                Change File
              </Button>
            </div>
          )}

          {/* Option input settings */}
          {fileMeta && convertedImages.length === 0 && (
            <div className="border border-gray-250/50 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Render Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-2xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-2">
                    Output Resolution Quality
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl">
                    {(['low', 'medium', 'high'] as Quality[]).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setQuality(level)}
                        className={`py-2 px-3 text-2xs font-bold rounded-lg cursor-pointer capitalize ${
                          quality === level
                            ? 'bg-white dark:bg-gray-850 text-blue-600 dark:text-blue-450 shadow-xs'
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {level} Quality
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-900">
                  {isProcessing && (
                    <ProgressBar progress={progress} label="Rasterizing PDF page outlines to HTML Canvas..." className="mb-6" />
                  )}

                  <Button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    isLoading={isProcessing}
                    icon={<ImageDown className="w-4 h-4" />}
                    className="w-full rounded-xl"
                  >
                    Generate JPG Pages
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Render preview pages grid */}
          {convertedImages.length > 0 && (
            <div className="mb-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-blue-50/50 dark:bg-blue-955/10 p-4 rounded-2xl border border-blue-105/30">
                <div>
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-400">
                    Compiled {convertedImages.length} Image Pages!
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Select download bundle below to save all pages inside a structured ZIP folder.
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button
                    onClick={handleDownloadZip}
                    icon={<Download className="w-4 h-4" />}
                    className="rounded-xl shrink-0"
                  >
                    Download ZIP Bundle
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setFileMeta(null);
                      setConvertedImages([]);
                    }}
                    className="rounded-xl border-gray-200"
                  >
                    Convert Another
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {convertedImages.map((img) => (
                  <div key={img.pageIndex} className="group relative rounded-xl border border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-900 p-2.5 overflow-hidden shadow-xs hover:border-blue-500 transition-all">
                    <div className="aspect-3/4 rounded-lg bg-white dark:bg-black overflow-hidden relative border border-gray-100 dark:border-gray-850">
                      <img 
                        src={img.dataUrl} 
                        alt={`Page ${img.pageIndex} Thumbnail`} 
                        className="w-full h-full object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400">
                        PAGE {img.pageIndex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ad slot */}
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
