import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, Moon, FileText, Menu, X, ChevronDown, Search, Sparkles, Brain, 
  RotateCw, Lock, Scan, CheckSquare, Combine, Scissors, Minimize2, Edit, Type
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toolsRegistry } from '../../utils/toolRegistry';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setSearchQuery('');
  }, [location]);

  // Group tools for presentation
  const convertTools = toolsRegistry.slice(0, 17);
  const organizeTools = toolsRegistry.slice(17, 27);
  const optimizeTools = toolsRegistry.slice(27, 33);
  const editTools = toolsRegistry.slice(33, 42);
  const securityTools = toolsRegistry.slice(42, 50);
  const aiTools = toolsRegistry.slice(50, 60);
  const ocrTools = toolsRegistry.slice(60);

  // Filter tools for instant global search in Header
  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : toolsRegistry.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-gray-950 dark:text-white leading-none">
              PDF<span className="text-blue-600">Master</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-black px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/10 shrink-0">
              PRO
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block relative w-64 max-w-xs ml-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search 55+ tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-gray-55 dark:bg-gray-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-950 rounded-xl text-xs font-semibold focus:outline-none transition-all duration-200 text-gray-900 dark:text-white"
            />
            {filteredSearch.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 shadow-xl rounded-2xl p-2 z-50">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 px-2 py-1 uppercase tracking-wider">Search Results</p>
                <div className="space-y-0.5">
                  {filteredSearch.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-950 dark:text-white truncate leading-tight">{tool.name}</p>
                        <p className="text-[10px] text-gray-500 truncate leading-snug">{tool.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core Desktop Navbar Menu */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-auto mr-4" aria-label="Desktop Nav">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/35 dark:text-blue-450'
                  : 'text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              Home
            </Link>

            {/* Mega Dropdown Anchor */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                onMouseEnter={() => setMegaMenuOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  megaMenuOpen
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/35 dark:text-blue-450'
                    : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <span>Browse Category</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Absolute Container */}
              {megaMenuOpen && (
                <div 
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className="absolute right-0 translate-x-12 mt-2 w-[850px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 shadow-2xl rounded-3xl p-6 grid grid-cols-4 gap-6 animate-fadeIn z-50 overflow-hidden"
                >
                  {/* Col 1 - Convert */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-gray-150 dark:border-gray-900 pb-2">
                      <span className="text-sm">🔄</span>
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-450 dark:text-gray-500">Convert PDF</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5 leading-snug">
                      {convertTools.slice(0, 8).map(t => (
                        <Link key={t.id} to={t.path} className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 truncate">
                          {t.name}
                        </Link>
                      ))}
                      <Link to="/#convert" className="block text-[10px] font-extrabold text-blue-600 py-1.5 px-2 hover:underline">
                        View remaining {convertTools.length - 8} tools &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Col 2 - Organize & Optimize */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-gray-150 dark:border-gray-900 pb-2">
                      <span className="text-sm">🛠️</span>
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-450 dark:text-gray-500">Organize & Tune</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {[...organizeTools.slice(0, 5), ...optimizeTools.slice(0, 5)].map(t => (
                        <Link key={t.id} to={t.path} className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 truncate">
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Col 3 - Edit & Security */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-gray-150 dark:border-gray-900 pb-2">
                      <span className="text-sm">📝</span>
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-450 dark:text-gray-500">Edit & Protect</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {[...editTools.slice(0, 5), ...securityTools.slice(0, 5)].map(t => (
                        <Link key={t.id} to={t.path} className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 truncate">
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Col 4 - AI Suite & OCR */}
                  <div className="space-y-4 bg-gray-50/70 dark:bg-gray-900/10 p-4 -m-4 rounded-r-3xl">
                    <div className="flex items-center gap-1.5 border-b border-gray-200 dark:border-gray-900 pb-2">
                      <span className="text-sm">⚡</span>
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-blue-600 dark:text-blue-500">AI & OCR Suite</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {aiTools.slice(0, 8).map(t => (
                        <Link key={t.id} to={t.path} className="flex items-center gap-1.5 text-[11px] font-black text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 rounded-lg hover:bg-blue-50/40 dark:hover:bg-blue-950/20 truncate">
                          <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
                          <span>{t.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick action header buttons */}
            <Link to="/merge-pdf" className="px-3 py-2 text-xs font-bold text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all">Merge</Link>
            <Link to="/split-pdf" className="px-3 py-2 text-xs font-bold text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all">Split</Link>
            <Link to="/compress-pdf" className="px-3 py-2 text-xs font-bold text-gray-650 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all">Compress</Link>
          </nav>

          {/* Theme Switch & Layout Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-55 dark:bg-gray-900 hover:bg-gray-150 dark:hover:bg-gray-850 text-gray-600 dark:text-gray-300 transition-all cursor-pointer"
              aria-label="Toggle Night Theme"
            >
              {isDark ? <Sun className="w-4.5 h-4.5 text-yellow-500" /> : <Moon className="w-4.5 h-4.5 text-stone-700" />}
            </button>

            {/* Mobile Hamburger menu triggers */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-gray-55 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Expanded Area */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-gray-150 dark:border-gray-900 bg-white dark:bg-gray-950 px-4 py-6 max-h-[85vh] overflow-y-auto animate-fadeIn space-y-6 shadow-2xl">
          
          {/* Mobile Search Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search 55+ tools instantly..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
            />
            {filteredSearch.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-xl p-1 z-50 max-h-48 overflow-y-auto shadow-lg">
                {filteredSearch.map(tool => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    onClick={() => { setMobileMenuOpen(false); setSearchQuery(''); }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{tool.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav Categories */}
          <div className="space-y-4">
            
            {/* Convert Tools - Accordion Header */}
            <div>
              <h5 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-1">🔄 Convert PDF</h5>
              <div className="grid grid-cols-2 gap-1.5">
                {convertTools.slice(0, 10).map(t => (
                  <Link key={t.id} to={t.path} onClick={() => setMobileMenuOpen(false)} className="text-left py-2 px-3 bg-gray-50 dark:bg-gray-900/30 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 truncate">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Organize & Optimize */}
            <div>
              <h5 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-1">🛠️ Organize & Optimize</h5>
              <div className="grid grid-cols-2 gap-1.5">
                {[...organizeTools.slice(0, 4), ...optimizeTools.slice(0, 4)].map(t => (
                  <Link key={t.id} to={t.path} onClick={() => setMobileMenuOpen(false)} className="text-left py-2 px-3 bg-gray-50 dark:bg-gray-900/30 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Edit & Security */}
            <div>
              <h5 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-1">📝 Edit & Security</h5>
              <div className="grid grid-cols-2 gap-1.5">
                {[...editTools.slice(0, 4), ...securityTools.slice(0, 4)].map(t => (
                  <Link key={t.id} to={t.path} onClick={() => setMobileMenuOpen(false)} className="text-left py-2 px-3 bg-gray-50 dark:bg-gray-900/30 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Tools & OCR */}
            <div className="p-4 bg-blue-50/30 dark:bg-blue-950/10 rounded-2xl border border-blue-100/10 dark:border-blue-900/15">
              <h5 className="text-[10px] uppercase font-black tracking-widest text-blue-600 dark:text-blue-450 mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>AI PDF Toolkit</span>
              </h5>
              <div className="grid grid-cols-2 gap-1.5">
                {[...aiTools.slice(0, 4), ...ocrTools.slice(0, 4)].map(t => (
                  <Link key={t.id} to={t.path} onClick={() => setMobileMenuOpen(false)} className="text-left py-2 px-3 bg-white dark:bg-gray-950 shadow-xs border border-gray-100 dark:border-gray-900 rounded-xl text-xs font-black text-gray-800 dark:text-gray-100 truncate">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
