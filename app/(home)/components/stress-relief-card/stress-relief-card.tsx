"use client";

import {
  ArrowCounterClockwiseIcon,
  FireIcon,
  ShuffleIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { Card } from "../card";
import { CardHeader } from "../card-header";

import { useStressRelief } from "./use-stress-relief";

function StressReliefToolbar({
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
      aria-label="Stress relief controls"
      className="fixed right-8 bottom-8 z-9999 flex items-center gap-2 rounded-xl border border-border bg-background-elevated px-4 py-3 shadow-lg backdrop-blur-md"
      role="toolbar"
    >
      <button
        aria-label="Reset stress relief"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-error-subtle px-3 py-1.5 text-error text-sm hover:bg-error hover:text-foreground"
        onClick={onReset}
        title="Reset stress relief"
        type="button"
      >
        <ArrowCounterClockwiseIcon className="size-4" />
        Reset
      </button>
      <button
        aria-label="Explode all elements"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-warning-subtle px-3 py-1.5 text-sm text-warning hover:bg-warning hover:text-foreground"
        onClick={onExplode}
        title="Explode all elements"
        type="button"
      >
        <FireIcon className="size-4" />
        Explode
      </button>
      <button
        aria-label="Shake all elements"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-accent-subtle px-3 py-1.5 text-accent text-sm hover:bg-accent hover:text-foreground"
        onClick={onShake}
        title="Shake all elements"
        type="button"
      >
        <ShuffleIcon className="size-4" />
        Shake
      </button>
    </div>,
    document.body
  );
}

export function StressReliefCard() {
  const [isActive, setIsActive] = useState(false);
  const { activate, reset, explode, shake } = useStressRelief();

  const handleEnable = useCallback(async () => {
    await activate();
    setIsActive(true);
  }, [activate]);

  const handleReset = useCallback(() => {
    reset(() => setIsActive(false));
  }, [reset]);

  return (
    <>
      <Card className="flex flex-col p-5" containerClassName="h-fit">
        <CardHeader title="Stress Relief" />
        <p className="text-foreground-muted text-sm">
          {isActive
            ? "Go wild! Drag elements or use the toolbar."
            : "Feeling stressed? Toss things around."}
        </p>
        {isActive ? null : (
          <div className="mt-3">
            <button
              aria-label="Enable stress relief"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-accent-subtle px-3 py-1.5 text-sm hover:bg-accent"
              onClick={handleEnable}
              title="Enable stress relief"
              type="button"
            >
              <SparkleIcon className="size-4" />
              Enable
            </button>
          </div>
        )}
      </Card>
      {isActive ? (
        <StressReliefToolbar
          onExplode={explode}
          onReset={handleReset}
          onShake={shake}
        />
      ) : null}
    </>
  );
}
