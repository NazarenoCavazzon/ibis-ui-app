"use client"

import { User, Info, UserPlus, Bell, Shield, HelpCircle, FileText, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

interface SidebarMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CITY_NAME = "Municipalidad de San Isidro"

const menuItems = [
  { icon: User, label: "Perfil", href: "/perfil" },
  { icon: UserPlus, label: "Invitar", href: "/red?invite=true" },
  { divider: true },
  { icon: Bell, label: "Notificaciones", href: "#" },
  { icon: Shield, label: "Privacidad y seguridad", href: "#" },
  { icon: HelpCircle, label: "Ayuda y soporte", href: "#" },
  { divider: true },
  { icon: Info, label: "Información Ibis SOS", href: "#" },
  { icon: FileText, label: "Términos y condiciones", href: "#" },
  { divider: true },
  { icon: LogOut, label: "Cerrar sesión", action: "logout", className: "text-destructive" },
]

export function SidebarMenu({ open, onOpenChange }: SidebarMenuProps) {
  const router = useRouter()

  const handleAction = (action?: string) => {
    if (action === "logout") {
      console.log("Cerrar sesión")
    }
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle>{CITY_NAME}</SheetTitle>
        </SheetHeader>

        <nav className="py-4">
          {menuItems.map((item, idx) => {
            if ("divider" in item) {
              return <div key={`divider-${idx}`} className="my-2 border-t border-border/50" />
            }

            const { icon: Icon, label, href, action, className } = item

            return (
              <button
                key={label}
                onClick={() => {
                  if (action) {
                    handleAction(action)
                  } else if (href !== "#") {
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
