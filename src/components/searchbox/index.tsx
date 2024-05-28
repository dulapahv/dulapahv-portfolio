"use client";

import { KeyboardEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { isMobile } from "react-device-detect";
import { LuSearch } from "react-icons/lu";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (search: string) => {
    search
      ? router.push(`/experience?search=${search}`)
      : router.push("/experience");
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch(search);
  };

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
        onKeyDown={handleEnterKey}
        onClear={() => handleSearch("")}
        startContent={
          <LuSearch className="pointer-events-none flex-shrink-0 text-default-400" />
        }
        classNames={{
          inputWrapper:
            "data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-transparent data-[focus-visible=true]:!ring-offset-0",
          input: "font-medium",
        }}
      />
      <Button
        color="primary"
        radius="sm"
        onPress={() => handleSearch(search)}
        className="font-medium"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
