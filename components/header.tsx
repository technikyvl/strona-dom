import { Search } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-center">
        {/* Liquid glass navbar */}
        <div className="relative w-full max-w-4xl">
          {/* subtle glow behind */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-2xl opacity-40 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

          <nav className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl shadow-lg shadow-black/10 ring-1 ring-white/10">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-white/70 to-white/30 text-black/80 backdrop-blur-md ring-1 ring-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-primary block" />
              </span>
              <span className="text-white/90 group-hover:text-white transition-colors font-semibold tracking-wide uppercase">Travel</span>
            </Link>

            {/* Center: Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wide">
              <Link href="#dom" className="text-white/80 hover:text-white transition-colors">Dom</Link>
              <Link href="#udogodnienia" className="text-white/80 hover:text-white transition-colors">Udogodnienia</Link>
              <Link href="#galeria" className="text-white/80 hover:text-white transition-colors">Galeria</Link>
              <Link href="#lokalizacja" className="text-white/80 hover:text-white transition-colors">Lokalizacja</Link>
              <Link href="#kontakt" className="text-white/80 hover:text-white transition-colors">Kontakt</Link>
            </div>

            {/* Right: Search */}
            <button className="inline-flex items-center justify-center rounded-xl h-9 w-9 text-white/80 hover:text-white ring-1 ring-inset ring-white/20 hover:ring-white/30 bg-white/10 hover:bg-white/15 transition-all">
              <Search className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
