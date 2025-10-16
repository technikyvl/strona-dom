import { NavBar } from "./ui/tubelight-navbar"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-white font-bold text-lg tracking-wider uppercase">Travel</span>
          </a>

          {/* Navigation */}
          <div className="hidden md:block">
            <NavBar
              items={[
                { name: "Home", url: "#" },
                { name: "About", url: "#" },
                { name: "Projects", url: "#" },
                { name: "Resume", url: "#" },
              ]}
            />
          </div>

          {/* Right slot reserved */}
          <div className="w-5 h-5" />
        </div>
      </div>
    </header>
  )
}
