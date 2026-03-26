import { cookies } from 'next/headers'
import crypto from 'crypto'

function getExpectedToken(): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update('admin_session').digest('hex')
}

export function generateSessionToken(): string {
  return getExpectedToken()
}

export function isValidSession(cookieValue: string): boolean {
  const expected = getExpectedToken()
  if (!expected) return false
  return crypto.timingSafeEqual(
    Buffer.from(cookieValue),
    Buffer.from(expected),
  )
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session?.value) return false
  try {
    return isValidSession(session.value)
  } catch {
    return false
  }
}
