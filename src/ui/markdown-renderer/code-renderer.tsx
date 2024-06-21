import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export function codeRenderer(props: any) {
  if (props.className?.includes("hljs")) {
    const fileName = props.children[0].props.children.slice(3, -3) as string;
    const remainingChildren = props.children.slice(2);
    const line =
      props.node.position.end.line - props.node.position.start.line - 1;

    return (
      <>
        <div
          className={`flex h-12 items-center justify-between rounded-t-md border-1 border-b-0 border-default-200 bg-neutral-50 px-4 text-sm text-default-500 dark:bg-black`}
        >
          <p>{fileName}</p>
        </div>
        <code className={props.className}>
          <div
            className={`hidden min-w-8 select-none flex-col pr-4 text-right text-[13px]/[1.75] text-default-400 sm:flex`}
          >
            {Array.from({ length: line - 1 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div>{remainingChildren}</div>
        </code>
      </>
    );
  }

  return (
    <code
      className={twMerge(
        `rounded-md border-1 border-default-300 bg-default-100 px-1 py-0.5 font-normal before:content-none after:content-none ${poppins.className}`,
        props.className,
      )}
    >
      {props.children}
    </code>
  );
}
