export type ThemeColor =
  | "deep-red"
  | "red"
  | "deep-blue"
  | "blue"
  | "deep-yellow"
  | "yellow"
  | "deep-green"
  | "green"
  | "orange"
  | "gray"
  | "white"

export interface ThemeTokens {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  success: string
  successForeground: string
  warning: string
  warningForeground: string
  border: string
  input: string
  ring: string
}

// Fondos más claros (0.18-0.22 en lugar de 0.12-0.16) para mejor legibilidad
export const themeColors: Record<ThemeColor, ThemeTokens> = {
  // Deep Red - Rojo oscuro institucional (bomberos, cruz roja)
  "deep-red": {
    background: "oklch(0.18 0.008 15)",
    foreground: "oklch(0.97 0.01 15)",
    card: "oklch(0.23 0.012 15)",
    cardForeground: "oklch(0.97 0.01 15)",
    popover: "oklch(0.23 0.012 15)",
    popoverForeground: "oklch(0.97 0.01 15)",
    primary: "oklch(0.58 0.22 25)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.28 0.01 15)",
    secondaryForeground: "oklch(0.97 0.01 15)",
    muted: "oklch(0.28 0.01 15)",
    mutedForeground: "oklch(0.72 0.01 15)",
    accent: "oklch(0.3 0.04 25)",
    accentForeground: "oklch(0.97 0.01 15)",
    destructive: "oklch(0.58 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.15 75)",
    warningForeground: "oklch(0.18 0.02 75)",
    border: "oklch(0.35 0.015 15)",
    input: "oklch(0.25 0.01 15)",
    ring: "oklch(0.58 0.22 25)",
  },

  // Red - Rojo vibrante (emergencias, alertas)
  red: {
    background: "oklch(0.18 0.008 15)",
    foreground: "oklch(0.97 0.01 15)",
    card: "oklch(0.23 0.012 15)",
    cardForeground: "oklch(0.97 0.01 15)",
    popover: "oklch(0.23 0.012 15)",
    popoverForeground: "oklch(0.97 0.01 15)",
    primary: "oklch(0.65 0.24 25)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.28 0.01 15)",
    secondaryForeground: "oklch(0.97 0.01 15)",
    muted: "oklch(0.28 0.01 15)",
    mutedForeground: "oklch(0.72 0.01 15)",
    accent: "oklch(0.3 0.05 25)",
    accentForeground: "oklch(0.97 0.01 15)",
    destructive: "oklch(0.58 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.15 75)",
    warningForeground: "oklch(0.18 0.02 75)",
    border: "oklch(0.35 0.015 15)",
    input: "oklch(0.25 0.01 15)",
    ring: "oklch(0.65 0.24 25)",
  },

  // Deep Blue - Azul oscuro institucional (policía, gobierno)
  "deep-blue": {
    background: "oklch(0.18 0.02 250)",
    foreground: "oklch(0.97 0.01 250)",
    card: "oklch(0.23 0.025 250)",
    cardForeground: "oklch(0.97 0.01 250)",
    popover: "oklch(0.23 0.025 250)",
    popoverForeground: "oklch(0.97 0.01 250)",
    primary: "oklch(0.55 0.18 250)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.28 0.02 250)",
    secondaryForeground: "oklch(0.97 0.01 250)",
    muted: "oklch(0.28 0.02 250)",
    mutedForeground: "oklch(0.72 0.02 250)",
    accent: "oklch(0.3 0.04 250)",
    accentForeground: "oklch(0.97 0.01 250)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.15 75)",
    warningForeground: "oklch(0.18 0.02 75)",
    border: "oklch(0.35 0.025 250)",
    input: "oklch(0.25 0.02 250)",
    ring: "oklch(0.55 0.18 250)",
  },

  // Blue - Azul vibrante (confianza, tecnología)
  blue: {
    background: "oklch(0.18 0.015 250)",
    foreground: "oklch(0.97 0.01 250)",
    card: "oklch(0.22 0.018 250)",
    cardForeground: "oklch(0.97 0.01 250)",
    popover: "oklch(0.22 0.018 250)",
    popoverForeground: "oklch(0.97 0.01 250)",
    primary: "oklch(0.65 0.18 250)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.28 0.02 250)",
    secondaryForeground: "oklch(0.97 0.01 250)",
    muted: "oklch(0.28 0.02 250)",
    mutedForeground: "oklch(0.72 0.02 250)",
    accent: "oklch(0.3 0.04 250)",
    accentForeground: "oklch(0.97 0.01 250)",
    destructive: "oklch(0.62 0.24 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.16 70)",
    warningForeground: "oklch(0.18 0.02 70)",
    border: "oklch(0.32 0.02 250)",
    input: "oklch(0.25 0.02 250)",
    ring: "oklch(0.65 0.18 250)",
  },

  // Deep Yellow - Ámbar/Dorado (precaución, oficial)
  "deep-yellow": {
    background: "oklch(0.18 0.01 70)",
    foreground: "oklch(0.97 0.01 70)",
    card: "oklch(0.23 0.015 70)",
    cardForeground: "oklch(0.97 0.01 70)",
    popover: "oklch(0.23 0.015 70)",
    popoverForeground: "oklch(0.97 0.01 70)",
    primary: "oklch(0.72 0.16 75)",
    primaryForeground: "oklch(0.18 0.04 75)",
    secondary: "oklch(0.28 0.015 70)",
    secondaryForeground: "oklch(0.97 0.01 70)",
    muted: "oklch(0.28 0.015 70)",
    mutedForeground: "oklch(0.72 0.015 70)",
    accent: "oklch(0.3 0.05 75)",
    accentForeground: "oklch(0.97 0.01 70)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.72 0.16 75)",
    warningForeground: "oklch(0.18 0.04 75)",
    border: "oklch(0.35 0.02 70)",
    input: "oklch(0.25 0.015 70)",
    ring: "oklch(0.72 0.16 75)",
  },

  // Yellow - Amarillo brillante (atención, energía)
  yellow: {
    background: "oklch(0.18 0.01 85)",
    foreground: "oklch(0.97 0.01 85)",
    card: "oklch(0.23 0.015 85)",
    cardForeground: "oklch(0.97 0.01 85)",
    popover: "oklch(0.23 0.015 85)",
    popoverForeground: "oklch(0.97 0.01 85)",
    primary: "oklch(0.85 0.18 90)",
    primaryForeground: "oklch(0.2 0.04 90)",
    secondary: "oklch(0.28 0.015 85)",
    secondaryForeground: "oklch(0.97 0.01 85)",
    muted: "oklch(0.28 0.015 85)",
    mutedForeground: "oklch(0.72 0.015 85)",
    accent: "oklch(0.3 0.05 90)",
    accentForeground: "oklch(0.97 0.01 85)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.85 0.18 90)",
    warningForeground: "oklch(0.2 0.04 90)",
    border: "oklch(0.35 0.02 85)",
    input: "oklch(0.25 0.015 85)",
    ring: "oklch(0.85 0.18 90)",
  },

  // Deep Green - Verde oscuro (parques, ambiente, salud)
  "deep-green": {
    background: "oklch(0.18 0.015 150)",
    foreground: "oklch(0.97 0.01 150)",
    card: "oklch(0.23 0.018 150)",
    cardForeground: "oklch(0.97 0.01 150)",
    popover: "oklch(0.23 0.018 150)",
    popoverForeground: "oklch(0.97 0.01 150)",
    primary: "oklch(0.55 0.15 150)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.28 0.018 150)",
    secondaryForeground: "oklch(0.97 0.01 150)",
    muted: "oklch(0.28 0.018 150)",
    mutedForeground: "oklch(0.72 0.018 150)",
    accent: "oklch(0.3 0.04 150)",
    accentForeground: "oklch(0.97 0.01 150)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.55 0.15 150)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.15 75)",
    warningForeground: "oklch(0.18 0.02 75)",
    border: "oklch(0.35 0.02 150)",
    input: "oklch(0.25 0.018 150)",
    ring: "oklch(0.55 0.15 150)",
  },

  // Green - Verde vibrante (ecología, éxito)
  green: {
    background: "oklch(0.18 0.012 150)",
    foreground: "oklch(0.97 0.01 150)",
    card: "oklch(0.23 0.015 150)",
    cardForeground: "oklch(0.97 0.01 150)",
    popover: "oklch(0.23 0.015 150)",
    popoverForeground: "oklch(0.97 0.01 150)",
    primary: "oklch(0.65 0.18 145)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.28 0.015 150)",
    secondaryForeground: "oklch(0.97 0.01 150)",
    muted: "oklch(0.28 0.015 150)",
    mutedForeground: "oklch(0.72 0.015 150)",
    accent: "oklch(0.3 0.04 145)",
    accentForeground: "oklch(0.97 0.01 150)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.15 75)",
    warningForeground: "oklch(0.18 0.02 75)",
    border: "oklch(0.35 0.018 150)",
    input: "oklch(0.25 0.015 150)",
    ring: "oklch(0.65 0.18 145)",
  },

  // Orange - Naranja cálido (comunidad, accesibilidad)
  orange: {
    background: "oklch(0.18 0.01 50)",
    foreground: "oklch(0.97 0.01 50)",
    card: "oklch(0.23 0.015 50)",
    cardForeground: "oklch(0.97 0.01 50)",
    popover: "oklch(0.23 0.015 50)",
    popoverForeground: "oklch(0.97 0.01 50)",
    primary: "oklch(0.7 0.18 45)",
    primaryForeground: "oklch(0.18 0.03 45)",
    secondary: "oklch(0.28 0.015 50)",
    secondaryForeground: "oklch(0.97 0.01 50)",
    muted: "oklch(0.28 0.015 50)",
    mutedForeground: "oklch(0.72 0.015 50)",
    accent: "oklch(0.3 0.05 45)",
    accentForeground: "oklch(0.97 0.01 50)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.7 0.18 45)",
    warningForeground: "oklch(0.18 0.03 45)",
    border: "oklch(0.35 0.018 50)",
    input: "oklch(0.25 0.015 50)",
    ring: "oklch(0.7 0.18 45)",
  },

  // Gray - Gris neutro (minimalista, profesional)
  gray: {
    background: "oklch(0.2 0 0)",
    foreground: "oklch(0.97 0 0)",
    card: "oklch(0.25 0 0)",
    cardForeground: "oklch(0.97 0 0)",
    popover: "oklch(0.25 0 0)",
    popoverForeground: "oklch(0.97 0 0)",
    primary: "oklch(0.6 0 0)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.3 0 0)",
    secondaryForeground: "oklch(0.97 0 0)",
    muted: "oklch(0.3 0 0)",
    mutedForeground: "oklch(0.7 0 0)",
    accent: "oklch(0.35 0 0)",
    accentForeground: "oklch(0.97 0 0)",
    destructive: "oklch(0.6 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.65 0.18 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.78 0.15 75)",
    warningForeground: "oklch(0.18 0.02 75)",
    border: "oklch(0.38 0 0)",
    input: "oklch(0.28 0 0)",
    ring: "oklch(0.6 0 0)",
  },

  // White - Tema claro (alta visibilidad, accesibilidad)
  white: {
    background: "oklch(0.96 0 0)",
    foreground: "oklch(0.2 0 0)",
    card: "oklch(0.99 0 0)",
    cardForeground: "oklch(0.2 0 0)",
    popover: "oklch(0.99 0 0)",
    popoverForeground: "oklch(0.2 0 0)",
    primary: "oklch(0.5 0.18 250)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.92 0 0)",
    secondaryForeground: "oklch(0.2 0 0)",
    muted: "oklch(0.92 0 0)",
    mutedForeground: "oklch(0.45 0 0)",
    accent: "oklch(0.92 0.01 250)",
    accentForeground: "oklch(0.2 0 0)",
    destructive: "oklch(0.55 0.22 25)",
    destructiveForeground: "oklch(0.99 0 0)",
    success: "oklch(0.55 0.16 145)",
    successForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.68 0.16 75)",
    warningForeground: "oklch(0.18 0.03 75)",
    border: "oklch(0.85 0 0)",
    input: "oklch(0.92 0 0)",
    ring: "oklch(0.5 0.18 250)",
  },
}

