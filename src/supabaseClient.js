import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cnqkmltzcvdmlqrmaxnk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucWttbHR6Y3ZkbWxxcm1heG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTM5NzgsImV4cCI6MjA2NDI4OTk3OH0.zlPDV-fDdyd05oRmGOr93nK5g8uxtZdr2PT_WkgYYxc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
