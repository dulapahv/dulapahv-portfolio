"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
} from "@nextui-org/react";
import { isMobile } from "react-device-detect";
import { LuFilter, LuSearch } from "react-icons/lu";
import { MdSort } from "react-icons/md";
import { PiGearBold } from "react-icons/pi";
import { TbSelector } from "react-icons/tb";
import { useDebouncedCallback } from "use-debounce";

import type { City, Country, Stack, Tag } from "@prisma/client";

interface CountriesWithCities extends Country {
  cities: City[];
}

interface TagWithStacks extends Tag {
  stacks: Stack[];
}

interface SearchToolbarProps {
  count: number;
  countries: CountriesWithCities[];
  tags: TagWithStacks[];
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const itemsPerPageOptions = [
  { key: "5", label: "5" },
  { key: "10", label: "10" },
  { key: "15", label: "15" },
];

const sortByOptions = [
  { key: "start-date-asc", label: "Start date (oldest)" },
  { key: "start-date-desc", label: "Start date (newest)" },
  { key: "end-date-asc", label: "End date (oldest)" },
  { key: "end-date-desc", label: "End date (newest)" },
];

const ExperienceSearchToolbar = ({
  count,
  countries,
  tags,
}: SearchToolbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [isTagChanged, setIsTagChanged] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isTagLoading, setIsTagLoading] = useState(false);
  const [isSortByLoading, setIsSortByLoading] = useState(false);
  const [isPerPageLoading, setIsPerPageLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 5;
  const locationId = searchParams.get("locationId") || "";
  const tagId = searchParams.get("tagId") || "";
  const sortBy = searchParams.get("sortBy") || "end-date-desc";

  const [perPageSelect, setPerPageSelect] = useState<Selection>(
    new Set([perPage.toString()]),
  );
  const [locationSelect, setLocationSelect] = useState<Selection>(
    locationId ? new Set(locationId.split(",")) : new Set([]),
  );
  const [tagSelect, setTagSelect] = useState<Selection>(
    tagId ? new Set(tagId.split(",")) : new Set([]),
  );
  const [sortBySelect, setSortBySelect] = useState<Selection>(
    new Set([sortBy]),
  );

  const debouncedHandleSearch = useDebouncedCallback((search: string) => {
    setIsSearchLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    search ? params.set("search", search) : params.delete("search");
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
    () => handleSearchValueChange(""),
    [handleSearchValueChange],
  );

  const handlePerPageChange = useCallback(
    (value: Selection) => {
      setPerPageSelect(value);
      setIsPerPageLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("perPage", Array.from(value)[0].toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleLocationChange = useCallback(() => {
    if (!isLocationChanged) return;
    const params = new URLSearchParams(searchParams);
    if (!params.get("locationId") && Array.from(locationSelect).length === 0)
      return;
    setIsLocationLoading(true);
    params.set("page", "1");
    Array.from(locationSelect).length === 0
      ? params.delete("locationId")
      : params.set("locationId", Array.from(locationSelect).join(","));
    router.push(`${pathname}?${params.toString()}`);
    setIsLocationChanged(false);
  }, [isLocationChanged, searchParams, locationSelect, pathname, router]);

  const handleTagChange = useCallback(() => {
    if (!isTagChanged) return;
    const params = new URLSearchParams(searchParams);
    if (!params.get("tagId") && Array.from(tagSelect).length === 0) return;
    setIsTagLoading(true);
    params.set("page", "1");
    Array.from(tagSelect).length === 0
      ? params.delete("tagId")
      : params.set("tagId", Array.from(tagSelect).join(","));
    router.push(`${pathname}?${params.toString()}`);
    setIsLocationChanged(false);
  }, [isLocationChanged, searchParams, tagSelect, pathname, router]);

  const handleClearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (Array.from(locationSelect).length > 0) {
      setIsLocationLoading(true);
      setLocationSelect(new Set([]));
      params.delete("locationId");
    }
    if (Array.from(tagSelect).length > 0) {
      setIsTagLoading(true);
      setTagSelect(new Set([]));
      params.delete("tagId");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleSortByChange = useCallback(
    (value: Selection) => {
      setSortBySelect(value);
      setIsSortByLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("sortBy", Array.from(value)[0].toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const startContent = useMemo(() => {
    return isSearchLoading ? (
      <Spinner
        size="sm"
        classNames={{
          base: "w-[18px]",
          circle1: "border-b-primary",
          circle2: "border-b-primary",
        }}
      />
    ) : (
      <LuSearch className="pointer-events-none flex-shrink-0 text-lg text-default-400" />
    );
  }, [isSearchLoading]);

  const showingText = useMemo(() => {
    if (count === 0) {
      if (search) {
        return (
          <p className={`text-default-500 ${poppins.className}`}>
            No results found for{" "}
            <span className="text-default-800">&quot;{search}&quot;</span>.
          </p>
        );
      }
      return (
        <p className={`text-default-500 ${poppins.className}`}>
          No experience to show.
        </p>
      );
    }

    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, count);

    return (
      <p
        className={`order-2 text-sm text-default-800 min-[425px]:order-1 ${poppins.className}`}
      >
        Showing <span>{start}</span> - <span>{end}</span> of{" "}
        <span>{count}</span>
      </p>
    );
  }, [count, page, perPage, search]);

  return (
    <>
      <Input
        type="text"
        placeholder="Search for position, company, or location..."
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
            "data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-transparent data-[focus-visible=true]:!ring-offset-0",
          input: "font-medium",
        }}
      />
      <Accordion isCompact className="px-0">
        <AccordionItem
          key="1"
          aria-label="Advanced Options"
          title="Advanced Options"
          startContent={<PiGearBold className="text-xl text-default-600" />}
          classNames={{
            title: `${poppins.className} text-sm font-medium text-default-700`,
            trigger:
              "[&>div>*]:data-[hover=true]:text-primary [&>div>*]:duration-100",
            indicator: "text-primary",
          }}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <div className="flex items-center gap-x-1.5">
              <LuFilter className="text-lg text-default-400" />
              <p className="text-sm font-medium">Filter by</p>
            </div>
            <div className="ml-6 flex flex-col gap-2 md:ml-0 md:flex-row">
              <Select
                selectedKeys={locationSelect}
                onSelectionChange={(keys) => {
                  setIsLocationChanged(true);
                  setLocationSelect(keys);
                }}
                placeholder="Location"
                onClose={handleLocationChange}
                items={countries}
                isLoading={isLocationLoading}
                aria-label="Location"
                color="primary"
                variant="underlined"
                size="sm"
                selectionMode="multiple"
                disableSelectorIconRotation
                scrollShadowProps={{
                  isEnabled: false,
                }}
                selectorIcon={<TbSelector className="text-default-400" />}
                classNames={{
                  base: `w-full md:w-fit items-center ${poppins.className}`,
                  label: "text-sm",
                  mainWrapper: "md:w-64",
                  value: "text-default-800",
                  listbox: poppins.className,
                }}
                popoverProps={{
                  classNames: {
                    content:
                      "rounded-lg px-1 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm [-webkit-backdrop-filter:blur(4px)] backdrop-filter border-1 border-default-50",
                  },
                }}
                listboxProps={{
                  itemClasses: {
                    base: "rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50",
                    selectedIcon: "text-primary",
                  },
                }}
                spinnerProps={{
                  classNames: {
                    base: "w-[18px]",
                    circle1: "border-b-primary",
                    circle2: "border-b-primary",
                  },
                }}
                renderValue={(items) => (
                  <>
                    Location ({Array.from(locationSelect).length}/
                    {countries.flatMap((country) => country.cities).length})
                  </>
                )}
              >
                {(country) => (
                  <SelectSection
                    key={country.id}
                    title={country.name}
                    classNames={{
                      heading:
                        "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-50 shadow-small rounded-md",
                    }}
                  >
                    {country.cities.map((city) => (
                      <SelectItem key={city.id}>{city.name}</SelectItem>
                    ))}
                  </SelectSection>
                )}
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
                selectorIcon={<TbSelector className="text-default-400" />}
                classNames={{
                  base: `w-full md:w-fit items-center ${poppins.className}`,
                  label: "text-sm",
                  mainWrapper: "md:w-64",
                  value: "text-default-800",
                  listbox: poppins.className,
                }}
                popoverProps={{
                  classNames: {
                    content:
                      "rounded-lg px-1 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm [-webkit-backdrop-filter:blur(4px)] backdrop-filter border-1 border-default-50",
                  },
                }}
                listboxProps={{
                  itemClasses: {
                    base: "rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50",
                    selectedIcon: "text-primary",
                  },
                }}
                spinnerProps={{
                  classNames: {
                    base: "w-[18px]",
                    circle1: "border-b-primary",
                    circle2: "border-b-primary",
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
                        "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-50 shadow-small rounded-md",
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
            className={`ml-6 w-fit cursor-pointer text-xs text-default-500 ${poppins.className}`}
          >
            Reset all filters
          </Link>
          <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center">
            <div className="flex items-center gap-x-1.5">
              <MdSort className="text-xl text-default-400" />
              <p className="text-sm font-medium">Sort by</p>
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
                selectorIcon={<TbSelector className="text-default-400" />}
                classNames={{
                  base: `w-fit items-center ${poppins.className}`,
                  label: "text-sm",
                  mainWrapper: "w-48",
                  value: "text-default-800",
                  listbox: poppins.className,
                }}
                popoverProps={{
                  classNames: {
                    content:
                      "rounded-lg px-1 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm [-webkit-backdrop-filter:blur(4px)] backdrop-filter border-1 border-default-50",
                  },
                }}
                listboxProps={{
                  itemClasses: {
                    base: "rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50",
                    selectedIcon: "text-primary",
                  },
                }}
                spinnerProps={{
                  classNames: {
                    base: "w-[18px]",
                    circle1: "border-b-primary",
                    circle2: "border-b-primary",
                  },
                }}
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col justify-between gap-y-1 min-[425px]:flex-row min-[425px]:items-center">
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
          selectorIcon={<TbSelector className="text-default-400" />}
          classNames={{
            base: `w-fit items-center order-1 min-[425px]:order-2 ${poppins.className}`,
            label: "text-sm",
            mainWrapper: "w-20",
            value: "text-default-800",
            listbox: poppins.className,
          }}
          popoverProps={{
            classNames: {
              content:
                "rounded-lg px-1 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm [-webkit-backdrop-filter:blur(4px)] backdrop-filter border-1 border-default-50",
            },
          }}
          listboxProps={{
            itemClasses: {
              base: "rounded-md dark:data-[hover=true]:bg-zinc-800/50 data-[hover=true]:bg-zinc-200/50 dark:focus:!bg-zinc-800/50 focus:!bg-zinc-200/50",
              selectedIcon: "text-primary",
            },
          }}
          spinnerProps={{
            classNames: {
              base: "w-[18px]",
              circle1: "border-b-primary",
              circle2: "border-b-primary",
            },
          }}
        >
          {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </Select>
      </div>
    </>
  );
};

export default ExperienceSearchToolbar;
