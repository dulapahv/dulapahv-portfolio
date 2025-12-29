import { Archivo } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";

import { GITHUB_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { CurrentYear } from "./current-year/current-year";

const archivo = Archivo({ subsets: ["latin"], weight: "variable" });

export function Footer() {
  return (
    <footer className={cn("mt-16", archivo.className)}>
      <div className="flex flex-col gap-y-1 text-foreground-muted text-sm">
        <p>
          ©{" "}
          <Suspense fallback="2024">
            <CurrentYear />
          </Suspense>{" "}
          Dulapah Vibulsanti. All rights reserved.
        </p>
        <p>
          View the{" "}
          <Link
            className={cn(
              "text-mirai-red underline underline-offset-2",
              "hover:decoration-2"
            )}
            href={`${GITHUB_URL}/dulapahv-portfolio`}
            rel="noopener noreferrer"
            target="_blank"
          >
            source code
          </Link>
          .
        </p>
        <p>
          NLWeb Chat:{" "}
          <Link
            className={cn(
              "text-mirai-red underline underline-offset-2",
              "hover:decoration-2"
            )}
            href="https://chat.dulapahv.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            chat.dulapahv.dev
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
