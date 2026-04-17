"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Category } from "@/types";

interface AppShellProps {
  categories: Category[];
  children: ReactNode;
}

export function AppShell({ categories, children }: AppShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <Header categories={categories} />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer categories={categories} />
    </div>
  );
}
