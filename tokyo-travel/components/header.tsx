import { Search, Home, User, Briefcase, FileText } from "lucide-react"
import Link from "next/link"
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-white font-bold text-lg tracking-wider uppercase">Travel</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:block">
            <NavBar
              items={[
                { name: "Home", url: "#", icon: Home },
                { name: "About", url: "#", icon: User },
                { name: "Projects", url: "#", icon: Briefcase },
                { name: "Resume", url: "#", icon: FileText },
              ]}
            />
          </div>

          {/* Search Icon */}
          <button className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
