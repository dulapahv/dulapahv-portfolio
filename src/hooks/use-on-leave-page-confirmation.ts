"use client";

import { useEffect } from "react";

export function useOnLeavePageConfirmation(isDirty: boolean) {
  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (!isDirty) return;
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [isDirty]);
}
