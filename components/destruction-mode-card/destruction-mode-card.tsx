"use client";

import {
  ArrowCounterClockwiseIcon,
  FireIcon,
  ShuffleIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { Card } from "@/components/card";

import { useDestructionMode } from "./use-destruction-mode";

function DestructionToolbar({
  onReset,
  onExplode,
  onShake,
}: {
  onReset: () => void;
  onExplode: () => void;
  onShake: () => void;
}) {
  return createPortal(
    <div
      aria-label="Destruction mode controls"
      className="fixed right-8 bottom-8 z-9999 flex items-center gap-2 rounded-xl border border-border bg-background-elevated px-4 py-3 shadow-lg backdrop-blur-md"
      role="toolbar"
    >
      <button
        aria-label="Disable destruction mode"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-error-subtle px-3 py-1.5 text-error text-sm hover:bg-error hover:text-foreground"
        onClick={onReset}
        type="button"
      >
        <ArrowCounterClockwiseIcon className="size-4" />
        Reset
      </button>
      <button
        aria-label="Explode all elements"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-warning-subtle px-3 py-1.5 text-sm text-warning hover:bg-warning hover:text-foreground"
        onClick={onExplode}
        type="button"
      >
        <FireIcon className="size-4" />
        Explode
      </button>
      <button
        aria-label="Shake all elements"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-accent-subtle px-3 py-1.5 text-accent text-sm hover:bg-accent hover:text-foreground"
        onClick={onShake}
        type="button"
      >
        <ShuffleIcon className="size-4" />
        Shake
      </button>
    </div>,
    document.body
  );
}

export function DestructionModeCard() {
  const [isActive, setIsActive] = useState(false);
  const { activate, reset, explode, shake } = useDestructionMode();

  const handleEnable = useCallback(() => {
    activate();
    setIsActive(true);
  }, [activate]);

  const handleReset = useCallback(() => {
    reset(() => setIsActive(false));
  }, [reset]);

  return (
    <>
      <Card className="flex flex-col gap-3 p-5" containerClassName="h-fit">
        <h2 className="font-semibold text-foreground-muted text-xs uppercase tracking-widest">
          Destruction Mode
        </h2>
        <p className="text-foreground-muted text-sm">
          {isActive
            ? "Chaos unleashed! Drag elements or use the toolbar."
            : "Enable to unleash chaos on this page."}
        </p>
        {!isActive && (
          <div className="mt-auto">
            <button
              aria-label="Enable destruction mode"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-error-subtle px-3 py-1.5 text-error text-sm hover:bg-error hover:text-foreground"
              onClick={handleEnable}
              type="button"
            >
              <WarningIcon className="size-4" />
              Enable
            </button>
          </div>
        )}
      </Card>
      {isActive && (
        <DestructionToolbar
          onExplode={explode}
          onReset={handleReset}
          onShake={shake}
        />
      )}
    </>
  );
}
