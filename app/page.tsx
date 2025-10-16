import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { InspireSection } from "@/components/inspire-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ToursSection />
      <InspireSection />
      <GallerySection />
      <StaggerTestimonials />
      <ContactSection />
    </main>
  )
}
