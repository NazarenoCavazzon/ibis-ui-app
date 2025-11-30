"use client"

import { useParams } from "next/navigation"
import { MapPin, Clock, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/navigation/app-header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { StatusBanner } from "@/components/ui/status-banner"
import Link from "next/link"

const CITY_NAME = "Municipalidad de San Isidro"

// Mock alarm detail data
const mockAlarmDetail = {
  id: "1",
  type: "inseguridad",
  status: "resuelta" as const,
  createdAt: new Date(Date.now() - 86400000 * 2),
  resolvedAt: new Date(Date.now() - 86400000 * 2 + 3600000),
  location: "Av. San Martín 1234, San Isidro",
  coordinates: { lat: -34.4721, lng: -58.5263 },
  note: "Se reportó presencia de personas sospechosas cerca del domicilio. La patrulla municipal llegó en 8 minutos y verificó la situación.",
  ownerName: "Tú",
  ownerPhone: "+54 11 5555-1234",
  timeline: [
    { time: new Date(Date.now() - 86400000 * 2), event: "Alarma enviada" },
    { time: new Date(Date.now() - 86400000 * 2 + 120000), event: "Recibida por el centro de monitoreo" },
    { time: new Date(Date.now() - 86400000 * 2 + 300000), event: "Patrulla asignada" },
    { time: new Date(Date.now() - 86400000 * 2 + 480000), event: "Patrulla en camino" },
    { time: new Date(Date.now() - 86400000 * 2 + 3600000), event: "Situación resuelta" },
  ],
}

const alarmTypeLabels: Record<string, string> = {
  "emergencia-medica": "Emergencia médica",
  incendio: "Incendio",
  inseguridad: "Inseguridad",
  accidente: "Accidente",
  otro: "Otra emergencia",
}

const alarmTypeIcons: Record<string, string> = {
  "emergencia-medica": "🏥",
  incendio: "🔥",
  inseguridad: "🚨",
  accidente: "🚗",
  otro: "⚠️",
}

export default function AlarmDetailPage() {
  const params = useParams()
  const alarm = mockAlarmDetail

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Detalle de alarma" cityName={CITY_NAME} showBack showNewsIcon unreadNewsCount={3} />

      <main className="px-4 py-5 space-y-4 max-w-lg mx-auto">
        {/* Main info card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{alarmTypeIcons[alarm.type] || "⚠️"}</span>
              <div>
                <h1 className="text-lg font-bold text-foreground">{alarmTypeLabels[alarm.type] || "Alarma"}</h1>
                <p className="text-sm text-muted-foreground">{formatDateTime(alarm.createdAt)}</p>
              </div>
            </div>
            <StatusBanner status={alarm.status} />
          </div>

          {/* Owner info */}
          {alarm.ownerName !== "Tú" && (
            <div className="p-4 border-b border-border bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{alarm.ownerName}</p>
                  <p className="text-xs text-muted-foreground">Miembro de tu red</p>
                </div>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="p-4 border-b border-border">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Ubicación</p>
                <p className="text-sm text-muted-foreground">{alarm.location}</p>
              </div>
            </div>
          </div>

          {/* Note */}
          {alarm.note && (
            <div className="p-4">
              <p className="text-sm font-medium text-foreground mb-1">Resumen</p>
              <p className="text-sm text-muted-foreground">{alarm.note}</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Seguimiento
          </h2>
          <div className="space-y-3">
            {alarm.timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-3 w-3 rounded-full ${index === alarm.timeline.length - 1 ? "bg-success" : "bg-primary"}`}
                  />
                  {index < alarm.timeline.length - 1 && <div className="w-0.5 h-6 bg-border mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-sm font-medium text-foreground">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(item.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        {alarm.status === "activa" && (
          <Link href="/chat">
            <Button className="w-full h-12">
              <MessageSquare className="h-5 w-5 mr-2" />
              Abrir chat de emergencia
            </Button>
          </Link>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
