import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { LocationCarouselSection } from "@/components/location-carousel-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { NavBarClient } from "@/components/ui/tubelight-navbar-wrapper"
import { I18nRoot } from "@/components/ui/i18n-root"

export default function Home() {
  return (
    <main className="min-h-screen bg-background" style={{ position: 'relative' }}>
      <I18nRoot>
        <NavBarClient />
        <HeroSection />
        <section id="opinie">
          <StaggerTestimonials />
        </section>
        <ToursSection />
        <LocationCarouselSection />
        <ContactSection />
      </I18nRoot>
    </main>
  )
}
