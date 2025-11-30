"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, MapPin, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppHeader } from "@/components/navigation/app-header"

const CITY_NAME = "Municipalidad de San Isidro"

const categories = ["Baches", "Luminarias", "Basura", "Arbolado", "Señalización", "Agua y cloacas", "Otro"]

export default function NewClaimPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("Av. San Martín 1234, Centro")
  const [photo, setPhoto] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePhotoCapture = () => {
    setPhoto("/street-urban-issue-pothole.jpg")
  }

  const handleSubmit = async () => {
    if (!category || !description) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      router.push("/reclamos")
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="mx-auto h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">¡Reclamo enviado!</h2>
          <p className="text-muted-foreground">
            Tu reclamo fue registrado correctamente. Te notificaremos cuando haya novedades.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Nuevo reclamo" cityName={CITY_NAME} showBack />

      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <p className="text-muted-foreground">Completa el formulario para enviar tu reclamo al municipio.</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="h-12">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el problema con el mayor detalle posible..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 pl-10"
                placeholder="Dirección del problema"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Foto (opcional)</Label>
            {photo ? (
              <div className="relative rounded-lg overflow-hidden">
                <img src={photo || "/placeholder.svg"} alt="Foto del reclamo" className="w-full h-48 object-cover" />
                <Button variant="secondary" size="sm" onClick={() => setPhoto(null)} className="absolute top-2 right-2">
                  Cambiar
                </Button>
              </div>
            ) : (
              <button
                onClick={handlePhotoCapture}
                className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Camera className="h-8 w-8" />
                <span className="text-sm font-medium">Tomar foto</span>
              </button>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!category || !description || isSubmitting}
          className="w-full h-14 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar reclamo"
          )}
        </Button>
      </main>
    </div>
  )
}
