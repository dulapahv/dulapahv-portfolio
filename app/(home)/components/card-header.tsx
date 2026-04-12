import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { Link } from "@/components/link";

interface CardHeaderProps {
  title: string;
  /** Custom right-side action element. */
  action?: ReactNode;
}

export function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <h2 className="font-semibold text-foreground-muted text-xs uppercase tracking-widest">
        {title}
      </h2>
      {action}
    </div>
  );
}

interface CardHeaderIconLinkProps {
  href: string;
  title: string;
  icon?: Icon;
}

export function CardHeaderIconLink({
  href,
  title,
  icon: IconComponent = ArrowUpRightIcon,
}: CardHeaderIconLinkProps) {
  return (
    <Link className="group/icon" href={href} title={title}>
      <IconComponent
        className="size-5 text-foreground-muted transition-colors group-hover/icon:text-mirai-red"
        weight="regular"
      />
    </Link>
  );
}
