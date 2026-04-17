import type { LucideIcon } from "lucide-react";

import { Surface } from "@/components/ui/surface";

interface AdminStatCardProps {
  description: string;
  icon: LucideIcon;
  title: string;
  value: number | string;
}

export function AdminStatCard({
  description,
  icon: Icon,
  title,
  value,
}: AdminStatCardProps) {
  return (
    <Surface className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Surface>
  );
}
