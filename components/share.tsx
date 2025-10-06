'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import {
  CaretDownIcon,
  CheckIcon,
  ExportIcon,
  LinkSimpleHorizontalIcon,
  MarkdownLogoIcon,
} from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';

import { ThemeAwareImage } from './theme-aware-image';

interface ShareButtonsProps {
  page?: {
    title: string;
    description?: string;
    content?: string;
    type?: string;
  };
}

export default function ShareButtons({ page }: ShareButtonsProps) {
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
      if (typeof window !== 'undefined' && 'share' in navigator) {
        setSupportsNativeShare(
          navigator.canShare?.({ url: window.location.href }) ?? true,
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
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Share failed:', err);
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
      console.error('Failed to copy text: ', err);
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 800);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const copyPageAsMarkdown = async () => {
    if (!page) return;
    setIsCopying(true);

    try {
      const response = await fetch(
        `${window.location.origin}${window.location.pathname}.md`,
      );
      if (!response.ok) throw new Error('Failed to fetch markdown');
      const markdown = await response.text();
      await copyToClipboard(markdown);
      setCopiedPage(true);
      setTimeout(() => setCopiedPage(false), 800);
    } catch (err) {
      console.error('Error copying page as markdown:', err);
    } finally {
      setIsCopying(false);
    }
  };

  const viewAsMarkdown = () => {
    window.open(`${window.location.pathname}.md`, '_blank');
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = window.location.href;
    const title = document.title;
    let shareUrl = '';

    switch (platform) {
      case 'X':
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
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
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`,
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
        console.error('Error setting up popup close check: ', e);
        popupRefs.current[platform] = null;
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      role="group"
      aria-label="Share options"
    >
      {/* Native Share Button or Copy Link Button (fallback) */}
      {supportsNativeShare ? (
        <button
          onClick={handleNativeShare}
          onKeyDown={(e) => handleKeyDown(e, handleNativeShare)}
          className={cn(
            `bg-background border-border aspect-square cursor-pointer rounded-full border
              p-1.5 transition-colors`,
            'hover:bg-background-subtle hover:border-border-strong',
          )}
          title="Share this page"
          aria-label="Share this page"
        >
          <ExportIcon className="text-foreground size-4.5" aria-hidden="true" />
        </button>
      ) : (
        <button
          onClick={() => copyToClipboard(window.location.href)}
          onKeyDown={(e) =>
            handleKeyDown(e, () => copyToClipboard(window.location.href))
          }
          className={cn(
            `bg-background border-border aspect-square cursor-pointer rounded-full border
              p-1.5 transition-colors`,
            'hover:bg-background-subtle hover:border-border-strong',
          )}
          title={copied ? 'Link copied!' : 'Copy link to clipboard'}
          aria-label={
            copied ? 'Link copied to clipboard' : 'Copy link to clipboard'
          }
          disabled={copied}
        >
          <div className="text-foreground relative">
            {copied ? (
              <CheckIcon className="size-4.5" />
            ) : (
              <LinkSimpleHorizontalIcon className="size-4.5" />
            )}
          </div>
        </button>
      )}

      {/* X Share Button */}
      <button
        onClick={() => shareOnSocialMedia('X')}
        onKeyDown={(e) => handleKeyDown(e, () => shareOnSocialMedia('X'))}
        className={cn(
          `bg-background border-border aspect-square cursor-pointer rounded-full border p-2
          transition-colors`,
          'hover:bg-background-subtle hover:border-border-strong',
        )}
        title="Share on X"
        aria-label="Share on X"
      >
        <ThemeAwareImage
          lightSrc="/x-black.svg"
          darkSrc="/x-white.svg"
          width={16}
          height={16}
          alt=""
          aria-hidden="true"
        />
      </button>

      {/* Facebook Share Button */}
      <button
        onClick={() => shareOnSocialMedia('facebook')}
        onKeyDown={(e) =>
          handleKeyDown(e, () => shareOnSocialMedia('facebook'))
        }
        className={cn(
          `bg-background border-border aspect-square cursor-pointer rounded-full border p-1
          transition-colors`,
          'hover:bg-background-subtle hover:border-border-strong',
        )}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Image
          src="/facebook.svg"
          width={24}
          height={24}
          alt=""
          aria-hidden="true"
        />
      </button>

      {/* LinkedIn Share Button */}
      <button
        onClick={() => shareOnSocialMedia('linkedin')}
        onKeyDown={(e) =>
          handleKeyDown(e, () => shareOnSocialMedia('linkedin'))
        }
        className={cn(
          `bg-background border-border aspect-square cursor-pointer rounded-full border
          p-1.5 transition-colors`,
          'hover:bg-background-subtle hover:border-border-strong',
        )}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Image
          src="/linkedin.svg"
          width={20}
          height={20}
          alt=""
          aria-hidden="true"
        />
      </button>

      {/* Copy page with dropdown */}
      {page && (
        <div className="relative ml-0 min-[425px]:ml-auto" ref={dropdownRef}>
          <div className="bg-background border-border flex items-center rounded-md border">
            <button
              onClick={copyPageAsMarkdown}
              onKeyDown={(e) => handleKeyDown(e, copyPageAsMarkdown)}
              className={cn(
                `flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm font-medium
                transition-colors`,
                'border-border border-r',
                'hover:bg-background-subtle',
                `disabled:bg-background-muted disabled:text-foreground-muted
                disabled:cursor-not-allowed`,
              )}
              title={
                isCopying
                  ? 'Copying...'
                  : copiedPage
                    ? 'Copied!'
                    : 'Copy page as Markdown'
              }
              aria-label={
                isCopying
                  ? 'Copying page as Markdown'
                  : copiedPage
                    ? 'Page copied to clipboard as Markdown'
                    : 'Copy page as Markdown'
              }
              disabled={isCopying || copiedPage}
            >
              {isCopying ? (
                <p>Copying...</p>
              ) : copiedPage ? (
                <p>Copied!</p>
              ) : (
                <p>Copy Page</p>
              )}
            </button>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                } else if (e.key === 'Escape' && isDropdownOpen) {
                  setIsDropdownOpen(false);
                }
              }}
              className={cn(
                'flex cursor-pointer items-center px-2 py-2 transition-colors',
                'hover:bg-background-subtle',
              )}
              title="More options"
              aria-label="More options"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <CaretDownIcon
                className={cn(
                  'size-4 transition-transform',
                  isDropdownOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              className={cn(
                'bg-background border-border absolute top-full right-0 z-50 mt-1 min-w-[200px]',
                'rounded-md border shadow-lg',
              )}
              role="menu"
              aria-orientation="vertical"
            >
              <button
                onClick={() => {
                  viewAsMarkdown();
                  setIsDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    viewAsMarkdown();
                    setIsDropdownOpen(false);
                  } else if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  }
                }}
                className={cn(
                  'text-foreground flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm',
                  'hover:bg-background-subtle transition-colors',
                )}
                role="menuitem"
              >
                <MarkdownLogoIcon className="size-5" aria-hidden="true" />
                <span>View as Markdown</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
