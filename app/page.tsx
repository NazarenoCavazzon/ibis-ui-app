"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlarmButton } from "@/components/ui/alarm-button"
import { LocationBadge } from "@/components/ui/location-badge"
import { ActiveAlarmCard } from "@/components/alarm/active-alarm-card"
import { AlarmConfirmationModal } from "@/components/alarm/alarm-confirmation-modal"
import { BottomNav } from "@/components/navigation/bottom-nav"
import Link from "next/link"
import { Bell } from "lucide-react"
import type { Alarm, AlarmType } from "@/lib/types"

const CITY_NAME = "Municipalidad de San Isidro"

const alarmTypes: { type: AlarmType; label: string }[] = [
  { type: "emergencia_medica", label: "Emergencia médica" },
  { type: "incendio", label: "Incendio" },
  { type: "inseguridad", label: "Inseguridad" },
  { type: "accidente", label: "Accidente" },
  { type: "otro", label: "Otro" },
]

export default function HomePage() {
  const router = useRouter()
  const [location, setLocation] = useState<string>("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [selectedAlarmType, setSelectedAlarmType] = useState<AlarmType | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const unreadNewsCount = 3

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("Av. San Martín 1234, Centro")
      setIsLoadingLocation(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleAlarmClick = (type: AlarmType) => {
    setSelectedAlarmType(type)
    setShowConfirmation(true)
  }

  const handleConfirmAlarm = async () => {
    if (!selectedAlarmType) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newAlarm: Alarm = {
      id: "1",
      type: selectedAlarmType,
      status: "activa",
      location: location || "Ubicación aproximada",
      createdAt: new Date(),
    }

    setActiveAlarm(newAlarm)
    setShowConfirmation(false)
    setIsSubmitting(false)
    setSelectedAlarmType(null)
  }

  const handleCancelAlarm = () => {
    setActiveAlarm((prev) => (prev ? { ...prev, status: "cancelada" } : null))
    setTimeout(() => setActiveAlarm(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold leading-tight text-foreground">{CITY_NAME}</h1>
          </div>
          <Link
            href="/noticias"
            className="relative p-1.5 rounded-full hover:bg-secondary transition-colors"
            aria-label="Noticias"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            {unreadNewsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadNewsCount > 9 ? "9+" : unreadNewsCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Saludo */}
        <section>
          <h2 className="text-xl font-bold text-foreground text-balance">¿Necesitas ayuda?</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Selecciona el tipo de emergencia para alertar al municipio.
          </p>
        </section>

        <LocationBadge location={location} isLoading={isLoadingLocation} />

        {activeAlarm && (
          <ActiveAlarmCard alarm={activeAlarm} onOpenChat={() => router.push("/chat")} onCancel={handleCancelAlarm} />
        )}

        {!activeAlarm && (
          <section className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {alarmTypes.slice(0, 4).map((alarm) => (
                <AlarmButton
                  key={alarm.type}
                  type={alarm.type}
                  label={alarm.label}
                  onClick={() => handleAlarmClick(alarm.type)}
                />
              ))}
            </div>
            <AlarmButton
              type="otro"
              label="Otra emergencia"
              onClick={() => handleAlarmClick("otro")}
              className="w-full"
            />
          </section>
        )}

        <section className="bg-card rounded-xl border border-border p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Tu red de seguridad</h3>
            <p className="text-sm text-muted-foreground">
              Invita a familiares o amigos para que reciban alertas de tus emergencias.
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/familia")} className="w-full">
            Gestionar contactos
          </Button>
        </section>

        <section className="bg-card rounded-xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-2">¿No es una emergencia?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Puedes hacer un reclamo municipal para reportar problemas como baches, luminarias o basura.
          </p>
          <Button variant="outline" onClick={() => router.push("/reclamos/nuevo")} className="w-full">
            Hacer un reclamo
          </Button>
        </section>
      </main>

      {!activeAlarm && (
        <button
          onClick={() => handleAlarmClick("emergencia_medica")}
          className="fixed right-4 bottom-20 z-50 h-14 w-14 rounded-full bg-destructive text-destructive-foreground shadow-xl flex items-center justify-center hover:bg-destructive/90 active:scale-95 transition-all"
          aria-label="Enviar SOS"
        >
          <span className="text-xs font-bold">SOS</span>
        </button>
      )}

      <BottomNav />

      <AlarmConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        alarmType={selectedAlarmType}
        onConfirm={handleConfirmAlarm}
        isLoading={isSubmitting}
      />
    </div>
  )
}
