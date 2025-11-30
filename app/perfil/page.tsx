"use client"

import Link from "next/link"

import type React from "react"
import { useState, useRef } from "react"
import { User, Users, Bell, Shield, HelpCircle, LogOut, ChevronRight, MapPin, Phone, Mail, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AppHeader } from "@/components/navigation/app-header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { cn } from "@/lib/utils"

const CITY_NAME = "Municipalidad de San Isidro"

interface SettingItemProps {
  icon: React.ElementType
  label: string
  description?: string
  onClick?: () => void
  href?: string
  rightElement?: React.ReactNode
}

function SettingItem({ icon: Icon, label, description, onClick, href, rightElement }: SettingItemProps) {
  const content = (
    <>
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{label}</p>
        {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
      </div>
      {rightElement || ((onClick || href) && <ChevronRight className="h-5 w-5 text-muted-foreground" />)}
    </>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-4 w-full p-4 hover:bg-secondary transition-colors">
        {content}
      </Link>
    )
  }

  const Wrapper = onClick ? "button" : "div"

  return (
    <Wrapper
      onClick={onClick}
      className={cn("flex items-center gap-4 w-full p-4 text-left", onClick && "hover:bg-secondary transition-colors")}
    >
      {content}
    </Wrapper>
  )
}

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    console.log("Cerrar sesión")
  }

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Mi perfil" cityName={CITY_NAME} showNewsIcon unreadNewsCount={3} />

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
          <h2 className="text-xl font-bold text-foreground mt-3">María García</h2>
          <p className="text-muted-foreground text-sm">DNI: 35.XXX.XXX</p>
        </div>

        {/* Contact info */}
        <div className="py-2 border-b border-border">
          <SettingItem icon={Phone} label="Teléfono" description="+54 11 XXXX-XXXX" />
          <SettingItem icon={Mail} label="Email" description="maria.garcia@email.com" />
          <SettingItem icon={MapPin} label="Dirección" description="Av. San Martín 1234, Centro" />
        </div>

        {/* Quick actions */}
        <div className="px-4 py-4 border-b border-border">
          <Button asChild className="w-full h-12 gap-2">
            <Link href="/red">
              <Users className="h-5 w-5" />
              Ir a Mi Red
            </Link>
          </Button>
        </div>

        {/* Settings */}
        <div className="py-2 border-b border-border">
          <SettingItem
            icon={Bell}
            label="Notificaciones"
            description="Recibir alertas y avisos"
            rightElement={<Switch checked={notifications} onCheckedChange={setNotifications} />}
          />
          <SettingItem icon={Shield} label="Privacidad y seguridad" onClick={() => {}} />
          <SettingItem icon={HelpCircle} label="Ayuda y soporte" onClick={() => {}} />
        </div>

        {/* Logout */}
        <div className="p-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-12 text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
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
