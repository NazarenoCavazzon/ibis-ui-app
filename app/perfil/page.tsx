"use client"

import type React from "react"
import { useState, useRef } from "react"
import { User, Camera, Mail, Phone, MapPin, Calendar, Home, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/navigation/app-header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { cn } from "@/lib/utils"

const CITY_NAME = "Municipalidad de San Isidro"

interface SettingItemProps {
  icon: React.ElementType
  label: string
  value?: string
  onClick?: () => void
}

function SettingItem({ icon: Icon, label, value, onClick }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn("flex items-center gap-4 w-full p-4 text-left", onClick && "hover:bg-secondary transition-colors")}
    >
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm">{label}</p>
        {value && <p className="text-xs text-muted-foreground truncate">{value}</p>}
      </div>
    </button>
  )
}

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    nombre: "María García",
    dni: "35.XXX.XXX",
    email: "maria.garcia@email.com",
    telefono: "+54 11 XXXX-XXXX",
    genero: "Femenino",
    fechaNacimiento: "15/03/1982",
    calle: "Av. San Martín",
    manzana: "123",
    numero: "456",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditImage = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDeleteAccount = () => {
    if (confirm("¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer.")) {
      console.log("Solicitud de eliminación de cuenta enviada")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Mi perfil" cityName={CITY_NAME} showNewsIcon unreadNewsCount={0} />

      <main className="max-w-lg mx-auto">
        {/* User info with editable image */}
        <div className="p-6 text-center border-b border-border">
          <div className="relative mx-auto w-fit">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>
            <button
              onClick={handleEditImage}
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              aria-label="Cambiar foto de perfil"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              aria-label="Seleccionar imagen"
            />
          </div>
          <h2 className="text-xl font-bold text-foreground mt-3">{formData.nombre}</h2>
          <p className="text-muted-foreground text-sm">DNI: {formData.dni}</p>
        </div>

        {/* Edit button */}
        <div className="p-4 border-b border-border">
          <Button onClick={() => setIsEditing(!isEditing)} variant="outline" className="w-full">
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? "Guardar cambios" : "Editar perfil"}
          </Button>
        </div>

        {/* Personal info */}
        <div className="py-2 border-b border-border">
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Información personal
            </h3>
          </div>

          {isEditing ? (
            <div className="px-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Género</label>
                <input
                  type="text"
                  value={formData.genero}
                  onChange={(e) => handleInputChange("genero", e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Fecha de nacimiento</label>
                <input
                  type="text"
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                />
              </div>
              <div className="pb-2"></div>
            </div>
          ) : (
            <>
              <SettingItem icon={Calendar} label="Género" value={formData.genero} />
              <SettingItem icon={Calendar} label="Fecha de nacimiento" value={formData.fechaNacimiento} />
              <SettingItem icon={Mail} label="Email" value={formData.email} />
              <SettingItem icon={Phone} label="Teléfono" value={formData.telefono} />
            </>
          )}
        </div>

        {/* Address info */}
        <div className="py-2 border-b border-border">
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Domicilio</h3>
          </div>

          {isEditing ? (
            <div className="px-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Calle</label>
                <input
                  type="text"
                  value={formData.calle}
                  onChange={(e) => handleInputChange("calle", e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Manzana</label>
                  <input
                    type="text"
                    value={formData.manzana}
                    onChange={(e) => handleInputChange("manzana", e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Número (Lote)</label>
                  <input
                    type="text"
                    value={formData.numero}
                    onChange={(e) => handleInputChange("numero", e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                  />
                </div>
              </div>
              <div className="pb-2"></div>
            </div>
          ) : (
            <>
              <SettingItem icon={MapPin} label="Calle" value={formData.calle} />
              <SettingItem icon={Home} label="Manzana" value={formData.manzana} />
              <SettingItem icon={Home} label="Número (Lote)" value={formData.numero} />
            </>
          )}
        </div>

        {/* Danger zone */}
        <div className="p-4 space-y-3">
          <Button
            variant="outline"
            onClick={handleDeleteAccount}
            className="w-full h-12 text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Solicitar eliminación de cuenta
          </Button>
        </div>

        {/* App info */}
        <div className="px-4 pb-6 text-center">
          <p className="text-xs text-muted-foreground">Ibis SOS v1.0.0</p>
          <p className="text-xs text-muted-foreground">{CITY_NAME}</p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
