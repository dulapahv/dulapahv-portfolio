import type { HTMLProps } from 'react';
import Image from 'next/image';

import { MDXContent } from '@content-collections/mdx/react';
import { LinkIcon } from '@phosphor-icons/react/dist/ssr';
import Zoom from 'react-medium-image-zoom';

import { cn } from '@/lib/utils';

import { Link } from './link';
import { Pre } from './pre';

interface MdxProperties {
  readonly code: string;
}

function a(props: HTMLProps<HTMLAnchorElement>) {
  if (typeof props.href !== 'string') {
    throw new TypeError('href is required');
  }

  return (
    <Link
      className={cn('text-mirai-red underline-offset-2', 'hover:underline hover:decoration-2')}
      {...props}
    />
  );
}

function img(props: HTMLProps<HTMLImageElement>) {
  if (typeof props.src !== 'string' || typeof props.alt !== 'string') {
    throw new TypeError('Image src and alt are required');
  }

  return (
    <Zoom
      zoomMargin={12}
      wrapElement="span"
      classDialog='[&_[data-rmiz-modal-overlay="visible"]]:!bg-background/40 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-sm'
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={1240}
        height={698}
        unoptimized={props.src.startsWith('http') || props.src.endsWith('.gif')}
        className={cn(
          props.title && 'mb-2',
          'border-border bg-background-muted/30 overflow-hidden rounded-md border'
        )}
        quality={100}
      />
      {props.title && (
        <span className="text-foreground-muted block text-center text-sm">{props.title}</span>
      )}
    </Zoom>
  );
}

function createHeading(level: 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  const HeadingComponent = ({ children, id, ...props }: HTMLProps<HTMLHeadingElement>) => {
    const HeadingTag = level;
    return (
      <HeadingTag id={id} {...props} className="group relative">
        {id && (
          <Link
            href={`#${id}`}
            className={cn(
              'absolute top-1/2 -left-6 -translate-y-1/2 opacity-0',
              'group-hover:opacity-100',
              level === 'h2' && 'pt-10'
            )}
            aria-label={`Link to section: ${typeof children === 'string' ? children : 'section'}`}
            tabIndex={0}
          >
            <LinkIcon className="hidden size-4.5 shrink-0 md:block" aria-hidden="true" />
          </Link>
        )}
        {children}
      </HeadingTag>
    );
  };
  HeadingComponent.displayName = `Heading${level.toUpperCase()}`;
  return HeadingComponent;
}

export function Mdx({ code }: MdxProperties) {
  return (
    <article
      aria-label="Article content"
      className={cn(
        'mx-auto max-w-none font-medium',
        'prose prose-neutral dark:prose-invert',
        `prose-headings:mt-8 prose-headings:font-semibold prose-headings:[&>a]:text-foreground
        prose-headings:[&>a]:no-underline`,
        'prose-h1:text-3xl prose-h1:font-bold',
        `prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-t prose-h2:border-border
        prose-h2:pt-10`,
        'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
        'prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2',
        'prose-h5:text-base prose-h5:mt-4 prose-h5:mb-1',
        'prose-h6:text-sm prose-h6:mt-2 prose-h6:mb-0',
        'prose-p:my-5',
        'prose-strong:text-inherit prose-strong:font-bold',
        `prose-pre:dark:bg-[#0a0a0a] prose-pre:bg-white prose-pre:border-t-border prose-pre:text-[13px]/5
        prose-pre:px-0! prose-pre:[&>code:not([data-line-numbers])]:px-4`,
        `prose-figure:border prose-figure:border-border prose-figure:rounded-md prose-figure:my-4
        prose-figure:relative prose-figure:[figure:has(figcaption)&>pre]:rounded-t-none
        prose-figure:[figure:has(figcaption)&>pre]:border-t`,
        `prose-figcaption:dark:bg-black prose-figcaption:bg-[#fafafa] prose-figcaption:mt-0
        prose-figcaption:py-2.5 prose-figcaption:rounded-t-md prose-figcaption:px-4
        prose-figcaption:text-[13px]`,
        'prose-figure:[figure:has(figcaption)&>button]:top-1',
        `prose-blockquote:not-italic prose-blockquote:[&>p]:before:content-none
        prose-blockquote:[&>p]:after:content-none prose-blockquote:border prose-blockquote:!border-l!
        prose-blockquote:border-border! prose-blockquote:[&>p]:my-0 prose-blockquote:rounded-md
        prose-blockquote:p-3 prose-blockquote:text-sm`,
        `prose-code:before:content-none prose-code:after:content-none prose-code:dark:bg-[#0a0a0a]
        prose-code:bg-white prose-code:[&>span>span]:brightness-90
        dark:prose-code:[&>span>span]:brightness-100 prose-code:[&:not([data-theme])]:px-1
        prose-code:[&:not([data-theme])]:py-[1.5px] prose-code:[&:not([data-theme])]:bg-background-muted
        prose-code:[&:not([data-theme])]:rounded-md prose-code:[&:not([data-theme])]:tracking-wide
        prose-code:[&:not([data-theme])]:border prose-code:[&:not([data-theme])]:border-gray-500
        prose-code:[&:not([data-theme])]:font-normal prose-code:[&:not([data-theme])]:text-[13px]
        prose-code:text-foreground`,
        '[&>details>summary]:cursor-pointer [&>details>summary]:hover:underline [&>details>ul]:my-0'
      )}
    >
      <MDXContent
        code={code}
        components={{
          a,
          pre: Pre,
          img,
          h2: createHeading('h2'),
          h3: createHeading('h3'),
          h4: createHeading('h4'),
          h5: createHeading('h5'),
          h6: createHeading('h6')
        }}
      />
    </article>
  );
}
