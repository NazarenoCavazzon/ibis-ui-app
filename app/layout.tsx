import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const brand = process.env.NEXT_PUBLIC_BRAND ?? "ember"
const brandPresets: Record<string, string> = {
  civic: "#4F46E5",
  forest: "#1F9E6F",
  sunrise: "#EA9A36",
  ember: "#E35D3A",
}
const customAccent = process.env.NEXT_PUBLIC_BRAND_COLOR
const brandThemeColor = customAccent ?? brandPresets[brand] ?? "#4F46E5"
const brandCssVars = customAccent
  ? { "--brand-accent": customAccent } as React.CSSProperties
  : undefined

export const metadata: Metadata = {
  title: "Ibis SOS - Alarmas Ciudadanas",
  description: "Aplicación de alarmas ciudadanas para tu municipio. Reporta emergencias y recibe ayuda rápidamente.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: brandThemeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className="font-sans antialiased" data-brand={brand} style={brandCssVars}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
