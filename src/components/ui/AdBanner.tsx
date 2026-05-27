import React from 'react';

type AdSize = 'leaderboard' | 'rectangle' | 'mobile';

interface AdBannerProps {
  size: AdSize;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ size, className = '' }) => {
  // Map size keys to dimensions & styling
  const dimensionsMap = {
    leaderboard: {
      width: '728px',
      height: '90px',
      label: '728 x 90 Leaderboard Ad Space',
      containerClass: 'hidden md:flex w-[728px] h-[90px]',
    },
    rectangle: {
      width: '300px',
      height: '250px',
      label: '300 x 250 Medium Rectangle Ad Space',
      containerClass: 'flex w-[300px] h-[250px]',
    },
    mobile: {
      width: '320px',
      height: '50px',
      label: '320 x 50 Mobile Banner Ad Space',
      containerClass: 'flex md:hidden w-[320px] h-[50px]',
    },
  };

  const config = dimensionsMap[size];

  // In production, we would render a Google AdSense <ins> layout.
  // In development, we show an elegant subtle placeholder card.
  const isProd = process.env.NODE_ENV === 'production';

  return (
    <div className={`mx-auto my-6 justify-center items-center font-sans ${config.containerClass} ${className}`}>
      {isProd ? (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800/45 rounded border border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center text-center p-3 overflow-hidden">
          {/* AdSense fallback tag / container */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client="ca-pub-placeholder"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold mt-1">Advertisement</span>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-100/70 border-2 border-dashed border-gray-300 dark:bg-gray-900/50 dark:border-gray-800 rounded flex flex-col justify-center items-center text-center p-4">
          <span className="text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            {config.label}
          </span>
          <span className="text-[10px] text-gray-400 mt-1">
            Google AdSense Safe Zone (Monetization Slot)
          </span>
        </div>
      )}
    </div>
  );
};
