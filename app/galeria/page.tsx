"use client";

import { NavBarClient } from "@/components/ui/tubelight-navbar-wrapper";
import { I18nRoot } from "@/components/ui/i18n-root";
import { useI18n } from "@/components/ui/lang";
import { useInView } from "@/lib/use-in-view";
import Image from "next/image";

export default function GalleryPage() {
  const { t } = useI18n();
  const { ref, inView } = useInView({ threshold: 0.1, once: true });

  const galleryImages = [
    { src: "/dom na zewnatrz 2-kopia.jpeg", alt: "Dom z zewnątrz" },
    { src: "/dom na zewnatrz-kopia.jpeg", alt: "Dom z zewnątrz 2" },
    { src: "/salon 1-kopia.jpeg", alt: "Salon" },
    { src: "/salon 2-kopia.jpeg", alt: "Salon 2" },
    { src: "/salon 3-kopia.jpeg", alt: "Salon 3" },
    { src: "/salon 4-kopia.jpeg", alt: "Salon 4" },
    { src: "/sauna 1-kopia.jpeg", alt: "Sauna" },
    { src: "/sauna 2-kopia.jpeg", alt: "Sauna 2" },
    { src: "/sypialnia 1-kopia.jpeg", alt: "Sypialnia" },
    { src: "/sypialnia 2-kopia.jpeg", alt: "Sypialnia 2" },
    { src: "/sypialnia 3-kopia.jpeg", alt: "Sypialnia 3" },
    { src: "/3 sypialnia 1-kopia.jpeg", alt: "Sypialnia 3" },
    { src: "/3 sypialnia 2-kopia.jpeg", alt: "Sypialnia 3 - 2" },
    { src: "/4 sypialnia 1-kopia.jpeg", alt: "Sypialnia 4" },
    { src: "/4 sypialnia 2-kopia.jpeg", alt: "Sypialnia 4 - 2" },
    { src: "/druga sypialnia 1-kopia.jpeg", alt: "Druga sypialnia" },
    { src: "/druga sypialnia 2-kopia.jpeg", alt: "Druga sypialnia 2" },
    { src: "/lazienka 1-kopia.jpeg", alt: "Łazienka" },
    { src: "/lazienka 2-kopia.jpeg", alt: "Łazienka 2" },
    { src: "/3 lazienka 1-kopia.jpeg", alt: "Łazienka 3" },
    { src: "/3 lazienka 2-kopia.jpeg", alt: "Łazienka 3 - 2" },
    { src: "/prysznic 1-kopia.jpeg", alt: "Prysznic" },
    { src: "/prysznic 2-kopia.jpeg", alt: "Prysznic 2" },
    { src: "/plac zabaw-kopia.jpeg", alt: "Plac zabaw" },
    { src: "/plac zabaw 2-kopia.jpeg", alt: "Plac zabaw 2" },
    { src: "/suszarnia-kopia.jpeg", alt: "Suszarnia" },
    { src: "/pralnia-kopia.jpeg", alt: "Pralnia" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <I18nRoot>
        <NavBarClient />
        <section ref={ref as any} className="py-20 bg-white">
          <div className="container mx-auto px-6">
            {/* Header */}
            <div className={`text-center mb-16 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-serif-brand mb-4">
                Galeria
              </h1>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                Zobacz więcej zdjęć naszego domu i wnętrz
              </p>
            </div>

            {/* Gallery Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </I18nRoot>
    </main>
  );
}
