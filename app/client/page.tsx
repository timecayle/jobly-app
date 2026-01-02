'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">JOBLY</h1>

      <p className="text-center">
        مرحبا بيك 👋 <br />
        Jobly كتوصل الناس بالخدمة لي محتاجينها دابا
      </p>

      <button
        onClick={() => router.push('/client')}
        className="px-6 py-3 border rounded"
      >
        🔍 كنقلب على خدمة
      </button>

      <button
        onClick={() => router.push('/worker')}
        className="px-6 py-3 border rounded"
      >
        🛠️ كنقدّم خدمة
      </button>
    </div>
  )
}
