import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, FileText, Menu, X, ChevronDown, Table2, Presentation, Combine, Scissors, Minimize2, Unlock, FileImage, Image, FileOutput } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const convertLinks = [
    { name: 'PDF to Word', path: '/pdf-to-word', desc: 'Convert PDF to editable Word doc', icon: <FileText className="w-4 h-4 text-blue-500" /> },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert DOCX files to PDF', icon: <FileOutput className="w-4 h-4 text-violet-500" /> },
    { name: 'PDF to Excel', path: '/pdf-to-excel', desc: 'Extract PDF data to spreadsheet', icon: <Table2 className="w-4 h-4 text-green-500" /> },
    { name: 'PDF to PPT', path: '/pdf-to-ppt', desc: 'Convert PDF pages to PowerPoint', icon: <Presentation className="w-4 h-4 text-orange-500" /> },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Convert PDF pages to high-res JPG', icon: <FileImage className="w-4 h-4 text-rose-500" /> },
    { name: 'JPG to PDF', path: '/jpg-to-pdf', desc: 'Convert JPG images to PDF file', icon: <FileSpreadsheet className="w-4 h-4 text-amber-500" /> },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Batch PNG, WebP to compact PDF', icon: <Image className="w-4 h-4 text-pink-500" /> },
    { name: 'PDF to Text', path: '/pdf-to-text', desc: 'Extract raw text files client-side', icon: <FileText className="w-4 h-4 text-cyan-500" /> },
  ];

  const organizeLinks = [
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs into one', icon: <Combine className="w-4 h-4 text-blue-500" /> },
    { name: 'Split PDF', path: '/split-pdf', desc: 'Separate or extract custom pages', icon: <Scissors className="w-4 h-4 text-indigo-500" /> },
    { name: 'Compress PDF', path: '/compress-pdf', desc: 'Reduce PDF file size offline', icon: <Minimize2 className="w-4 h-4 text-emerald-500" /> },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove passwords & restrictions', icon: <Unlock className="w-4 h-4 text-fuchsia-500" /> },
  ];

  // Dummy helper icon representing Excel sheet
  function FileSpreadsheet(props: any) {
    return <Table2 {...props} />;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus on path transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-900 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              PDF<span className="text-blue-600">Tools</span>
            </span>
            <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-450 border border-blue-100/30">
              FREE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                location.pathname === '/'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/35 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-55 dark:text-gray-300 dark:hover:bg-gray-900/60'
              }`}
            >
              Home
            </Link>

            {/* Mega-menu tools trigger anchor */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dropdownOpen
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/35 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-55 dark:text-gray-300 dark:hover:bg-gray-900/60'
                }`}
              >
                <span>All Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Dropdown Mega Menu Panel */}
              {dropdownOpen && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-2xl shadow-xl p-5 grid grid-cols-2 gap-6 animate-fadeIn"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {/* Left Column - Convert */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-900 pb-1.5">
                      🔄 Convert PDF
                    </h3>
                    <div className="grid grid-cols-1 gap-1">
                      {convertLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-gray-55 dark:hover:bg-gray-900/50 transition-colors"
                        >
                          <div className="p-1 rounded-md bg-gray-50 dark:bg-gray-900 mt-0.5 shrink-0">
                            {link.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                              {link.name}
                            </p>
                            <p className="text-[10pt] text-gray-450 dark:text-gray-500 truncate mt-0.5">
                              {link.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Organize */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-900 pb-1.5">
                      🛠️ Organize PDF
                    </h3>
                    <div className="grid grid-cols-1 gap-1">
                      {organizeLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-gray-55 dark:hover:bg-gray-900/50 transition-colors"
                        >
                          <div className="p-1 rounded-md bg-gray-50 dark:bg-gray-900 mt-0.5 shrink-0">
                            {link.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                              {link.name}
                            </p>
                            <p className="text-[10pt] text-gray-450 dark:text-gray-500 truncate mt-0.5">
                              {link.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick hot links in navbar for fast click */}
            <Link
              to="/merge-pdf"
              className={`px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-55 dark:hover:bg-gray-900/60 text-gray-600 dark:text-gray-300 transition-all`}
            >
              Merge
            </Link>
            <Link
              to="/compress-pdf"
              className={`px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-55 dark:hover:bg-gray-900/60 text-gray-600 dark:text-gray-300 transition-all`}
            >
              Compress
            </Link>
          </nav>

          {/* Theme & Menu controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 
                         transition-all duration-300 cursor-pointer shrink-0"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 text-yellow-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-gray-600" />
              )}
            </button>

            {/* Mobile toggles */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-55 dark:border-gray-850 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Groupings */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950 animate-fadeIn overflow-y-auto max-h-[80vh]">
          <nav className="px-4 py-5 flex flex-col gap-5" aria-label="Mobile Grouped Navigation">
            {/* Convert Group */}
            <div>
              <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 px-2.5 mb-2">
                🔄 Convert PDF Tools
              </h3>
              <div className="grid grid-cols-2 gap-1">
                {convertLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'
                      }`}
                    >
                      {link.icon}
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Organize Group */}
            <div>
              <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500 px-2.5 mb-2">
                🛠️ Organize PDF Tools
              </h3>
              <div className="grid grid-cols-2 gap-1 animate-fadeIn">
                {organizeLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'
                      }`}
                    >
                      {link.icon}
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
