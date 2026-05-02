import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  href?: string;
  rel?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  target?: string;
  theme?: "light" | "dark";
}

const brandSizes = {
  sm: {
    image: 40,
    mark: "h-10 w-10",
    name: "text-lg",
    tagline: "text-[10px]",
  },
  md: {
    image: 44,
    mark: "h-11 w-11",
    name: "text-xl",
    tagline: "text-[11px]",
  },
  lg: {
    image: 56,
    mark: "h-14 w-14",
    name: "text-3xl",
    tagline: "text-xs",
  },
} as const;

export function BrandLogo({
  className,
  href,
  rel,
  showTagline = true,
  size = "md",
  target,
  theme = "light",
}: BrandLogoProps) {
  const brandSize = brandSizes[size];
  const content = (
    <>
      <div
        className={cn(
          "soft-ring flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950",
          brandSize.mark
        )}
      >
        <Image
          alt="Forjaw logo"
          className="h-full w-full object-contain"
          height={brandSize.image}
          src="/logo.png"
          width={brandSize.image}
        />
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "font-display leading-none",
            brandSize.name,
            theme === "dark" ? "text-white" : "text-slate-950"
          )}
        >
          Forjaw
        </p>
        {showTagline ? (
          <p
            className={cn(
              "mt-1 font-semibold uppercase tracking-[0.24em]",
              brandSize.tagline,
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            )}
          >
            Instant digital access
          </p>
        ) : null}
      </div>
    </>
  );

  if (!href) {
    return <div className={cn("flex items-center gap-3", className)}>{content}</div>;
  }

  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-full transition hover:opacity-90",
        className
      )}
      href={href}
      rel={rel}
      target={target}
    >
      {content}
    </Link>
  );
}
