'use client'

import supabase from '@/app/lib/supabaseClient'
import styles from './auth.module.css'

export default function AuthButtons() {
  const login = async (provider: 'google' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className={styles.oauth}>
      <button
        className={styles.oauthBtn}
        onClick={() => login('google')}
      >
        الدخول بـ Google
      </button>

      <button
        className={styles.oauthBtn}
        onClick={() => login('facebook')}
      >
        الدخول بـ Facebook
      </button>
    </div>
  )
}
