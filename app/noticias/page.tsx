"use client"

import { useState } from "react"
import { AppHeader } from "@/components/navigation/app-header"
import { NewsCard } from "@/components/news/news-card"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import type { NewsItem } from "@/lib/types"

const CITY_NAME = "Municipalidad de San Isidro"

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Corte programado de agua el próximo martes",
    summary: "Se realizarán tareas de mantenimiento en la red de agua potable del sector norte.",
    content: "",
    imageUrl: "/water-maintenance-utility-workers.jpg",
    publishedAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "2",
    title: "Nueva app de turnos para trámites municipales",
    summary: "Ya podés sacar turno online para todos los trámites del municipio desde tu celular.",
    content: "",
    imageUrl: "/mobile-app-smartphone-digital.jpg",
    publishedAt: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    title: "Vacunación antirrábica gratuita este fin de semana",
    summary: "Llevá a tu mascota a cualquiera de los puntos de vacunación habilitados.",
    content: "",
    imageUrl: "/pet-vaccination-veterinary-dog.jpg",
    publishedAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: "4",
    title: "Mejoras en el alumbrado público del centro",
    summary: "Se instalaron 50 nuevas luminarias LED en el casco céntrico de la ciudad.",
    content: "",
    publishedAt: new Date(Date.now() - 86400000 * 3),
  },
]

export default function NewsPage() {
  const [news] = useState<NewsItem[]>(mockNews)
  const [isLoading] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-6">
      <AppHeader title="Noticias" cityName={CITY_NAME} showBack />

      <main className="px-4 py-5 space-y-4 max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground">Mantente informado sobre las novedades del municipio.</p>

        {isLoading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay noticias disponibles</p>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
