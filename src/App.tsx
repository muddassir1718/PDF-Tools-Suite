import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Loader2 } from 'lucide-react';
import { toolsRegistry } from './utils/toolRegistry';

// Lazy load key components and structures
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const MergePage = lazy(() => import('./pages/MergePage').then((m) => ({ default: m.MergePage })));
const SplitPage = lazy(() => import('./pages/SplitPage').then((m) => ({ default: m.SplitPage })));
const CompressPage = lazy(() => import('./pages/CompressPage').then((m) => ({ default: m.CompressPage })));
const UnlockPage = lazy(() => import('./pages/UnlockPage').then((m) => ({ default: m.UnlockPage })));
const ImageToPDFPage = lazy(() => import('./pages/ImageToPDFPage').then((m) => ({ default: m.ImageToPDFPage })));
const PDFToJPGPage = lazy(() => import('./pages/PDFToJPGPage').then((m) => ({ default: m.PDFToJPGPage })));
const JPGToPDFPage = lazy(() => import('./pages/JPGToPDFPage').then((m) => ({ default: m.JPGToPDFPage })));

const UniversalToolPage = lazy(() => import('./pages/UniversalToolPage').then((m) => ({ default: m.UniversalToolPage })));

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

const PageFallbackSpinner: React.FC = () => (
  <div className="flex-1 flex flex-col justify-center items-center min-h-[50vh] py-12">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
    <span className="text-xs font-semibold text-gray-450 animate-pulse">
      Loading secure tool module...
    </span>
  </div>
);

export default function App() {
  // Override paths that are handled by pre-existing manual pages
  const overriddenPaths = [
    '/merge-pdf',
    '/split-pdf',
    '/compress-pdf',
    '/unlock-pdf',
    '/image-to-pdf',
    '/pdf-to-jpg',
    '/jpg-to-pdf'
  ];

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
            
            {/* Header Sticky Navigation */}
            <Header />

            {/* Core Flexible Content Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
              <Suspense fallback={<PageFallbackSpinner />}>
                <Routes>
                  {/* Homepage */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Overridden legacy pages (fully intact as requested) */}
                  <Route path="/merge-pdf" element={<MergePage />} />
                  <Route path="/split-pdf" element={<SplitPage />} />
                  <Route path="/compress-pdf" element={<CompressPage />} />
                  <Route path="/unlock-pdf" element={<UnlockPage />} />
                  <Route path="/image-to-pdf" element={<ImageToPDFPage />} />
                  <Route path="/pdf-to-jpg" element={<PDFToJPGPage />} />
                  <Route path="/jpg-to-pdf" element={<JPGToPDFPage />} />

                  {toolsRegistry
                    .filter(t => !overriddenPaths.includes(t.path))
                    .map(t => {
                      const RouteAny = Route as any;
                      return <RouteAny key={t.id} path={t.path} element={<UniversalToolPage />} />;
                    })
                  }

                  {/* Standard supplementary links */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPage />} />
                  <Route path="/terms-of-service" element={<TermsPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Redirection fallback */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </main>

            {/* Sticky/Flowing Footer Block */}
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
