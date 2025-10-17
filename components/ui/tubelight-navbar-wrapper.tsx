"use client"

import { Home, Star, Map, Phone, Info } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarClient() {
  const items = [
    { name: "Dom", url: "#dom", icon: Home },
    { name: "Opinie", url: "#opinie", icon: Star },
    { name: "Udogodnienia", url: "#udogodnienia", icon: Info },
    { name: "Lokalizacja", url: "#lokalizacja", icon: Map },
    { name: "Kontakt", url: "#kontakt", icon: Phone },
  ]

  return <NavBar items={items} />
}


