import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="glass group rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 transition-all group-hover:from-cyan-500/30 group-hover:to-purple-500/30 group-hover:text-cyan-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
