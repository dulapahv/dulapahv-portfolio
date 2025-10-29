'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MESSAGE = 'Changes you made may not be saved.';

export function useOnLeavePageConfirmation(shouldConfirm: boolean) {
  const pathname = usePathname();
  const router = useRouter();

  const isInitialMount = useRef(true);

  // Handle refresh or close tab/window
  useEffect(() => {
    if (!shouldConfirm) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
    }

    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [shouldConfirm]);

  // Handle back/forward browser buttons
  useEffect(() => {
    if (!shouldConfirm) return;

    const handleBackButton = () => {
      if (!window.confirm(MESSAGE)) history.pushState(null, '', window.location.href);
      else {
        window.removeEventListener('popstate', handleBackButton);
        history.back();
        // When user clicks back after refreshing the page with unsaved changes
        setTimeout(() => {
          if (window.location.pathname === pathname) router.back();
        }, 0);
      }
    };

    // Push initial state to history to detect back navigation
    if (isInitialMount.current) {
      history.pushState(null, '', window.location.href);
      isInitialMount.current = false;
    }

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [shouldConfirm, pathname]);

  // Handle Next.js Link navigation
  useEffect(() => {
    if (!shouldConfirm) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const targetUrl = new URL(anchor.href);
        const currentPath = pathname;

        if (targetUrl.pathname !== currentPath) {
          if (!window.confirm(MESSAGE)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [shouldConfirm, pathname]);
}
