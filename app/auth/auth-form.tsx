'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/app/lib/supabaseClient'
import styles from './auth.module.css'

export default function AuthForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message === 'Email not confirmed') {
        setMessage(
          '✉️ خاصك تدخل للإيميل ديالك وتفعّل الحساب قبل الدخول'
        )
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    const user = data.user

    const { data: profile, error: profileError } =
      await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profileError) {
      setError('وقع مشكل، عاود حاول')
      setLoading(false)
      return
    }

    if (!profile.role) {
      router.push('/welcome')
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  const handleSignup = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage(
        '✅ تسجّل الحساب! دخل للإيميل وفعّل الحساب عاد رجع دخل'
      )
    }

    setLoading(false)
  }

  return (
    <div className={styles.form}>
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className={styles.primaryBtn}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'جاري الدخول...' : 'دخول'}
      </button>

      <button
        className={styles.secondaryBtn}
        onClick={handleSignup}
        disabled={loading}
      >
        إنشاء حساب
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p style={{ color: '#4ade80' }}>{message}</p>}
    </div>
  )
}
