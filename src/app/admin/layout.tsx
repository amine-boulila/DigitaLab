"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Tag, label: "Categories" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
        return;
      }

      setLoading(false);
    };

    void checkUser();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-[28px] border border-white bg-white px-8 py-6 text-center shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
          <p className="text-sm font-medium text-slate-500">Loading admin panel</p>
          <p className="mt-2 font-display text-3xl text-slate-950">Preparing workspace...</p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const activeItem =
    navItems.find((item) =>
      item.href === "/admin"
        ? pathname === item.href
        : pathname.startsWith(item.href)
    ) ?? navItems[0];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-slate-950 px-6 py-6 text-white lg:flex">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
              Admin
            </p>
            <h1 className="mt-3 font-display text-4xl text-white">DigitalFun</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Manage products, categories, and the storefront structure with a cleaner dashboard shell.
            </p>
          </div>

          <nav className="mt-10 space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  )}
                  href={item.href}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Admin session active
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Your Supabase auth checks stay intact while the interface becomes more structured and usable.
              </p>
            </div>

            <Link
              className={buttonStyles({
                className:
                  "w-full justify-center border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                variant: "ghost",
              })}
              href="/"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <button
              className={buttonStyles({
                className:
                  "w-full justify-center border border-white/10 bg-white/5 text-white hover:bg-rose-500/15 hover:text-rose-200",
                variant: "ghost",
              })}
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/admin/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                  Admin workspace
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  {activeItem.label}
                </h2>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      className={cn(
                        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
                        isActive
                          ? "bg-slate-950 text-white"
                          : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
