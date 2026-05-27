import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Combine, 
  Scissors, 
  Minimize2, 
  Unlock, 
  Image as ImageIcon, 
  FileImage, 
  Table2,
  Presentation,
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Check, 
  HelpCircle, 
  ArrowRight,
  ChevronDown,
  FileText,
  FileOutput
} from 'lucide-react';
import { toolsRegistry } from '../utils/toolRegistry';
import { AdBanner } from '../components/ui/AdBanner';
import { SEO } from '../components/ui/SEO';

export const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Split into convert and organize categories locally based on our registry sequence
  const convertTools = toolsRegistry.slice(0, 8);
  const organizeTools = toolsRegistry.slice(8);

  const getIcon = (id: string, colorClass = '') => {
    switch (id) {
      case 'pdf-to-word':
        return <FileText className={`w-6 h-6 ${colorClass}`} />;
      case 'word-to-pdf':
        return <FileOutput className={`w-6 h-6 ${colorClass}`} />;
      case 'pdf-to-excel':
        return <Table2 className={`w-6 h-6 ${colorClass}`} />;
      case 'pdf-to-ppt':
        return <Presentation className={`w-6 h-6 ${colorClass}`} />;
      case 'pdf-to-jpg':
        return <FileImage className={`w-6 h-6 ${colorClass}`} />;
      case 'jpg-to-pdf':
        return <Table2 className={`w-6 h-6 ${colorClass}`} />; // fallback sheet
      case 'image-to-pdf':
        return <ImageIcon className={`w-6 h-6 ${colorClass}`} />;
      case 'pdf-to-text':
        return <FileText className={`w-6 h-6 ${colorClass}`} />;
      case 'merge-pdf':
        return <Combine className={`w-6 h-6 ${colorClass}`} />;
      case 'split-pdf':
        return <Scissors className={`w-6 h-6 ${colorClass}`} />;
      case 'compress-pdf':
        return <Minimize2 className={`w-6 h-6 ${colorClass}`} />;
      case 'unlock-pdf':
        return <Unlock className={`w-6 h-6 ${colorClass}`} />;
      default:
        return <FileText className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  const whyChooseUs = [
    {
      title: '🔒 Privacy First',
      desc: 'Files never leave your local device. 100% processing in-browser prevents malicious interceptions or cloud leaks.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: '⚡ Fast Processing',
      desc: 'Leverages WebAssembly compiled with raw CPU power. Zero upload latency, zero queue delays.',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
    },
    {
      title: '💯 100% Free',
      desc: 'No account register, email subscription, or daily conversions thresholds. Unrestricted access.',
      icon: <Sparkles className="w-5 h-5 text-violet-500" />,
    },
    {
      title: '📱 Responsive Sizing',
      desc: 'Optimized touch guidelines let you manipulate and download PDFs securely on any phone or iPad.',
      icon: <Check className="w-5 h-5 text-blue-500" />,
    },
  ];

  const generalFaqs = [
    {
      q: 'Do you charge for file conversions?',
      a: 'Absolutely not. This platform delivers 100% free tool operations. We monetize moderately using AdSense slots to cover development and domain maintenance.',
    },
    {
      q: 'Are minor file size limitations enforced?',
      a: 'There is a helpful alert trigger warning for files larger than 100MB, purely to safeguard physical memory of low-end browsers. However, raw CPU-level conversion can process high pages size limits.',
    },
    {
      q: 'Will my PDF files stay strictly confidential?',
      a: 'We never see, process, or keep files on external storage. Everything is compiled directly in web page variables. Close the browser tab, and memory clears completely.',
    },
  ];

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'PDFTools Suite',
    'url': 'https://pdf-tools.example.com/',
    'description': 'Secure, client-side, 100% local browser-based PDF tools to merge, split, compress, unlock, and convert files.',
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  const getToolTheme = (id: string) => {
    switch (id) {
      case 'pdf-to-word':
        return { iconBox: 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white' };
      case 'word-to-pdf':
        return { iconBox: 'bg-violet-50 text-violet-600 dark:bg-violet-950/20 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white' };
      case 'pdf-to-excel':
        return { iconBox: 'bg-green-50 text-green-600 dark:bg-green-950/25 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white' };
      case 'pdf-to-ppt':
        return { iconBox: 'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-355 group-hover:bg-orange-600 group-hover:text-white' };
      case 'pdf-to-jpg':
        return { iconBox: 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white' };
      case 'jpg-to-pdf':
        return { iconBox: 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white' };
      case 'image-to-pdf':
        return { iconBox: 'bg-pink-50 text-pink-600 dark:bg-pink-950/20 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white' };
      case 'pdf-to-text':
        return { iconBox: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/20 dark:text-cyan-400 group-hover:bg-cyan-605 group-hover:text-white' };
      case 'merge-pdf':
        return { iconBox: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white' };
      case 'split-pdf':
        return { iconBox: 'bg-red-50 text-red-650 dark:bg-red-950/20 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white' };
      case 'compress-pdf':
        return { iconBox: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450 group-hover:bg-emerald-600 group-hover:text-white' };
      case 'unlock-pdf':
        return { iconBox: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/20 dark:text-fuchsia-400 group-hover:bg-fuchsia-600 group-hover:text-white' };
      default:
        return { iconBox: 'bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400 group-hover:bg-blue-600 group-hover:text-white' };
    }
  };

  return (
    <div className="font-sans py-4">
      {/* Dynamic SEO Meta Elements */}
      <SEO 
        title="Free PDF Tools - Merge, Split, Compress & Convert locally" 
        description="A secure and extremely fast client-side set of PDF tools. Merge, split, compress, unlock, and convert PDFs or image files right inside your browser without uploading them."
        path="/"
        schema={schemaMarkup}
      />

      {/* Hero Leaderboard Ad Placement */}
      <AdBanner size="leaderboard" />

      {/* Animated Hero Section */}
      <section className="text-center py-12 px-4 space-y-4">
        {/* Subtle Accent Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/40 rounded-full border border-blue-100 dark:border-blue-900/30 font-sans">
          🔒 100% Client-Side Processing
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
          All PDF Tools You Need —{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
            Free & Fast
          </span>
        </h1>

        <p className="text-gray-550 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          No upload limits. No signup. All processing happens locally in your browser for ultimate privacy and high-speed compilation.
        </p>

        <div className="pt-4 flex justify-center">
          <a 
            href="#tools-grid" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
          >
            Start using tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools-grid" className="py-8 border-t border-gray-100 dark:border-gray-900">
        
        {/* CATEGORY 1: Convert PDF Header */}
        <div className="mb-6 mt-4">
          <h2 className="text-base sm:text-lg font-black text-gray-955 dark:text-white tracking-tight uppercase flex items-center gap-2">
            🔄 Convert PDF
          </h2>
          <p className="text-[11px] text-gray-450 dark:text-gray-450 mt-1">
            Reconstruct, parse, and export PDF data elements easily in-browser
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 mb-12">
          {convertTools.map((tool) => {
            const toolTheme = getToolTheme(tool.id);
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group p-5 bg-white border border-gray-200 dark:bg-gray-950 dark:border-gray-900 rounded-2xl hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-full cursor-pointer"
              >
                <div className="flex flex-col">
                  {/* Icon Wrapper box */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 shrink-0 ${toolTheme.iconBox}`}>
                    {getIcon(tool.id)}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-[11px] text-gray-450 dark:text-gray-400 leading-relaxed">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-blue-600 dark:text-blue-500 text-[10px] font-black tracking-wide uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CATEGORY 2: Organize PDF Header */}
        <div className="mb-6 mt-12 border-t border-gray-100 dark:border-gray-900 pt-8">
          <h2 className="text-base sm:text-lg font-black text-gray-955 dark:text-white tracking-tight uppercase flex items-center gap-2">
            🛠️ Organize PDF
          </h2>
          <p className="text-[11px] text-gray-450 dark:text-gray-450 mt-1">
            Merge, split, compress, or unlock your PDF records offline
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
          {organizeTools.map((tool) => {
            const toolTheme = getToolTheme(tool.id);
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group p-5 bg-white border border-gray-200 dark:bg-gray-950 dark:border-gray-900 rounded-2xl hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-full cursor-pointer"
              >
                <div className="flex flex-col">
                  {/* Icon Wrapper box */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 shrink-0 ${toolTheme.iconBox}`}>
                    {getIcon(tool.id)}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-[11px] text-gray-450 dark:text-gray-400 leading-relaxed">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-blue-600 dark:text-blue-500 text-[10px] font-black tracking-wide uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </section>

      {/* Why Choose Us & Security trust marks */}
      <section className="py-12 px-6 bg-gray-50 border border-gray-150/40 dark:bg-gray-950/20 dark:border-gray-900 rounded-3xl my-6">
        <h2 className="text-center text-sm sm:text-base font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
          🔒 Strictly Private. ⚡ High-Speed Browser Engine.
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-150 dark:border-gray-900">
              <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg w-fit mb-3">
                {item.icon}
              </div>
              <h3 className="text-[10px] font-bold text-gray-800 dark:text-gray-250 uppercase tracking-wider mb-2">
                {item.title}
              </h3>
              <p className="text-[11px] text-gray-450 dark:text-gray-400 leading-relaxed font-semibold">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works segment */}
      <section className="py-12 border-t border-gray-100 dark:border-gray-900">
        <h2 className="text-center text-sm sm:text-base font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
          🛠️ Simple as 1-2-3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-gray-950 rounded-full flex items-center justify-center font-bold text-xs text-blue-850 dark:text-blue-300 mx-auto mb-4 relative z-10">
              1
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">
              Select Your File
            </h3>
            <p className="text-[11px] text-gray-450 dark:text-gray-400">
              Drag PDFs or photo files directly into our clean, secure upload areas.
            </p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900 border-2 border-white dark:border-gray-950 rounded-full flex items-center justify-center font-bold text-xs text-violet-850 dark:text-violet-300 mx-auto mb-4 relative z-10">
              2
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">
              Configure Settings
            </h3>
            <p className="text-[11px] text-gray-450 dark:text-gray-400">
              Arrange order, configure split pages, or specify image formats instantly.
            </p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 bg-fuchsia-100 dark:bg-fuchsia-900 border-2 border-white dark:border-gray-950 rounded-full flex items-center justify-center font-bold text-xs text-fuchsia-850 dark:text-fuchsia-300 mx-auto mb-4 relative z-10">
              3
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-1">
              Download Result
            </h3>
            <p className="text-[11px] text-gray-450 dark:text-gray-400">
              Click Convert or Merge to instantly spark direct file downloads.
            </p>
          </div>
        </div>
      </section>

      {/* Mid Page Ad Placement */}
      <AdBanner size="leaderboard" />

      {/* SEO Faq Accordion Area */}
      <section className="py-12 border-t border-gray-100 dark:border-gray-900 max-w-3xl mx-auto">
        <h2 className="text-center text-sm sm:text-base font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {generalFaqs.map((item, idx) => (
            <div 
              key={idx} 
              className="border border-gray-200 dark:border-gray-900 rounded-2xl bg-white dark:bg-gray-950 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full py-4 px-5 flex items-center justify-between text-left font-bold text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors"
                aria-expanded={activeFaq === idx}
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  {item.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-gray-550 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-900">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Ad Space */}
      <AdBanner size="leaderboard" />
    </div>
  );
};
