"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { AlarmType } from "@/lib/types"

interface AlarmConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  alarmType: AlarmType | null
  onConfirm: () => void
  isLoading?: boolean
}

const typeLabels: Record<AlarmType, string> = {
  emergencia_medica: "Emergencia médica",
  incendio: "Incendio",
  inseguridad: "Inseguridad",
  accidente: "Accidente de tránsito",
  otro: "Otra emergencia",
}

export function AlarmConfirmationModal({
  open,
  onOpenChange,
  alarmType,
  onConfirm,
  isLoading,
}: AlarmConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[340px] rounded-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <DialogTitle className="text-xl">¿Confirmas enviar la alarma?</DialogTitle>
          <DialogDescription className="text-base">
            Se enviará una alerta de{" "}
            <span className="font-semibold text-foreground">{alarmType ? typeLabels[alarmType] : "emergencia"}</span> al
            municipio con tu ubicación actual.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground h-12 text-base font-semibold"
          >
            {isLoading ? "Enviando..." : "Sí, enviar alarma"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full h-12 text-base"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
