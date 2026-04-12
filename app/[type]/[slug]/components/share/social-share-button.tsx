"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useRef } from "react";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";

type Platform = "X" | "facebook" | "linkedin";

const SHARE_URL_BUILDERS: Record<
  Platform,
  (url: string, title: string) => string
> = {
  X: (url, title) =>
    `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  facebook: (url) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  linkedin: (url, title) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
};

interface SocialShareButtonProps {
  platform: Platform;
  label: string;
  /** Padding/sizing class to override the icon area, e.g. `"p-2"`. */
  paddingClassName: string;
  children: ReactNode;
}

export function SocialShareButton({
  platform,
  label,
  paddingClassName,
  children,
}: SocialShareButtonProps) {
  const popupRef = useRef<Window | null>(null);
  const { trigger } = useWebHaptics();

  const openPopup = () => {
    trigger([{ duration: 8 }], { intensity: 0.3 });
    const shareUrl = SHARE_URL_BUILDERS[platform](
      window.location.href,
      document.title
    );

    const existing = popupRef.current;
    if (existing && !existing.closed) {
      existing.location.href = shareUrl;
      existing.focus();
      return;
    }

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const popupWidth = Math.min(650, screenWidth * 0.8);
    const popupHeight = Math.min(700, screenHeight * 0.6);
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;

    const popup = window.open(
      shareUrl,
      `share_${platform}`,
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      return;
    }

    popupRef.current = popup;
    popup.focus();

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        popupRef.current = null;
        clearInterval(checkClosed);
      }
    }, 1000);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPopup();
    }
  };

  return (
    <button
      aria-label={label}
      className={cn(
        "aspect-square cursor-pointer rounded-full border border-border bg-background",
        "hover:border-border-strong hover:bg-background-subtle",
        paddingClassName
      )}
      onClick={openPopup}
      onKeyDown={handleKeyDown}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
