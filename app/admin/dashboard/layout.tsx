'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { name: 'Overview', href: '/admin/dashboard' },
  { name: 'Blog', href: '/admin/dashboard/blog' },
  { name: 'Tools', href: '/admin/dashboard/tools' },
  { name: 'Notes', href: '/admin/dashboard/notes' },
  { name: 'Substack', href: '/admin/dashboard/substack' },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="container px-4 md:px-6 mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
          <nav className="flex gap-4 mt-4 border-b pb-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium px-3 py-1.5 rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </div>
  )
}
