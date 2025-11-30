"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/navigation/app-header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ClaimCard } from "@/components/claims/claim-card"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import type { Claim } from "@/lib/types"

const CITY_NAME = "Municipalidad de San Isidro"

const mockClaims: Claim[] = [
  {
    id: "1",
    category: "Luminarias",
    description: "La luz de la esquina de Av. San Martín y calle 5 está apagada hace una semana.",
    location: "Av. San Martín esq. Calle 5",
    status: "en_proceso",
    createdAt: new Date(Date.now() - 86400000 * 2),
    timeline: [],
  },
  {
    id: "2",
    category: "Baches",
    description: "Hay un bache muy grande en la calle que está causando problemas a los vehículos.",
    location: "Calle Belgrano 456",
    status: "pendiente",
    createdAt: new Date(Date.now() - 86400000 * 5),
    timeline: [],
  },
  {
    id: "3",
    category: "Basura",
    description: "Hay acumulación de basura en el contenedor de la plaza que no ha sido recogida.",
    location: "Plaza Central",
    status: "resuelto",
    createdAt: new Date(Date.now() - 86400000 * 10),
    timeline: [],
  },
]

export default function ClaimsPage() {
  const router = useRouter()
  const [claims] = useState<Claim[]>(mockClaims)
  const [isLoading] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Mis reclamos" cityName={CITY_NAME} />

      <main className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {claims.length} reclamo{claims.length !== 1 && "s"}
          </p>
          <Button onClick={() => router.push("/reclamos/nuevo")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo reclamo
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : claims.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No tienes reclamos registrados</p>
            <Button onClick={() => router.push("/reclamos/nuevo")}>Hacer mi primer reclamo</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {claims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
