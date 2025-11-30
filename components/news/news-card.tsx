"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { NewsItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NewsCardProps {
  news: NewsItem
  category?: string
  className?: string
}

const categoryColors: Record<string, { bg: string; badge: string }> = {
  actualizacion: { bg: "bg-blue-500/10", badge: "bg-blue-500/20 text-blue-300" },
  importante: { bg: "bg-red-500/10", badge: "bg-red-500/20 text-red-300" },
  prevencion: { bg: "bg-amber-500/10", badge: "bg-amber-500/20 text-amber-300" },
  default: { bg: "bg-secondary/50", badge: "bg-secondary text-muted-foreground" },
}

export function NewsCard({ news, category = "default", className }: NewsCardProps) {
  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return "Hace menos de una hora"
    if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`
    if (diffDays === 1) return "Hace 1 día"
    return `Hace ${diffDays} días`
  }

  const colors = categoryColors[category] || categoryColors.default
  const categoryLabel = category === "default" ? "Noticia" : category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <Link
      href={`/noticias/${news.id}`}
      className={cn(
        "block rounded-lg border border-border p-4 hover:border-primary/50 transition-colors",
        colors.bg,
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <span className={cn("text-xs font-semibold px-2 py-1 rounded", colors.badge)}>{categoryLabel}</span>
        </div>

        <div>
          <h3 className="font-bold text-base text-foreground line-clamp-2 text-balance">{news.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{news.summary}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{getRelativeTime(news.publishedAt)}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Link>
  )
}
