import { Search, Home, Info, Plane, Images, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/dock"

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

          {/* Navigation replaced with Dock */}
          <div className="hidden md:flex">
            <Dock blur={8} backgroundOpacity={0.2} className="bg-white/10 dark:bg-black/10">
              <DockItem>
                <DockIcon className="text-white"><Home className="w-full h-full" /></DockIcon>
                <DockLabel className="">Главная</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon className="text-white"><Info className="w-full h-full" /></DockIcon>
                <DockLabel>О нас</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon className="text-white"><Plane className="w-full h-full" /></DockIcon>
                <DockLabel>Туры</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon className="text-white"><Images className="w-full h-full" /></DockIcon>
                <DockLabel>Галерея</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon className="text-white"><MessageSquare className="w-full h-full" /></DockIcon>
                <DockLabel>Отзывы</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon className="text-white"><Phone className="w-full h-full" /></DockIcon>
                <DockLabel>Контакты</DockLabel>
              </DockItem>
            </Dock>
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
