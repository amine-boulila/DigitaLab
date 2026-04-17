"use client";

import { Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { buttonStyles } from "@/components/ui/button";
import {
  FieldGroup,
  FieldLabel,
  TextInput,
} from "@/components/ui/form-fields";
import { Surface } from "@/components/ui/surface";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/admin");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unable to sign in right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Surface tone="dark" className="p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Admin access
          </p>
          <h1 className="mt-4 font-display text-5xl text-white">
            Sign in to manage the storefront.
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            The admin side now matches the public redesign with calmer spacing,
            better structure, and reusable components while keeping your existing
            Supabase authentication flow exactly where it belongs.
          </p>
        </Surface>

        <Surface className="p-8 md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">Admin login</h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter your credentials to continue.
              </p>
            </div>
          </div>

          {error ? (
            <div className="mb-6 rounded-[20px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleLogin}>
            <FieldGroup>
              <FieldLabel>Email</FieldLabel>
              <TextInput
                required
                placeholder="admin@example.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Password</FieldLabel>
              <TextInput
                required
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FieldGroup>

            <button
              className={buttonStyles({ className: "mt-3 w-full", size: "lg" })}
              disabled={loading}
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </Surface>
      </div>
    </div>
  );
}
