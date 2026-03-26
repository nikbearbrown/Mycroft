import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (session?.value) {
    redirect('/admin/dashboard')
  } else {
    redirect('/admin/login')
  }
}
