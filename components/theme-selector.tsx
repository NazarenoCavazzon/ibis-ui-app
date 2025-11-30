"use client"

import { useState } from "react"
import { applyTheme, type ThemeColor, themeColors } from "@/lib/theme-config"
import { Check } from "lucide-react"

const themeNames: Record<ThemeColor, string> = {
  "deep-red": "Rojo Oscuro",
  red: "Rojo",
  "deep-blue": "Azul Oscuro",
  blue: "Azul",
  "deep-yellow": "Amarillo Oscuro",
  yellow: "Amarillo",
  "deep-green": "Verde Oscuro",
  green: "Verde",
  orange: "Naranja",
  gray: "Gris",
  white: "Claro",
}

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeColor>("blue")

  const handleThemeChange = (theme: ThemeColor) => {
    setSelectedTheme(theme)
    applyTheme(theme)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Tema de color</h3>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(themeColors) as ThemeColor[]).map((theme) => {
          const tokens = themeColors[theme]
          return (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className="relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                borderColor: selectedTheme === theme ? tokens.primary : tokens.border,
                backgroundColor: tokens.card,
              }}
            >
              <div className="flex gap-1">
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: tokens.primary }} />
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: tokens.success }} />
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: tokens.warning }} />
              </div>
              <span className="text-xs font-medium" style={{ color: tokens.foreground }}>
                {themeNames[theme]}
              </span>
              {selectedTheme === theme && (
                <Check className="absolute top-1 right-1 w-4 h-4" style={{ color: tokens.primary }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
