import { createClient } from "@supabase/supabase-js";
import useAuthUser from "../composable/UseAuthUser";

const supabaseUrl = "https://hlttvzhdsafqpoobbbnv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsdHR2emhkc2FmcXBvb2JiYm52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTkwMjE5MiwiZXhwIjoyMDI1NDc4MTkyfQ.UeqfCTapkxPn9BhrQS1M0Xq5gbG8kBFpdKjoMEoe6vw";
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();

  user.value = session?.user || null;
});
export default function useSupabase() {
  return { supabase };
}
