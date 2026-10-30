const BLOB_SQUARE = "absolute inset-0 m-auto size-[min(100cqw,100cqh)]";

export function BackgroundDecor() {
  return (
    <>
      <div
        aria-hidden
        className="@container-size pointer-events-none fixed top-[-70%] right-[-60%] -z-50 size-[180%] select-none overflow-clip opacity-50 mix-blend-darken sm:top-[-45%] sm:size-[150%] dark:mix-blend-lighten"
        role="presentation"
      >
        <div className={BLOB_SQUARE}>
          <div className="absolute top-[8%] left-[14%] h-[64%] w-[45%] -rotate-16 bg-blob [--blob:rgb(200_27_129/0.25)]" />
          <div className="absolute top-[37%] left-[36%] h-[32%] w-[34%] bg-blob [--blob:rgb(175_42_180/0.13)]" />
          <div className="absolute top-[44%] left-[34%] h-[40%] w-[56%] -rotate-24 bg-blob [--blob:rgb(137_71_255/0.18)]" />
        </div>
      </div>
      <div
        aria-hidden
        className="@container-size pointer-events-none fixed bottom-[-50%] left-[-40%] -z-50 size-[140%] select-none overflow-clip opacity-90 mix-blend-darken sm:bottom-[-30%] sm:size-[110%] dark:opacity-60 dark:mix-blend-lighten"
        role="presentation"
      >
        <div className={BLOB_SQUARE}>
          <div className="absolute top-[30%] left-[6%] h-[58%] w-[86%] rotate-22 bg-blob [--blob:rgb(0_112_243/0.14)]" />
          <div className="absolute top-[14%] left-[8%] h-[50%] w-[44%] bg-blob [--blob:rgb(0_112_243/0.06)]" />
        </div>
      </div>
    </>
  );
}
