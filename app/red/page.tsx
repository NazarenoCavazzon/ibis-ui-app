"use client"

import { useState } from "react"
import {
  Plus,
  UserPlus,
  Check,
  X,
  Clock,
  Mail,
  MoreVertical,
  Trash2,
  Send,
  History,
  Users,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/navigation/app-header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBanner } from "@/components/ui/status-banner"
import { cn } from "@/lib/utils"
import type { FamilyMember, Invitation, Alarm } from "@/lib/types"
import Link from "next/link"

const CITY_NAME = "Municipalidad de San Isidro"

// Mock data for family members
const mockMembers: FamilyMember[] = [
  {
    id: "1",
    name: "María García",
    phone: "+54 11 5555-1234",
    email: "maria@email.com",
    relationship: "Madre",
    isVerified: true,
  },
  { id: "2", name: "Carlos López", phone: "+54 11 5555-5678", relationship: "Hermano", isVerified: true },
]

const mockInvitations: Invitation[] = [
  {
    id: "1",
    name: "Ana Martínez",
    email: "ana@email.com",
    status: "pendiente",
    sentAt: new Date(Date.now() - 86400000),
  },
]

const mockPendingReceivedInvitations: Invitation[] = [
  {
    id: "recv-1",
    name: "Juan Pérez",
    email: "juan@email.com",
    status: "pendiente",
    sentAt: new Date(Date.now() - 3600000),
  },
  {
    id: "recv-2",
    name: "Sofia Rodríguez",
    email: "sofia@email.com",
    status: "pendiente",
    sentAt: new Date(Date.now() - 7200000),
  },
]

// Mock data for alarm history
const mockAlarmHistory: (Alarm & { ownerName?: string })[] = [
  {
    id: "1",
    type: "inseguridad",
    status: "resuelta",
    createdAt: new Date(Date.now() - 86400000 * 2),
    location: "Av. San Martín 1234",
    note: "Situación controlada por patrulla municipal",
    ownerName: "Tú",
  },
  {
    id: "2",
    type: "emergencia-medica",
    status: "resuelta",
    createdAt: new Date(Date.now() - 86400000 * 5),
    location: "Calle Rivadavia 567",
    ownerName: "María García",
  },
  {
    id: "3",
    type: "incendio",
    status: "cancelada",
    createdAt: new Date(Date.now() - 86400000 * 7),
    location: "Plaza Principal",
    note: "Falsa alarma",
    ownerName: "Tú",
  },
]

const alarmTypeLabels: Record<string, string> = {
  "emergencia-medica": "Emergencia médica",
  incendio: "Incendio",
  inseguridad: "Inseguridad",
  accidente: "Accidente",
  otro: "Otra emergencia",
}

const alarmTypeIcons: Record<string, string> = {
  "emergencia-medica": "🏥",
  incendio: "🔥",
  inseguridad: "🚨",
  accidente: "🚗",
  otro: "⚠️",
}

type TabType = "invitaciones" | "contactos" | "historial"

