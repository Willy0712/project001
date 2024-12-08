import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://buseuhfvqjhrdpyhubtg.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error("Supabase key is not defined. Please check your environment variables.");
}
const supabase = createClient<Database>(
    supabaseUrl,
    supabaseKey
);

export default supabase;
