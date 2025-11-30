"use client"

import { cn } from "@/lib/utils"
import { Check, CheckCheck, Mic } from "lucide-react"

interface ChatBubbleProps {
  content: string
  isUser: boolean
  timestamp: Date
  isAudio?: boolean
  isRead?: boolean
}

export function ChatBubble({ content, isUser, timestamp, isAudio, isRead }: ChatBubbleProps) {
  const time = timestamp.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card text-card-foreground border border-border rounded-bl-md",
        )}
      >
        {isAudio ? (
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <div className="flex gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={cn("w-1 rounded-full", isUser ? "bg-primary-foreground/60" : "bg-muted-foreground/60")}
                  style={{ height: `${Math.random() * 16 + 8}px` }}
                />
              ))}
            </div>
            <span className="text-xs opacity-70">0:12</span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{content}</p>
        )}
        <div className={cn("flex items-center gap-1 mt-1", isUser ? "justify-end" : "justify-start")}>
          <span className={cn("text-[10px]", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {time}
          </span>
          {isUser &&
            (isRead ? (
              <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
            ) : (
              <Check className="h-3 w-3 text-primary-foreground/70" />
            ))}
        </div>
      </div>
    </div>
  )
}
