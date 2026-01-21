"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, Tag, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      const { count: categoriesCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
      
      setStats({
        products: productsCount || 0,
        categories: categoriesCount || 0,
      });
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="grid gap-6 sm:grid-cols-3">
        <StatCard 
          title="Total Products" 
          value={stats.products} 
          icon={Package} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Categories" 
          value={stats.categories} 
          icon={Tag} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Admin Users" 
          value={1} 
          icon={Users} 
          color="bg-green-500" 
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} bg-opacity-20 text-white`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
