'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeColorContextType {
  customColor: string | null;
  recentColors: string[];
  setCustomColor: (color: string) => void;
  updateColor: (color: string) => void;
  addToRecentColors: (color: string) => void;
  resetColor: () => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

const STORAGE_KEY = 'theme-custom-color';
const RECENT_COLORS_KEY = 'theme-recent-colors';
const MAX_RECENT_COLORS = 5;

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [customColor, setCustomColorState] = useState<string | null>(null);
  const [recentColors, setRecentColors] = useState<string[]>([]);

  useEffect(() => {
    const savedColor = localStorage.getItem(STORAGE_KEY);
    const savedRecentColors = localStorage.getItem(RECENT_COLORS_KEY);

    if (savedColor) {
      setCustomColorState(savedColor);
      applyColorToTheme(savedColor);
    }

    if (savedRecentColors) {
      try {
        setRecentColors(JSON.parse(savedRecentColors));
      } catch (e) {
        console.error('Failed to parse recent colors:', e);
      }
    }
  }, []);

  const applyColorToTheme = (color: string) => {
    const root = document.documentElement;

    // Convert hex to oklch
    const { l, c, h } = hexToOklch(color);

    // Generate color scale from the picked color
    const shades = generateColorScale(l, c, h);

    // Apply to primary colors
    root.style.setProperty('--x-primary-100', shades[100]);
    root.style.setProperty('--x-primary-200', shades[200]);
    root.style.setProperty('--x-primary-300', shades[300]);
    root.style.setProperty('--x-primary-400', shades[400]);
    root.style.setProperty('--x-primary-500', shades[500]);
    root.style.setProperty('--x-primary-600', shades[600]);
    root.style.setProperty('--x-primary-700', shades[700]);
    root.style.setProperty('--x-primary-800', shades[800]);
    root.style.setProperty('--x-primary-900', shades[900]);
    root.style.setProperty('--x-primary-1000', shades[1000]);

    // Also update mirai brand colors for the card borders
    root.style.setProperty('--color-mirai-red', shades[600]);
    root.style.setProperty('--color-mirai-blue', shades[500]);
    root.style.setProperty('--color-mirai-yellow', shades[400]);
  };

  const removeColorFromTheme = () => {
    const root = document.documentElement;

    // Remove custom properties to revert to defaults
    root.style.removeProperty('--x-primary-100');
    root.style.removeProperty('--x-primary-200');
    root.style.removeProperty('--x-primary-300');
    root.style.removeProperty('--x-primary-400');
    root.style.removeProperty('--x-primary-500');
    root.style.removeProperty('--x-primary-600');
    root.style.removeProperty('--x-primary-700');
    root.style.removeProperty('--x-primary-800');
    root.style.removeProperty('--x-primary-900');
    root.style.removeProperty('--x-primary-1000');
    root.style.removeProperty('--color-mirai-red');
    root.style.removeProperty('--color-mirai-blue');
    root.style.removeProperty('--color-mirai-yellow');
  };

  const updateColor = (color: string) => {
    setCustomColorState(color);
    localStorage.setItem(STORAGE_KEY, color);
    applyColorToTheme(color);
  };

  const addToRecentColors = (color: string) => {
    setRecentColors(prev => {
      const newRecent = [color, ...prev.filter(c => c !== color)].slice(0, MAX_RECENT_COLORS);
      localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  };

  const setCustomColor = (color: string) => {
    updateColor(color);
    addToRecentColors(color);
  };

  const resetColor = () => {
    setCustomColorState(null);
    localStorage.removeItem(STORAGE_KEY);
    removeColorFromTheme();
  };

  return (
    <ThemeColorContext.Provider
      value={{
        customColor,
        recentColors,
        setCustomColor,
        updateColor,
        addToRecentColors,
        resetColor
      }}
    >
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error('useThemeColor must be used within ThemeColorProvider');
  }
  return context;
}

// Helper function to convert hex to oklch
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert RGB to linear RGB
  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  // Convert linear RGB to XYZ
  const x = 0.4124564 * rLin + 0.3575761 * gLin + 0.1804375 * bLin;
  const y = 0.2126729 * rLin + 0.7151522 * gLin + 0.072175 * bLin;
  const z = 0.0193339 * rLin + 0.119192 * gLin + 0.9503041 * bLin;

  // Convert XYZ to Lab
  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;

  const fx = x / xn > 0.008856 ? Math.pow(x / xn, 1 / 3) : 7.787 * (x / xn) + 16 / 116;
  const fy = y / yn > 0.008856 ? Math.pow(y / yn, 1 / 3) : 7.787 * (y / yn) + 16 / 116;
  const fz = z / zn > 0.008856 ? Math.pow(z / zn, 1 / 3) : 7.787 * (z / zn) + 16 / 116;

  const lStar = 116 * fy - 16;
  const aStar = 500 * (fx - fy);
  const bStar = 200 * (fy - fz);

  // Convert Lab to LCH
  const l = lStar;
  const c = Math.sqrt(aStar * aStar + bStar * bStar);
  let h = (Math.atan2(bStar, aStar) * 180) / Math.PI;
  if (h < 0) h += 360;

  // Convert to OKLab/OKLCH (simplified approximation)
  // For a more accurate conversion, we'd need the full OKLab transformation
  // This is a simplified version that works reasonably well
  const okL = l / 100;
  const okC = c / 150; // Approximation
  const okH = h;

  return { l: okL, c: okC, h: okH };
}

// Generate color scale from base oklch values
function generateColorScale(l: number, c: number, h: number): Record<number, string> {
  return {
    100: `oklch(${Math.min(l + 0.35, 0.98)} ${c * 0.3} ${h})`,
    200: `oklch(${Math.min(l + 0.3, 0.95)} ${c * 0.4} ${h})`,
    300: `oklch(${Math.min(l + 0.25, 0.9)} ${c * 0.5} ${h})`,
    400: `oklch(${Math.min(l + 0.15, 0.85)} ${c * 0.7} ${h})`,
    500: `oklch(${l} ${c} ${h})`,
    600: `oklch(${Math.max(l - 0.1, 0.3)} ${c * 1.1} ${h})`,
    700: `oklch(${Math.max(l - 0.15, 0.25)} ${c * 1.15} ${h})`,
    800: `oklch(${Math.max(l - 0.2, 0.2)} ${c * 1.2} ${h})`,
    900: `oklch(${Math.max(l - 0.25, 0.15)} ${c * 1.25} ${h})`,
    1000: `oklch(${Math.max(l - 0.3, 0.1)} ${c * 1.3} ${h})`
  };
}
