import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { InspireSection } from "@/components/inspire-section"
import { ContactSection } from "@/components/contact-section"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, Info, Images, MapPin } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar
        items={[
          { name: "Dom", url: "#dom", icon: Home },
          { name: "Opinie", url: "#opinie", icon: Images },
          { name: "Udogodnienia", url: "#udogodnienia", icon: Info },
          { name: "Lokalizacja", url: "#lokalizacja", icon: MapPin },
          { name: "Kontakt", url: "#kontakt", icon: MapPin },
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
