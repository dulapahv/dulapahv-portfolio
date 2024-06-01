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
  Spinner,
} from "@nextui-org/react";
import { isMobile } from "react-device-detect";
import { LuSearch } from "react-icons/lu";
import { TbSelector } from "react-icons/tb";
import { useDebouncedCallback } from "use-debounce";

import type { Place } from "@prisma/client";

interface SearchToolbarProps {
  count: number;
  places: {
    item: Place[];
    count: number;
  };
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

const SearchToolbar = ({ count, places }: SearchToolbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isPerPageLoading, setIsPerPageLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 10;
  const locationId = searchParams.get("locationId") || "";

  const [perPageSelect, setPerPageSelect] = useState<Selection>(
    new Set([perPage.toString()]),
  );
  const [locationSelect, setLocationSelect] = useState<Selection>(
    locationId ? new Set(locationId.split(",")) : new Set([]),
  );

  const placesItem = places.item;

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
      params.set("per_page", Array.from(value)[0].toString());
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
      ? params.delete("locationId")
      : params.set("locationId", Array.from(locationSelect).join(","));
    router.push(`${pathname}?${params.toString()}`);
    setIsLocationChanged(false);
  }, [isLocationChanged, searchParams, locationSelect, pathname, router]);

  const handleClearAll = useCallback(() => {
    if (!search && Array.from(locationSelect).length === 0) return;
    setIsLocationLoading(true);
    setLocationSelect(new Set([]));
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("locationId");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

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
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-medium">Filter by</p>
        <Select
          selectedKeys={locationSelect}
          onSelectionChange={(keys) => {
            setIsLocationChanged(true);
            setLocationSelect(keys);
          }}
          placeholder="Location"
          onClose={handleLocationChange}
          items={placesItem}
          isLoading={isLocationLoading}
          aria-label="Location"
          color="primary"
          variant="underlined"
          size="sm"
          selectionMode="multiple"
          disableSelectorIconRotation
          selectorIcon={<TbSelector className="text-default-400" />}
          classNames={{
            base: `w-fit items-center ${poppins.className}`,
            label: "text-sm",
            mainWrapper: "w-64",
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
              Location ({Array.from(locationSelect).length}/{placesItem.length})
            </>
          )}
        >
          {(place) => <SelectItem key={place.id}>{place.location}</SelectItem>}
        </Select>
        <Link
          onClick={handleClearAll}
          color="primary"
          underline="hover"
          size="sm"
          className={`cursor-pointer ${poppins.className}`}
        >
          Clear all
        </Link>
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
          about="Items per page"
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
