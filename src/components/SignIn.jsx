import { useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function SignIn({ configurationError, sessionError }) {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setSubmitting(true);

    try {
      if (!supabase) {
        setErrorMessage(configurationError);
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              name: name.trim(),
              full_name: name.trim(),
            },
          },
        });

        if (error) throw error;

        if (!data.session) {
          setMessage(
            "Account created. Check your email to confirm your address, then sign in.",
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setErrorMessage(error.message || "Authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f2ec] px-4 py-10 text-[#17283f]">
      <section className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="bg-[#17283f] px-8 py-7 text-center text-white">
          <a href="#home" className="font-serif text-2xl font-semibold tracking-[0.16em]">
            BAZAARI
          </a>
          <p className="mt-2 text-sm text-white/70">A world of style, thoughtfully curated.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#73767b]">
              {mode === "signup"
                ? "Join Bazaari to explore your personal edit."
                : "Sign in to explore your Bazaari edit."}
            </p>
          </div>
          {mode === "signup" && (
            <label className="block text-sm font-medium">
              Your name
              <input
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-xl border border-[#ded8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b88d4b] focus:ring-2 focus:ring-[#c5a46d]/20"
              />
            </label>
          )}
          <label className="block text-sm font-medium">
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-[#ded8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b88d4b] focus:ring-2 focus:ring-[#c5a46d]/20"
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input
              required
              type="password"
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "signup" ? "At least 6 characters" : "Enter your password"}
              className="mt-2 w-full rounded-xl border border-[#ded8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b88d4b] focus:ring-2 focus:ring-[#c5a46d]/20"
            />
          </label>
          {(configurationError || sessionError || errorMessage) && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-5 text-rose-800"
            >
              {configurationError || sessionError || errorMessage}
            </p>
          )}
          {message && (
            <p
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800"
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || Boolean(configurationError)}
            className="w-full rounded-full bg-[#c5a46d] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#17283f] transition hover:bg-[#d4b981] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Please wait…"
              : mode === "signup"
                ? "Create account"
                : "Sign in"}
          </button>
          <p className="text-center text-sm text-[#73767b]">
            {mode === "signup" ? "Already have an account?" : "New to Bazaari?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode((current) => (current === "signup" ? "signin" : "signup"));
                setMessage("");
                setErrorMessage("");
              }}
              className="font-semibold text-[#80602e] underline underline-offset-2"
            >
              {mode === "signup" ? "Sign in" : "Create account"}
            </button>
          </p>
          <p className="text-center text-xs leading-5 text-[#85827d]">
            Your password is securely handled by Supabase Auth and is never stored
            by this app.
          </p>
        </form>
      </section>
    </main>
  );
}
