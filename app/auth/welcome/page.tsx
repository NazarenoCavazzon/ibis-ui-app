"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Shield, AlertCircle, Users } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-4 safe-area-top safe-area-bottom">
      {/* Logo/Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full space-y-8">
        {/* Logo Circle */}
        <div className="bg-primary rounded-3xl p-6 shadow-lg">
          <AlertCircle className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
        </div>

        {/* Title and Description */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground text-balance">Ibis SOS</h1>
          <p className="text-lg text-muted-foreground text-balance">Sistema de alarmas ciudadanas para emergencias</p>
        </div>

        {/* Features */}
        <div className="w-full space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Alerta inmediata</h3>
              <p className="text-sm text-muted-foreground">Las autoridades reciben tu emergencia en segundos</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Chat en vivo</h3>
              <p className="text-sm text-muted-foreground">Comunícate directamente con el operador</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Red de seguridad</h3>
              <p className="text-sm text-muted-foreground">Notifica a familiares en caso de emergencia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3">
        <Button onClick={() => router.push("/auth/login")} className="w-full h-12 text-base font-semibold">
          Iniciar sesión
        </Button>
        <Button
          onClick={() => router.push("/auth/register")}
          variant="outline"
          className="w-full h-12 text-base font-semibold"
        >
          Crear cuenta
        </Button>
      </div>
    </div>
  )
}
