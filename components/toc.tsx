'use client';

/* Honestly, this is a bit of a mess. */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [lockActiveId, setLockActiveId] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const isDesktop = useMediaQuery('(min-width: 1280px)'); // xl breakpoint

  useEffect(() => {
    const updateTOC = () => {
      const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
      const newTocItems = headings.map((el) => ({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      }));
      setTocItems(newTocItems);

      // Only set initial active ID if we don't have one yet
      setActiveId((currentActiveId) => {
        if (currentActiveId === '' && newTocItems.length > 0) {
          const hash = window.location.hash.replace('#', '');
          if (hash && newTocItems.some((item) => item.id === hash)) {
            return hash;
          } else {
            return newTocItems[0].id;
          }
        }
        return currentActiveId;
      });
    };

    updateTOC();

    const mdxContainer = document.querySelector('article');
    if (!mdxContainer) return;

    const observer = new MutationObserver((mutations) => {
      // Check if the mutation is just a button state change
      const isButtonChange = mutations.some((mutation) => {
        const target = mutation.target as HTMLElement;
        return (
          target.closest('button') ||
          (mutation.type === 'attributes' &&
            mutation.attributeName === 'disabled') ||
          (mutation.type === 'childList' && target.querySelector('svg'))
        );
      });

      // Only update TOC for structural changes, not button state changes
      if (!isButtonChange) {
        updateTOC();
      }
    });

    observer.observe(mdxContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting && !lockActiveId) {
            setActiveId(id ?? '');
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 1 },
    );

    const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
    headings.forEach((heading) => sectionObserver.observe(heading));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [lockActiveId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
      setActiveId(id); // Manually set activeId when user clicks
      setLockActiveId(true);
      setTimeout(() => setLockActiveId(false), 500); // Unlock after scrolling completes

      // Collapse TOC on mobile after clicking
      // if (!isDesktop) {
      //   setIsCollapsed(true);
      // }
    }
  };

  // Desktop view - fixed sidebar
  if (isDesktop) {
    return (
      <nav
        className="fixed top-18 right-0 z-40 hidden w-56 xl:block 2xl:right-40"
        aria-label="Table of contents"
      >
        <h2 className="text-foreground px-3 text-sm font-semibold">
          On this page
        </h2>
        <div className="overflow-y-auto py-2">
          <ul className="space-y-1" role="list">
            {tocItems.map((item) => (
              <li key={item.id} className="mb-0">
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    'group relative block rounded-md px-3 py-1 text-sm transition-all',
                    item.level === 3 ? 'pl-7' : '',
                    activeId === item.id
                      ? 'text-mirai-red font-medium'
                      : 'text-foreground-muted hover:text-foreground',
                  )}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  <span
                    className={cn(
                      'absolute top-1/2 left-0 h-full w-0.5 -translate-y-1/2 transition-all',
                      activeId === item.id
                        ? 'bg-mirai-red'
                        : 'bg-background-subtle',
                    )}
                    aria-hidden="true"
                  />
                  <span className="relative line-clamp-2">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  // Mobile view - collapsible at top
  return (
    <nav
      className="border-border bg-background-elevated/50 mb-8 rounded-lg border backdrop-blur-sm
        xl:hidden"
      aria-label="Table of contents"
    >
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-foreground hover:bg-background-muted/50 flex w-full items-center
          justify-between rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors"
        aria-expanded={!isCollapsed}
        aria-controls="toc-content"
      >
        <span>On this page</span>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            id="toc-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-2">
              <ul role="list" className="!my-0 list-none pl-0">
                {tocItems.map((item) => (
                  <li key={item.id} className="!my-0">
                    <Link
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(e, item.id)}
                      className={cn(
                        `text-foreground-muted hover:text-foreground block rounded-md px-3 py-1.5 text-sm
                        transition-all`,
                        item.level === 3 ? 'pl-6' : '',
                      )}
                      aria-current={
                        activeId === item.id ? 'location' : undefined
                      }
                    >
                      <span className="line-clamp-2">{item.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
