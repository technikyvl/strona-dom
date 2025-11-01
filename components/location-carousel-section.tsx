"use client";

import { Carousel } from "@/components/ui/carousel";
import { useI18n } from "@/components/ui/lang";
import { useInView } from "@/lib/use-in-view";

export function LocationCarouselSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView({ threshold: 0.05, once: false });

  const houseSlides = [
    {
      title: t("carouselHouseOutside"),
      button: t("carouselViewOnMap"),
      src: "/dom na zewnatrz 2-kopia.jpeg",
      onClick: () => window.open("https://maps.app.goo.gl/NMgGnAuTGomF5pBXA", "_blank"),
    },
    {
      title: t("carouselSpaciousSalon"),
      button: t("carouselViewOnMap"),
      src: "/salon 1-kopia.jpeg",
      onClick: () => window.open("https://maps.app.goo.gl/NMgGnAuTGomF5pBXA", "_blank"),
    },
    {
      title: t("carouselGuestSauna"),
      button: t("carouselViewOnMap"),
      src: "/sauna 1-kopia.jpeg",
      onClick: () => window.open("https://maps.app.goo.gl/NMgGnAuTGomF5pBXA", "_blank"),
    },
    {
      title: t("carouselMasterBedroom"),
      button: t("carouselViewOnMap"),
      src: "/sypialnia 1-kopia.jpeg",
      onClick: () => window.open("https://maps.app.goo.gl/NMgGnAuTGomF5pBXA", "_blank"),
    },
    {
      title: t("carouselModernKitchen"),
      button: t("carouselViewOnMap"),
      src: "/salon 2-kopia.jpeg",
      onClick: () => window.open("https://maps.app.goo.gl/NMgGnAuTGomF5pBXA", "_blank"),
    },
    {
      title: t("carouselTerraceGrill"),
      button: t("carouselViewOnMap"),
      src: "/plac zabaw-kopia.jpeg",
      onClick: () => window.open("https://maps.app.goo.gl/NMgGnAuTGomF5pBXA", "_blank"),
    },
  ];

  return (
    <section id="lokalizacja" ref={ref as any} className="min-h-screen bg-white flex items-center py-8 sm:py-12 md:py-16 lg:py-20 relative z-[45] scroll-mt-24 pointer-events-auto">
      <div className="container mx-auto px-4 sm:px-6 w-full pointer-events-auto">
        {/* Section Header */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ease-out pointer-events-auto ${inView ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}`}>
          <p className="text-foreground/60 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">{t("locationTitle")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif-brand mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-4">
            Szczyrk – blisko stoków i szlaków
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            {t("locationDescription")}
          </p>
        </div>

        {/* Carousel */}
        <div className={`transition-all duration-1000 ease-out delay-300 pointer-events-auto relative z-[55] ${inView ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}`}>
          <Carousel slides={houseSlides} />
        </div>
      </div>
    </section>
  );
}
