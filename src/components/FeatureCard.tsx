import type { LucideIcon } from "lucide-react";

import { Surface } from "@/components/ui/surface";

interface FeatureCardProps {
  description: string;
  icon: LucideIcon;
  title: string;
}

export function FeatureCard({
  description,
  icon: Icon,
  title,
}: FeatureCardProps) {
  return (
    <Surface tone="muted" className="h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </Surface>
  );
}
