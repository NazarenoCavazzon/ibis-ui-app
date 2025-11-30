"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Eye, EyeOff, ChevronRight } from "lucide-react"
import Image from "next/image"

type Step = "personal" | "location" | "profile"

interface FormData {
  // Personal
  nombre: string
  apellido: string
  dni: string
  fechaNacimiento: string
  telefono: string
  genero: string

  // Login
  email: string
  password: string
  confirmPassword: string

  // Location
  calle: string
  lote: string
  municipio: string
  barrio: string

  // Profile
  foto?: File
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    genero: "",
    email: "",
    password: "",
    confirmPassword: "",
    calle: "",
    lote: "",
    municipio: "",
    barrio: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, foto: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === "personal") {
      if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
      if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido"
      if (!formData.dni.trim()) newErrors.dni = "El DNI es requerido"
      if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida"
      if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido"
      if (!formData.genero) newErrors.genero = "Selecciona un género"
      if (!formData.email.trim()) newErrors.email = "El email es requerido"
      if (!formData.password) newErrors.password = "La contraseña es requerida"
      if (formData.password.length < 8) newErrors.password = "Mínimo 8 caracteres"
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden"
      }
    }

    if (step === "location") {
      if (!formData.calle.trim()) newErrors.calle = "La calle es requerida"
      if (!formData.lote.trim()) newErrors.lote = "El lote es requerido"
      if (!formData.municipio) newErrors.municipio = "Selecciona un municipio"
      if (!formData.barrio) newErrors.barrio = "Selecciona un barrio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (!validateStep()) return

    if (step === "personal") {
      setStep("location")
    } else if (step === "location") {
      setStep("profile")
    }
  }

  const handlePrevStep = () => {
    if (step === "location") {
      setStep("personal")
    } else if (step === "profile") {
      setStep("location")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulación de registro
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/")
  }

  const steps = ["personal", "location", "profile"] as const
  const currentStepIndex = steps.indexOf(step)
  const totalSteps = steps.length

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
          <p className="text-xs text-muted-foreground">
            Paso {currentStepIndex + 1} de {totalSteps}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-6">
        {steps.map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded-full transition-colors ${
              steps.indexOf(s) <= currentStepIndex ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-sm w-full space-y-4 overflow-y-auto pb-6">
        {/* STEP 1: Personal Info */}
        {step === "personal" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre</label>
                <Input
                  name="nombre"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`h-10 ${errors.nombre ? "border-destructive" : ""}`}
                />
                {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Apellido</label>
                <Input
                  name="apellido"
                  placeholder="Pérez"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className={`h-10 ${errors.apellido ? "border-destructive" : ""}`}
                />
                {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">DNI</label>
              <Input
                name="dni"
                placeholder="12.345.678"
                value={formData.dni}
                onChange={handleInputChange}
                className={`h-10 ${errors.dni ? "border-destructive" : ""}`}
              />
              {errors.dni && <p className="text-xs text-destructive">{errors.dni}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Fecha de nacimiento</label>
              <Input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className={`h-10 ${errors.fechaNacimiento ? "border-destructive" : ""}`}
              />
              {errors.fechaNacimiento && <p className="text-xs text-destructive">{errors.fechaNacimiento}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Teléfono</label>
                <Input
                  name="telefono"
                  placeholder="+54 9 11"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className={`h-10 ${errors.telefono ? "border-destructive" : ""}`}
                />
                {errors.telefono && <p className="text-xs text-destructive">{errors.telefono}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Género</label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className={`h-10 w-full bg-input text-foreground rounded-md border border-border px-3 text-sm transition-colors hover:bg-input/80 focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.genero ? "border-destructive" : ""
                  }`}
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                  <option value="prefiero_no_decir">Prefiero no decir</option>
                </select>
                {errors.genero && <p className="text-xs text-destructive">{errors.genero}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`h-10 ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contraseña</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Mostrar/ocultar"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirmar contraseña</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`h-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Mostrar/ocultar"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {step === "location" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Calle</label>
              <Input
                name="calle"
                placeholder="Av. Libertador"
                value={formData.calle}
                onChange={handleInputChange}
                className={`h-10 ${errors.calle ? "border-destructive" : ""}`}
              />
              {errors.calle && <p className="text-xs text-destructive">{errors.calle}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Lote / Número</label>
              <Input
                name="lote"
                placeholder="1234"
                value={formData.lote}
                onChange={handleInputChange}
                className={`h-10 ${errors.lote ? "border-destructive" : ""}`}
              />
              {errors.lote && <p className="text-xs text-destructive">{errors.lote}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Municipio</label>
              <select
                name="municipio"
                value={formData.municipio}
                onChange={handleInputChange}
                className={`h-10 w-full bg-input text-foreground rounded-md border border-border px-3 text-sm transition-colors hover:bg-input/80 focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.municipio ? "border-destructive" : ""
                }`}
              >
                <option value="">Seleccionar municipio</option>
                <option value="san_isidro">San Isidro</option>
                <option value="caballito">Caballito</option>
                <option value="belgrano">Belgrano</option>
                <option value="flores">Flores</option>
              </select>
              {errors.municipio && <p className="text-xs text-destructive">{errors.municipio}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Barrio</label>
              <select
                name="barrio"
                value={formData.barrio}
                onChange={handleInputChange}
                className={`h-10 w-full bg-input text-foreground rounded-md border border-border px-3 text-sm transition-colors hover:bg-input/80 focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.barrio ? "border-destructive" : ""
                }`}
              >
                <option value="">Seleccionar barrio</option>
                <option value="centro">Centro</option>
                <option value="norte">Norte</option>
                <option value="sur">Sur</option>
                <option value="este">Este</option>
              </select>
              {errors.barrio && <p className="text-xs text-destructive">{errors.barrio}</p>}
            </div>
          </div>
        )}

        {/* STEP 3: Profile Photo */}
        {step === "profile" && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground mb-2">Foto de perfil</h2>
              <p className="text-sm text-muted-foreground">Opcional pero recomendado</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <Image
                    src={photoPreview || "/placeholder.svg"}
                    alt="Profile preview"
                    width={120}
                    height={120}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview("")
                      setFormData((prev) => ({ ...prev, foto: undefined }))
                    }}
                    className="absolute top-0 right-0 bg-destructive rounded-full p-2 text-destructive-foreground hover:bg-destructive/90"
                    aria-label="Eliminar foto"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
              )}

              <label className="cursor-pointer">
                <span className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                  Subir foto
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  aria-label="Seleccionar foto"
                />
              </label>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-foreground mb-2">Resumen de tu información</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="text-foreground font-medium">Nombre:</span> {formData.nombre} {formData.apellido}
                </p>
                <p>
                  <span className="text-foreground font-medium">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="text-foreground font-medium">Ubicación:</span> {formData.calle}, {formData.lote} -
                  {formData.municipio}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-3 max-w-sm w-full">
        {step !== "personal" && (
          <Button variant="outline" onClick={handlePrevStep} className="flex-1 h-12 bg-transparent">
            Atrás
          </Button>
        )}

        {step !== "profile" ? (
          <Button onClick={handleNextStep} className="flex-1 h-12 font-semibold" disabled={isLoading}>
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 h-12 font-semibold">
            {isLoading ? "Creando cuenta..." : "Finalizar registro"}
          </Button>
        )}
      </div>
    </div>
  )
}
