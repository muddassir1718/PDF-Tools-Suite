import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Zap, Sparkles, HelpCircle, ArrowRight, ChevronDown, 
  Search, Eye, Lock, Scissors, RefreshCw, Layers, Edit, FileText
} from 'lucide-react';
import { toolsRegistry } from '../utils/toolRegistry';
import { AdBanner } from '../components/ui/AdBanner';
import { SEO } from '../components/ui/SEO';

export const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'convert' | 'organize' | 'optimize' | 'edit' | 'security' | 'ai' | 'ocr'>('all');

  // Filter tools based on search and selected category tab
  const filteredTools = toolsRegistry.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    // Categorize based on registry slices
    const idx = toolsRegistry.findIndex(t => t.id === tool.id);
    if (selectedCategory === 'convert' && idx >= 0 && idx < 17) return matchesSearch;
    if (selectedCategory === 'organize' && idx >= 17 && idx < 27) return matchesSearch;
    if (selectedCategory === 'optimize' && idx >= 27 && idx < 33) return matchesSearch;
    if (selectedCategory === 'edit' && idx >= 33 && idx < 42) return matchesSearch;
    if (selectedCategory === 'security' && idx >= 42 && idx < 50) return matchesSearch;
    if (selectedCategory === 'ai' && idx >= 50 && idx < 60) return matchesSearch;
    if (selectedCategory === 'ocr' && idx >= 60) return matchesSearch;
    
    return false;
  });

  const categoriesList = [
    { id: 'all', name: '✨ All 56 Tools', desc: 'Full workspace suite' },
    { id: 'convert', name: '🔄 Convert from/to PDF', desc: 'Word, Excel, PPT, JPG' },
    { id: 'organize', name: '🛠️ Organize PDF', desc: 'Merge, split, extract, delete' },
    { id: 'optimize', name: '⚡ Optimize PDF', desc: 'Compress, scale, grayscale' },
    { id: 'edit', name: '📝 Edit PDF', desc: 'Draw, highlight, sign, shapes' },
    { id: 'security', name: '🔒 Security', desc: 'Passwords protect, redact' },
    { id: 'ai', name: '🤖 AI powered', desc: 'Summarizers, translation' },
    { id: 'ocr', name: '👁️ OCR Scanner', desc: 'Extract handwriting & text' },
  ];

  const whyChooseUs = [
    {
      title: '🔒 100% Client-Side Privacy',
      desc: 'Our converters render bytes directly in your RAM memory using compiled WebAssembly. Files never cross network routes to third party databases.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: '⚡ Instant CPU Rendering',
      desc: 'No queue bottlenecks, waiting lists, or lag. File parsing and rendering operations complete with raw hardware processing cycles.',
      icon: <Zap className="w-5 h-5 text-amber-500" />
    },
    {
      title: '💯 Genuinely Free Sizing',
      desc: 'No subscription schemes, pricing caps, or card obligations. Easily process large files with complete, unthrottled bandwidth.',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />
    }
  ];

  const generalFaqs = [
    {
      q: 'Do files undergo remote storage upload?',
      a: 'Never. Unlike other online converters, PDFMaster operates offline inside your client variables. Close this webpage tab, and memory structures clear fully.'
    },
    {
      q: 'Are any file dimensions limits enforced?',
      a: 'We show a prompt alert warning if files exceed 100MB, to prevent standard browser overflows on low-end machines. Otherwise, files are parsed unlimitedly.'
    },
    {
      q: 'How does the free AI Toolkit work?',
      a: 'To safeguard user keys and permit free, unlimited access, we invoke the Google Gemini REST endpoints directly from your browser utilizing the API key you supply.'
    }
  ];

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'PDFMaster offline workspace suite',
    'url': 'https://pdf-tools.example.com/',
    'description': 'Secure, client-side, 100% local browser-based PDF tools to convert, edit, annotate, split, and optimize files.',
    'applicationCategory': 'UtilitiesApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="font-sans py-4 space-y-12">
      <SEO 
        title="Secure Off-Grid PDF Tools — Merge, Edit, Convert FREE" 
        description="Pristine, client-side browser PDF suite. Convert PDF to Word, edit vector blocks, compress, OCR parse, or Chat with PDF using local Gemini API keys safely."
        path="/"
        schema={schemaMarkup}
      />

      {/* Hero Header Presentation */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4 py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-450 border border-emerald-100/10 text-xs font-black animate-pulse">
          <ShieldCheck className="w-4 h-4" />
          <span>🔒 Files stay 100% inside your Device</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-950 dark:text-white tracking-tight leading-none">
          Pristine PDF Tools — <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-purple-500">
            Secure, Local & Offline
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-550 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-semibold">
          No signups. No cloud processing queues. Compile, convert, and stamp PDF layers directly on your system with raw WebAssembly compilers.
        </p>

        {/* Global Instant Sandbox Search */}
        <div className="relative max-w-lg mx-auto shadow-xl rounded-2xl border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 overflow-hidden">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Type tool name (e.g., PDF to Word, OCR, Rotate)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm font-black focus:outline-none focus:ring-0 text-gray-900 dark:text-white"
          />
        </div>
      </section>

      {/* Category Selection Tabs */}
      <section className="space-y-6">
        <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-none border-b border-gray-150 dark:border-gray-900">
          {categoriesList.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-4.5 py-2 rounded-2xl text-xs font-black shrink-0 transition-all cursor-pointer ${selectedCategory === tab.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-955 dark:hover:text-white'}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tools Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTools.map(tool => {
            const isAi = tool.id.startsWith('ai-');
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group flex flex-col justify-between p-5 bg-white border border-gray-250 dark:bg-gray-950 dark:border-gray-900/60 rounded-3xl hover:border-blue-500 dark:hover:border-blue-700 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden"
              >
                {/* AI feature ambient pulse ring */}
                {isAi && (
                  <span className="absolute top-0 right-0 bg-purple-600 text-[9px] uppercase font-black text-white px-3 py-1 rounded-bl-xl tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 shrink-0" />
                    <span>AI</span>
                  </span>
                )}

                <div className="space-y-3">
                  <div className={`p-2.5 rounded-2xl bg-blue-50/75 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white w-fit transition-colors shrink-0`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-xs font-black text-gray-950 dark:text-white pb-0.5 tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-normal">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] uppercase font-black text-blue-600 dark:text-blue-450 pt-5 mt-auto group-hover:translate-x-1 transition-transform">
                  <span>Activate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ad placement center */}
      <AdBanner size="leaderboard" />

      {/* Trust Marks Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-gray-150 dark:border-gray-900">
        {whyChooseUs.map((item, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-3xl space-y-3">
            <div className="p-3 bg-gray-55 dark:bg-gray-900 rounded-2xl w-fit shrink-0">
              {item.icon}
            </div>
            <h4 className="text-xs font-black text-gray-950 dark:text-white uppercase tracking-wider">{item.title}</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Steps checklist */}
      <section className="py-6 border-t border-gray-150 dark:border-gray-900 text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">How It Operates</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-lg font-black text-blue-600 mb-0.5">01</div>
            <p className="text-xs font-bold text-gray-800 dark:text-white">Load Asset</p>
            <p className="text-[10px] text-gray-500 leading-snug">Drag & drop files or clipboard screenshots</p>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-black text-sky-500 mb-0.5">02</div>
            <p className="text-xs font-bold text-gray-800 dark:text-white">Configure Settings</p>
            <p className="text-[10px] text-gray-500 leading-snug">Choose scales, edit, or prompt AI modules</p>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-black text-purple-600 mb-0.5">03</div>
            <p className="text-xs font-bold text-gray-800 dark:text-white">Collect Output</p>
            <p className="text-[10px] text-gray-500 leading-snug">Direct instant download is saved perfectly</p>
          </div>
        </div>
      </section>

      {/* SEO Faq accordion panel */}
      <section className="py-6 border-t border-gray-150 dark:border-gray-900 max-w-3xl mx-auto space-y-6">
        <h3 className="text-center text-sm font-black text-gray-950 dark:text-white tracking-tight">Suite Insights</h3>
        <div className="space-y-3">
          {generalFaqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-900 rounded-3xl bg-white dark:bg-gray-950 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full py-4 px-5 flex items-center justify-between text-left font-bold text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-50/50"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-0.5 text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed border-t border-gray-100 dark:border-gray-900">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
