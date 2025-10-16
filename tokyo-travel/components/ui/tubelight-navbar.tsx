"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

export type NavBarItem = {
  name: string
  url: string
  icon?: LucideIcon
}

type NavBarProps = {
  items: NavBarItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const containerRef = React.useRef<HTMLUListElement | null>(null)
  const itemRefs = React.useRef<Array<HTMLAnchorElement | null>>([])
  const [indicator, setIndicator] = React.useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  const updateIndicatorToIndex = React.useCallback(
    (index: number) => {
      const el = itemRefs.current[index]
      const container = containerRef.current
      if (!el || !container) return
      const elRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setIndicator({ left: elRect.left - containerRect.left, width: elRect.width })
    },
    []
  )

  React.useEffect(() => {
    // Initialize to the active index on mount and on resize
    updateIndicatorToIndex(activeIndex)
    const onResize = () => updateIndicatorToIndex(activeIndex)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeIndex, updateIndicatorToIndex])

  return (
    <nav className={cn("relative", className)}>
      <ul ref={containerRef} className="relative mx-auto flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 backdrop-blur-md ring-1 ring-white/10">
        {/* Tubelight indicator */}
        <li className="pointer-events-none absolute left-0 top-0 h-full" aria-hidden>
          <div
            className="absolute bottom-0 h-9 rounded-full bg-white/10 ring-1 ring-white/20 transition-[transform,width] duration-300 ease-out"
            style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
          />
        </li>
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <li key={item.name} className="relative z-10">
              <Link
                href={item.url}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={() => updateIndicatorToIndex(index)}
                onFocus={() => updateIndicatorToIndex(index)}
                onMouseLeave={() => updateIndicatorToIndex(activeIndex)}
                onClick={() => {
                  setActiveIndex(index)
                  updateIndicatorToIndex(index)
                }}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90 transition-colors",
                  index === activeIndex ? "text-white" : "hover:text-white"
                )}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                <span className="uppercase tracking-wide">{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar


