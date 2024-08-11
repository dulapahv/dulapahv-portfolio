import { useEffect } from "react";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export function useOnLeavePageConfirmation(hasUnsavedChanges: boolean) {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
      }
    };

    const originalPush = router.push;

    router.push = (url: string, options?: NavigateOptions) => {
      if (hasUnsavedChanges) {
        const confirmLeave = window.confirm(
          "Changes you made may not be saved.",
        );
        if (confirmLeave) {
          originalPush(url, options);
        }
      } else {
        originalPush(url, options);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.push = originalPush;
    };
  }, [router, hasUnsavedChanges]);
}
