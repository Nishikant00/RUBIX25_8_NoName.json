"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, TrendingUp, Trash2, Menu, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/reviews", icon: ShoppingCart, label: "Reviews" },
  { href: "/demand", icon: TrendingUp, label: "Demand" },
  { href: "/waste", icon: Trash2, label: "Waste" },
  { href: "/orders", icon: ShoppingCart, label: "Deliveries" },
]

export function DSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}
      <Sidebar
        className={cn(
          "bg-white text-gray-800 shadow-lg transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && "fixed inset-y-0 left-0 z-40",
        )}
      >
        <SidebarHeader className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                      isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <Link href={item.href} className="flex items-center space-x-3 w-full">
                      <item.icon className="w-6 h-6" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

