"use client"

import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion"
import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react"
import { cn } from "@/lib/utils"

// Constants tuned for pleasant default behavior
const DOCK_MAX_ROW_HEIGHT = 128
const DEFAULT_MAGNIFICATION = 80
const DEFAULT_DISTANCE = 150
const DEFAULT_PANEL_HEIGHT = 64

// Shared context types
export type DockContextValue = {
  mouseX: MotionValue<number>
  spring: SpringOptions
  magnification: number
  distance: number
}

type DockProviderProps = {
  children: React.ReactNode
  value: DockContextValue
}

const DockContext = createContext<DockContextValue | undefined>(undefined)

// DockProvider: makes shared MotionValues and config available to items
function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}

function useDock(): DockContextValue {
  const context = useContext(DockContext)
  if (!context) throw new Error("useDock must be used within a DockProvider")
  return context
}

// Public props
export type DockProps = {
  children: React.ReactNode
  className?: string
  distance?: number
  panelHeight?: number
  magnification?: number
  spring?: SpringOptions
  // Optional background customization
  backgroundOpacity?: number // 0..1
  blur?: boolean
}

// Dock: outer interactive container tracking mouse and animating height
// - useMotionValue: stores instantaneous state (mouseX, hover flag)
// - useTransform: maps hover to row height
// - useSpring: smooths transforms for natural motion
export function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
  backgroundOpacity = 1,
  blur = false,
}: DockProps) {
  const mouseX = useMotionValue<number>(Infinity)
  const isHovered = useMotionValue<number>(0)

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_MAX_ROW_HEIGHT, magnification + magnification / 2 + 4)
  }, [magnification])

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  const bgClass = "bg-gray-50 dark:bg-neutral-900"
  const backdropClass = blur ? "backdrop-blur-md" : ""
  const bgStyle: React.CSSProperties = {
    // Allow runtime control of background opacity
    // Framer styles merge with class names; we keep color in class, alpha here
    // using CSS variable-like opacity via rgba on top of class background
    opacity: Math.max(0, Math.min(1, backgroundOpacity)),
  }

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" as unknown as number }}
      className="mx-2 flex max-w-full items-end overflow-x-auto"
    >
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
          "mx-auto flex w-fit gap-4 rounded-2xl px-4",
          bgClass,
          backdropClass,
          className,
        )}
        style={{ height: panelHeight, ...bgStyle }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  )
}

export type DockItemChildProps = {
  width: MotionValue<number>
  isHovered: MotionValue<number>
}

export type DockItemProps = {
  className?: string
  children:
    | ReactElement<Partial<DockItemChildProps>>
    | Array<ReactElement<Partial<DockItemChildProps>>>
}

// DockItem: computes distance from cursor and springs width accordingly
export function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { distance, magnification, mouseX, spring } = useDock()
  const isHovered = useMotionValue<number>(0)

  // useTransform: map mouse x to distance relative to this item center
  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - domRect.x - domRect.width / 2
  })

  // Map distance to target width, then smooth with spring
  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40],
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
      className={cn("relative inline-flex items-center justify-center", className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children as ReactElement<Partial<DockItemChildProps>>[], (child) =>
        cloneElement<Partial<DockItemChildProps>>(child, { width, isHovered }),
      )}
    </motion.div>
  )
}

export type DockLabelProps = {
  className?: string
  children: React.ReactNode
  // Injected by DockItem via cloneElement
  isHovered?: MotionValue<number>
}

// DockLabel: appears above an item when hovered
// - AnimatePresence: mounts/unmounts with exit animation
export function DockLabel({ children, className, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on("change", (latest) => {
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
            "absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white",
            className,
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export type DockIconProps = {
  className?: string
  children: React.ReactNode
  // Injected by DockItem via cloneElement
  width?: MotionValue<number>
}

// DockIcon: scales icon container based on half of item width
export function DockIcon({ children, className, width }: DockIconProps) {
  const halfWidth = useTransform(width ?? 40, (val) => Number(val) / 2)

  return (
    <motion.div style={{ width: halfWidth }} className={cn("flex items-center justify-center", className)}>
      {children}
    </motion.div>
  )
}

export default Dock


