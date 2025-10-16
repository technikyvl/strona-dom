"use client"

import { Compass, Home, Images, Info, Mail, Search } from "lucide-react"
import Link from "next/link"
import Dock, { DockIcon, DockItem, DockLabel } from "./dock"

export function Header() {
  return (
    <div>
      {/* Keep logo minimal at top-left if desired; can be removed entirely */}
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
            <DockLabel isHovered={{} as any}>Главная</DockLabel>
            <DockIcon width={{} as any}>
              <Link href="#" className="text-white">
                <Home className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel isHovered={{} as any}>О нас</DockLabel>
            <DockIcon width={{} as any}>
              <Link href="#" className="text-white">
                <Info className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel isHovered={{} as any}>Туры</DockLabel>
            <DockIcon width={{} as any}>
              <Link href="#" className="text-white">
                <Compass className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel isHovered={{} as any}>Галерея</DockLabel>
            <DockIcon width={{} as any}>
              <Link href="#" className="text-white">
                <Images className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel isHovered={{} as any}>Контакты</DockLabel>
            <DockIcon width={{} as any}>
              <Link href="#" className="text-white">
                <Mail className="size-6" />
              </Link>
            </DockIcon>
          </DockItem>
          <DockItem>
            <DockLabel isHovered={{} as any}>Поиск</DockLabel>
            <DockIcon width={{} as any}>
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
