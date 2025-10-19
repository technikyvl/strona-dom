'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { useI18n } from '@/components/ui/lang';

export function LocationScrollSection() {
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/salon 1-kopia.jpeg" // Salon or sauna image for expanding
        bgImageSrc="/dom na zewnatrz 2-kopia.jpeg" // House from outside as background
        title={t("locationTitle")} // "Szczyrk – blisko stoków i szlaków"
        date="Szczyrk"
        scrollToExpand="Przewiń, aby rozwinąć"
        textBlend={true}
      >
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
            {t("locationTitle")}
          </h2>
          <p className='text-lg mb-8 text-black dark:text-white whitespace-pre-line'>
            {t("locationDescription")}
          </p>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
            <div className='bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg'>
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>Blisko stoków</h3>
              <ul className='text-gray-700 space-y-2'>
                <li>• Skrzyczne - 850 m</li>
                <li>• SMR - 2,8 km</li>
                <li>• Beskid Sport Arena - 2,2 km</li>
                <li>• SKIBUS - 200 m</li>
              </ul>
            </div>
            
            <div className='bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg'>
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>W centrum</h3>
              <ul className='text-gray-700 space-y-2'>
                <li>• Restauracje i kawiarnie</li>
                <li>• Sklepy i supermarkety</li>
                <li>• Spokojna okolica</li>
                <li>• Łatwy dojazd</li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
