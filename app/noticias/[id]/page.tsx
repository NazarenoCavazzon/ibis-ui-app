"use client"

import { use } from "react"
import { Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/navigation/app-header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import type { NewsItem } from "@/lib/types"

const mockNewsDetail: NewsItem = {
  id: "1",
  title: "Corte programado de agua el próximo martes",
  summary: "Se realizarán tareas de mantenimiento en la red de agua potable del sector norte.",
  content: `El Municipio informa a los vecinos del sector norte que el próximo martes 3 de diciembre se realizarán tareas de mantenimiento preventivo en la red de agua potable.

El corte programado afectará a las siguientes zonas:
• Barrio Norte
• Barrio Las Flores
• Sector industrial norte

El horario previsto es de 8:00 a 14:00 hs. Se recomienda a los vecinos almacenar agua para consumo y evitar el uso de electrodomésticos que requieran agua durante ese período.

Una vez finalizados los trabajos, puede que el agua salga con color o presión baja temporalmente. Esto es normal y se regularizará en las siguientes horas.

Para consultas, comunicarse al 0800-123-4567 o a través de la app Ibis SOS.`,
  imageUrl: "/water-pipe-maintenance-workers.jpg",
  publishedAt: new Date(Date.now() - 3600000 * 2),
}

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const news = mockNewsDetail // En producción, buscar por id

  const publishedDate = news.publishedAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Noticia" showBack />

      <main className="max-w-lg mx-auto">
        {/* Imagen */}
        {news.imageUrl && <img src={news.imageUrl || "/placeholder.svg"} alt="" className="w-full h-48 object-cover" />}

        <div className="px-4 py-6 space-y-4">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground text-balance">{news.title}</h1>

          {/* Summary */}
          <p className="text-lg text-muted-foreground">{news.summary}</p>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-foreground">
            {news.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share */}
          <Button variant="outline" className="w-full bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir noticia
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
