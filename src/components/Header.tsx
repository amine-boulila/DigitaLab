"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface HeaderProps {
  categories: Category[];
}

const staticLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categoryLinks = categories.slice(0, 4).map((category) => ({
    href: `/categories/${category.slug}`,
    label: category.name,
  }));

  const navLinks = [{ href: "/", label: "Home" }, ...categoryLinks, ...staticLinks];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:px-6">
        <Link
          className="flex items-center gap-3 rounded-full pr-2 transition hover:opacity-90"
          href="/"
        >
          <div className="soft-ring flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-950">
            <Image
              alt="DigitalFun logo"
              className="h-full w-full object-contain"
              height={44}
              src="/logo.png"
              width={44}
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl leading-none text-slate-950">
              DigitalFun
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Instant digital access
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            className={buttonStyles({
              className: "hidden sm:inline-flex",
              variant: "secondary",
            })}
            href="/contact"
          >
            <MessageCircle className="h-4 w-4" />
            Support
          </Link>
          <button
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={buttonStyles({
              className: "xl:hidden",
              size: "icon",
              variant: "outline",
            })}
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl xl:hidden">
          <nav className="grid gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-950 text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  )}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              className={buttonStyles({ className: "mt-2 w-full", variant: "secondary" })}
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              Contact support
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
