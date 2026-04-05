"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

type SessionUser = {
  uid: string;
  email: string | null;
  name: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const res = await fetch(`${BACKEND_BASE}/auth/session`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          router.replace("/auth/login");
          return;
        }
        const body = await res.json();
        if (isActive) setUser(body?.user ?? null);
      } finally {
        if (isActive) setLoading(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [router]);

  async function handleLogout() {
    await fetch(`${BACKEND_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    await signOut(getFirebaseAuth()).catch(() => undefined);
    router.replace("/auth/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
        <p className="text-sm text-slate-600 dark:text-slate-300">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        You are signed in{user?.email ? ` as ${user.email}` : ""}.
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        Logout
      </button>
    </main>
  );
}
