"use client"

import { ArrowLeft, X, Bell, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SidebarMenu } from "./sidebar-menu"

interface AppHeaderProps {
  title: string
  showBack?: boolean
  showClose?: boolean
  onClose?: () => void
  className?: string
  cityName?: string
  showNewsIcon?: boolean
  unreadNewsCount?: number
}

export function AppHeader({
  title,
  showBack,
  showClose,
  onClose,
  className,
  cityName,
  showNewsIcon = false,
  unreadNewsCount = 0,
}: AppHeaderProps) {
  const router = useRouter()
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 flex items-center gap-2 px-3 h-11 bg-card/95 backdrop-blur-sm border-b border-border safe-area-top",
          className,
        )}
      >
        {!showBack && !showClose && (
          <button
            onClick={() => setShowSidebar(true)}
            className="p-1.5 -ml-1 rounded-full hover:bg-secondary transition-colors"
            aria-label="Menú"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-1.5 -ml-1 rounded-full hover:bg-secondary transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate">{title}</h1>
          {cityName && <p className="text-[9px] text-muted-foreground truncate -mt-0.5">{cityName}</p>}
        </div>

        {showNewsIcon && (
          <Link
            href="/noticias"
            className="relative p-1.5 rounded-full hover:bg-secondary transition-colors"
            aria-label="Noticias"
          >
            <Bell className="h-4 w-4" />
            {unreadNewsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadNewsCount > 9 ? "9+" : unreadNewsCount}
              </span>
            )}
          </Link>
        )}

        {showClose && (
          <button
            onClick={onClose}
            className="p-1.5 -mr-1 rounded-full hover:bg-secondary transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </header>

      <SidebarMenu open={showSidebar} onOpenChange={setShowSidebar} />
    </>
  )
}
