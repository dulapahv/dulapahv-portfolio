import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { ViewTransition } from "react";

import Breadcrumb from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { CONTACT_EMAIL } from "@/lib/constants";
import { contactPageSchema } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import { ContactActions } from "./components/contact-actions";

const archivo = Archivo({ subsets: ["latin"], weight: "variable" });

const title = "Contact";
const description = "Get in touch";

export const metadata: Metadata = createMetadata({
  title,
  description,
  ogText: "Contact DulapahV",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd schemas={[contactPageSchema]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition enter="slide-in-right">
        <main className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center">
          <div className="relative z-10 space-y-12 px-4 py-12 text-center">
            <div className="space-y-6">
              <h1 className="text-foreground">
                Say hi, discuss future projects or job opportunities
              </h1>
              <div className="space-y-2">
                <Link
                  aria-label={`Email address: ${CONTACT_EMAIL}`}
                  className={cn(
                    "font-light text-4xl text-foreground sm:text-5xl md:text-6xl",
                    archivo.className
                  )}
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </Link>
              </div>
            </div>
            <ContactActions />
          </div>
        </main>
      </ViewTransition>
    </>
  );
}
