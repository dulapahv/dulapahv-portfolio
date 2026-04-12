"use client";

import {
  CaretDownIcon,
  MarkdownLogoIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard/use-copy-to-clipboard";
import { GITHUB_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const COPIED_RESET_MS = 800;

interface OpenInItem {
  label: string;
  buildUrl: (params: { pathname: string; aiPrompt: string }) => string;
  icon: ReactNode;
}

const OPEN_IN_ITEMS: OpenInItem[] = [
  {
    label: "Open in GitHub",
    buildUrl: ({ pathname }) =>
      `${GITHUB_URL}/dulapahv-portfolio/blob/main/content${pathname}.mdx`,
    icon: (
      <ThemeAwareImage
        alt=""
        aria-hidden="true"
        darkSrc="/octocat-white.svg"
        height={20}
        lightSrc="/octocat-black.svg"
        width={20}
      />
    ),
  },
  {
    label: "Open in NLWeb Chat",
    buildUrl: ({ aiPrompt }) =>
      `https://chat.dulapahv.dev/?hints=search&q=${aiPrompt}`,
    icon: <SparkleIcon aria-hidden="true" className="size-5" />,
  },
  {
    label: "Open in ChatGPT",
    buildUrl: ({ aiPrompt }) =>
      `https://chatgpt.com/?hints=search&q=${aiPrompt}`,
    icon: (
      <ThemeAwareImage
        alt=""
        aria-hidden="true"
        darkSrc="/chatgpt-white.svg"
        height={20}
        lightSrc="/chatgpt-black.svg"
        width={20}
      />
    ),
  },
  {
    label: "Open in Claude",
    buildUrl: ({ aiPrompt }) => `https://claude.ai/new?q=${aiPrompt}`,
    icon: (
      <ThemeAwareImage
        alt=""
        aria-hidden="true"
        darkSrc="/claude-white.svg"
        height={20}
        lightSrc="/claude-black.svg"
        width={20}
      />
    ),
  },
  {
    label: "Open in T3 Chat",
    buildUrl: ({ aiPrompt }) => `https://t3.chat/new?q=${aiPrompt}`,
    icon: (
      <ThemeAwareImage
        alt=""
        aria-hidden="true"
        darkSrc="/t3-white.svg"
        height={20}
        lightSrc="/t3-black.svg"
        width={20}
      />
    ),
  },
];

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

const getCopyButtonText = (isCopying: boolean, copied: boolean): string => {
  if (isCopying) {
    return "Copying...";
  }
  if (copied) {
    return "Copied!";
  }
  return "Copy Page";
};

export function CopyPageDropdown() {
  const [copiedPage, setCopiedPage] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { copy } = useCopyToClipboard();

  useEffect(
    () => () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const copyPageAsMarkdown = async () => {
    setIsCopying(true);
    try {
      const response = await fetch(
        `${window.location.origin}${window.location.pathname}.mdx`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch markdown");
      }
      const markdown = await response.text();
      await copy(markdown);
      setCopiedPage(true);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(
        () => setCopiedPage(false),
        COPIED_RESET_MS
      );
    } catch (err) {
      console.error("Error copying page as markdown:", err);
    } finally {
      setIsCopying(false);
    }
  };

  const viewAsMarkdown = () => {
    window.open(`${window.location.pathname}.mdx`, "_blank");
  };

  const handleOpenIn = (url: string) => {
    window.open(url, "_blank");
    setIsDropdownOpen(false);
  };

  const handleCopyKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyPageAsMarkdown();
    }
  };

  const handleDropdownToggleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsDropdownOpen((open) => !open);
    } else if (event.key === "Escape" && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const handleMenuItemKeyDown = (event: KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    } else if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const buildOpenInUrls = () => {
    const pathname = window.location.pathname;
    const encodedMdUrl = encodeURIComponent(
      `${window.location.origin}${pathname}.mdx`
    );
    const aiPrompt = `Read+${encodedMdUrl}%2C+I+want+to+ask+questions+about+it.`;
    return OPEN_IN_ITEMS.map((item) => ({
      ...item,
      url: item.buildUrl({ pathname, aiPrompt }),
    }));
  };

  return (
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
          onKeyDown={handleCopyKeyDown}
          title={getCopyButtonTitle(isCopying, copiedPage)}
          type="button"
        >
          <p>{getCopyButtonText(isCopying, copiedPage)}</p>
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
          onKeyDown={handleDropdownToggleKeyDown}
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

      {isDropdownOpen ? (
        <div
          aria-orientation="vertical"
          className={cn(
            "absolute top-full right-0 z-50 mt-1 min-w-50 border-border bg-background",
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
            onKeyDown={(e) =>
              handleMenuItemKeyDown(e, () => {
                viewAsMarkdown();
                setIsDropdownOpen(false);
              })
            }
            role="menuitem"
            type="button"
          >
            <MarkdownLogoIcon aria-hidden="true" className="size-5" />
            <span>View as Markdown</span>
          </button>
          {buildOpenInUrls().map((item) => (
            <button
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-foreground text-sm",
                "hover:bg-background-subtle"
              )}
              key={item.label}
              onClick={() => handleOpenIn(item.url)}
              onKeyDown={(e) =>
                handleMenuItemKeyDown(e, () => handleOpenIn(item.url))
              }
              role="menuitem"
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
