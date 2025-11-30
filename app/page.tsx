"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlarmConfirmationModal } from "@/components/alarm/alarm-confirmation-modal"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Shield, AlertCircle, Users } from "lucide-react"
import type { Alarm, AlarmType } from "@/lib/types"

const CITY_NAME = "Municipalidad de San Isidro"

const alarmTypes: { type: AlarmType; label: string }[] = [
  { type: "emergencia_medica", label: "Emergencia médica" },
  { type: "incendio", label: "Incendio" },
  { type: "inseguridad", label: "Inseguridad" },
  { type: "accidente", label: "Accidente" },
  { type: "otro", label: "Otro" },
]

export default function WelcomePage() {
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-8 sm:py-12 safe-area-top safe-area-bottom">
      {/* Logo/Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md space-y-10 sm:space-y-12">
        {/* Logo Circle */}
        <div className="bg-primary rounded-3xl p-8 sm:p-10 shadow-lg">
          <AlertCircle className="w-20 h-20 sm:w-24 sm:h-24 text-primary-foreground" strokeWidth={1.5} />
        </div>

        {/* Title and Description */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">Ibis SOS</h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Sistema de alarmas ciudadanas para emergencias
          </p>
        </div>

        {/* Features */}
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50">
            <Shield className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-base sm:text-lg">Alerta inmediata</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Las autoridades reciben tu emergencia en segundos
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50">
            <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-base sm:text-lg">Chat en vivo</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Comunícate directamente con el operador</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-base sm:text-lg">Red de seguridad</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Notifica a familiares en caso de emergencia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons - larger touch targets */}
      <div className="w-full max-w-md space-y-4 pt-8">
        <Button onClick={() => router.push("/auth/login")} className="w-full h-14 text-lg font-semibold">
          Iniciar sesión
        </Button>
        <Button
          onClick={() => router.push("/auth/register")}
          variant="outline"
          className="w-full h-14 text-lg font-semibold"
        >
          Crear cuenta
        </Button>
      </div>

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
