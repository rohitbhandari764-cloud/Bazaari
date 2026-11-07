import { useState } from "react";

export default function SignIn({ onSignIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSignIn({ name: name.trim(), email: email.trim() });
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
            <h1 className="font-serif text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm leading-6 text-[#73767b]">
              Sign in to explore your Bazaari edit.
            </p>
          </div>
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
              minLength={4}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-[#ded8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b88d4b] focus:ring-2 focus:ring-[#c5a46d]/20"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[#c5a46d] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#17283f] transition hover:bg-[#d4b981] active:scale-[0.99]"
          >
            Sign in and continue
          </button>
          <p className="text-center text-xs leading-5 text-[#85827d]">
            This demo sign-in keeps your name on this device.
          </p>
        </form>
      </section>
    </main>
  );
}
