'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/app/lib/supabaseClient'
import styles from './welcome.module.css'

export default function WelcomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectRole = async (role: 'client' | 'worker') => {
    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('خاصك تكون مسجّل الدخول')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', user.id)

    if (error) {
      setError('وقع مشكل، عاود حاول')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>مرحبا بك فـ JOBLY 👋</h1>
      <p className={styles.subtitle}>
        شنو بغيت تكون؟
      </p>

      <div className={styles.buttons}>
        <button
          onClick={() => selectRole('client')}
          disabled={loading}
          className={styles.primaryBtn}
        >
          بغيت ننشر خدمات
        </button>

        <button
          onClick={() => selectRole('worker')}
          disabled={loading}
          className={styles.secondaryBtn}
        >
          بغيت نخدم
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
