"use client";

import { Carousel } from "@/components/ui/carousel";
import { useI18n } from "@/components/ui/lang";
import { useInView } from "@/lib/use-in-view";

export function LocationCarouselSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView({ threshold: 0.15, once: true });

  const houseSlides = [
    {
      title: "Dom z zewnątrz",
      button: "Zobacz więcej",
      src: "/dom na zewnatrz 2-kopia.jpeg",
    },
    {
      title: "Przestronny salon",
      button: "Zobacz więcej",
      src: "/salon 1-kopia.jpeg",
    },
    {
      title: "Sauna dla gości",
      button: "Zobacz więcej",
      src: "/sauna 1-kopia.jpeg",
    },
    {
      title: "Sypialnia główna",
      button: "Zobacz więcej",
      src: "/sypialnia 1-kopia.jpeg",
    },
    {
      title: "Nowoczesna kuchnia",
      button: "Zobacz więcej",
      src: "/salon 2-kopia.jpeg",
    },
    {
      title: "Taras z grillem",
      button: "Zobacz więcej",
      src: "/plac zabaw-kopia.jpeg",
    },
  ];

  return (
    <section id="lokalizacja" ref={ref as any} className="min-h-screen bg-white flex items-center py-20">
      <div className="container mx-auto px-6 w-full">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-foreground/60 text-sm uppercase tracking-widest mb-3">{t("locationTitle")}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif-brand mb-8">
            Szczyrk – blisko stoków i szlaków
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("locationDescription")}
          </p>
        </div>

        {/* Carousel */}
        <div className={`transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Carousel slides={houseSlides} />
        </div>

        {/* Additional Info */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ease-out delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="bg-muted/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Blisko stoków</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>• Skrzyczne - 850 m</li>
              <li>• SMR - 2,8 km</li>
              <li>• Beskid Sport Arena - 2,2 km</li>
              <li>• SKIBUS - 200 m</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">W centrum</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>• Restauracje i kawiarnie</li>
              <li>• Sklepy i supermarkety</li>
              <li>• Spokojna okolica</li>
              <li>• Łatwy dojazd</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
