"use client"

import { Home, Map, Phone, Info, Images } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useI18n } from "@/components/ui/lang"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

function InnerNav() {
  const { t } = useI18n()
  const items = [
    { name: t("home"), url: "/#dom", icon: Home },
    { name: t("amenities"), url: "/#udogodnienia", icon: Info },
    { name: t("location"), url: "/#lokalizacja", icon: Map },
    { name: t("gallery"), url: "/galeria", icon: Images },
    { name: t("contact"), url: "/#kontakt", icon: Phone },
  ]
  return (
    <>
      <NavBar items={items} />
      <div className="fixed top-0 right-4 z-[60] pt-6 hidden sm:block">
        <LanguageSwitcher />
      </div>
    </>
  )
}

export function NavBarClient() { return <InnerNav /> }


