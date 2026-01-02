'use client'

import { useEffect, useState } from 'react'
import supabase from '@/app/lib/supabaseClient'
import styles from './settings.module.css'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [isWorker, setIsWorker] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('خاصك تكون مسجّل الدخول')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, is_client, is_worker')
        .eq('id', user.id)
        .single()

      if (error) {
        setError('ما قدرناش نجيبو المعلومات')
      } else if (data) {
        setName(data.full_name || '')
        setIsClient(data.is_client)
        setIsWorker(data.is_worker)
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  const saveProfile = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

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
      .update({
        full_name: name,
        is_client: isClient,
        is_worker: isWorker,
      })
      .eq('id', user.id)

    if (error) {
      setError('وقع مشكل فالحفظ')
    } else {
      setMessage('✅ تبدلات المعلومات بنجاح')
    }

    setLoading(false)
  }

  if (loading) return <p className={styles.loading}>جاري التحميل...</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>إعدادات الحساب</h1>

      <label className={styles.label}>الاسم</label>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className={styles.label}>شنو كتدير؟</label>

      <label>
        <input
          type="checkbox"
          checked={isClient}
          onChange={() => setIsClient(!isClient)}
        />
        كنقلب على خدمة
      </label>

      <label>
        <input
          type="checkbox"
          checked={isWorker}
          onChange={() => setIsWorker(!isWorker)}
        />
        كنقدّم خدمة
      </label>

      <button
        onClick={saveProfile}
        className={styles.primaryBtn}
        disabled={loading}
      >
        حفظ التغييرات
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}
    </div>
  )
}
