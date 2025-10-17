"use client"

import React from 'react';
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
      "shrink-0 w-[360px] md:w-[420px] h-[140px] md:h-[160px]",
      "rounded-2xl border border-border bg-card text-card-foreground",
      "px-5 py-4 mr-4 md:mr-6"
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base font-medium">{t.by}</p>
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < (t.rating ?? 5) ? "fill-primary" : "fill-transparent text-muted-foreground")} />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm md:text-base line-clamp-3">“{t.testimonial}”</p>
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

  return (
    <div className="relative z-10 w-full overflow-hidden bg-transparent mt-[-120px] md:mt-[-160px]">
      <div className="relative" style={{ height: laneHeight }}>
        <div className="container mx-auto px-6 mb-3">
          <span className="text-white/90 text-xs uppercase tracking-wider">Opinie Google</span>
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
        /* Pause on hover */
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
};


