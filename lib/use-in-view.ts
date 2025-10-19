"use client"

import { useEffect, useRef, useState } from "react"

type UseInViewOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  delay?: number
}

export function useInView({ root = null, rootMargin = "0px", threshold = 0.15, once = true, delay = 0 }: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setInView(true)
                if (once) setHasAnimated(true)
              }, delay)
            } else {
              setInView(true)
              if (once) setHasAnimated(true)
            }
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
            setHasAnimated(false)
          }
        })
      },
      { root, rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold, once, delay])

  return { ref, inView }
}


