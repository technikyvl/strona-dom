import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { LocationScrollSection } from "@/components/location-scroll-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { NavBarClient } from "@/components/ui/tubelight-navbar-wrapper"
import { I18nRoot } from "@/components/ui/i18n-root"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <I18nRoot>
        <NavBarClient />
        <HeroSection />
        <section id="opinie">
          <StaggerTestimonials />
        </section>
        <ToursSection />
        <LocationScrollSection />
        <div className="transition-opacity duration-1000 ease-in-out">
          <ContactSection />
        </div>
      </I18nRoot>
    </main>
  )
}
