import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://jhusxvxjjuvpexotajto.supabase.co/"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodXN4dnhqanV2cGV4b3RhanRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTExMzQsImV4cCI6MjA0MDM4NzEzNH0.qijm29VWB8-ncZXfkvZo3uLaSGHUfhrLqotZtPZGrpA"

export const supabase = createClient(supabase_url, supabase_key);
