import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { InspireSection } from "@/components/inspire-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, Star, Wrench, MapPin, Phone } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar
        items={[
          { name: "Dom", url: "#dom", icon: Home },
          { name: "Opinie", url: "#opinie", icon: Star },
          { name: "Udogodnienia", url: "#udogodnienia", icon: Wrench },
          { name: "Lokalizacja", url: "#lokalizacja", icon: MapPin },
          { name: "Kontakt", url: "#kontakt", icon: Phone },
        ]}
      />
      <HeroSection />
      <div id="opinie">
        <StaggerTestimonials />
      </div>
      <ToursSection />
      <InspireSection />
      <ContactSection />
    </main>
  )
}
