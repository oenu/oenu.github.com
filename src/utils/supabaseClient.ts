import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fexutrlesdaielcvnpiu.supabase.co";
const supabaseAnonKey =
  /* cspell: disable-next-line */
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleHV0cmxlc2RhaWVsY3ZucGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1NjIxMTAsImV4cCI6MTk3MzEzODExMH0.nnP00yRLtb3tjm3aHLlX4eyBYwGVfaVT9fMSllh17Jk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
