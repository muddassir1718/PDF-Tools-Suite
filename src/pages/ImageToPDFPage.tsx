import React, { useState } from 'react';
import { ShieldCheck, Image as ImageIcon, Download, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { FileCard } from '../components/ui/FileCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { imagesToPDF } from '../utils/pdfUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';

type PageSize = 'A4' | 'LETTER' | 'AUTO';
type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export const ImageToPDFPage: React.FC = () => {
  const [images, setImages] = useState<FileWithMeta[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>('AUTO');
  const [orientation, setOrientation] = useState<Orientation>('PORTRAIT');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'image-to-pdf')!;

  const handleFilesSelected = (newFiles: File[]) => {
    const parsed: FileWithMeta[] = newFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    }));

    setImages((prev) => [...prev, ...parsed]);
    showToast(`${newFiles.length} file(s) loaded. You can reorder them before converting.`, 'success');
  };

  const removeFile = (id: string) => {
    setImages((prev) => prev.filter((im) => im.id !== id));
    showToast('Image removed.', 'info');
  };

  const moveUp = (id: string) => {
    const idx = images.findIndex((img) => img.id === id);
    if (idx === 0) return;
    const clone = [...images];
    const temp = clone[idx];
    clone[idx] = clone[idx - 1];
    clone[idx - 1] = temp;
    setImages(clone);
  };

  const moveDown = (id: string) => {
    const idx = images.findIndex((img) => img.id === id);
    if (idx === images.length - 1) return;
    const clone = [...images];
    const temp = clone[idx];
    clone[idx] = clone[idx + 1];
    clone[idx + 1] = temp;
    setImages(clone);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      showToast('Please upload at least one image file.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(15);
    showToast('Initiating image compilation...', 'info');

    try {
      const resultsBytes = await imagesToPDF(
        images,
        pageSize,
        orientation,
        (percent) => setProgress(percent)
      );

      setProgress(100);
      showToast('PDF compiled successfully! Initializing download.', 'success');

      // Create download
      const blob = new Blob([resultsBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `images_combined_${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err: any) {
      console.error(err);
      showToast('Error encountered during image to PDF conversion.', 'error');
    } finally {
      setIsProcessing(false);
      setProgress(0);
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
            <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-500">
              <ImageIcon className="w-5 h-5 shrink-0" />
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
            <span>Image compilation compiles locally. We never upload your photo coordinates.</span>
          </div>

          {/* Load Drop Zone */}
          <DropZone onFilesSelected={handleFilesSelected} acceptType="images" />

          {images.length > 0 && (
            <div className="mt-8 animate-fadeIn">
              
              {/* Options selectors */}
              <div className="border border-gray-250/50 dark:border-gray-900 rounded-2xl p-5 mb-8">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  PDF Configurations
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Page formats */}
                  <div className="space-y-2">
                    <label className="text-2xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">
                      Page Size Dimensions
                    </label>
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl">
                      {(['AUTO', 'A4', 'LETTER'] as PageSize[]).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPageSize(size)}
                          className={`py-2 px-3 text-2xs font-bold rounded-lg cursor-pointer ${
                            pageSize === size
                              ? 'bg-white dark:bg-gray-850 text-blue-600 dark:text-blue-450 shadow-xs'
                              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          {size === 'AUTO' ? 'Auto-Fit' : size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orientation */}
                  <div className="space-y-2">
                    <label className="text-2xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">
                      Orientation
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl">
                      {(['PORTRAIT', 'LANDSCAPE'] as Orientation[]).map((orient) => (
                        <button
                          key={orient}
                          type="button"
                          disabled={pageSize === 'AUTO'}
                          onClick={() => setOrientation(orient)}
                          className={`py-2 px-3 text-2xs font-bold rounded-lg cursor-pointer ${
                            pageSize === 'AUTO' 
                              ? 'opacity-40 cursor-not-allowed' 
                              : ''
                          } ${
                            orientation === orient && pageSize !== 'AUTO'
                              ? 'bg-white dark:bg-gray-850 text-blue-600 dark:text-blue-450 shadow-xs'
                              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          {orient === 'PORTRAIT' ? 'Portrait ▯' : 'Landscape ▮'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {pageSize === 'AUTO' && (
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-3.5 italic">
                    💡 "Auto-Fit" format scales page sheets to align identically with each image size. Orientation options disabled.
                  </p>
                )}
              </div>

              {/* Dynamic Images list */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Uploaded Photos ({images.length})
                </h2>
                <div className="flex items-center gap-1.5 text-3xs font-bold tracking-wide uppercase text-gray-400">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Arrange sequence order</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {images.map((imgMeta, index) => (
                  <FileCard
                    key={imgMeta.id}
                    fileMeta={imgMeta}
                    onRemove={removeFile}
                    onMoveUp={moveUp}
                    onMoveDown={moveDown}
                    index={index}
                    totalCount={images.length}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-900">
                {isProcessing && (
                  <ProgressBar progress={progress} label="Converting photographs index to vector canvas sheets..." className="mb-6" />
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    isLoading={isProcessing}
                    icon={<Download className="w-4 h-4" />}
                    className="flex-1 rounded-xl"
                  >
                    Convert to PDF
                  </Button>
                  
                  <Button
                    onClick={() => setImages([])}
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

          {/* Ad workspace */}
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
