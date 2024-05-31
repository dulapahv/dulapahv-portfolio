"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input, Spinner } from "@nextui-org/react";
import { isMobile } from "react-device-detect";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

const SearchBox = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useDebouncedCallback((search: string) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    search ? params.set("search", search) : params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return (
    <div className="flex gap-x-2">
      <Input
        type="text"
        placeholder="Search for position, company, or location..."
        size="md"
        radius="sm"
        autoFocus={!isMobile}
        isClearable
        value={search}
        onValueChange={setSearch}
        onKeyDown={() => handleSearch(search)}
        onClear={() => handleSearch("")}
        startContent={
          isLoading ? (
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
          )
        }
        classNames={{
          inputWrapper:
            "data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-transparent data-[focus-visible=true]:!ring-offset-0",
          input: "font-medium",
        }}
      />
    </div>
  );
};

export default SearchBox;
