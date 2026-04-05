"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseClientConfigured } from "@/lib/firebase";

const BACKEND_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function shouldUseGoogleRedirect(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 640px)").matches) return true;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function validateEmail(email: string): string | null {
  const t = email.trim();
  if (!t) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
    return "Enter a valid email address.";
  }
  return null;
}

function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
}

function mapFirebaseAuthError(err: unknown): string {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: string }).code)
      : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in instead.";
    case "auth/invalid-email":
      return "That email address is not valid.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters and mix letters and numbers.";
    case "auth/operation-not-allowed":
      return "Email/password or Google sign-in is not enabled for this project.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups for this site or try again.";
    case "auth/popup-closed-by-user":
      return "The sign-in window was closed before finishing. Please try again.";
    case "auth/cancelled-popup-request":
      return "Another sign-in attempt is already in progress.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/invalid-api-key":
      return "Firebase API key is missing or invalid. Copy the web app config from Firebase Console → Project settings → Your apps, set NEXT_PUBLIC_FIREBASE_* in .env.local, then restart `next dev`.";
    default:
      if (err instanceof Error && err.message) {
        return err.message;
      }
      return "Something went wrong. Please try again.";
  }
}

async function establishBackendSession(idToken: string): Promise<void> {
  const res = await fetch(`${BACKEND_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail =
        typeof body?.message === "string"
          ? body.message
          : typeof body?.error === "string"
            ? body.error
            : "";
    } catch {
      detail = await res.text();
    }
    throw new Error(
      detail.trim() || `Could not create backend session (${res.status}).`,
    );
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const firebaseConfigured = isFirebaseClientConfigured();
  const authDisabled = !firebaseConfigured;

  const completeSignInAndRedirect = useCallback(
    async (user: { getIdToken: () => Promise<string> }) => {
      const idToken = await user.getIdToken();
      await establishBackendSession(idToken);
      router.replace("/dashboard");
    },
    [router],
  );

  useEffect(() => {
    if (!firebaseConfigured) return;

    let cancelled = false;

    (async () => {
      try {
        const result = await getRedirectResult(getFirebaseAuth());
        if (cancelled || !result?.user) return;

        setLoading(true);
        setFormError(null);
        await completeSignInAndRedirect(result.user);
      } catch (err) {
        if (!cancelled) {
          setFormError(mapFirebaseAuthError(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [completeSignInAndRedirect, firebaseConfigured]);

  async function handleEmailRegister(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setFieldErrors({
      email: emailErr ?? undefined,
      password: passwordErr ?? undefined,
    });
    if (emailErr || passwordErr) return;

    if (!firebaseConfigured) {
      setFormError(
        "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, and APP_ID to .env.local, then restart the dev server.",
      );
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        email.trim(),
        password,
      );

      const name = fullName.trim();
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      await completeSignInAndRedirect(cred.user);
    } catch (err) {
      setFormError(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setFormError(null);
    setFieldErrors({});

    if (!firebaseConfigured) {
      setFormError(
        "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, and APP_ID to .env.local, then restart the dev server.",
      );
      return;
    }

    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      if (shouldUseGoogleRedirect()) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      const cred = await signInWithPopup(auth, googleProvider);
      await completeSignInAndRedirect(cred.user);
    } catch (err) {
      setFormError(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white";
  const inputErrorClass =
    "border-red-500 focus:ring-red-500 dark:border-red-500";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Sign up with email or Google. Your backend verifies your session
          after Firebase.
        </p>

        {authDisabled ? (
          <div
            role="status"
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
          >
            Add your Firebase web app variables to{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
              .env.local
            </code>
            :{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
              NEXT_PUBLIC_FIREBASE_API_KEY
            </code>
            ,{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
              NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
            </code>
            ,{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
              NEXT_PUBLIC_FIREBASE_PROJECT_ID
            </code>
            ,{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
              NEXT_PUBLIC_FIREBASE_APP_ID
            </code>
            . Restart <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">npm run dev</code>.
          </div>
        ) : null}

        {formError ? (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          >
            {formError}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleEmailRegister} noValidate>
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Full name{" "}
              <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading || authDisabled}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || authDisabled}
              className={`${inputClass} ${fieldErrors.email ? inputErrorClass : ""}`}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email ? (
              <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || authDisabled}
              className={`${inputClass} ${fieldErrors.password ? inputErrorClass : ""}`}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
            />
            {fieldErrors.password ? (
              <p
                id="password-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {fieldErrors.password}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={loading || authDisabled}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait…" : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading || authDisabled}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
