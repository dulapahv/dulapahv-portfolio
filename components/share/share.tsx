"use client";

import {
  CheckIcon,
  ExportIcon,
  LinkSimpleHorizontalIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { CopyPageDropdown } from "./copy-page-dropdown";
import { SocialShareButton } from "./social-share-button";

interface ShareButtonsProps {
  page?: {
    title: string;
    description?: string;
    type?: string;
  };
}

export function ShareButtons({ page }: ShareButtonsProps) {
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const { copied, copy } = useCopyToClipboard();
  const { trigger } = useWebHaptics();

  // Check for native share support after mount (server-render mismatch otherwise)
  useEffect(() => {
    if (typeof window !== "undefined" && "share" in navigator) {
      setSupportsNativeShare(
        navigator.canShare?.({ url: window.location.href }) ?? true
      );
    }
  }, []);

  const handleNativeShare = async () => {
    if (!navigator.share) {
      return;
    }
    trigger([{ duration: 8 }], { intensity: 0.3 });
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Share failed:", err);
        await copy(window.location.href);
      }
    }
  };

  const copyCurrentUrl = () => copy(window.location.href);

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <section
      aria-label="Share options"
      className="flex flex-wrap items-center gap-3"
    >
      {supportsNativeShare ? (
        <button
          aria-label="Share this page"
          className={cn(
            "aspect-square cursor-pointer rounded-full border border-border bg-background p-1.5",
            "hover:border-border-strong hover:bg-background-subtle"
          )}
          onClick={handleNativeShare}
          onKeyDown={(e) => handleKeyDown(e, handleNativeShare)}
          title="Share this page"
          type="button"
        >
          <ExportIcon aria-hidden="true" className="size-4.5 text-foreground" />
        </button>
      ) : (
        <button
          aria-label={
            copied ? "Link copied to clipboard" : "Copy link to clipboard"
          }
          className={cn(
            "aspect-square cursor-pointer rounded-full border border-border bg-background p-1.5",
            "hover:border-border-strong hover:bg-background-subtle"
          )}
          disabled={copied}
          onClick={copyCurrentUrl}
          onKeyDown={(e) => handleKeyDown(e, copyCurrentUrl)}
          title={copied ? "Link copied!" : "Copy link to clipboard"}
          type="button"
        >
          <div className="relative text-foreground">
            {copied ? (
              <CheckIcon className="size-4.5" />
            ) : (
              <LinkSimpleHorizontalIcon className="size-4.5" />
            )}
          </div>
        </button>
      )}

      <SocialShareButton label="Share on X" paddingClassName="p-2" platform="X">
        <ThemeAwareImage
          alt=""
          aria-hidden="true"
          darkSrc="/x-white.svg"
          height={16}
          lightSrc="/x-black.svg"
          width={16}
        />
      </SocialShareButton>

      <SocialShareButton
        label="Share on Facebook"
        paddingClassName="p-1"
        platform="facebook"
      >
        <Image
          alt=""
          aria-hidden="true"
          height={24}
          src="/facebook.svg"
          width={24}
        />
      </SocialShareButton>

      <SocialShareButton
        label="Share on LinkedIn"
        paddingClassName="p-1.5"
        platform="linkedin"
      >
        <Image
          alt=""
          aria-hidden="true"
          height={20}
          src="/linkedin.svg"
          width={20}
        />
      </SocialShareButton>

      {page ? <CopyPageDropdown /> : null}
    </section>
  );
}
