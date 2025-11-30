"use client"

import Link from "next/link"
import { ChevronRight, MapPin } from "lucide-react"
import { StatusBanner } from "@/components/ui/status-banner"
import type { Claim } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ClaimCardProps {
  claim: Claim
  className?: string
}

export function ClaimCard({ claim, className }: ClaimCardProps) {
  const createdDate = claim.createdAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <Link
      href={`/reclamos/${claim.id}`}
      className={cn(
        "block bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-colors",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{claim.category}</span>
            <span className="text-xs text-muted-foreground">{createdDate}</span>
          </div>
          <p className="text-foreground line-clamp-2">{claim.description}</p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{claim.location}</span>
          </div>
          <StatusBanner status={claim.status} className="inline-flex text-xs py-1" />
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      </div>
    </Link>
  )
}
