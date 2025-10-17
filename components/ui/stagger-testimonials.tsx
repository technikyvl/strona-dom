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
  { tempId: 9, testimonial: "Idealne miejsce wypadowe na szlaki.", by: "Bartek", rating: 5 },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    by: "Pete, Sales Director at RevenueRockets",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina, HR Manager at TalentForge",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 12,
    testimonial: "COMPANY's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia, Customer Success Manager at ClientCare",
    imgSrc: "https://i.pravatar.cc/150?img=13"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing COMPANY are off the charts!",
    by: "Raj, Operations Manager at StreamlineSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=14"
  },
  {
    tempId: 14,
    testimonial: "COMPANY has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila, Workflow Specialist at ProcessPro",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
  {
    tempId: 15,
    testimonial: "The scalability of COMPANY's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor, Scaling Officer at GrowthGurus",
    imgSrc: "https://i.pravatar.cc/150?img=16"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how COMPANY continually innovates. They're always one step ahead.",
    by: "Naomi, Innovation Lead at FutureTech",
    imgSrc: "https://i.pravatar.cc/150?img=17"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with COMPANY is incredible. It's paid for itself many times over.",
    by: "Victor, Finance Analyst at ProfitPeak",
    imgSrc: "https://i.pravatar.cc/150?img=18"
  },
  {
    tempId: 18,
    testimonial: "COMPANY's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yuki, Tech Lead at BalancedTech",
    imgSrc: "https://i.pravatar.cc/150?img=19"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but COMPANY stands out in terms of reliability and performance.",
    by: "Zoe, Performance Manager at ReliableSystems",
    imgSrc: "https://i.pravatar.cc/150?img=20"
  }
];

function SmallCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className={cn(
      "shrink-0 w-[360px] md:w-[420px] h-[160px] md:h-[180px]",
      "rounded-2xl border border-border bg-card text-card-foreground",
      "px-5 py-4 mr-4 md:mr-6"
    )}>
      <div className="flex items-start gap-3">
        <img
          src={t.imgSrc}
          alt={t.by.split(',')[0]}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base line-clamp-3">“{t.testimonial}”</p>
          <p className="mt-2 text-xs md:text-sm text-muted-foreground">— {t.by}</p>
        </div>
      </div>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  // Narrower lane: ~220px tall
  const laneHeight = 220;
  // Duplicate list for seamless loop
  const loop = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden bg-muted/20 border-y border-border">
      <div className="relative" style={{ height: laneHeight }}>
        <div className="absolute inset-0">
          <div className="marquee-track">
            {loop.map((t, i) => (
              <SmallCard key={`${t.tempId}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient edges for nicer fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />

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
          animation: marquee 40s linear infinite;
        }
        /* Pause on hover */
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
};


