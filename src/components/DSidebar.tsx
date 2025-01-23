'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, TrendingUp, Trash2 } from 'lucide-react'

const navItems = [
  { href: '/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/demand', icon: TrendingUp, label: 'Demand' },
  { href: '/waste', icon: Trash2, label: 'Waste' },
]

export function DSidebar() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <ul className="space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}