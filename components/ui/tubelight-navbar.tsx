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
  const [compact, setCompact] = useState(false)

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

  // Compact mode on scroll (shrink and soften but keep visible)
  // Compact mode with hysteresis to avoid jitter
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setCompact(prev => (prev ? y > 60 : y > 120))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
        style={{ background: "radial-gradient(40% 60% at 50% 50%, hsl(var(--primary)/.45), transparent)" }}
        initial={{ opacity: 0.45 }}
        animate={{ opacity: compact ? 0.22 : [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "flex items-center gap-3 text-foreground border border-border rounded-full shadow-lg ring-1 font-lexend uppercase tracking-wide",
          "backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 bg-white/60",
        )}
        animate={{
          paddingLeft: compact ? 8 : 10,
          paddingRight: compact ? 8 : 10,
          paddingTop: compact ? 6 : 8,
          paddingBottom: compact ? 6 : 8,
          boxShadow: compact ? "0 10px 25px rgba(255,165,0,0.12)" : "0 15px 35px rgba(255,165,0,0.18)",
          opacity: compact ? 0.95 : 1,
          borderColor: compact ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.5)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
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
                "relative cursor-pointer font-semibold rounded-full transition-colors transition-transform duration-300",
                "text-foreground/80 hover:text-foreground hover:scale-[1.03] active:scale-95",
                isActive && "bg-primary/15 text-foreground",
              )}
              style={{
                padding: compact ? "0.5rem 0.9rem" : "0.65rem 1.5rem",
                fontSize: compact ? "0.9rem" : "0.95rem",
              }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={compact ? 18 : 22} strokeWidth={2.5} />
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
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary rounded-t-full"
                       style={{ width: compact ? "1.75rem" : "2.5rem", height: compact ? "0.2rem" : "0.25rem" }}>
                    <div className="absolute rounded-full blur-md -top-2 -left-2"
                         style={{ width: compact ? "2.5rem" : "3.5rem", height: compact ? "1.25rem" : "1.75rem", background: "rgb(var(--primary)/0.35)" }} />
                    <div className="absolute rounded-full blur-md -top-1"
                         style={{ width: compact ? "2rem" : "2.5rem", height: compact ? "1.25rem" : "1.75rem", background: "rgb(var(--primary)/0.35)" }} />
                    <div className="absolute rounded-full blur-sm top-0 left-2"
                         style={{ width: compact ? "1.1rem" : "1.25rem", height: compact ? "1.1rem" : "1.25rem", background: "rgb(var(--primary)/0.35)" }} />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}


