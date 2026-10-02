"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark" | "glare-guard" | "slate";
export type AccentColor = "lime" | "sapphire" | "amber" | "crimson" | "violet";
export type Density = "compact" | "balanced" | "touch";
export type CurrencyPref = "NGN" | "USD" | "GHS" | "KES";
export type FontScale = "90" | "100" | "110" | "120";
export type FontFamily = "poppins" | "inter" | "jakarta" | "outfit";
export type LogoStyle = "icon" | "wordmark" | "combo";

export interface AppearanceConfig {
  theme: ThemeMode;
  accent: AccentColor;
  density: Density;
  currency: CurrencyPref;
  fontScale: FontScale;
  fontFamily: FontFamily;
  showTableGridlines: boolean;
  enableAnimations: boolean;
  highContrastBadges: boolean;
  compactSidebar: boolean;
  showStockWarnings: boolean;
  logoStyle: LogoStyle;
}

export interface ThemeTokens {
  bgPage: string;
  bgCard: string;
  bgHeader: string;
  bgSidebar: string;
  bgSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderSubtle: string;
  borderStrong: string;
  navActiveBg: string;
  navActiveText: string;
  accentHex: string;
  accentText: string;
  accentLightBg: string;
  accentTextOnLight: string;
}

export const ACCENT_MAP: Record<AccentColor, { name: string; hex: string; textHex: string; hoverHex: string; lightBg: string; textOnLight: string }> = {
  lime: {
    name: "Electric Lime (Brand)",
    hex: "#A3FF00",
    textHex: "#0E3E2B",
    hoverHex: "#92EA00",
    lightBg: "rgba(163, 255, 0, 0.12)",
    textOnLight: "#0E3E2B",
  },
  sapphire: {
    name: "Enterprise Sapphire",
    hex: "#0284C7",
    textHex: "#FFFFFF",
    hoverHex: "#0369A1",
    lightBg: "rgba(2, 132, 199, 0.12)",
    textOnLight: "#0369A1",
  },
  amber: {
    name: "Depot Amber",
    hex: "#F59E0B",
    textHex: "#0E3E2B",
    hoverHex: "#D97706",
    lightBg: "rgba(245, 158, 11, 0.12)",
    textOnLight: "#B45309",
  },
  crimson: {
    name: "Fleet Crimson",
    hex: "#E11D48",
    textHex: "#FFFFFF",
    hoverHex: "#BE123C",
    lightBg: "rgba(225, 29, 72, 0.12)",
    textOnLight: "#BE123C",
  },
  violet: {
    name: "Modern Violet",
    hex: "#8B5CF6",
    textHex: "#FFFFFF",
    hoverHex: "#7C3AED",
    lightBg: "rgba(139, 92, 246, 0.12)",
    textOnLight: "#6D28D9",
  },
};

export const THEME_PALETTES: Record<ThemeMode, Omit<ThemeTokens, "accentHex" | "accentText" | "accentLightBg" | "accentTextOnLight">> = {
  light: {
    bgPage: "#F8FAF8",
    bgCard: "#FFFFFF",
    bgHeader: "#FFFFFF",
    bgSidebar: "#FFFFFF",
    bgSubtle: "rgba(14,62,43,0.04)",
    textPrimary: "#0E3E2B",
    textSecondary: "#374151",
    textMuted: "#4B5563",
    borderSubtle: "rgba(14,62,43,0.1)",
    borderStrong: "rgba(14,62,43,0.22)",
    navActiveBg: "#F0F5ED",
    navActiveText: "#0E3E2B",
  },
  dark: {
    bgPage: "#0A1711",
    bgCard: "#11241B",
    bgHeader: "#0E2017",
    bgSidebar: "#0B1912",
    bgSubtle: "#162E23",
    textPrimary: "#F1F5F9",
    textSecondary: "#E2E8F0",
    textMuted: "#CBD5E1",
    borderSubtle: "rgba(255, 255, 255, 0.12)",
    borderStrong: "rgba(255, 255, 255, 0.25)",
    navActiveBg: "rgba(163, 255, 0, 0.14)",
    navActiveText: "#A3FF00",
  },
  "glare-guard": {
    bgPage: "#F0F2F5",
    bgCard: "#FFFFFF",
    bgHeader: "#000000",
    bgSidebar: "#FFFFFF",
    bgSubtle: "#E5E7EB",
    textPrimary: "#000000",
    textSecondary: "#000000",
    textMuted: "#1F2937",
    borderSubtle: "#000000",
    borderStrong: "#000000",
    navActiveBg: "#000000",
    navActiveText: "#FFFFFF",
  },
  slate: {
    bgPage: "#F1F5F9",
    bgCard: "#FFFFFF",
    bgHeader: "#FFFFFF",
    bgSidebar: "#F8FAFC",
    bgSubtle: "#E2E8F0",
    textPrimary: "#0F172A",
    textSecondary: "#334155",
    textMuted: "#475569",
    borderSubtle: "#E2E8F0",
    borderStrong: "#CBD5E1",
    navActiveBg: "#E2E8F0",
    navActiveText: "#0F172A",
  },
};

