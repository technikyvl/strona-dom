import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { InspireSection } from "@/components/inspire-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { NavBarClient } from "@/components/ui/tubelight-navbar-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavBarClient />
      <HeroSection />
      <section id="opinie">
        <StaggerTestimonials />
      </section>
      <ToursSection />
      <InspireSection />
      <ContactSection />
    </main>
  )
}
