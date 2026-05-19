import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || '';
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Will be null if env vars are missing — app works in local/guest mode
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// ── Auth helpers ─────────────────────────────────────────────

export async function signUp(email, password, name) {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  return { data, error };
}

export async function signIn(email, password) {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

export function onAuthChange(callback) {
  if (!supabase) return () => {};
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return () => subscription.unsubscribe();
}

// ── Language preference per Supabase account ─────────────────

export async function saveLanguagePreference(userId, lang) {
  if (!supabase) return;
  await supabase
    .from('player_preferences')
    .upsert({ user_id: userId, language: lang, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
}

export async function loadLanguagePreference(userId) {
  if (!supabase) return null;
  const { data } = await supabase
    .from('player_preferences')
    .select('language')
    .eq('user_id', userId)
    .single();
  return data?.language || null;
}
