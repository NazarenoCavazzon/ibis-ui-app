export type AlarmType = "emergencia_medica" | "incendio" | "inseguridad" | "accidente" | "otro"
export type AlarmStatus = "activa" | "cancelada" | "resuelta"
export type ClaimStatus = "pendiente" | "en_proceso" | "resuelto"
export type InvitationStatus = "pendiente" | "aceptada" | "rechazada"

export interface Alarm {
  id: string
  type: AlarmType
  status: AlarmStatus
  location: string
  coordinates?: { lat: number; lng: number }
  note?: string
  createdAt: Date
  resolvedAt?: Date
  owner?: {
    id: string
    name: string
    isCurrentUser: boolean
  }
}

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  isAudio?: boolean
  isRead?: boolean
}

export interface Claim {
  id: string
  category: string
  description: string
  location: string
  photo?: string
  status: ClaimStatus
  createdAt: Date
  timeline: TimelineEvent[]
}

export interface TimelineEvent {
  id: string
  title: string
  description: string
  timestamp: Date
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  imageUrl?: string
  publishedAt: Date
}

export interface FamilyMember {
  id: string
  name: string
  phone: string
  email?: string
  relationship: string
  avatarUrl?: string
  isVerified: boolean
}

export interface Invitation {
  id: string
  name: string
  email: string
  phone?: string
  status: InvitationStatus
  sentAt: Date
  respondedAt?: Date
}
