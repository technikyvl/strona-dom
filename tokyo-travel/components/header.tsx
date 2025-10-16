import { Search } from "lucide-react"
import Link from "next/link"

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
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
            >
              Главная
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
            >
              О нас
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
            >
              Туры
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
            >
              Галерея
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
            >
              Отзывы
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
            >
              Контакты
            </Link>
          </nav>

          {/* Search Icon */}
          <button className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
