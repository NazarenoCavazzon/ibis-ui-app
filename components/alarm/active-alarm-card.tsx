"use client"

import { MessageCircle, XCircle, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBanner } from "@/components/ui/status-banner"
import type { Alarm, AlarmType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ActiveAlarmCardProps {
  alarm: Alarm
  onOpenChat: () => void
  onCancel: () => void
  className?: string
}

const typeLabels: Record<AlarmType, string> = {
  emergencia_medica: "Emergencia médica",
  incendio: "Incendio",
  inseguridad: "Inseguridad",
  accidente: "Accidente de tránsito",
  otro: "Otra emergencia",
}

export function ActiveAlarmCard({ alarm, onOpenChat, onCancel, className }: ActiveAlarmCardProps) {
  const createdTime = alarm.createdAt.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={cn("bg-card rounded-2xl border-2 border-destructive shadow-lg overflow-hidden", className)}>
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-foreground">{typeLabels[alarm.type]}</h3>
            <StatusBanner status={alarm.status} className="inline-flex" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Enviada a las {createdTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{alarm.location}</span>
          </div>
          {alarm.note && <p className="text-sm text-muted-foreground bg-secondary p-2 rounded-lg">"{alarm.note}"</p>}
        </div>

        <p className="text-sm text-primary font-medium">Estamos avisando al municipio. Mantén la calma.</p>

        <div className="flex gap-3">
          <Button onClick={onOpenChat} className="flex-1 h-12 bg-primary hover:bg-primary/90">
            <MessageCircle className="h-4 w-4 mr-2" />
            Abrir chat
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 h-12 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