export const themeLabels: Record<ThemeColor, string> = {
  "deep-red": "Rojo Oscuro",
  red: "Rojo",
  "deep-blue": "Azul Oscuro",
  blue: "Azul",
  "deep-yellow": "Ámbar",
  yellow: "Amarillo",
  "deep-green": "Verde Oscuro",
  green: "Verde",
  orange: "Naranja",
  gray: "Gris",
  white: "Claro",
}

export const themePreviewColors: Record<ThemeColor, string> = {
  "deep-red": "#9B2335",
  red: "#E54B4B",
  "deep-blue": "#2D5A8A",
  blue: "#4A90D9",
  "deep-yellow": "#D4A017",
  yellow: "#F7C948",
  "deep-green": "#2D7D5F",
  green: "#4ADE80",
  orange: "#F59E42",
  gray: "#7B8794",
  white: "#F8FAFC",
}

export function applyTheme(theme: ThemeColor) {
  const tokens = themeColors[theme]
  const root = document.documentElement

  const keyMap: Record<string, string> = {
    background: "--background",
    foreground: "--foreground",
    card: "--card",
    cardForeground: "--card-foreground",
    popover: "--popover",
    popoverForeground: "--popover-foreground",
    primary: "--primary",
    primaryForeground: "--primary-foreground",
    secondary: "--secondary",
    secondaryForeground: "--secondary-foreground",
    muted: "--muted",
    mutedForeground: "--muted-foreground",
    accent: "--accent",
    accentForeground: "--accent-foreground",
    destructive: "--destructive",
    destructiveForeground: "--destructive-foreground",
    success: "--success",
    successForeground: "--success-foreground",
    warning: "--warning",
    warningForeground: "--warning-foreground",
    border: "--border",
    input: "--input",
    ring: "--ring",
  }

  Object.entries(tokens).forEach(([key, value]) => {
    const cssVar = keyMap[key]
    if (cssVar) {
      root.style.setProperty(cssVar, value)
    }
  })

  localStorage.setItem("ibis-theme", theme)
}

export function getStoredTheme(): ThemeColor {
  if (typeof window === "undefined") return "blue"
  return (localStorage.getItem("ibis-theme") as ThemeColor) || "blue"
}
