"use client";

import { Carousel } from "@/components/ui/carousel";
import { useI18n } from "@/components/ui/lang";
import { useInView } from "@/lib/use-in-view";
import { useRouter } from "next/navigation";

export function LocationCarouselSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView({ threshold: 0.15, once: true });
  const router = useRouter();

  const houseSlides = [
    {
      title: "Dom z zewnątrz",
      button: "Zobacz więcej",
      src: "/dom na zewnatrz 2-kopia.jpeg",
      onClick: () => router.push("/galeria"),
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
      </div>
    </section>
  );
}
