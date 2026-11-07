# Bazaari

A React and Tailwind fashion storefront.

## Run locally

```sh
npm install
```

Copy `.env.example` to `.env.local`, then set `VITE_SUPABASE_PUBLISHABLE_KEY`
to the project's publishable key from Supabase **Project Settings → API Keys**.
The legacy `anon` key is also supported. Never put a `service_role` or secret
key in a browser app.

The Supabase project URL is already configured for this app. If you use another
project, set `VITE_SUPABASE_URL` in `.env.local` as well.

```sh
npm run dev
```

New users can create an account with their name, email, and password. The name
is stored in Supabase user metadata; Supabase Auth securely hashes and manages
passwords. If email confirmation is enabled in Supabase, users must confirm
their address before signing in.

## Build

```sh
npm run build
```
