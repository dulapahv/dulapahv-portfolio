"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
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
import { TbSelector } from "react-icons/tb";
import { useDebouncedCallback } from "use-debounce";

import type { City, Country, Place } from "@prisma/client";

interface PlaceWithCityAndCountry extends Place {
  city: City & {
    country: Country;
  };
}

interface SearchToolbarProps {
  count: number;
  places: PlaceWithCityAndCountry[];
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

const SearchToolbar = ({ count, places }: SearchToolbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isSortByLoading, setIsSortByLoading] = useState(false);
  const [isPerPageLoading, setIsPerPageLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per-page")) || 10;
  const locationId = searchParams.get("location-id") || "";
  const sortBy = searchParams.get("sort-by") || "end-date-desc";

  const [perPageSelect, setPerPageSelect] = useState<Selection>(
    new Set([perPage.toString()]),
  );
  const [locationSelect, setLocationSelect] = useState<Selection>(
    locationId ? new Set(locationId.split(",")) : new Set([]),
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
      params.set("per-page", Array.from(value)[0].toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleLocationChange = useCallback(() => {
    if (!isLocationChanged) return;
    setIsLocationLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    Array.from(locationSelect).length === 0
      ? params.delete("location-id")
      : params.set("location-id", Array.from(locationSelect).join(","));
    router.push(`${pathname}?${params.toString()}`);
    setIsLocationChanged(false);
  }, [isLocationChanged, searchParams, locationSelect, pathname, router]);

  const handleClearAll = useCallback(() => {
    if (!search && Array.from(locationSelect).length === 0) return;
    setIsLocationLoading(true);
    setLocationSelect(new Set([]));
    // setSortBySelect(new Set(["end-date-desc"]));
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("location-id");
    // params.delete("sort-by");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleSortByChange = useCallback(
    (value: Selection) => {
      setSortBySelect(value);
      setIsSortByLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("sort-by", Array.from(value)[0].toString());
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
      <p className={`text-sm text-default-800 ${poppins.className}`}>
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
      <div className="mt-2 flex flex-col gap-1.5 md:flex-row md:items-center">
        <span className="flex gap-x-1.5 text-sm font-medium">
          <LuFilter className="text-lg text-default-400" /> Filter by
        </span>
        <Select
          selectedKeys={locationSelect}
          onSelectionChange={(keys) => {
            setIsLocationChanged(true);
            setLocationSelect(keys);
          }}
          placeholder="Location"
          onClose={handleLocationChange}
          items={places.map((place) => place.city)}
          isLoading={isLocationLoading}
          aria-label="Location"
          color="primary"
          variant="underlined"
          size="sm"
          selectionMode="multiple"
          disableSelectorIconRotation
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
              content: "rounded-lg px-1",
            },
          }}
          listboxProps={{
            itemClasses: {
              base: "rounded-md",
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
              Location ({Array.from(locationSelect).length}/{places.length})
            </>
          )}
        >
          {(city) => (
            <SelectSection
              key={city.id}
              title={city.country.name}
              classNames={{
                heading:
                  "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small",
              }}
            >
              <SelectItem key={city.id}>{city.name}</SelectItem>
            </SelectSection>
          )}
        </Select>
        <Select
          selectedKeys={locationSelect}
          onSelectionChange={(keys) => {
            setIsLocationChanged(true);
            setLocationSelect(keys);
          }}
          placeholder="Tags"
          onClose={handleLocationChange}
          items={places.map((place) => place.city)}
          isLoading={isLocationLoading}
          aria-label="Location"
          color="primary"
          variant="underlined"
          size="sm"
          selectionMode="multiple"
          disableSelectorIconRotation
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
              content: "rounded-lg px-1",
            },
          }}
          listboxProps={{
            itemClasses: {
              base: "rounded-md",
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
              Tags ({Array.from(locationSelect).length}/{places.length})
            </>
          )}
        >
          {(city) => (
            <SelectSection
              key={city.id}
              title={city.country.name}
              classNames={{
                heading:
                  "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small",
              }}
            >
              <SelectItem key={city.id}>{city.name}</SelectItem>
            </SelectSection>
          )}
        </Select>
      </div>
      <Link
        onClick={handleClearAll}
        underline="hover"
        className={`w-fit cursor-pointer text-xs text-default-500 ${poppins.className}`}
      >
        Reset all filters
      </Link>
      <div className="flex items-center gap-x-1.5">
        <span className="flex gap-x-1.5 text-sm font-medium">
          <MdSort className="text-xl text-default-400" /> Sort by
        </span>
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
              content: "rounded-lg px-1",
            },
          }}
          listboxProps={{
            itemClasses: {
              base: "rounded-md",
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
      <div className="flex items-center justify-between">
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
            base: `w-fit items-center ${poppins.className}`,
            label: "text-sm",
            mainWrapper: "w-20",
            value: "text-default-800",
            listbox: poppins.className,
          }}
          popoverProps={{
            classNames: {
              content: "rounded-lg px-1",
            },
          }}
          listboxProps={{
            itemClasses: {
              base: "rounded-md",
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

export default SearchToolbar;
