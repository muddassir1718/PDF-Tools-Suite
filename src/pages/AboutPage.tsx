import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Zap, Scale } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const AboutPage: React.FC = () => {
  return (
    <div className="font-sans py-8 max-w-3xl mx-auto leading-relaxed">
      <SEO 
        title="About Us - PDFTools Suite" 
        description="Learn more about our fully secure client-side browser-based PDF Tools platform."
        path="/about"
      />

      <article className="prose dark:prose-invert">
        <h1 className="text-2xl sm:text-3.5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
          About PDFTools Suite
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-450 font-medium">
          PDFTools Suite was built out of a fundamental desire to deliver premium, high-fidelity PDF utilities to everyone, with <strong className="font-bold text-gray-800 dark:text-gray-250">zero privacy compromises</strong>.
        </p>

        <section className="mt-8 space-y-6">
          <p className="text-xs text-gray-550 dark:text-gray-400">
            Most online PDF tools force users to upload their documents, books, financial spreadsheets, or private scanning slides to remote cloud storage. This poses severe data leakage, compliance, and cyber threats. We solved this by developing 100% locally compiled WebAssembly modules that process everything directly on your machine CPU. Your data never crosses any network endpoint.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-5 bg-gray-50 border border-gray-150 rounded-2xl dark:bg-gray-900/40 dark:border-gray-900">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">Client-Side Isolation</h4>
              <p className="text-[11px] text-gray-450 dark:text-gray-400 mt-1 leading-normal font-medium">
                Merging, splitting, password stripping, and visual rendering happen locally in web memory. Data disappears on tab close.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-150 rounded-2xl dark:bg-gray-900/40 dark:border-gray-900">
              <Zap className="w-6 h-6 text-amber-500 mb-2" />
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">Webassembly Speed</h4>
              <p className="text-[11px] text-gray-450 dark:text-gray-400 mt-1 leading-normal font-medium">
                High intensity image converting and file compaction runs near native speed with zero load timelines or queues.
              </p>
            </div>
          </div>

          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mt-10">Our Principles</h2>
          <ul className="space-y-4 list-disc pl-5 text-xs text-gray-555 dark:text-gray-400 font-medium">
            <li>
              <strong className="text-gray-850 dark:text-gray-200">No Paywalls:</strong> All functionalities are fully unlocked. No account profiles or hidden premium tiers.
            </li>
            <li>
              <strong className="text-gray-850 dark:text-gray-200">Minimalist AdSense Monetization:</strong> We only integrate minor, un-intrusive AdSense slots to cover the physical hosting and development.
            </li>
            <li>
              <strong className="text-gray-850 dark:text-gray-200">GDPR Compliance by Design:</strong> Since we never store, compile, or transmit any document databases, we are inherently GDPR, CCPA, and HIPAA compliant.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
};
