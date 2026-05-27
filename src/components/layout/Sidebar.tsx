import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Combine, 
  Scissors, 
  Minimize2, 
  Unlock, 
  Image, 
  FileImage, 
  FileSpreadsheet, 
  ShieldCheck,
  Zap,
  Lock,
  Workflow,
  FileText,
  FileOutput,
  Table2,
  Presentation
} from 'lucide-react';
import { AdBanner } from '../ui/AdBanner';

export const Sidebar: React.FC = () => {
  const tools = [
    { name: 'PDF to Word', path: '/pdf-to-word', icon: <FileText className="w-4 h-4" /> },
    { name: 'Word to PDF', path: '/word-to-pdf', icon: <FileOutput className="w-4 h-4" /> },
    { name: 'PDF to Excel', path: '/pdf-to-excel', icon: <Table2 className="w-4 h-4" /> },
    { name: 'PDF to PPT', path: '/pdf-to-ppt', icon: <Presentation className="w-4 h-4" /> },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', icon: <FileImage className="w-4 h-4" /> },
    { name: 'JPG to PDF', path: '/jpg-to-pdf', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { name: 'Image to PDF', path: '/image-to-pdf', icon: <Image className="w-4 h-4" /> },
    { name: 'PDF to Text', path: '/pdf-to-text', icon: <FileText className="w-4 h-4" /> },
    { name: 'Merge PDF', path: '/merge-pdf', icon: <Combine className="w-4 h-4" /> },
    { name: 'Split PDF', path: '/split-pdf', icon: <Scissors className="w-4 h-4" /> },
    { name: 'Compress PDF', path: '/compress-pdf', icon: <Minimize2 className="w-4 h-4" /> },
    { name: 'Unlock PDF', path: '/unlock-pdf', icon: <Unlock className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 font-sans">
      {/* Tools Quick Action Grid */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-900 rounded-2xl p-5 shadow-xs">
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
          Quick Tools
        </h3>
        <nav className="flex flex-col gap-1.5" aria-label="Quick Switch Navigation">
          {tools.map((tool) => (
            <NavLink
              key={tool.path}
              to={tool.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 font-bold'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/60'
                }`
              }
            >
              {tool.icon}
              <span>{tool.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Safety info card */}
      <div className="mt-5 bg-linear-to-br from-emerald-500/5 to-teal-500/10 dark:from-emerald-950/10 dark:to-teal-950/10 border border-emerald-100/50 dark:border-emerald-950/30 rounded-2xl p-5 text-center">
        <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-500 mx-auto mb-2" />
        <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-1">
          In-Browser Processing
        </h4>
        <p className="text-[10px] text-emerald-650/90 dark:text-emerald-500/80 leading-normal">
          We never upload files. Your privacy is protected by default.
        </p>
      </div>

      {/* Sidebar Ad Placement */}
      <AdBanner size="rectangle" className="mt-6" />
    </aside>
  );
};