export default function RedPage() {
  const [activeTab, setActiveTab] = useState<TabType>("invitaciones")
  const [members, setMembers] = useState<FamilyMember[]>(mockMembers)
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", phone: "", relationship: "" })
  const [isSending, setIsSending] = useState(false)

  const handleSendInvitation = async () => {
    if (!inviteForm.name || !inviteForm.email) return

    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newInvitation: Invitation = {
      id: String(Date.now()),
      name: inviteForm.name,
      email: inviteForm.email,
      phone: inviteForm.phone || undefined,
      status: "pendiente",
      sentAt: new Date(),
    }

    setInvitations((prev) => [newInvitation, ...prev])
    setInviteForm({ name: "", email: "", phone: "", relationship: "" })
    setShowInviteModal(false)
    setIsSending(false)
  }

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const handleCancelInvitation = (id: string) => {
    setInvitations((prev) => prev.filter((i) => i.id !== id))
  }

  const handleResendInvitation = (id: string) => {
    setInvitations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, sentAt: new Date(), status: "pendiente" as const } : i)),
    )
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Mi Red" cityName={CITY_NAME} showNewsIcon unreadNewsCount={3} />

      {/* Tab switcher */}
      <div className="sticky top-11 z-30 bg-background border-b border-border">
        <div className="flex max-w-lg mx-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("invitaciones")}
            className={cn(
              "flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
              activeTab === "invitaciones"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <UserPlus className="h-4 w-4" />
            Invitaciones
            {invitations.some((i) => i.status === "pendiente") && (
              <span className="inline-block h-2 w-2 bg-destructive rounded-full ml-1" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("contactos")}
            className={cn(
              "flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
              activeTab === "contactos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Users className="h-4 w-4" />
            Contactos
          </button>
          <button
            onClick={() => setActiveTab("historial")}
            className={cn(
              "flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
              activeTab === "historial"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <History className="h-4 w-4" />
            Historial
          </button>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {activeTab === "invitaciones" ? (
          <>
            {/* Info section */}
            <section className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <h2 className="font-semibold text-foreground mb-1">Invitaciones recibidas</h2>
              <p className="text-sm text-muted-foreground">
                Acepta invitaciones de familiares o amigos para que puedan ver tus alarmas.
              </p>
            </section>

            {mockPendingReceivedInvitations.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <UserPlus className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No tienes invitaciones pendientes.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockPendingReceivedInvitations.map((invitation) => (
                  <div key={invitation.id} className="bg-card border border-primary/30 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-11 w-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                        {invitation.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{invitation.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Mail className="h-3 w-3" />
                          <span>{invitation.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1"
                        onClick={() => console.log("Aceptar invitación", invitation.id)}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Aceptar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => console.log("Rechazar invitación", invitation.id)}
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sent invitations section */}
            {invitations.length > 0 && (
              <section className="mt-8">
                <h3 className="font-semibold text-foreground mb-3">Invitaciones que enviaste</h3>
                <div className="space-y-2">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground font-semibold">
                          {invitation.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{invitation.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{invitation.email}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {invitation.status === "pendiente" && (
                              <span className="inline-flex items-center gap-1 bg-warning/20 text-warning text-[10px] font-medium px-2 py-0.5 rounded">
                                <Clock className="h-3 w-3" />
                                Pendiente
                              </span>
                            )}
                            {invitation.status === "rechazada" && (
                              <span className="inline-flex items-center gap-1 bg-destructive/20 text-destructive text-[10px] font-medium px-2 py-0.5 rounded">
                                <X className="h-3 w-3" />
                                Rechazada
                              </span>
                            )}
                            {invitation.status === "aceptada" && (
                              <span className="inline-flex items-center gap-1 bg-success/20 text-success text-[10px] font-medium px-2 py-0.5 rounded">
                                <Check className="h-3 w-3" />
                                Aceptada
                              </span>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {invitation.status !== "aceptada" && (
                              <DropdownMenuItem onClick={() => console.log("Reenviar", invitation.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                Reenviar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => console.log("Eliminar", invitation.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : activeTab === "contactos" ? (
          <>
            {/* Info section */}
            <section className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <h2 className="font-semibold text-foreground mb-1">Tu red de seguridad</h2>
              <p className="text-sm text-muted-foreground">
                Las personas que agregues recibirán una notificación cuando envíes una alarma y podrán seguir el
                desarrollo de tu emergencia en tiempo real.
              </p>
            </section>

            {/* Members list */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Contactos ({members.length})</h3>
                <Button size="sm" onClick={() => setShowInviteModal(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Invitar
                </Button>
              </div>

              {members.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <UserPlus className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Aún no tienes contactos. Invita a familiares o amigos para que te acompañen en emergencias.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                    >
                      <div className="h-11 w-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">{member.name}</p>
                          {member.isVerified && (
                            <span className="bg-success/20 text-success text-[10px] font-medium px-1.5 py-0.5 rounded">
                              Verificado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{member.relationship}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRemoveMember(member.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Pending invitations */}
            {invitations.length > 0 && (
              <section>
                <h3 className="font-semibold text-foreground mb-3">Invitaciones enviadas</h3>
                <div className="space-y-2">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-lg">
                          {invitation.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{invitation.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{invitation.email}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {invitation.status === "pendiente" && (
                              <span className="inline-flex items-center gap-1 bg-warning/20 text-warning text-[10px] font-medium px-2 py-0.5 rounded">
                                <Clock className="h-3 w-3" />
                                Pendiente
                              </span>
                            )}
                            {invitation.status === "rechazada" && (
                              <span className="inline-flex items-center gap-1 bg-destructive/20 text-destructive text-[10px] font-medium px-2 py-0.5 rounded">
                                <X className="h-3 w-3" />
                                Rechazada
                              </span>
                            )}
                            {invitation.status === "aceptada" && (
                              <span className="inline-flex items-center gap-1 bg-success/20 text-success text-[10px] font-medium px-2 py-0.5 rounded">
                                <Check className="h-3 w-3" />
                                Aceptada
                              </span>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {invitation.status !== "aceptada" && (
                              <DropdownMenuItem onClick={() => console.log("Reenviar", invitation.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                Reenviar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => console.log("Eliminar", invitation.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            {/* History tab content */}
            <section className="bg-muted/30 border border-border rounded-xl p-4">
              <div className="flex items-start gap-3">
                <History className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h2 className="font-semibold text-foreground mb-1">Historial de alarmas</h2>
                  <p className="text-sm text-muted-foreground">
                    Aquí puedes ver todas las alarmas enviadas por ti y por los miembros de tu red de seguridad.
                  </p>
                </div>
              </div>
            </section>

            {mockAlarmHistory.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No hay alarmas en el historial.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockAlarmHistory.map((alarm) => (
                  <Link key={alarm.id} href={`/red/alarma/${alarm.id}`}>
                    <div className="bg-card border border-border rounded-xl p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{alarmTypeIcons[alarm.type] || "⚠️"}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{alarmTypeLabels[alarm.type] || "Alarma"}</p>
                            {alarm.ownerName !== "Tú" && (
                              <span className="bg-primary/20 text-primary text-[10px] font-medium px-1.5 py-0.5 rounded">
                                {alarm.ownerName}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{alarm.location}</p>
                          <div className="flex items-center justify-between">
                            <StatusBanner status={alarm.status} compact />
                            <span className="text-xs text-muted-foreground">{formatDate(alarm.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />

      {/* Invite modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Invitar a un contacto</DialogTitle>
            <DialogDescription>
              Enviaremos una invitación por correo electrónico para unirse a tu red de seguridad.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={inviteForm.name}
                onChange={(e) => setInviteForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: María García"
              />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                value={inviteForm.phone}
                onChange={(e) => setInviteForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+54 11 5555-1234"
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relación (opcional)</Label>
              <Input
                id="relationship"
                value={inviteForm.relationship}
                onChange={(e) => setInviteForm((prev) => ({ ...prev, relationship: e.target.value }))}
                placeholder="Ej: Madre, Hermano, Amigo"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowInviteModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleSendInvitation}
                className="flex-1"
                disabled={!inviteForm.name || !inviteForm.email || isSending}
              >
                {isSending ? "Enviando..." : "Enviar invitación"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
