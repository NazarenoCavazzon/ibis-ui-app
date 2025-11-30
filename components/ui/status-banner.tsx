"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { AlarmStatus, ClaimStatus } from "@/lib/types"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

interface StatusBannerProps {
  status: AlarmStatus | ClaimStatus
  className?: string
}

const statusConfig: Record<
  AlarmStatus | ClaimStatus,
  {
    label: string
    icon: React.ElementType
    className: string
  }
> = {
  activa: {
    label: "Emergencia activa",
    icon: AlertCircle,
    className: "bg-destructive text-destructive-foreground",
  },
  cancelada: {
    label: "Alarma cancelada",
    icon: XCircle,
    className: "bg-muted text-muted-foreground",
  },
  resuelta: {
    label: "Emergencia resuelta",
    icon: CheckCircle2,
    className: "bg-success text-success-foreground",
  },
  pendiente: {
    label: "Pendiente de revisión",
    icon: AlertCircle,
    className: "bg-warning text-warning-foreground",
  },
  en_proceso: {
    label: "En proceso",
    icon: AlertCircle,
    className: "bg-primary text-primary-foreground",
  },
  resuelto: {
    label: "Resuelto",
    icon: CheckCircle2,
    className: "bg-success text-success-foreground",
  },
}

export function StatusBanner({ status, className }: StatusBannerProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn("flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm", config.className, className)}
    >
      <Icon className="h-4 w-4" />
      <span>{config.label}</span>
    </div>
  )
}
