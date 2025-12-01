'use client';

import { useState } from 'react';
import Image from 'next/image';

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr';

import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';
import { ThemeAwareImage } from '@/components/theme-aware-image';

interface ContactButton {
  label: string;
  action?: () => void | Promise<void>;
  href?: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function ContactActions() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const buttons: ContactButton[] = [
    {
      label: copiedEmail ? 'Copied!' : 'Copy Email',
      action: handleCopyEmail,
      icon: copiedEmail ? <CheckIcon className="size-5" /> : <CopyIcon className="size-5" />
    },
    {
      label: 'GitHub',
      href: GITHUB_URL,
      icon: (
        <ThemeAwareImage
          darkSrc="/octocat-white.svg"
          lightSrc="/octocat-black.svg"
          alt="GitHub"
          width={16}
          height={16}
        />
      )
    },
    {
      label: 'LinkedIn',
      href: LINKEDIN_URL,
      icon: <Image src="/linkedin.svg" alt="LinkedIn" className="size-5" width={16} height={16} />
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {buttons.map(button => {
        const commonClasses =
          'group relative flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm transition-all duration-200 ring-1 backdrop-blur-sm cursor-pointer bg-background-elevated text-foreground ring-border hover:bg-background-muted hover:ring-border-strong';

        if (button.action) {
          return (
            <button
              key={button.label}
              onClick={button.action}
              title={button.label}
              className={commonClasses}
              aria-label={button.label}
            >
              <span>{button.icon}</span>
              <span>{button.label}</span>
            </button>
          );
        }
        return (
          <a
            key={button.label}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            title={button.label}
            className={commonClasses}
            aria-label={button.label}
          >
            <span>{button.icon}</span>
            <span>{button.label}</span>
          </a>
        );
      })}
    </div>
  );
}
