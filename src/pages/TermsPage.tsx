import React from 'react';
import { ShieldCheck, Scale, AlertOctagon } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="font-sans py-8 max-w-3xl mx-auto leading-relaxed">
      <SEO 
        title="Terms of Service - PDFTools Suite" 
        description="Read the standard terms of service governing the utilization of our local browser PDF suite."
        path="/terms-of-service"
      />

      <article className="prose dark:prose-invert">
        <h1 className="text-2xl sm:text-3.5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-450 dark:text-gray-500">Last updated: May 27, 2026</p>

        <section className="mt-8 space-y-6 text-xs text-gray-550 dark:text-gray-400 font-medium leading-relaxed">
          <p>
            Welcome to PDFTools Suite. By interacting with, loading, or converting files using this platform, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">1. Acceptable Use License</h2>
          <p>
            You are granted a free, non-exclusive, fully revocable license to utilize PDFTools Suite for personal, academic, or commercial document conversions. You may compile and download unlimited files.
          </p>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">2. Zero Server Database Liability</h2>
          <p>
            Because this application runs 100% locally on your computer using web drivers and browser memory, <strong className="font-bold text-gray-800 dark:text-gray-200">PDFTools Suite holds zero files, registers, or data vaults</strong>. Consequently, we cannot recover lost client documents, alter split structures, or access processed files. 
          </p>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/15 border border-amber-100 dark:border-amber-900/30 rounded-xl flex items-start gap-3 my-6">
            <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-450 leading-relaxed">Disclaimer of Warranties</h4>
              <p className="text-[11px] text-amber-653 dark:text-amber-400 mt-1">
                The software, converters, and libraries are provided on an "AS IS" and "AS AVAILABLE" basis, without warranty of any kind, whether express or implied. Under no circumstances shall authors or copyright holders be held liable for any damages or software delays.
              </p>
            </div>
          </div>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">3. Intellectual Property Rights</h2>
          <p>
            The custom design code, layout templates, CSS structures, brand names, and logo graphics are the proprietary intellectual property of PDFTools Suite. All imported libraries (such as `pdf-lib`, `jspdf`, `jszip`, `pdf.js`) are protected under their respective open-source Apache or MIT licenses.
          </p>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">4. Modifications to Terms</h2>
          <p>
            We retain full authority to adapt, delete, or refine elements of these Terms at any time without explicit notice. Continued use of the platform constitutes full, un-revocable acceptance.
          </p>
        </section>
      </article>
    </div>
  );
};
