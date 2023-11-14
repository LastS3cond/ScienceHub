import { createClient } from '@supabase/supabase-js'

const URL = 'https://wxgsatqihmbmhrviidus.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z3NhdHFpaG1ibWhydmlpZHVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTc0NjY4OCwiZXhwIjoyMDE1MzIyNjg4fQ.pvrfLEYXfSTRUubZimuDwm0dTYJHuj8MjiBQy2P4_Ek';

export const supabase = createClient(URL, API_KEY);