import { createClient } from '@supabase/supabase-js'

// هنا تضع الروابط التي نسختها من موقع Supabase
const supabaseUrl = 'https://your-project.supabase.co' 
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)