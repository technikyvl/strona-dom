"use client"

import React from 'react';
import { useI18n } from '@/components/ui/lang';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  { tempId: 0, testimonial: "Świetne miejsce, idealna lokalizacja i bardzo czysto.", by: "Kasia", rating: 5 },
  { tempId: 1, testimonial: "Bardzo pomocny kontakt, wszystko zgodnie z opisem.", by: "Michał", rating: 5 },
  { tempId: 2, testimonial: "Sauna i taras to ogromny plus. Polecam!", by: "Anna", rating: 5 },
  { tempId: 3, testimonial: "Piękne widoki, blisko stoków. Na pewno wrócimy.", by: "Tomek", rating: 5 },
  { tempId: 4, testimonial: "Dom przestronny i komfortowy, wszystko na plus.", by: "Ewa", rating: 5 },
  { tempId: 5, testimonial: "Cicha okolica, super dla rodziny.", by: "Piotr", rating: 4 },
  { tempId: 6, testimonial: "Wszystko zgodnie z opisem, polecam.", by: "Joanna", rating: 5 },
  { tempId: 7, testimonial: "Świetny kontakt z właścicielem, szybka reakcja.", by: "Krzysztof", rating: 5 },
  { tempId: 8, testimonial: "Bardzo wygodne łóżka i dobrze wyposażona kuchnia.", by: "Agnieszka", rating: 5 },
  { tempId: 9, testimonial: "Idealne miejsce wypadowe na szlaki.", by: "Bartek", rating: 5 }
];

function SmallCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className={cn(
      "shrink-0 w-[280px] md:w-[340px] h-[90px] md:h-[110px]",
      "rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl text-black",
      "ring-1 ring-black/5 shadow-lg shadow-black/10 px-4 py-3 mr-3 md:mr-4"
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base font-medium text-black/90">{t.by}</p>
            <div className="flex items-center gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-3.5 w-3.5", i < (t.rating ?? 5) ? "fill-yellow-400" : "fill-transparent text-black/30")} />
              ))}
            </div>
          </div>
          <p className="mt-1 text-xs md:text-sm line-clamp-2 text-black/90">“{t.testimonial}”</p>
        </div>
      </div>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  // Narrower lane
  const laneHeight = 140;
  // Duplicate list for seamless loop
  const loop = [...testimonials, ...testimonials];
  const { locale } = useI18n();

  return (
    <div className="relative z-10 w-full overflow-hidden bg-transparent mt-[-120px] md:mt-[-160px]">
      <div className="relative" style={{ height: laneHeight }}>
        <div className="container mx-auto px-6 mb-2">
          <span className="inline-block text-white/90 text-xs uppercase tracking-wider pl-1 pr-2 py-1 bg-black/20 backdrop-blur-sm rounded-md">
            {locale === 'pl' ? 'Opinie Google' :
             locale === 'en' ? 'Google Reviews' :
             locale === 'de' ? 'Google Bewertungen' :
             locale === 'cs' ? 'Google Recenze' :
             locale === 'sk' ? 'Google Recenzie' :
             locale === 'uk' ? 'Відгуки Google' : 'Opinie Google'}
          </span>
        </div>
        <div className="absolute inset-0">
          <div className="marquee-track">
            {loop.map((t, i) => (
              <SmallCard key={`${t.tempId}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Edge fades removed to keep full transparency over hero */}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          height: 100%;
          width: max-content;
          animation: marquee 120s linear infinite;
        }
        /* No pause on hover */
      `}</style>
    </div>
  );
};


