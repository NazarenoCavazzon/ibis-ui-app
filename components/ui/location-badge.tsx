"use client"

import { MapPin, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationBadgeProps {
  location?: string
  isLoading?: boolean
  className?: string
}

export function LocationBadge({ location, isLoading, className }: LocationBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-secondary-foreground text-sm",
        className,
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Obteniendo ubicación...</span>
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 text-primary" />
          <span className="truncate">{location || "Ubicación no disponible"}</span>
        </>
      )}
    </div>
  )
}
