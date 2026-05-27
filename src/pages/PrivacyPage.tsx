import React from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="font-sans py-8 max-w-3xl mx-auto leading-relaxed">
      <SEO 
        title="Privacy Policy - PDFTools Suite" 
        description="Learn how we protect your document safety through offline-first local browser compilers."
        path="/privacy-policy"
      />

      <article className="prose dark:prose-invert">
        <h1 className="text-2xl sm:text-3.5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500">Last updated: May 27, 2026</p>

        <section className="mt-8 space-y-6 text-xs text-gray-550 dark:text-gray-400 font-medium leading-relaxed">
          <p>
            At PDFTools Suite, your privacy is our absolute, foundational priority. Because this entire website operates as an inline-client application (running on HTML5, Javascript, and WebAssembly inside your browser), we do not possess any servers capable of storing or processing your document files.
          </p>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-start gap-3 my-6">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-905 dark:text-emerald-450 leading-relaxed">Zero File Upload Policy</h4>
              <p className="text-[11px] text-emerald-650 dark:text-emerald-400/90 mt-1">
                Any PDF, JPG, PNG, or WEBP file you drag and drop into our converters remains strictly inside your computer\'s RAM. All compilation processes run locally. When you close the tab, everything is permanently wiped.
              </p>
            </div>
          </div>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">1. Personal Information We Collect</h2>
          <p>
            We do not require account signups, email entries, or phone configurations. Since there are no membership profiles, we gather zero direct personal identity information.
          </p>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">2. Analytics and Third-Party Advertising</h2>
          <p>
            To keep our utility converters completely free of charge, we implement Google AdSense slots. AdSense and Google Analytics may gather generic device IDs, screen definitions, and cookies to customize ad banners. These modules do not read, intercept, or map any portion of the uploaded PDF structures.
          </p>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">3. Cookies and Local Preference Storage</h2>
          <p>
            We only write one local variable inside your browser (`theme: "dark"` or `theme: "light"`) in order to preserve your preferred dark mode configuration between web sessions. This cookie-less preference is exclusively mapped on your browser.
          </p>

          <h2 className="text-sm font-bold text-gray-850 dark:text-gray-200 uppercase tracking-widest mt-8">4. Contact Information</h2>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span>Have privacy questions? Reach out directly via <a href="mailto:muddassirbillah1718@gmail.com" className="text-blue-600 dark:text-blue-450 underline font-bold">muddassirbillah1718@gmail.com</a>.</span>
          </p>
        </section>
      </article>
    </div>
  );
};
