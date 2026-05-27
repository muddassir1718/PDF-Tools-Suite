import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Loader2 } from 'lucide-react';

// Lazy load actual pages to implement code-splitting and optimize bundle speeds
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const PDFToWordPage = lazy(() => import('./pages/PDFToWordPage').then((m) => ({ default: m.PDFToWordPage })));
const WordToPDFPage = lazy(() => import('./pages/WordToPDFPage').then((m) => ({ default: m.WordToPDFPage })));
const PDFToExcelPage = lazy(() => import('./pages/PDFToExcelPage').then((m) => ({ default: m.PDFToExcelPage })));
const PDFToPPTPage = lazy(() => import('./pages/PDFToPPTPage').then((m) => ({ default: m.PDFToPPTPage })));
const PDFToTextPage = lazy(() => import('./pages/PDFToTextPage').then((m) => ({ default: m.PDFToTextPage })));
const MergePage = lazy(() => import('./pages/MergePage').then((m) => ({ default: m.MergePage })));
const SplitPage = lazy(() => import('./pages/SplitPage').then((m) => ({ default: m.SplitPage })));
const CompressPage = lazy(() => import('./pages/CompressPage').then((m) => ({ default: m.CompressPage })));
const UnlockPage = lazy(() => import('./pages/UnlockPage').then((m) => ({ default: m.UnlockPage })));
const ImageToPDFPage = lazy(() => import('./pages/ImageToPDFPage').then((m) => ({ default: m.ImageToPDFPage })));
const PDFToJPGPage = lazy(() => import('./pages/PDFToJPGPage').then((m) => ({ default: m.PDFToJPGPage })));
const JPGToPDFPage = lazy(() => import('./pages/JPGToPDFPage').then((m) => ({ default: m.JPGToPDFPage })));

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

// Loading spinner indicator loader for Suspense boundaries
const PageFallbackSpinner: React.FC = () => (
  <div className="flex-1 flex flex-col justify-center items-center min-h-[50vh] py-12">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin shrink-0 mb-3" />
    <span className="text-xs font-semibold text-gray-500 animate-pulse">
      Loading workspace tools...
    </span>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
            {/* Header Sticky Navigation Block */}
            <Header />

            {/* Core Flexible Content Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
              <Suspense fallback={<PageFallbackSpinner />}>
                <Routes>
                  {/* Tool pages routes mapping */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/pdf-to-word" element={<PDFToWordPage />} />
                  <Route path="/word-to-pdf" element={<WordToPDFPage />} />
                  <Route path="/pdf-to-excel" element={<PDFToExcelPage />} />
                  <Route path="/pdf-to-ppt" element={<PDFToPPTPage />} />
                  <Route path="/pdf-to-text" element={<PDFToTextPage />} />
                  <Route path="/merge-pdf" element={<MergePage />} />
                  <Route path="/split-pdf" element={<SplitPage />} />
                  <Route path="/compress-pdf" element={<CompressPage />} />
                  <Route path="/unlock-pdf" element={<UnlockPage />} />
                  <Route path="/image-to-pdf" element={<ImageToPDFPage />} />
                  <Route path="/pdf-to-jpg" element={<PDFToJPGPage />} />
                  <Route path="/jpg-to-pdf" element={<JPGToPDFPage />} />

                  {/* Operational auxiliary routes */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPage />} />
                  <Route path="/terms-of-service" element={<TermsPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Redirection fallback */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </main>

            {/* Universal Footer Block */}
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
