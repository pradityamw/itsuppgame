'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/lib/locales/en';
import id from '@/lib/locales/id';
import { saveLanguagePreference, loadLanguagePreference } from '@/lib/supabase';

const LOCALES = { en, id };
const LanguageContext = createContext(null);

export function LanguageProvider({ children, userId = null }) {
  const [lang, setLang] = useState('en');
  const [ready, setReady] = useState(false);

  // Load language on mount
  useEffect(() => {
    const init = async () => {
      let saved = null;
      // 1. Try Supabase if authenticated
      if (userId) {
        saved = await loadLanguagePreference(userId);
      }
      // 2. Fall back to localStorage
      if (!saved) {
        saved = localStorage.getItem('itsupport_lang');
      }
      if (saved && LOCALES[saved]) setLang(saved);
      setReady(true);
    };
    init();
  }, [userId]);

  const switchLanguage = useCallback(async (newLang) => {
    if (!LOCALES[newLang]) return;
    setLang(newLang);
    localStorage.setItem('itsupport_lang', newLang);
    if (userId) {
      await saveLanguagePreference(userId, newLang);
    }
  }, [userId]);

  /** t('key') or t('key', { n: 5 }) for interpolation */
  const t = useCallback((key, vars = {}) => {
    const locale = LOCALES[lang] || en;
    // Support dot notation: t('ranks.intern')
    const parts = key.split('.');
    let val = locale;
    for (const p of parts) {
      val = val?.[p];
      if (val === undefined) break;
    }
    if (val === undefined) {
      // fallback to English
      val = parts.reduce((o, p) => o?.[p], en);
    }
    if (typeof val !== 'string') return String(val ?? key);
    // Replace {n}, {rank}, {area}, etc.
    return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage, t, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
