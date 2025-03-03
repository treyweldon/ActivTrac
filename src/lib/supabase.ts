import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getActivities(userId: string | undefined) {
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
    
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  
  return data || [];
}

export async function addActivity(activity: any) {
  const { data, error } = await supabase
    .from('activities')
    .insert([activity])
    .select();
    
  if (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
  
  return data?.[0];
}