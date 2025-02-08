'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { NextUIProvider } from '@nextui-org/react';
import { useTheme } from 'next-themes';

import { updateMetaThemeColor } from '@/utils/update-meta-theme-color';

export * from '@nextui-org/react';

interface ProvidersProps {
  children: React.ReactNode;
  className?: string;
}

export function Providers({ children, className }: ProvidersProps) {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    updateMetaThemeColor((theme as 'dark' | 'light' | 'system') || 'dark');
  }, []);

  useEffect(() => {
    updateMetaThemeColor((theme as 'dark' | 'light' | 'system') || 'dark');
  }, [theme]);

  return (
    <NextUIProvider navigate={router.push} className={className}>
      {children}
    </NextUIProvider>
  );
}
