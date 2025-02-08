'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Accordion,
  AccordionItem,
  Input,
  Link,
  Select,
  Selection,
  SelectItem,
  SelectSection,
  Spinner,
} from '@nextui-org/react';
import {
  ArrowDownWideNarrow,
  ChevronsUpDown,
  Filter,
  Search,
  Settings,
} from 'lucide-react';
import { isMobile } from 'react-device-detect';
import { useDebouncedCallback } from 'use-debounce';

import type { TagWithStacks } from '@/types/prisma';
import {
  itemsPerPageOptions,
  sortByOptions,
  typeOptions,
} from '@/lib/constants';

interface ProjectSearchToolbarProps {
  count: number;
  tags: TagWithStacks[];
}

export function ProjectSearchToolbar({
  count,
  tags,
}: ProjectSearchToolbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [isTagChanged, setIsTagChanged] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTypeLoading, setIsLocationLoading] = useState(false);
  const [isTagLoading, setIsTagLoading] = useState(false);
  const [isSortByLoading, setIsSortByLoading] = useState(false);
  const [isPerPageLoading, setIsPerPageLoading] = useState(false);

  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;
  const type = searchParams.get('type') || '';
  const tagId = searchParams.get('tagId') || '';
  const sortBy = searchParams.get('sortBy') || 'end-date-desc';

  const [perPageSelect, setPerPageSelect] = useState<Selection>(
    new Set([perPage.toString()]),
  );
  const [typeSelect, setTypeSelect] = useState<Selection>(
    type ? new Set(type.split(',')) : new Set([]),
  );
  const [tagSelect, setTagSelect] = useState<Selection>(
    tagId ? new Set(tagId.split(',')) : new Set([]),
  );
  const [sortBySelect, setSortBySelect] = useState<Selection>(
    new Set([sortBy]),
  );

  const debouncedHandleSearch = useDebouncedCallback((search: string) => {
    setIsSearchLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    search ? params.set('search', search) : params.delete('search');
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setIsSearchLoading(false);
    setIsLocationLoading(false);
    setIsTagLoading(false);
    setIsSortByLoading(false);
    setIsPerPageLoading(false);
  }, [searchParams]);

  const handleSearchValueChange = useCallback(
    (str: string) => {
      setSearch(str);
      debouncedHandleSearch(str);
    },
    [debouncedHandleSearch],
  );

  const handleClear = useCallback(
    () => handleSearchValueChange(''),
    [handleSearchValueChange],
  );

  const handlePerPageChange = useCallback(
    (value: Selection) => {
      setPerPageSelect(value);
      setIsPerPageLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      params.set('perPage', Array.from(value)[0].toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleTypeChange = useCallback(
    (value: Selection) => {
      setTypeSelect(value);
      setIsLocationLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      Array.from(value).length === 0
        ? params.delete('type')
        : params.set('type', Array.from(value).join(','));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleTagChange = useCallback(() => {
    if (!isTagChanged) return;
    const params = new URLSearchParams(searchParams);
    if (!params.get('tagId') && Array.from(tagSelect).length === 0) return;
    setIsTagLoading(true);
    params.set('page', '1');
    Array.from(tagSelect).length === 0
      ? params.delete('tagId')
      : params.set('tagId', Array.from(tagSelect).join(','));
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, tagSelect, pathname, router]);

  const handleClearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (Array.from(typeSelect).length > 0) {
      setIsLocationLoading(true);
      setTypeSelect(new Set([]));
      params.delete('type');
    }
    if (Array.from(tagSelect).length > 0) {
      setIsTagLoading(true);
      setTagSelect(new Set([]));
      params.delete('tagId');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleSortByChange = useCallback(
    (value: Selection) => {
      setSortBySelect(value);
      setIsSortByLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      params.set('sortBy', Array.from(value)[0].toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const startContent = useMemo(() => {
    return isSearchLoading ? (
      <Spinner
        size="sm"
        classNames={{
          base: 'w-[18px]',
          circle1: 'border-b-primary',
          circle2: 'border-b-primary',
        }}
      />
    ) : (
      <Search
        size={20}
        className="pointer-events-none flex-shrink-0 text-default-400"
      />
    );
  }, [isSearchLoading]);

  const showingText = useMemo(() => {
    const start = Math.min((page - 1) * perPage + 1, count);
    const end = Math.min(page * perPage, count);

    return (
      <p className="order-2 text-sm text-default-800 min-[425px]:order-1">
        Showing <span>{start}</span> - <span>{end}</span> of{' '}
        <span>{count}</span>
      </p>
    );
  }, [count, page, perPage]);

  return (
    <>
      <Input
        type="text"
        placeholder="Search for title, description, or related locations..."
        size="md"
        radius="sm"
        autoFocus={!isMobile}
        isClearable
        value={search}
        onValueChange={handleSearchValueChange}
        onClear={handleClear}
        startContent={startContent}
        classNames={{
          inputWrapper:
            'data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-transparent data-[focus-visible=true]:!ring-offset-0',
        }}
      />
      <Accordion
        isCompact
        defaultExpandedKeys={
          tagId || sortBy !== 'end-date-desc' ? ['1'] : undefined
        }
        className="px-0"
      >
        <AccordionItem
          key="1"
          aria-label="Advanced Options"
          title="Advanced Options"
          startContent={<Settings size={20} className="text-default-600" />}
          classNames={{
            title: 'text-sm text-default-700',
            trigger:
              '[&>div>*]:data-[hover=true]:text-primary [&>div>*]:duration-100',
            indicator: 'text-primary',
          }}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <div className="flex items-center gap-x-1.5">
              <Filter size={20} className="text-default-400" />
              <p className="text-sm">Filter by</p>
            </div>
            <div className="ml-6 flex flex-col gap-2 md:ml-0 md:flex-row">
              <Select
                selectedKeys={typeSelect}
                onSelectionChange={handleTypeChange}
                placeholder="Type"
                items={typeOptions}
                isLoading={isTypeLoading}
                aria-label="Type"
                color="primary"
                variant="underlined"
                size="sm"
                disableSelectorIconRotation
                scrollShadowProps={{
                  isEnabled: false,
                }}
                selectorIcon={
                  <ChevronsUpDown size={20} className="text-default-400" />
                }
                classNames={{
                  base: 'w-full md:w-fit items-center',
                  label: 'text-sm',
                  mainWrapper: 'md:w-64',
                  value: 'text-default-800',
                }}
                popoverProps={{
                  classNames: {
                    content:
                      'rounded-lg px-1 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] backdrop-filter border border-default-50',
                  },
                }}
                listboxProps={{
                  itemClasses: {
                    base: 'rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50',
                    selectedIcon: 'text-primary',
                  },
                }}
                spinnerProps={{
                  classNames: {
                    base: 'w-[18px]',
                    circle1: 'border-b-primary',
                    circle2: 'border-b-primary',
                  },
                }}
              >
                {(type) => <SelectItem key={type.key}>{type.label}</SelectItem>}
              </Select>
              <Select
                selectedKeys={tagSelect}
                onSelectionChange={(keys) => {
                  setIsTagChanged(true);
                  setTagSelect(keys);
                }}
                placeholder="Tags"
                onClose={handleTagChange}
                items={tags}
                isLoading={isTagLoading}
                aria-label="Tags"
                color="primary"
                variant="underlined"
                size="sm"
                selectionMode="multiple"
                disableSelectorIconRotation
                scrollShadowProps={{
                  isEnabled: false,
                }}
                selectorIcon={
                  <ChevronsUpDown size={20} className="text-default-400" />
                }
                classNames={{
                  base: 'w-full md:w-fit items-center',
                  label: 'text-sm',
                  mainWrapper: 'md:w-64',
                  value: 'text-default-800',
                }}
                popoverProps={{
                  classNames: {
                    content:
                      'rounded-lg px-1 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] backdrop-filter border border-default-50',
                  },
                }}
                listboxProps={{
                  itemClasses: {
                    base: 'rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50',
                    selectedIcon: 'text-primary',
                  },
                }}
                spinnerProps={{
                  classNames: {
                    base: 'w-[18px]',
                    circle1: 'border-b-primary',
                    circle2: 'border-b-primary',
                  },
                }}
                renderValue={(items) => (
                  <>
                    Tags ({Array.from(tagSelect).length}/
                    {tags.flatMap((tag) => tag.stacks).length})
                  </>
                )}
              >
                {(tag) => (
                  <SelectSection
                    key={tag.id}
                    title={tag.name}
                    classNames={{
                      heading:
                        'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-50 shadow-small rounded-md',
                    }}
                  >
                    {tag.stacks.map((stack) => (
                      <SelectItem key={stack.id}>{stack.name}</SelectItem>
                    ))}
                  </SelectSection>
                )}
              </Select>
            </div>
          </div>
          <Link
            onPress={handleClearAll}
            underline="hover"
            className="ml-6 w-fit cursor-pointer text-xs text-default-500"
          >
            Reset all filters
          </Link>
          <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center">
            <div className="flex items-center gap-x-1.5">
              <ArrowDownWideNarrow size={20} className="text-default-400" />
              <p className="text-sm">Sort by</p>
            </div>
            <div className="ml-6 flex flex-col gap-2 md:ml-0 md:flex-row">
              <Select
                selectedKeys={sortBySelect}
                onSelectionChange={handleSortByChange}
                items={sortByOptions}
                isLoading={isSortByLoading}
                disallowEmptySelection
                aria-label="Sort by"
                color="primary"
                variant="underlined"
                size="sm"
                disableSelectorIconRotation
                selectorIcon={
                  <ChevronsUpDown size={20} className="text-default-400" />
                }
                classNames={{
                  base: 'w-fit items-center',
                  label: 'text-sm',
                  mainWrapper: 'w-48',
                  value: 'text-default-800',
                }}
                popoverProps={{
                  classNames: {
                    content:
                      'rounded-lg px-1 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] backdrop-filter border border-default-50',
                  },
                }}
                listboxProps={{
                  itemClasses: {
                    base: 'rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50',
                    selectedIcon: 'text-primary',
                  },
                }}
                spinnerProps={{
                  classNames: {
                    base: 'w-[18px]',
                    circle1: 'border-b-primary',
                    circle2: 'border-b-primary',
                  },
                }}
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
      <div
        className="flex flex-col justify-between gap-y-1 min-[425px]:flex-row
          min-[425px]:items-center"
      >
        {showingText}
        <Select
          label="Items per page"
          selectedKeys={perPageSelect}
          onSelectionChange={handlePerPageChange}
          items={itemsPerPageOptions}
          isLoading={isPerPageLoading}
          disallowEmptySelection
          color="primary"
          variant="underlined"
          size="sm"
          labelPlacement="outside-left"
          disableSelectorIconRotation
          selectorIcon={
            <ChevronsUpDown size={20} className="text-default-400" />
          }
          classNames={{
            base: 'w-fit items-center order-1 min-[425px]:order-2',
            label: 'text-sm text-default-800',
            mainWrapper: 'w-20',
            value: 'text-default-800',
          }}
          popoverProps={{
            classNames: {
              content:
                'rounded-lg px-1 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] backdrop-filter border border-default-50',
            },
          }}
          listboxProps={{
            itemClasses: {
              base: 'rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50',
              selectedIcon: 'text-primary',
            },
          }}
          spinnerProps={{
            classNames: {
              base: 'w-[18px]',
              circle1: 'border-b-primary',
              circle2: 'border-b-primary',
            },
          }}
        >
          {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </Select>
      </div>
    </>
  );
}
