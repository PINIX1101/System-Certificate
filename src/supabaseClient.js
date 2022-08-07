import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://khlgwuwsdgoqhctybcis.supabase.co"; //Config URL yang tadi di copy
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobGd3dXdzZGdvcWhjdHliY2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk4NjA2OTUsImV4cCI6MTk3NTQzNjY5NX0.7_EJ_qpakV18QRF_euzY0o5K7ugPcOMubCG7on-CUMI"; //Project Key yang tadi di copy

export const supabase = createClient(supabaseUrl, supabaseAnonKey);