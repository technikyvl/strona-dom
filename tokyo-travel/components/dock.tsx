'use client'

import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion'
import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'

// Constants describe default sizing and behavior of the dock
const DOCK_HEIGHT = 128
const DEFAULT_MAGNIFICATION = 80
const DEFAULT_DISTANCE = 150
const DEFAULT_PANEL_HEIGHT = 64

// Shared props injected by DockItem into its children via cloneElement
export type DockInjectedProps = {
  width: MotionValue<number>
  isHovered: MotionValue<number>
}

export type DockProps = {
  children: React.ReactNode
  className?: string
  distance?: number
  panelHeight?: number
  magnification?: number
  spring?: SpringOptions
  // Optional visual tuning
  backgroundOpacity?: number // 0..1; overrides background color alpha
  blur?: number // pixels of backdrop blur
}

export type DockItemProps = {
  className?: string
  children: React.ReactNode
}

export type DockLabelProps = {
  className?: string
  children: React.ReactNode
  // These are injected by DockItem; optional for external typing ergonomics
  isHovered?: MotionValue<number>
}

export type DockIconProps = {
  className?: string
  children: React.ReactNode
  // These are injected by DockItem; optional for external typing ergonomics
  width?: MotionValue<number>
}

// Context holds global interaction state for the dock
type DockContextType = {
  mouseX: MotionValue<number>
  spring: SpringOptions
  magnification: number
  distance: number
}

const DockContext = createContext<DockContextType | undefined>(undefined)

function useDock(): DockContextType {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error('useDock must be used within a DockProvider')
  }
  return context
}

// DockProvider provides shared MotionValues to items
function DockProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: DockContextType
}) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}

// Dock: outer container managing hover state and row height
// - useMotionValue: tracks live values (mouseX, hover state) without rerenders
// - useTransform: maps hover [0..1] to height range
// - useSpring: smooths height changes with spring physics
export function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
  backgroundOpacity,
  blur,
}: DockProps) {
  const mouseX = useMotionValue<number>(Infinity)
  const isHovered = useMotionValue<number>(0)

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4)
  }, [magnification])

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  // Optional visual styles for translucency and blur
  const containerStyle: React.CSSProperties = {
    height,
    scrollbarWidth: 'none',
  }

  const innerStyle: React.CSSProperties = {
    height: panelHeight,
  }

  if (typeof blur === 'number') {
    // CSS backdrop blur for a frosted-glass effect
    ;(innerStyle as any).backdropFilter = `blur(${blur}px)`
  }
  if (typeof backgroundOpacity === 'number') {
    // Apply a semi-transparent background. Users can set appropriate value for their theme.
    innerStyle.backgroundColor = `rgba(0,0,0,${Math.min(Math.max(backgroundOpacity, 0), 1)})`
  }

  return (
    <motion.div style={containerStyle} className="mx-2 flex max-w-full items-end overflow-x-auto">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1)
          mouseX.set(pageX)
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Infinity)
        }}
        className={cn(
          'mx-auto flex w-fit gap-4 rounded-2xl bg-gray-50/80 px-4 backdrop-blur-sm dark:bg-neutral-900/80',
          className
        )}
        style={innerStyle}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>{children}</DockProvider>
      </motion.div>
    </motion.div>
  )
}

// DockItem: measures cursor distance to center and animates width accordingly
// - useTransform: converts mouseX -> distance from this item
// - useSpring: smooth width changes per-item
export function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { distance, magnification, mouseX, spring } = useDock()
  const isHovered = useMotionValue<number>(0)

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - domRect.x - domRect.width / 2
  })

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  )
  const width = useSpring(widthTransform, spring)

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn('relative inline-flex items-center justify-center', className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        // Inject MotionValues into children in a type-safe way
        return cloneElement(child as React.ReactElement<DockInjectedProps>, {
          width,
          isHovered,
        })
      })}
    </motion.div>
  )
}

// DockLabel: shows a small tooltip above the item while hovered
// - AnimatePresence: mounts/unmounts label with exit animation
// - Listens to MotionValue changes without causing React rerenders
export function DockLabel({ children, className, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1)
    })
    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
            className
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// DockIcon: sizes its content to half of the computed item width for visual balance
export function DockIcon({ children, className, width }: DockIconProps) {
  const halfWidth = useTransform(width ?? 0, (val) => (typeof val === 'number' ? val / 2 : val / 2))

  return (
    <motion.div style={{ width: halfWidth }} className={cn('flex items-center justify-center', className)}>
      {children}
    </motion.div>
  )
}

// Named exports for convenient imports
export default Dock


