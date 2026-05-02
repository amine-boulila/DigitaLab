import { BrandLogo } from "@/components/BrandLogo";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Twitter } from "lucide-react";

import type { Category } from "@/types";

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories = [] }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="shell-container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <BrandLogo href="/" />
            <h2 className="mt-4 font-display text-4xl text-slate-950">
              Clean delivery, quick support, zero friction.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Digital subscriptions, gift cards, and streaming access delivered
              fast with a more reassuring buying experience.
            </p>
          </div>

          <FooterColumn
            links={categories.slice(0, 4).map((category) => ({
              href: `/categories/${category.slug}`,
              label: category.name,
            }))}
            title="Categories"
          />
          <FooterColumn
            links={[
              { href: "/faq", label: "FAQ" },
              { href: "/how-it-works", label: "How it works" },
              { href: "/contact", label: "Contact" },
            ]}
            title="Company"
          />

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Follow
            </h3>
            <div className="mt-5 flex gap-3">
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink
                href="https://www.instagram.com/forjaw/"
                icon={Instagram}
              />
            </div>
            <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Service Promise
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Fast replies on WhatsApp, clear prices, and quick support from
                order to delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright {new Date().getFullYear()} Forjaw. All rights
            reserved.
          </p>
          <p>Built for trust, speed, and a more premium customer experience.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: Array<{ href: string; label: string }>;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="inline-flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-950"
              href={link.href}
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
}: {
  href: string;
  icon: typeof Facebook;
}) {
  return (
    <Link
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}
