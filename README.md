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

The Supabase project URL is already configured for this app. The storefront
loads products from the `public.bazzari_products` table. Product image files
remain hosted by Unsplash; their URLs are stored in the table. If you use
another project, set `VITE_SUPABASE_URL` in `.env.local` as well.

```sh
npm run dev
```

New users can create an account with their name, email, and password. The name
is stored in Supabase user metadata; Supabase Auth securely hashes and manages
passwords. If email confirmation is enabled in Supabase, users must confirm
their address before signing in.

Confirmation links return to the app's current origin by default. For local
development, keep the Vite server running and add both
`http://localhost:5173/**` and `http://127.0.0.1:5173/**` under Supabase
**Authentication → URL Configuration → Redirect URLs**. If you open the email
on another device, localhost will point to that device instead; deploy the app
and add its public URL to the redirect allow list. You can set
`VITE_SUPABASE_AUTH_REDIRECT_URL` in `.env.local` to choose a specific return
URL. Restart Vite after changing environment variables.

## Build

```sh
npm run build
```
