import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"


export function Footer() {
  return (
    <footer className="border-t border-orange-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-700">Jomajo</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Delicious food delivered to your doorstep. Jomajo brings you the best culinary experiences from local
              restaurants.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            
            
           
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">&copy; 2025 Jomajo. All rights reserved.</p>
            <div className="flex space-x-6">
              {[
                { icon: Twitter, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <Link key={href} href={href} className="text-gray-400 hover:text-orange-600">
                  <span className="sr-only">{Icon.name}</span>
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

