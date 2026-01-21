"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Tag, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setLoading(false);
    };

    checkUser();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading admin panel...
      </div>
    );
  }

  // If on login page, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <span className="text-lg font-bold text-white">Admin Panel</span>
        </div>
        
        <nav className="p-4 space-y-1">
          <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" active={pathname === "/admin"} />
          <NavItem href="/admin/products" icon={Package} label="Products" active={pathname.startsWith("/admin/products")} />
          <NavItem href="/admin/categories" icon={Tag} label="Categories" active={pathname.startsWith("/admin/categories")} />
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <Link href="/" target="_blank" className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">
                <ExternalLink className="h-4 w-4" />
                View Site
            </Link>
            <button 
                onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/admin/login");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
            >
                <LogOut className="h-4 w-4" />
                Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-5xl">
            {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
        active ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
