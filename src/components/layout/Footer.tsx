import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-150 dark:border-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Row 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo Brand + Quick bio */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-gray-950 dark:text-white pb-1">
                PDF<span className="text-blue-600">Master</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                Free, secure, and 100% client-side PDF workspace utilities that run entirely on your browser. Never uploads files to cloud databases to preserve confidentiality.
              </p>
            </div>
            
            <div className="bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100/10 p-3 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Private Local Engine</span>
              </div>
              <p className="text-[10px] text-emerald-600/70 dark:text-emerald-450 leading-snug">
                Your file never leaves your device. Data is processed only inside your local CPU and RAM registers.
              </p>
            </div>
          </div>

          {/* Column 2: Conversions list */}
          <div>
            <h3 className="font-extrabold text-gray-950 dark:text-white text-xs uppercase tracking-wider mb-4">
              🔄 Convert PDF
            </h3>
            <ul className="space-y-2 text-[11px] font-semibold text-gray-650 dark:text-gray-400">
              <li><Link to="/pdf-to-word" className="hover:text-blue-600 transition-colors">PDF to Word</Link></li>
              <li><Link to="/word-to-pdf" className="hover:text-blue-600 transition-colors">Word to PDF</Link></li>
              <li><Link to="/pdf-to-excel" className="hover:text-blue-600 transition-colors">PDF to Excel</Link></li>
              <li><Link to="/pdf-to-ppt" className="hover:text-blue-600 transition-colors">PDF to PPT / Presentation</Link></li>
              <li><Link to="/pdf-to-jpg" className="hover:text-blue-600 transition-colors">PDF to JPG images</Link></li>
              <li><Link to="/jpg-to-pdf" className="hover:text-blue-600 transition-colors">JPG to PDF document</Link></li>
              <li><Link to="/pdf-to-png" className="hover:text-blue-600 transition-colors">PDF to PNG frames</Link></li>
              <li><Link to="/pdf-to-html" className="hover:text-blue-600 transition-colors">PDF to HTML Web Page</Link></li>
              <li><Link to="/pdf-to-epub" className="hover:text-blue-600 transition-colors">PDF to EPUB e-Book</Link></li>
              <li><Link to="/png-to-pdf" className="hover:text-blue-600 transition-colors">PNG to PDF converter</Link></li>
              <li><Link to="/excel-to-pdf" className="hover:text-blue-600 transition-colors">Excel to PDF sheet</Link></li>
              <li><Link to="/ppt-to-pdf" className="hover:text-blue-600 transition-colors">PPT to PDF deck</Link></li>
              <li><Link to="/html-to-pdf" className="hover:text-blue-600 transition-colors">HTML Code to PDF</Link></li>
            </ul>
          </div>

          {/* Column 3: Organize & Optimize */}
          <div>
            <h3 className="font-extrabold text-gray-950 dark:text-white text-xs uppercase tracking-wider mb-4">
              🛠️ Organize & Optimize
            </h3>
            <ul className="space-y-2 text-[11px] font-semibold text-gray-650 dark:text-gray-400">
              <li><Link to="/merge-pdf" className="hover:text-blue-600 transition-colors">Merge PDF files</Link></li>
              <li><Link to="/split-pdf" className="hover:text-blue-600 transition-colors">Split PDF ranges</Link></li>
              <li><Link to="/extract-pages" className="hover:text-blue-600 transition-colors">Extract custom pages</Link></li>
              <li><Link to="/delete-pages" className="hover:text-blue-600 transition-colors">Delete unwanted pages</Link></li>
              <li><Link to="/rearrange-pdf" className="hover:text-blue-600 transition-colors">Rearrange pages flow</Link></li>
              <li><Link to="/rotate-pdf" className="hover:text-blue-600 transition-colors">Rotate alignments</Link></li>
              <li><Link to="/crop-pdf" className="hover:text-blue-600 transition-colors">Crop layouts margins</Link></li>
              <li><Link to="/add-page-numbers" className="hover:text-blue-600 transition-colors">Add Header/Footer page numbers</Link></li>
              <li><Link to="/compress-pdf" className="hover:text-blue-600 transition-colors">Compress PDF document</Link></li>
              <li><Link to="/resize-pdf" className="hover:text-blue-600 transition-colors">Resize dimensions</Link></li>
              <li><Link to="/grayscale-pdf" className="hover:text-blue-600 transition-colors">Grayscale B&W filters</Link></li>
              <li><Link to="/flatten-pdf" className="hover:text-blue-600 transition-colors">Flatten form values</Link></li>
            </ul>
          </div>

          {/* Column 4: AI Suite, Edit, OCR & Utilities */}
          <div>
            <h3 className="font-extrabold text-gray-950 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-bounce shrink-0" />
              <span>AI Tools & Edit</span>
            </h3>
            <ul className="space-y-2 text-[11px] font-semibold text-gray-650 dark:text-gray-400">
              <li><Link to="/add-text" className="hover:text-blue-600 transition-colors">Add dynamic text overlays</Link></li>
              <li><Link to="/draw-on-pdf" className="hover:text-blue-600 transition-colors">Freehand Canvas drawing</Link></li>
              <li><Link to="/highlight-pdf" className="hover:text-blue-600 transition-colors">Highlights annotations</Link></li>
              <li><Link to="/watermark-pdf" className="hover:text-blue-600 transition-colors">Stamp custom text watermarks</Link></li>
              <li><Link to="/add-signature" className="hover:text-blue-600 transition-colors">Draw electronic signatures</Link></li>
              <li><Link to="/protect-pdf" className="hover:text-blue-600 transition-colors">Encrypt PDF locks</Link></li>
              <li><Link to="/ai-summarizer" className="text-purple-600 dark:text-purple-400 hover:underline">AI Summarizer bot</Link></li>
              <li><Link to="/chat-with-pdf" className="text-purple-600 dark:text-purple-400 hover:underline">Chat with PDF AI</Link></li>
              <li><Link to="/ocr-pdf" className="hover:text-blue-600 transition-colors">OCR Scans transcription</Link></li>
              <li><Link to="/image-to-text" className="hover:text-blue-600 transition-colors">Image to plain Text OCR</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors block border-t border-gray-100 dark:border-gray-900 pt-2 text-xs font-bold text-gray-800 dark:text-white">About Corporation</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-600 transition-colors text-xs font-bold text-gray-800 dark:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-blue-600 transition-colors text-xs font-bold text-gray-800 dark:text-white">Terms of Usage</Link></li>
            </ul>
          </div>

        </div>

        {/* Dynamic footer copyright and disclaimer */}
        <div className="mt-16 pt-8 border-t border-gray-150 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-450 dark:text-gray-500 font-bold">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p>© 2026 PDFMaster. 100% private. Run locally securely.</p>
            <p className="text-gray-700 dark:text-gray-300 text-[10px] bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800">
              Developed by: <span className="font-extrabold text-blue-600 dark:text-blue-400">MD Muddassir Billah</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>locally using React, WebAssembly & pdf-lib</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
