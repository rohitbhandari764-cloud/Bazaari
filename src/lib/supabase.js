import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://hqmbxzdznraiarcsffsb.supabase.co";
const supabasePublicKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  ""
).trim();

export const supabase = supabasePublicKey
  ? createClient(supabaseUrl, supabasePublicKey)
  : null;

export const supabaseConfigError = supabasePublicKey
  ? ""
  : "Add your Supabase publishable (anon) key to .env.local as VITE_SUPABASE_PUBLISHABLE_KEY. Never use a service-role key in the browser.";
