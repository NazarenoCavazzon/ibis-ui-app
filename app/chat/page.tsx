"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Send, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppHeader } from "@/components/navigation/app-header"
import { StatusBanner } from "@/components/ui/status-banner"
import { ChatBubble } from "@/components/ui/chat-bubble"
import type { Message, AlarmStatus } from "@/lib/types"

const CITY_NAME = "Municipalidad de San Isidro"

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Tu alarma fue recibida. Un operador del municipio te atenderá en breve.",
    isUser: false,
    timestamp: new Date(Date.now() - 120000),
    isRead: true,
  },
  {
    id: "2",
    content: "Hola, soy María del Centro de Emergencias. ¿Puedes describir la situación?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
    isRead: true,
  },
  {
    id: "3",
    content: "Hay un incidente de inseguridad en mi cuadra. Vi a dos personas sospechosas merodeando.",
    isUser: true,
    timestamp: new Date(Date.now() - 30000),
    isRead: true,
  },
]

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [alarmStatus] = useState<AlarmStatus>("activa")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isDisabled = alarmStatus !== "activa"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim() || isDisabled) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
      isRead: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Entendido. Ya enviamos una patrulla a tu ubicación. Estará llegando en aproximadamente 5 minutos.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const handleVoiceRecord = () => {
    if (isDisabled) return

    if (isRecording) {
      const audioMessage: Message = {
        id: Date.now().toString(),
        content: "Mensaje de audio",
        isUser: true,
        timestamp: new Date(),
        isAudio: true,
        isRead: false,
      }
      setMessages((prev) => [...prev, audioMessage])
    }
    setIsRecording(!isRecording)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader title="Chat de emergencia" cityName={CITY_NAME} showBack showClose onClose={() => router.push("/")} />

      <div className="px-4 py-2 bg-card border-b border-border">
        <StatusBanner status={alarmStatus} />
        {isDisabled && (
          <p className="text-sm text-muted-foreground mt-2">El chat está cerrado porque la alarma fue {alarmStatus}.</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
            isAudio={message.isAudio}
            isRead={message.isRead}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-card border-t border-border safe-area-bottom">
        <div className="flex items-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={handleVoiceRecord}
            disabled={isDisabled}
            className="h-12 w-12 rounded-full flex-shrink-0"
            aria-label={isRecording ? "Detener grabación" : "Grabar audio"}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isDisabled ? "Chat cerrado" : "Escribe un mensaje..."}
            disabled={isDisabled}
            className="h-12 rounded-full px-4"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isDisabled}
            size="icon"
            className="h-12 w-12 rounded-full flex-shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
