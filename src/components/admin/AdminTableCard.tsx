import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

interface AdminTableCardProps extends ComponentPropsWithoutRef<"div"> {
  actions?: ReactNode;
  description: string;
  title: string;
}

export function AdminTableCard({
  actions,
  children,
  className,
  description,
  title,
  ...props
}: AdminTableCardProps) {
  return (
    <Surface className={cn("overflow-hidden", className)} {...props}>
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </Surface>
  );
}
