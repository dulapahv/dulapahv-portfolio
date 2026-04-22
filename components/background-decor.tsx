import Image from "next/image";

export function BackgroundDecor() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed top-[-70%] right-[-60%] -z-50 size-[180%] select-none overflow-clip opacity-50 mix-blend-darken hue-rotate-45 sm:top-[-45%] sm:size-[150%] dark:mix-blend-lighten"
        role="presentation"
      >
        <Image
          alt=""
          className="object-contain"
          fetchPriority="high"
          fill
          loading="eager"
          src="/pinku.png"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-[-50%] left-[-40%] -z-50 size-[140%] select-none overflow-clip opacity-90 mix-blend-darken sm:bottom-[-30%] sm:size-[110%] dark:opacity-60 dark:mix-blend-lighten"
        role="presentation"
      >
        <Image
          alt=""
          className="object-contain"
          fill
          loading="eager"
          src="/ao.png"
        />
      </div>
    </>
  );
}
