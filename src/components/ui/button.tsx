import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "success";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonStylesOptions {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-950 text-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.65)] hover:-translate-y-0.5 hover:bg-slate-800",
  secondary:
    "bg-teal-600 text-white shadow-[0_18px_40px_-24px_rgba(13,148,136,0.65)] hover:-translate-y-0.5 hover:bg-teal-500",
  ghost:
    "bg-transparent text-slate-700 hover:-translate-y-0.5 hover:bg-white/70 hover:text-slate-950",
  outline:
    "border border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white",
  success:
    "bg-[#25D366] text-white shadow-[0_18px_40px_-24px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 hover:bg-[#20ba59]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
  icon: "h-11 w-11",
};

export function buttonStyles({
  className,
  size = "md",
  variant = "primary",
}: ButtonStylesOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}
