import type { ReactNode } from "react";

import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  action?: ReactNode;
  className?: string;
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
  description: string;
}

export function EmptyState({
  action,
  className,
  eyebrow,
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <Surface
      tone="muted"
      className={cn(
        "flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center",
        className
      )}
    >
      {icon ? (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm">
          {icon}
        </div>
      ) : null}
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="font-display text-3xl text-slate-950">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Surface>
  );
}
