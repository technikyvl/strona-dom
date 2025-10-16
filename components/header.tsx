"use client"

import { Compass, Home, Images, Info, Mail, Search } from "lucide-react"
import Link from "next/link"
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/dock"

export function Header() {
  return (
    <div>
      {/* Minimal top logo (optional) */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="pointer-events-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-white font-bold text-lg tracking-wider uppercase">Travel</span>
          </Link>
        </div>
      </header>

      {/* Dock fixed to bottom */}
      <div className="fixed left-0 right-0 bottom-4 z-50">
        <Dock panelHeight={64} backgroundOpacity={0.9} blur>
          <DockItem>
            <DockLabel>Главная</DockLabel>
            <DockIcon>
              <Link href="#" className="text-white">
                <Home className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel>О нас</DockLabel>
            <DockIcon>
              <Link href="#" className="text-white">
                <Info className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel>Туры</DockLabel>
            <DockIcon>
              <Link href="#" className="text-white">
                <Compass className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel>Галерея</DockLabel>
            <DockIcon>
              <Link href="#" className="text-white">
                <Images className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel>Контакты</DockLabel>
            <DockIcon>
              <Link href="#" className="text-white">
                <Mail className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel>Поиск</DockLabel>
            <DockIcon>
              <button className="text-white">
                <Search className="size-6" />
              </button>
            </DockIcon>
          </DockItem>
        </Dock>
      </div>
    </div>
  )
}
