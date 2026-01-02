import styles from './worker.module.css'

export default function WorkerPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>كنقدّم خدمة</h1>
      <p className={styles.subtitle}>
        عرض مهارتك وخلي الناس يتواصلو معاك
      </p>

      <div className={styles.card}>
        <label className={styles.label}>شنو هي الخدمة ديالك؟</label>
        <input
          className={styles.input}
          placeholder="مثال: سباك، كهربائي، مصمم..."
        />

        <label className={styles.label}>المدينة</label>
        <input
          className={styles.input}
          placeholder="مثال: Casablanca"
        />

        <label className={styles.label}>شرح قصير على الخدمة</label>
        <textarea
          className={styles.textarea}
          placeholder="شرح شنو كتدير وشنو كتميزك..."
        />

        <button className={styles.button}>
          نشر الخدمة
        </button>
      </div>
    </main>
  )
}
