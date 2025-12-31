'use client'

import { useState } from 'react'
import supabase from '@/app/lib/supabaseClient'
import styles from '../auth/auth.module.css'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleUpdatePassword = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('✅ تبدّلات كلمة المرور بنجاح، تقدر دابا تدخل')
    }

    setLoading(false)
  }

  return (
    <div className={styles.form}>
      <h2 style={{ color: 'white', marginBottom: 10 }}>
        تغيير كلمة المرور
      </h2>

      <input
        type="password"
        placeholder="كلمة مرور جديدة"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className={styles.primaryBtn}
        onClick={handleUpdatePassword}
        disabled={loading}
      >
        {loading ? 'جاري الحفظ...' : 'حفظ كلمة المرور'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
