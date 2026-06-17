import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase Environment Variables!");
  if (typeof window !== 'undefined') {
    alert("DEPLOYMENT ERROR: You are missing the Supabase keys in Vercel! Please go to your Vercel Dashboard -> Settings -> Environment Variables and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co', 
  supabaseAnonKey || 'dummy-key'
);