export const DEFAULT_APPEARANCE_CONFIG: AppearanceConfig = {
  theme: "light",
  accent: "lime",
  density: "balanced",
  currency: "NGN",
  fontScale: "100",
  fontFamily: "poppins",
  showTableGridlines: true,
  enableAnimations: true,
  highContrastBadges: true,
  compactSidebar: false,
  showStockWarnings: true,
  logoStyle: "icon",
};

interface AppearanceContextType {
  config: AppearanceConfig;
  tokens: ThemeTokens;
  accentData: { name: string; hex: string; textHex: string; hoverHex: string; lightBg: string };
  updateConfig: (updates: Partial<AppearanceConfig>) => void;
  resetConfig: () => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppearanceConfig>(DEFAULT_APPEARANCE_CONFIG);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tradon_appearance_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Update HTML data attributes and CSS variables whenever config changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const accent = ACCENT_MAP[config.accent] || ACCENT_MAP.lime;
    const basePalette = THEME_PALETTES[config.theme] || THEME_PALETTES.light;

    const root = document.documentElement;
    root.setAttribute("data-theme", config.theme);
    root.setAttribute("data-density", config.density);
    root.setAttribute("data-font", config.fontFamily || "poppins");

    // Apply CSS Variables
    root.style.setProperty("--theme-bg-page", basePalette.bgPage);
    root.style.setProperty("--theme-bg-card", basePalette.bgCard);
    root.style.setProperty("--theme-bg-header", basePalette.bgHeader);
    root.style.setProperty("--theme-bg-sidebar", basePalette.bgSidebar);
    root.style.setProperty("--theme-bg-subtle", basePalette.bgSubtle);
    root.style.setProperty("--theme-text-primary", basePalette.textPrimary);
    root.style.setProperty("--theme-text-secondary", basePalette.textSecondary);
    root.style.setProperty("--theme-text-muted", basePalette.textMuted);
    root.style.setProperty("--theme-border-subtle", basePalette.borderSubtle);
    root.style.setProperty("--theme-border-strong", basePalette.borderStrong);
    root.style.setProperty("--theme-accent-hex", accent.hex);
    root.style.setProperty("--theme-accent-text", accent.textHex);
    root.style.setProperty("--theme-accent-light-bg", accent.lightBg);
    root.style.setProperty("--theme-font-scale", `${parseInt(config.fontScale, 10) / 100}`);

    // Update body background
    if (document.body) {
      document.body.style.backgroundColor = basePalette.bgPage;
      document.body.style.color = basePalette.textPrimary;
    }
  }, [config]);

  const updateConfig = (updates: Partial<AppearanceConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("tradon_appearance_config", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetConfig = () => {
    setConfig(DEFAULT_APPEARANCE_CONFIG);
    try {
      localStorage.removeItem("tradon_appearance_config");
    } catch {
      // ignore
    }
  };

  const currentAccent = ACCENT_MAP[config.accent] || ACCENT_MAP.lime;
  const currentBase = THEME_PALETTES[config.theme] || THEME_PALETTES.light;

  const tokens: ThemeTokens = {
    ...currentBase,
    accentHex: currentAccent.hex,
    accentText: currentAccent.textHex,
    accentLightBg: currentAccent.lightBg,
    accentTextOnLight: currentAccent.textOnLight,
  };

  return (
    <AppearanceContext.Provider
      value={{
        config,
        tokens,
        accentData: currentAccent,
        updateConfig,
        resetConfig,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
