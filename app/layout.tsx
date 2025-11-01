import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lexend_Deca } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
})

const lexend = Lexend_Deca({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "Highlander House Szczyrk",
  description: "Dom w Szczyrku - blisko stoków i szlaków. Sprawdź dostępność i zarezerwuj swój pobyt.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${lexend.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
