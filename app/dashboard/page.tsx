import styles from './dashboard.module.css'

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.centerBox}>
        <div className={styles.logo}>JOBLY</div>

        <p className={styles.subtitle}>
          مرحبا بيك 👋 <br />
          Jobly كتوصل الناس بالخدمة لي محتاجينها دابا
        </p>

        <div className={styles.actions}>
          <div className={styles.card}>
            <span className={styles.icon}>🔍</span>
            <h2>كنقلب على خدمة</h2>
            <p>لقى الناس لي يقدرو يعاونوك فالحين</p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>🛠️</span>
            <h2>كنقدّم خدمة</h2>
            <p>عرض مهارتك وربح منها</p>
          </div>
        </div>
      </div>
    </div>
  )
}
