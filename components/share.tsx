'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import {
  CheckIcon,
  LinkSimpleHorizontalIcon,
} from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';

import { ThemeAwareImage } from './theme-aware-image';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const popupRefs = useRef<{ [key: string]: Window | null }>({
    X: null,
    facebook: null,
    linkedin: null,
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
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
      {/* Copy Link Button */}
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
    </div>
  );
}
