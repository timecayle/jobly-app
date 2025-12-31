import styles from './jobs.module.css'

const jobs = [
  {
    id: 1,
    title: 'سباك',
    city: 'Casablanca',
    description: 'تصليح الحنفيات والتسربات'
  },
  {
    id: 2,
    title: 'كهربائي',
    city: 'Rabat',
    description: 'إصلاح الأعطال الكهربائية'
  },
  {
    id: 3,
    title: 'مصلّح هواتف',
    city: 'Casablanca',
    description: 'تصليح الشاشات والبطاريات'
  }
]

export default function JobsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>الخدمات المتوفرة</h1>

      {jobs.map(job => (
        <div key={job.id} className={styles.card}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <span className={styles.city}>{job.city}</span>
          <br />
          <button className={styles.button}>تواصل</button>
        </div>
      ))}
    </main>
  )
}
