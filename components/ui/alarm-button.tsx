"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { AlarmType } from "@/lib/types"
import { Heart, Flame, ShieldAlert, Car, HelpCircle } from "lucide-react"

interface AlarmButtonProps {
  type: AlarmType
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

const iconMap: Record<AlarmType, React.ElementType> = {
  emergencia_medica: Heart,
  incendio: Flame,
  inseguridad: ShieldAlert,
  accidente: Car,
  otro: HelpCircle,
}

const colorMap: Record<AlarmType, string> = {
  emergencia_medica: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
  incendio: "bg-warning hover:bg-warning/90 text-warning-foreground",
  inseguridad: "bg-primary hover:bg-primary/90 text-primary-foreground",
  accidente: "bg-chart-5 hover:bg-chart-5/90 text-primary-foreground",
  otro: "bg-muted-foreground hover:bg-muted-foreground/90 text-primary-foreground",
}

export function AlarmButton({ type, label, onClick, disabled, className }: AlarmButtonProps) {
  const Icon = iconMap[type]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all duration-200",
        "min-h-[120px] w-full shadow-md active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        colorMap[type],
        className,
      )}
    >
      <Icon className="h-10 w-10" strokeWidth={2} />
      <span className="text-base font-semibold text-center leading-tight">{label}</span>
    </button>
  )
}
