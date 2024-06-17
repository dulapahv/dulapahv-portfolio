import Link from "next/link";
import {
  Checkbox,
  Link as NextUILink,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import DOMpurify from "isomorphic-dompurify";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

function linkRenderer(props: any) {
  return (
    <NextUILink
      href={props.href}
      as={Link}
      underline="hover"
      isExternal
      showAnchorIcon
    >
      {props.children}
    </NextUILink>
  );
}

function checkboxRenderer(props: any) {
  return (
    <Checkbox
      isSelected={props.checked}
      className={props.disabled ? "pointer-events-none" : ""}
      radius="sm"
      color="primary"
    >
      {props.children}
    </Checkbox>
  );
}

function renderTable(props: any) {
  return (
    <Table
      isStriped
      removeWrapper
      isHeaderSticky
      aria-label="Table"
      classNames={{
        base: "overflow-auto max-h-[90vh]",
        table: "!table my-4 !border-collapse",
        thead: "last:[&>tr]:!hidden",
        th: "uppercase font-bold !px-3",
        tr: "even:bg-default-200 dark:even:bg-default-100 !border-0",
        td: "first:rounded-l-lg last:rounded-r-lg !px-3 !py-2 [&>code]:!bg-default-100 dark:[&>code]:!bg-default-200",
      }}
    >
      <TableHeader>
        {props.children[0].props.children.props.children.map(
          (column: any, index: number) => (
            <TableColumn key={index}>{column.props.children}</TableColumn>
          ),
        )}
      </TableHeader>
      <TableBody>
        {props.children[1].props.children.map((row: any, index: number) => (
          <TableRow key={index}>
            {row.props.children.map((cell: any, index: number) => (
              <TableCell key={index}>{cell.props.children}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

export default function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={`unreset text-sm text-default-700 sm:text-base ${className}`}
    >
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          a: linkRenderer,
          input: checkboxRenderer,
          table: renderTable,
        }}
      >
        {DOMpurify.sanitize(children)}
      </Markdown>
    </div>
  );
}
