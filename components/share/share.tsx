"use client";

import {
  CaretDownIcon,
  CheckIcon,
  ExportIcon,
  LinkSimpleHorizontalIcon,
  MarkdownLogoIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  page?: {
    title: string;
    description?: string;
    content?: string;
    type?: string;
  };
}

// Helper functions for button states
const getCopyButtonLabel = (isCopying: boolean, copied: boolean): string => {
  if (isCopying) {
    return "Copying page as Markdown";
  }
  if (copied) {
    return "Page copied to clipboard as Markdown";
  }
  return "Copy page as Markdown";
};

const getCopyButtonTitle = (isCopying: boolean, copied: boolean): string => {
  if (isCopying) {
    return "Copying...";
  }
  if (copied) {
    return "Copied!";
  }
  return "Copy page as Markdown";
};

const getCopyButtonText = (
  isCopying: boolean,
  copied: boolean
): React.ReactNode => {
  if (isCopying) {
    return <p>Copying...</p>;
  }
  if (copied) {
    return <p>Copied!</p>;
  }
  return <p>Copy Page</p>;
};

export function ShareButtons({ page }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const popupRefs = useRef<{ [key: string]: Window | null }>({
    X: null,
    facebook: null,
    linkedin: null,
  });

  // Check for native share support
  useEffect(() => {
    const checkShareSupport = () => {
      if (typeof window !== "undefined" && "share" in navigator) {
        setSupportsNativeShare(
          navigator.canShare?.({ url: window.location.href }) ?? true
        );
      }
    };

    checkShareSupport();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleNativeShare = async () => {
    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Share failed:", err);
        await copyToClipboard(window.location.href);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 800);
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const copyPageAsMarkdown = async () => {
    if (!page) {
      return;
    }
    setIsCopying(true);

    try {
      const response = await fetch(
        `${window.location.origin}${window.location.pathname}.md`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch markdown");
      }
      const markdown = await response.text();
      await copyToClipboard(markdown);
      setCopiedPage(true);
      setTimeout(() => setCopiedPage(false), 800);
    } catch (err) {
      console.error("Error copying page as markdown:", err);
    } finally {
      setIsCopying(false);
    }
  };

  const viewAsMarkdown = () => {
    window.open(`${window.location.pathname}.md`, "_blank");
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = window.location.href;
    const title = document.title;
    let shareUrl = "";

    switch (platform) {
      case "X":
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      default:
        return;
    }

    const existingPopup = popupRefs.current[platform];

    if (existingPopup && !existingPopup.closed) {
      existingPopup.location.href = shareUrl;
      existingPopup.focus();
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

    if (popup) {
      popupRefs.current[platform] = popup;
      popup.focus();

      try {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            popupRefs.current[platform] = null;
            clearInterval(checkClosed);
          }
        }, 1000);
      } catch (e) {
        console.error("Error setting up popup close check: ", e);
        popupRefs.current[platform] = null;
      }
    }
  };

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
          onClick={() => copyToClipboard(window.location.href)}
          onKeyDown={(e) =>
            handleKeyDown(e, () => copyToClipboard(window.location.href))
          }
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

      <button
        aria-label="Share on X"
        className={cn(
          "aspect-square cursor-pointer rounded-full border border-border bg-background p-2",
          "hover:border-border-strong hover:bg-background-subtle"
        )}
        onClick={() => shareOnSocialMedia("X")}
        onKeyDown={(e) => handleKeyDown(e, () => shareOnSocialMedia("X"))}
        title="Share on X"
        type="button"
      >
        <ThemeAwareImage
          alt=""
          aria-hidden="true"
          darkSrc="/x-white.svg"
          height={16}
          lightSrc="/x-black.svg"
          width={16}
        />
      </button>

      <button
        aria-label="Share on Facebook"
        className={cn(
          "aspect-square cursor-pointer rounded-full border border-border bg-background p-1",
          "hover:border-border-strong hover:bg-background-subtle"
        )}
        onClick={() => shareOnSocialMedia("facebook")}
        onKeyDown={(e) =>
          handleKeyDown(e, () => shareOnSocialMedia("facebook"))
        }
        title="Share on Facebook"
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          height={24}
          src="/facebook.svg"
          width={24}
        />
      </button>

      <button
        aria-label="Share on LinkedIn"
        className={cn(
          "aspect-square cursor-pointer rounded-full border border-border bg-background p-1.5",
          "hover:border-border-strong hover:bg-background-subtle"
        )}
        onClick={() => shareOnSocialMedia("linkedin")}
        onKeyDown={(e) =>
          handleKeyDown(e, () => shareOnSocialMedia("linkedin"))
        }
        title="Share on LinkedIn"
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          height={20}
          src="/linkedin.svg"
          width={20}
        />
      </button>

      {page && (
        <div className="relative ml-0 min-[425px]:ml-auto" ref={dropdownRef}>
          <div className="flex items-center rounded-md border border-border bg-background">
            <button
              aria-label={getCopyButtonLabel(isCopying, copiedPage)}
              className={cn(
                "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm",
                "border-border border-r",
                "hover:bg-background-subtle",
                "disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
              )}
              disabled={isCopying || copiedPage}
              onClick={copyPageAsMarkdown}
              onKeyDown={(e) => handleKeyDown(e, copyPageAsMarkdown)}
              title={getCopyButtonTitle(isCopying, copiedPage)}
              type="button"
            >
              {getCopyButtonText(isCopying, copiedPage)}
            </button>
            <button
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-label="More options"
              className={cn(
                "flex cursor-pointer items-center px-2 py-2",
                "hover:bg-background-subtle"
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                } else if (e.key === "Escape" && isDropdownOpen) {
                  setIsDropdownOpen(false);
                }
              }}
              title="More options"
              type="button"
            >
              <CaretDownIcon
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </button>
          </div>

          {isDropdownOpen && (
            <div
              aria-orientation="vertical"
              className={cn(
                "absolute top-full right-0 z-50 mt-1 min-w-[200px] border-border bg-background",
                "rounded-md border shadow-lg"
              )}
              role="menu"
            >
              <button
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-foreground text-sm",
                  "hover:bg-background-subtle"
                )}
                onClick={() => {
                  viewAsMarkdown();
                  setIsDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    viewAsMarkdown();
                    setIsDropdownOpen(false);
                  } else if (e.key === "Escape") {
                    setIsDropdownOpen(false);
                  }
                }}
                role="menuitem"
                type="button"
              >
                <MarkdownLogoIcon aria-hidden="true" className="size-5" />
                <span>View as Markdown</span>
              </button>
              <button
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-foreground text-sm",
                  "hover:bg-background-subtle"
                )}
                onClick={() => {
                  window.open("https://chat.dulapahv.dev", "_blank");
                  setIsDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.open("https://chat.dulapahv.dev", "_blank");
                    setIsDropdownOpen(false);
                  } else if (e.key === "Escape") {
                    setIsDropdownOpen(false);
                  }
                }}
                role="menuitem"
                type="button"
              >
                <SparkleIcon aria-hidden="true" className="size-5" />
                <span>Ask in NLWeb Chat</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
