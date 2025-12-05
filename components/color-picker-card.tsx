'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ArrowCounterClockwiseIcon,
  CopyIcon,
  InfoIcon,
  XIcon
} from '@phosphor-icons/react/dist/ssr';
import { HexColorInput, HexColorPicker } from 'react-colorful';

import { cn } from '@/lib/utils';
import { Card } from '@/components/card';
import { useThemeColor } from '@/contexts/theme-color-context';

export function ColorPickerCard() {
  const { customColor, recentColors, setCustomColor, resetColor } = useThemeColor();
  const [localColor, setLocalColor] = useState(customColor || '#3b82f6');
  const [showInfo, setShowInfo] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Update local color when customColor changes from outside
  useEffect(() => {
    if (customColor) {
      setLocalColor(customColor);
    }
  }, [customColor]);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);

    // Apply theme immediately for instant feedback
    const root = document.documentElement;
    const { l, c, h } = hexToOklch(newColor);
    const shades = generateColorScale(l, c, h);

    root.style.setProperty('--x-primary-600', shades[600]);
    root.style.setProperty('--color-mirai-red', shades[600]);
    root.style.setProperty('--color-mirai-blue', shades[500]);
    root.style.setProperty('--color-mirai-yellow', shades[400]);

    // Debounce saving to context and recent colors
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setCustomColor(newColor);
    }, 300);
  };

  const handleReset = () => {
    setIsResetting(true);
    resetColor();
    setTimeout(() => setIsResetting(false), 600);
  };

  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const getColorFormats = (hex: string) => {
    const { l, c, h } = hexToOklch(hex);
    const hsl = hexToHSL(hex);

    return {
      hex: hex.toUpperCase(),
      hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
      oklch: `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`
    };
  };

  const formats = getColorFormats(localColor);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <Card
      className="relative flex h-full flex-col overflow-hidden p-5"
      style={{
        background: customColor
          ? `linear-gradient(135deg, rgba(0,0,0,0) 0%, ${customColor}15 100%)`
          : undefined
      }}
    >
      {/* Subtle color overlay */}
      {customColor && (
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundColor: customColor }}
        />
      )}

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
          Theme Color
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            title="Color information"
            className="group"
          >
            <InfoIcon
              className={cn(
                'text-foreground-muted size-5 transition-colors',
                'group-hover:text-mirai-blue'
              )}
              weight="regular"
            />
          </button>
          <button
            onClick={handleReset}
            title="Reset to default colors"
            className="group"
            disabled={!customColor}
          >
            <ArrowCounterClockwiseIcon
              className={cn(
                'text-foreground-muted size-5 transition-all',
                customColor ? 'group-hover:text-mirai-red' : 'cursor-not-allowed opacity-40',
                isResetting && 'animate-spin'
              )}
              weight="regular"
            />
          </button>
        </div>
      </div>

      {/* Color Info Modal */}
      {showInfo && (
        <div className="bg-background-elevated border-border relative z-20 mb-4 rounded-lg border p-4">
          <div className="mb-3 flex items-start justify-between">
            <h3 className="text-foreground text-sm font-semibold">Color Formats</h3>
            <button
              onClick={() => setShowInfo(false)}
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <XIcon className="size-4" weight="bold" />
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(formats).map(([format, value]) => (
              <div
                key={format}
                className="bg-background flex items-center justify-between rounded-md p-2"
              >
                <div className="flex flex-col">
                  <span className="text-foreground-muted text-xs font-medium uppercase">
                    {format}
                  </span>
                  <span className="text-foreground font-mono text-xs">{value}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(value, format)}
                  className="hover:text-primary text-foreground-muted transition-colors"
                  title={`Copy ${format.toUpperCase()}`}
                >
                  {copiedFormat === format ? (
                    <span className="text-primary text-xs">✓</span>
                  ) : (
                    <CopyIcon className="size-4" weight="regular" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col gap-4">
        {/* React Colorful Color Picker */}
        <div className="flex flex-col items-center gap-3">
          <div className="color-picker-wrapper w-full">
            <HexColorPicker
              color={localColor}
              onChange={handleColorChange}
              style={{ width: '100%', height: '180px' }}
            />
          </div>

          {/* Hex Input Field */}
          <div className="flex w-full items-center gap-2">
            <span className="text-foreground-muted text-xs font-medium">#</span>
            <HexColorInput
              color={localColor}
              onChange={handleColorChange}
              prefixed={false}
              className={cn(
                'text-foreground bg-background border-border flex-1 rounded-md border px-3 py-1.5',
                'font-mono text-sm uppercase transition-colors',
                'focus:border-primary focus:ring-primary/20 focus:ring-2 focus:outline-none'
              )}
              placeholder="3B82F6"
            />
          </div>
        </div>

        {/* Recent Colors */}
        {recentColors.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-foreground-muted text-xs font-medium">Recent</p>
            <div className="flex flex-wrap gap-2">
              {recentColors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  onClick={() => {
                    setLocalColor(color);
                    setCustomColor(color);
                  }}
                  className={cn(
                    'size-10 rounded-lg border-2 transition-all',
                    'hover:border-primary hover:scale-110',
                    customColor === color
                      ? 'border-primary ring-primary/20 ring-2'
                      : 'border-border'
                  )}
                  style={{ backgroundColor: color }}
                  title={`Use ${color}`}
                  aria-label={`Use color ${color}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .color-picker-wrapper .react-colorful {
          border-radius: 12px;
        }

        .color-picker-wrapper .react-colorful__saturation {
          border-radius: 12px 12px 0 0;
        }

        .color-picker-wrapper .react-colorful__last-control {
          border-radius: 0 0 12px 12px;
        }

        .color-picker-wrapper .react-colorful__hue {
          height: 28px;
          border-radius: 0 0 12px 12px;
        }

        .color-picker-wrapper .react-colorful__pointer {
          width: 20px;
          height: 20px;
          border-width: 3px;
        }

        .color-picker-wrapper .react-colorful__hue-pointer {
          width: 14px;
          height: 28px;
          border-radius: 4px;
        }
      `}</style>
    </Card>
  );
}

// Helper function to convert hex to oklch
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  const x = 0.4124564 * rLin + 0.3575761 * gLin + 0.1804375 * bLin;
  const y = 0.2126729 * rLin + 0.7151522 * gLin + 0.072175 * bLin;
  const z = 0.0193339 * rLin + 0.119192 * gLin + 0.9503041 * bLin;

  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;

  const fx = x / xn > 0.008856 ? Math.pow(x / xn, 1 / 3) : 7.787 * (x / xn) + 16 / 116;
  const fy = y / yn > 0.008856 ? Math.pow(y / yn, 1 / 3) : 7.787 * (y / yn) + 16 / 116;
  const fz = z / zn > 0.008856 ? Math.pow(z / zn, 1 / 3) : 7.787 * (z / zn) + 16 / 116;

  const lStar = 116 * fy - 16;
  const aStar = 500 * (fx - fy);
  const bStar = 200 * (fy - fz);

  const l = lStar;
  const c = Math.sqrt(aStar * aStar + bStar * bStar);
  let h = (Math.atan2(bStar, aStar) * 180) / Math.PI;
  if (h < 0) h += 360;

  const okL = l / 100;
  const okC = c / 150;
  const okH = h;

  return { l: okL, c: okC, h: okH };
}

// Helper function to convert hex to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}

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
