import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Row 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo + About */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-blue-500">⚡ PDFTools</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Free, fast, browser-based PDF tools. No signup needed.
            </p>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-450">
              🔒 Files never leave your device
            </p>
          </div>

          {/* Column 2: Convert Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Convert
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#/pdf-to-word" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  PDF to Word
                </a>
              </li>
              <li>
                <a href="/#/word-to-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Word to PDF
                </a>
              </li>
              <li>
                <a href="/#/pdf-to-excel" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  PDF to Excel
                </a>
              </li>
              <li>
                <a href="/#/pdf-to-ppt" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  PDF to PowerPoint
                </a>
              </li>
              <li>
                <a href="/#/pdf-to-jpg" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  PDF to JPG
                </a>
              </li>
              <li>
                <a href="/#/jpg-to-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  JPG to PDF
                </a>
              </li>
              <li>
                <a href="/#/image-to-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Image to PDF
                </a>
              </li>
              <li>
                <a href="/#/pdf-to-text" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  PDF to Text
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Organize Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Organize
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#/merge-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Merge PDF
                </a>
              </li>
              <li>
                <a href="/#/split-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Split PDF
                </a>
              </li>
              <li>
                <a href="/#/compress-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Compress PDF
                </a>
              </li>
              <li>
                <a href="/#/unlock-pdf" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Unlock PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-650 hover:text-blue-500 dark:text-gray-450 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-650 hover:text-blue-500 dark:text-gray-450 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-900 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2025 PDFTools. All rights reserved. | Made with ❤️ for everyone</p>
        </div>
      </div>
    </footer>
  );
};
