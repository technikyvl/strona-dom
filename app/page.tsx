import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ToursSection } from "@/components/tours-section"
import { InspireSection } from "@/components/inspire-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ToursSection />
      <InspireSection />
    </main>
  )
}
