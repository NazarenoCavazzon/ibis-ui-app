"use client"

import { useState, useEffect } from "react"
import { User, Info, UserPlus, Bell, Shield, HelpCircle, FileText, LogOut, Palette } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { applyTheme, getStoredTheme, type ThemeColor, themeLabels, themePreviewColors } from "@/lib/theme-config"
import { Check } from "lucide-react"

interface SidebarMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CITY_NAME = "Municipalidad de San Isidro"

const themeOrder: ThemeColor[] = [
  "blue",
  "deep-blue",
  "green",
  "deep-green",
  "red",
  "deep-red",
  "orange",
  "yellow",
  "deep-yellow",
  "gray",
  "white",
]

const menuItems = [
  { icon: User, label: "Perfil", href: "/perfil" },
  { icon: UserPlus, label: "Invitar", href: "/red?invite=true" },
  { divider: true },
  { icon: Bell, label: "Notificaciones", href: "#" },
  { icon: Shield, label: "Privacidad y seguridad", href: "#" },
  { icon: HelpCircle, label: "Ayuda y soporte", href: "#" },
  { divider: true },
  { icon: Palette, label: "Tema", expandable: true },
  { divider: true },
  { icon: Info, label: "Información Ibis SOS", href: "#" },
  { icon: FileText, label: "Términos y condiciones", href: "#" },
  { divider: true },
  { icon: LogOut, label: "Cerrar sesión", action: "logout", className: "text-destructive" },
]

export function SidebarMenu({ open, onOpenChange }: SidebarMenuProps) {
  const router = useRouter()
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<ThemeColor>("blue")

  useEffect(() => {
    setSelectedTheme(getStoredTheme())
  }, [])

  const handleAction = (action?: string) => {
    if (action === "logout") {
      router.push("/")
    }
    onOpenChange(false)
  }

  const handleThemeChange = (theme: ThemeColor) => {
    setSelectedTheme(theme)
    applyTheme(theme)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle>{CITY_NAME}</SheetTitle>
        </SheetHeader>

        <nav className="py-4">
          {menuItems.map((item, idx) => {
            if ("divider" in item && item.divider) {
              return <div key={`divider-${idx}`} className="my-2 border-t border-border/50" />
            }

            if ("expandable" in item && item.expandable) {
              const { icon: Icon, label } = item
              return (
                <div key={label}>
                  <button
                    onClick={() => setShowThemeSelector(!showThemeSelector)}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-secondary/50 transition-colors text-left"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{label}</span>
                    <span className="ml-auto text-muted-foreground text-sm">{showThemeSelector ? "▲" : "▼"}</span>
                  </button>

                  {showThemeSelector && (
                    <div className="px-4 py-3 bg-secondary/30">
                      <div className="grid grid-cols-3 gap-2">
                        {themeOrder.map((theme) => (
                          <button
                            key={theme}
                            onClick={() => handleThemeChange(theme)}
                            className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-lg border-2 transition-all ${
                              selectedTheme === theme
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50 bg-card"
                            }`}
                          >
                            <div
                              className="w-7 h-7 rounded-full ring-1 ring-border/30"
                              style={{ backgroundColor: themePreviewColors[theme] }}
                            />
                            <span className="text-[10px] font-medium leading-tight text-center text-foreground">
                              {themeLabels[theme]}
                            </span>
                            {selectedTheme === theme && (
                              <Check className="absolute top-1 right-1 w-3.5 h-3.5 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            const {
              icon: Icon,
              label,
              href,
              action,
              className,
            } = item as {
              icon: typeof User
              label: string
              href?: string
              action?: string
              className?: string
            }

            return (
              <button
                key={label}
                onClick={() => {
                  if (action) {
                    handleAction(action)
                  } else if (href && href !== "#") {
                    router.push(href)
                    onOpenChange(false)
                  }
                }}
                className={`w-full flex items-center gap-4 px-6 py-3 hover:bg-secondary/50 transition-colors text-left ${className || ""}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{label}</span>
              </button>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
