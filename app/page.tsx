import Link from 'next/link'
import styles from './home.module.css'

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.logo}>
        <span className={styles.green}>Job</span>
        <span className={styles.red}>ly</span>
      </h1>

      <p className={styles.subtitle}>
        Jobly كتوصل الناس بالخدمة لي محتاجينها دابا
      </p>

      <div className={styles.actions}>
        <Link href="/jobs" className={styles.card}>
          <span className={styles.icon}>🔍</span>
          <h3>كنقلب على خدمة</h3>
          <p>لقى الناس لي يقدرو يعاونوك</p>
        </Link>

        <Link href="/worker" className={styles.card}>
          <span className={styles.icon}>🛠️</span>
          <h3>كنقدّم خدمة</h3>
          <p>عرض مهارتك وربح منها</p>
        </Link>
      </div>
    </main>
  )
}
