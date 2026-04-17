import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SurfaceTone = "default" | "muted" | "accent" | "dark";

interface SurfaceProps extends ComponentPropsWithoutRef<"div"> {
  tone?: SurfaceTone;
}

const toneClasses: Record<SurfaceTone, string> = {
  default:
    "border border-white/70 bg-white/88 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.22)] backdrop-blur-xl",
  muted:
    "border border-slate-200/80 bg-slate-50/90 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.18)]",
  accent:
    "border border-teal-100 bg-gradient-to-br from-white via-teal-50/70 to-amber-50/60 shadow-[0_34px_90px_-40px_rgba(13,148,136,0.22)]",
  dark:
    "border border-slate-800/80 bg-slate-950 text-slate-50 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.7)]",
};

export function Surface({
  className,
  tone = "default",
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn("rounded-[28px]", toneClasses[tone], className)}
      {...props}
    />
  );
}
