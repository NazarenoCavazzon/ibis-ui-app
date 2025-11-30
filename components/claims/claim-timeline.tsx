"use client"

import { Check } from "lucide-react"
import type { TimelineEvent } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ClaimTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function ClaimTimeline({ events, className }: ClaimTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1
        const time = event.timestamp.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })

        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
              </div>
              {!isLast && <div className="w-0.5 flex-1 bg-border my-1" />}
            </div>
            <div className={cn("pb-6", isLast && "pb-0")}>
              <p className="font-medium text-foreground">{event.title}</p>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
