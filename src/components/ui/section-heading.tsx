import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
  description: string;
  eyebrow?: string;
  title: string;
}

export function SectionHeading({
  action,
  align = "left",
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex gap-6",
        align === "center"
          ? "flex-col items-center text-center"
          : "flex-col items-start justify-between md:flex-row md:items-end",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-4xl leading-tight text-slate-950 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
