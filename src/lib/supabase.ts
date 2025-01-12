import { createClient } from '@supabase/supabase-js';

// Supabase project details (use environment variables)
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Ensure these environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
