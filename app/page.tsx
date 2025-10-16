import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { InspireSection } from "@/components/inspire-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ToursSection />
      <InspireSection />
      {/* Testimonials follow after Inspire when gallery is removed */}
      <StaggerTestimonials />
      <ContactSection />
    </main>
  )
}
