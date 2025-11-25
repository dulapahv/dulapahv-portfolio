'use client';

/* Honestly, this is a bit of a mess. */
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { ArrowCircleUpIcon, CaretDownIcon } from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [lockActiveId, setLockActiveId] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1350px)');
  const tocRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Handle scroll visibility for scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTOC = () => {
      const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
      const newTocItems = headings.map(el => ({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1])
      }));
      setTocItems(newTocItems);
      setIsLoading(false);

      // Reset links ref array
      linksRef.current = new Array(newTocItems.length).fill(null);

      // Only set initial active ID if we don't have one yet
      setActiveId(currentActiveId => {
        if (currentActiveId === '' && newTocItems.length > 0) {
          const hash = window.location.hash.replace('#', '');
          if (hash && newTocItems.some(item => item.id === hash)) {
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

    const observer = new MutationObserver(mutations => {
      // Check if the mutation is just a button state change
      const isButtonChange = mutations.some(mutation => {
        const target = mutation.target as HTMLElement;
        return (
          target.closest('button') ||
          (mutation.type === 'attributes' && mutation.attributeName === 'disabled') ||
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
      attributeFilter: ['disabled']
    });

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting && !lockActiveId) {
            setActiveId(id ?? '');
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 1 }
    );

    const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
    headings.forEach(heading => {
      // Make headings focusable for proper tab navigation
      if (!heading.hasAttribute('tabindex')) {
        heading.setAttribute('tabindex', '-1');
      }
      sectionObserver.observe(heading);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [lockActiveId]);

  const scrollToElement = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
        setActiveId(id);
        setLockActiveId(true);
        setTimeout(() => setLockActiveId(false), 500);

        // Focus the target heading for screen readers after scroll completes
        element.focus({ preventScroll: true });
      }
    },
    [isDesktop]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, id: string, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        scrollToElement(id);
        break;
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        const nextIndex = Math.min(index + 1, tocItems.length - 1);
        linksRef.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        const prevIndex = Math.max(index - 1, 0);
        linksRef.current[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        e.stopPropagation();
        linksRef.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        e.stopPropagation();
        const lastIndex = tocItems.length - 1;
        linksRef.current[lastIndex]?.focus();
        break;
    }
  };

  // Show loading state while scanning for headings
  if (isLoading) {
    return (
      <div
        className="border-border bg-background-elevated/50 text-foreground-muted flex w-full items-center rounded-md
          border px-4 py-3 text-sm backdrop-blur-sm xl:hidden"
      >
        Loading table of contents...
      </div>
    );
  }

  // Don't render if there are no headings
  if (tocItems.length === 0) {
    return null;
  }

  // Desktop view - fixed sidebar
  if (isDesktop) {
    return (
      <nav
        className="fixed top-18 left-[calc(100vw/2+424px)] z-40 hidden w-56 xl:block"
        aria-label="Table of contents"
        role="navigation"
        ref={tocRef}
      >
        <h2 className="text-foreground px-3 text-sm font-semibold">On this page</h2>
        <div
          className="max-h-[calc(100vh-16rem)] overflow-y-auto py-2"
          role="group"
          aria-label="Page sections - use arrow keys to navigate"
        >
          <ul className="space-y-1" role="list">
            {tocItems.map((item, index) => (
              <li key={item.id} className="mb-0">
                <Link
                  ref={el => {
                    linksRef.current[index] = el;
                  }}
                  href={`#${item.id}`}
                  onClick={e => handleClick(e, item.id)}
                  onKeyDown={e => handleKeyDown(e, item.id, index)}
                  className={cn(
                    'group relative block rounded-md px-3 py-1 text-sm transition-all',
                    item.level === 3 ? 'pl-7' : '',
                    activeId === item.id ? 'text-mirai-red' : 'text-foreground-muted',
                    activeId !== item.id && 'hover:text-foreground'
                  )}
                  aria-current={activeId === item.id ? 'location' : undefined}
                  aria-describedby={activeId === item.id ? `current-section-${index}` : undefined}
                >
                  <span
                    className={cn(
                      'absolute top-1/2 left-0 h-full w-0.5 -translate-y-1/2 transition-all',
                      activeId === item.id ? 'bg-mirai-red' : 'bg-white/80 dark:bg-neutral-300/80'
                    )}
                    aria-hidden="true"
                  />
                  <span className="relative line-clamp-2">{item.text}</span>
                  {activeId === item.id && (
                    <span id={`current-section-${index}`} className="sr-only">
                      (current section)
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 px-3"
            >
              <button
                onClick={scrollToTop}
                className={cn(
                  'text-foreground-muted flex w-full cursor-pointer items-center gap-x-1.5 rounded-md text-sm',
                  'hover:text-foreground transition-colors'
                )}
                aria-label="Scroll to top of page"
              >
                <span>Scroll to top</span>
                <ArrowCircleUpIcon className="size-4.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // Mobile view - collapsible at top
  return (
    <nav
      className="border-border bg-background-elevated/50 rounded-md border backdrop-blur-sm"
      aria-label="Table of contents"
      role="navigation"
      ref={tocRef}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          `text-foreground flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm
          font-semibold transition-colors`,
          'hover:bg-background-muted/50'
        )}
        aria-expanded={!isCollapsed}
        aria-controls="toc-content"
        aria-describedby="toc-description"
      >
        <span>On this page</span>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <CaretDownIcon className="size-4" />
        </motion.div>
      </button>
      <span id="toc-description" className="sr-only">
        Toggle to {isCollapsed ? 'show' : 'hide'} table of contents with {tocItems.length} sections.
        Use arrow keys to navigate when expanded.
      </span>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            id="toc-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
            role="group"
            aria-label="Page sections - use arrow keys to navigate"
          >
            <div className="p-2">
              <ul role="list" className="my-0! list-none pl-0">
                {tocItems.map((item, index) => (
                  <li key={item.id} className="my-0!">
                    <Link
                      ref={el => {
                        linksRef.current[index] = el;
                      }}
                      href={`#${item.id}`}
                      onClick={e => handleClick(e, item.id)}
                      onKeyDown={e => handleKeyDown(e, item.id, index)}
                      className={cn(
                        'text-foreground-muted block rounded-md px-3 py-1.5 text-sm transition-all',
                        'hover:text-foreground',
                        item.level === 3 ? 'pl-7' : ''
                      )}
                      aria-current={activeId === item.id ? 'location' : undefined}
                      aria-describedby={
                        activeId === item.id ? `current-section-mobile-${index}` : undefined
                      }
                    >
                      <span className="line-clamp-2">{item.text}</span>
                      {activeId === item.id && (
                        <span id={`current-section-mobile-${index}`} className="sr-only">
                          (current section)
                        </span>
                      )}
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
}
