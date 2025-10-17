"use client"

import React, { MouseEvent, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Sync active tab with hash on load and section in-view while scrolling
  useEffect(() => {
    // initial from hash
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (hash) {
      const found = items.find(i => i.url === hash)
      if (found) setActiveTab(found.name)
    }

    const sectionIds = items
      .map(i => (i.url.startsWith('#') ? i.url.slice(1) : ''))
      .filter(Boolean)

    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is Element => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best && best.isIntersecting) {
          const id = (best.target as HTMLElement).id
          const match = items.find(i => i.url === `#${id}`)
          if (match) setActiveTab(match.name)
        }
      },
      { threshold: [0.6], rootMargin: '0px 0px -30% 0px' }
    )

    sections.forEach(s => observer.observe(s))
    return () => {
      sections.forEach(s => observer.unobserve(s))
      observer.disconnect()
    }
  }, [items])

  // No auto-hide on scroll

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      {/* outer glow (orange, animated) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-2xl rounded-full"
        style={{ background: "radial-gradient(40% 60% at 50% 50%, hsl(var(--primary)/.35), transparent)" }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex items-center gap-3 bg-white text-foreground border border-border py-2.5 px-3 rounded-full shadow-lg shadow-primary/20 ring-1 ring-primary/20 transition-all duration-300 font-lexend uppercase tracking-wide">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
            if (item.url.startsWith("#")) {
              e.preventDefault()
              const el = document.querySelector(item.url)
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" })
                history.pushState(null, "", item.url)
              }
            }
            setActiveTab(item.name)
          }

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={onClick}
              className={cn(
                "relative cursor-pointer text-base font-semibold px-7 py-3 rounded-full transition-colors transition-transform duration-300",
                "text-foreground/80 hover:text-foreground hover:scale-[1.03] active:scale-95",
                isActive && "bg-primary/10 text-foreground",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={22} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-14 h-7 bg-primary/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-10 h-7 bg-primary/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-5 h-5 bg-primary/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}


