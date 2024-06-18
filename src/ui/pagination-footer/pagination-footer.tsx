"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@nextui-org/react";

interface PaginationFooterProps {
  totalPages: number;
}

export function PaginationFooter({ totalPages }: PaginationFooterProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;

  const setPage = (page: number) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return (
    <Pagination
      onChange={setPage}
      page={currentPage}
      total={totalPages}
      color="primary"
      isCompact
      showControls
      disableCursorAnimation
      showShadow
      isDisabled={isLoading}
      classNames={{
        wrapper: "bg-default-50 shadow",
        prev: "shadow-none bg-default-50",
        item: "!rounded-xl shadow-none bg-default-50",
        next: "shadow-none bg-default-50",
      }}
    />
  );
}
