"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { NewsItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NewsCardProps {
  news: NewsItem
  className?: string
}

export function NewsCard({ news, className }: NewsCardProps) {
  const publishedDate = news.publishedAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  })

  return (
    <Link
      href={`/noticias/${news.id}`}
      className={cn(
        "block bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-colors",
        className,
      )}
    >
      <div className="flex gap-4">
        {news.imageUrl && (
          <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-secondary overflow-hidden">
            <img src={news.imageUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-muted-foreground">{publishedDate}</span>
          <h3 className="font-semibold text-foreground line-clamp-2 mt-1 text-balance">{news.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{news.summary}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 self-center" />
      </div>
    </Link>
  )
}
