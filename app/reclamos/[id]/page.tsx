"use client"

import { MapPin, Calendar, ImageIcon } from "lucide-react"
import { AppHeader } from "@/components/navigation/app-header"
import { StatusBanner } from "@/components/ui/status-banner"
import { ClaimTimeline } from "@/components/claims/claim-timeline"
import { BottomNav } from "@/components/navigation/bottom-nav"
import type { Claim, TimelineEvent } from "@/lib/types"
import { useParams } from "next/navigation"

const mockClaim: Claim = {
  id: "1",
  category: "Luminarias",
  description:
    "La luz de la esquina de Av. San Martín y calle 5 está apagada hace una semana. Es una zona muy transitada y genera inseguridad por la noche.",
  location: "Av. San Martín esq. Calle 5",
  photo: "/broken-street-light-night.jpg",
  status: "en_proceso",
  createdAt: new Date(Date.now() - 86400000 * 2),
  timeline: [
    {
      id: "1",
      title: "Reclamo recibido",
      description: "Tu reclamo fue registrado en el sistema.",
      timestamp: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: "2",
      title: "Asignado a Servicios Públicos",
      description: "El área de Servicios Públicos está analizando el caso.",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      title: "En proceso de reparación",
      description: "Se programó visita técnica para esta semana.",
      timestamp: new Date(Date.now() - 3600000 * 4),
    },
  ] as TimelineEvent[],
}

export default function ClaimDetailPage() {
  const params = useParams()
  const id = params.id as string
  const claim = mockClaim // En producción, buscar por id

  const createdDate = claim.createdAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Detalle del reclamo" showBack />

      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Header info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{claim.category}</span>
            <StatusBanner status={claim.status} className="text-xs py-1" />
          </div>

          <p className="text-foreground leading-relaxed">{claim.description}</p>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{claim.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Enviado el {createdDate}</span>
            </div>
          </div>
        </div>

        {/* Foto */}
        {claim.photo && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>Foto adjunta</span>
            </div>
            <img
              src={claim.photo || "/placeholder.svg"}
              alt="Foto del reclamo"
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Seguimiento</h3>
          <ClaimTimeline events={claim.timeline} />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
