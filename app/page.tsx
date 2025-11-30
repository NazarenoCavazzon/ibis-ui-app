"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlarmButton } from "@/components/ui/alarm-button"
import { ActiveAlarmCard } from "@/components/alarm/active-alarm-card"
import { AlarmConfirmationModal } from "@/components/alarm/alarm-confirmation-modal"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { AppHeader } from "@/components/navigation/app-header"
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
  const [selectedAlarmType, setSelectedAlarmType] = useState<AlarmType | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const unreadNewsCount = 3

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
        <AppHeader title="Ibis SOS" cityName={CITY_NAME} showNewsIcon unreadNewsCount={unreadNewsCount} />
      </header>

      <main className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Saludo */}
        <section>
          <h2 className="text-xl font-bold text-foreground text-balance">¿Necesitas ayuda?</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Selecciona el tipo de emergencia para alertar al municipio.
          </p>
        </section>

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
