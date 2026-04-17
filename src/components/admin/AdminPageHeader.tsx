import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  action?: ReactNode;
  className?: string;
  description: string;
  eyebrow?: string;
  title: string;
}

export function AdminPageHeader({
  action,
  className,
  description,
  eyebrow,
  title,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl text-slate-950 md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
