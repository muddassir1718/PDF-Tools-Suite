import React, { useState } from 'react';
import { ShieldCheck, Unlock, Download, Sparkles, KeyRound, Eye, EyeOff } from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { Button } from '../components/ui/Button';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { FileWithMeta } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { unlockPDF } from '../utils/pdfUtils';
import { downloadBytesAsPDF } from '../utils/fileUtils';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';

export const UnlockPage: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [password, setPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'unlock-pdf')!;

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
    setPassword('');
    showToast('Document loaded successfully. Please enter its password below.', 'info');
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileMeta) return;

    if (!password) {
      showToast('Please enter the decryption password.', 'warning');
      return;
    }

    setIsProcessing(true);
    showToast('Acquiring decoding streams...', 'info');

    try {
      // Execute decryption offline via pdf-lib in browser
      const unlockedBytes = await unlockPDF(fileMeta.file, password);
      showToast('PDF decrypted successfully! Preparing download.', 'success');
      
      const suggestedName = `${fileMeta.name.replace(/\.pdf$/i, '')}_unlocked.pdf`;
      downloadBytesAsPDF(unlockedBytes, suggestedName);
    } catch (err: any) {
      console.error(err);
      showToast('Incorrect password or corrupted PDF file structural headers.', 'error');
    } finally {
      setIsProcessing(false);
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
              <Unlock className="w-5 h-5 shrink-0" />
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
            <span>Password decoding operates entirely off-grid. No keys are ever transmitted over API.</span>
          </div>

          {/* Upload Drop Zone */}
          {!fileMeta ? (
            <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
          ) : (
            <div className="p-5 bg-gray-50 dark:bg-gray-900/45 rounded-2xl border border-gray-200 dark:border-gray-850 flex items-center justify-between mb-8 animate-fadeIn">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-pink-50 dark:bg-pink-950/25 text-pink-600 dark:text-pink-400 rounded-lg">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-4">
                    {fileMeta.name}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 uppercase font-bold tracking-wider">
                    Password Protected PDF
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFileMeta(null);
                  setPassword('');
                }}
                className="font-bold border-gray-200"
              >
                Change File
              </Button>
            </div>
          )}

          {/* Decrypt Password input field Form */}
          {fileMeta && (
            <form onSubmit={handleUnlock} className="border border-gray-250/50 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                Enter Decryption Password
              </h3>

              <div className="space-y-4 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <KeyRound className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter document open password"
                    className="w-full text-xs pl-11 pr-11 py-3.5 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105"
                    disabled={isProcessing}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-655"
                    disabled={isProcessing}
                  >
                    {showPasswordText ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={!password || isProcessing}
                    isLoading={isProcessing}
                    icon={<Unlock className="w-4 h-4" />}
                    className="w-full rounded-xl"
                  >
                    Unlock and Download PDF
                  </Button>
                </div>
              </div>
            </form>
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
