import { redirect } from 'next/navigation'
import supabase from '@/app/lib/supabaseClient'
import AuthForm from './auth-form'
import AuthButtons from './auth-buttons'
import styles from './auth.module.css'

export default async function AuthPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1 className={styles.logo}>JOBLY</h1>
        <p className={styles.subtitle}>
          لقا خدمة ولا قدّم خدمة بسهولة
        </p>

        {/* EMAIL / PASSWORD FORM */}
        <AuthForm />

        <div className={styles.divider}>أو</div>

        {/* GOOGLE / FACEBOOK */}
        <AuthButtons />

        <p className={styles.register}>
          ما عندكش حساب؟
          <span> تسجّل من الفورم الفوق </span>
        </p>

      </div>
    </div>
  )
}
