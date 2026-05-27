import React from 'react';
import { PDFToExcel } from '../components/tools/PDFToExcel';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { SEO } from '../components/ui/SEO';
import { toolsRegistry } from '../utils/toolRegistry';

export const PDFToExcelPage: React.FC = () => {
  const toolInfo = toolsRegistry.find((t) => t.id === 'pdf-to-excel')!;

  return (
    <div className="font-sans py-4">
      <SEO 
        title={toolInfo.seoTitle} 
        description={toolInfo.seoDesc} 
        path="/pdf-to-excel" 
      />

      {/* Top Banner space */}
      <AdBanner size="leaderboard" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-900 p-4 md:p-6 lg:p-8">
          
          {/* Main App Workspace */}
          <PDFToExcel />

        </div>

        {/* Global Sidebar Tools Swapper */}
        <Sidebar />
      </div>

      {/* Bottom Leaderboard banner */}
      <AdBanner size="leaderboard" className="mt-8" />
    </div>
  );
};
