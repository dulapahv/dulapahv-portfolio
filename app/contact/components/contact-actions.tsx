"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

interface ContactButton {
  label: string;
  action?: () => void | Promise<void>;
  href?: string;
  icon: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function ContactActions() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  const buttons: ContactButton[] = [
    {
      label: copiedEmail ? "Copied!" : "Copy Email",
      action: handleCopyEmail,
      icon: copiedEmail ? (
        <CheckIcon className="size-5" />
      ) : (
        <CopyIcon className="size-5" />
      ),
    },
    {
      label: "GitHub",
      href: GITHUB_URL,
      icon: (
        <ThemeAwareImage
          alt="GitHub"
          darkSrc="/octocat-white.svg"
          height={16}
          lightSrc="/octocat-black.svg"
          width={16}
        />
      ),
    },
    {
      label: "LinkedIn",
      href: LINKEDIN_URL,
      icon: (
        <Image
          alt="LinkedIn"
          className="size-5"
          height={16}
          src="/linkedin.svg"
          width={16}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {buttons.map((button) => {
        const commonClasses =
          "group relative flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm ring-1 backdrop-blur-sm cursor-pointer bg-background-elevated text-foreground ring-border hover:bg-background-muted hover:ring-border-strong";

        if (button.action) {
          return (
            <button
              aria-label={button.label}
              className={commonClasses}
              key={button.label}
              onClick={button.action}
              title={button.label}
              type="button"
            >
              <span>{button.icon}</span>
              <span>{button.label}</span>
            </button>
          );
        }
        return (
          <Link
            aria-label={button.label}
            className={commonClasses}
            href={button.href as Route}
            key={button.label}
            rel="noopener noreferrer"
            target="_blank"
            title={button.label}
          >
            <span>{button.icon}</span>
            <span>{button.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
