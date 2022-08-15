import { createClient } from "@supabase/supabase-js";
const supabaseUrl ='https://vificzzxscytddtapocb.supabase.co';
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZmljenp4c2N5dGRkdGFwb2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkyNDczNDksImV4cCI6MTk3NDgyMzM0OX0.PhdcGrvOGXYOVH4Mh6nQw5-beZaf85RPUfjhW1awWu4';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
