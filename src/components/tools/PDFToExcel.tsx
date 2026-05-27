import React, { useState } from 'react';
import { ShieldCheck, Table2, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { DropZone } from '../ui/DropZone';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { FileWithMeta } from '../../types';
import { useToast } from '../../hooks/useToast';
import { extractAndStructurePDFForExcel } from '../../utils/pdfUtils';
import { downloadBlob, formatBytes, checkFileSizeLimit } from '../../utils/fileUtils';
import { toolsRegistry } from '../../utils/toolRegistry';
import * as XLSX from 'xlsx';

export const PDFToExcel: React.FC = () => {
  const [fileMeta, setFileMeta] = useState<FileWithMeta | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedSpreadsheet, setConvertedSpreadsheet] = useState<Blob | null>(null);

  const { toasts, showToast, removeToast } = useToast();
  const toolInfo = toolsRegistry.find((t) => t.id === 'pdf-to-excel')!;

  const handleFileSelected = (selected: File[]) => {
    if (selected.length === 0) return;
    const file = selected[0];

    // Check extension
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (ext !== 'pdf') {
       showToast('Invalid file format. Please upload a PDF file.', 'error');
       return;
    }

    // Check if file is too large (> 100MB)
    if (!checkFileSizeLimit(file, 100)) {
       showToast('Warning: This file exceeds 100MB. High memory extraction might lag your browser.', 'warning');
    }

    setFileMeta({
      file,
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    });
    setConvertedSpreadsheet(null);
    showToast('PDF loaded successfully! Click Convert to reconstruct columns and layout into Excel.', 'success');
  };

  const handleConvert = async () => {
    if (!fileMeta) {
      showToast('Please upload a PDF document first.', 'warning');
      return;
    }

    setIsProcessing(true);
    setProgress(15);
    showToast('Analyzing tabular coordinates and text flows...', 'info');

    try {
      // Extract structured 2D text coordinates array from PDF page nodes
      const spreadsheetRows = await extractAndStructurePDFForExcel(fileMeta.file, (p) => {
        // scale progress up to 80%
        setProgress(Math.round(15 + p * 0.65));
      });

      setProgress(85);
      showToast('Compiling cell arrays into dynamic worksheets...', 'info');

      // Build XLSX Document
      const worksheet = XLSX.utils.aoa_to_sheet(spreadsheetRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Extracted Data');

      // Generate binary octet buffer representation
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      setConvertedSpreadsheet(excelBlob);
      setProgress(100);
      showToast('Spreadsheet compiled successfully! Ready for download.', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error occurred during spreadsheet generation.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedSpreadsheet || !fileMeta) return;
    const outputName = fileMeta.name.replace(/\.pdf$/i, '') + '.xlsx';
    downloadBlob(convertedSpreadsheet, outputName);
    showToast('Excel file downloaded successfully!', 'success');
  };

  return (
    <div className="w-full">
      {/* Upper header title with icon */}
      <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
        <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-500">
          <Table2 className="w-5 h-5 shrink-0" />
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

      {/* Security notice badge */}
      <div className="bg-emerald-50 text-emerald-650 dark:bg-emerald-950/15 dark:text-emerald-450 border border-emerald-100/30 dark:border-emerald-900/10 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6">
        <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
        <span>🔒 Your file never leaves your device</span>
      </div>

      {/* Main Drag Drop Zone */}
      {!fileMeta ? (
        <DropZone onFilesSelected={handleFileSelected} acceptType="pdf" multiple={false} />
      ) : (
        <div className="p-5 bg-gray-50 dark:bg-gray-905 rounded-2xl border border-gray-200 dark:border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
            <div className="p-2 bg-green-50 dark:bg-green-950/25 text-green-600 dark:text-green-400 rounded-lg">
              <Table2 className="w-5 h-5" />
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
                setConvertedSpreadsheet(null);
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

      {/* Convert processing / download controls */}
      {fileMeta && (
        <div className="border border-gray-200 dark:border-gray-900 rounded-2xl p-5 mb-8 animate-fadeIn">
          <h3 className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider mb-4">
            Spreadsheet Settings
          </h3>

          {isProcessing && (
            <ProgressBar progress={progress} label="Extracting spreadsheet tables..." className="mb-6" />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {!convertedSpreadsheet ? (
              <Button
                onClick={handleConvert}
                disabled={isProcessing}
                isLoading={isProcessing}
                className="w-full sm:w-auto rounded-xl flex-1 justify-center font-bold bg-green-650 hover:bg-green-700 hover:shadow-md transition-all active:scale-[0.99] text-white"
              >
                Convert to Excel
              </Button>
            ) : (
              <Button
                onClick={handleDownload}
                icon={<Download className="w-4 h-4" />}
                className="w-full sm:w-auto rounded-xl flex-1 bg-green-605 hover:bg-green-700 justify-center font-bold"
              >
                Download Spreadsheet
              </Button>
            )}

            <button
              onClick={() => {
                setFileMeta(null);
                setConvertedSpreadsheet(null);
                setProgress(0);
              }}
              disabled={isProcessing}
              className="px-5 py-3 h-11 border border-gray-200 text-gray-700 dark:border-gray-850 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 text-xs font-bold shadow-xs flex items-center justify-center transition-all bg-white dark:bg-transparent"
            >
              Reset Tool
            </button>
          </div>

          {convertedSpreadsheet && (
            <div className="mt-4 flex items-center gap-2 bg-emerald-50/50 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl border border-emerald-100/10">
              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
              <span className="text-[11px] font-bold">PDF to Excel file parsing succeeded. Tap Dowload above to save!</span>
            </div>
          )}
        </div>
      )}

      {/* FAQs details below */}
      <div className="mt-10 border-t border-gray-100 dark:border-gray-950 pt-8">
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          Frequently Asked Questions (F.A.Q)
        </h3>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {toolInfo.faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-950">
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
