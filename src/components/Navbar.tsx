"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@/components/ui/dialog"
import { ScrollProgress } from "./ui/scroll-progress"
import { CartBadge } from "@/components/CartBadge"
import { CartPopup } from "@/components/CartPopup"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Restaurants", href: "/restaurants" },
  { name: "Reviews", href: "/reviews" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const [prevScrollPos, setPrevScrollPos] = React.useState(0)
  const [visible, setVisible] = React.useState(true)

  const handleScroll = React.useCallback(() => {
    const currentScrollPos = window.pageYOffset

    setVisible((prevVisible) => {
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      setPrevScrollPos(currentScrollPos)
      return visible
    })
  }, [prevScrollPos])

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <>
      <ScrollProgress />
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 w-full border-b border-orange-200 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/90
          transition-all duration-300
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button className="md:hidden" variant="ghost">
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Open mobile menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
                <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
                <div className="flex items-center justify-center mb-6 ">
                  <Image src="/pizza.png" alt="Pizza" width={80} height={80} />
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-2 py-1 text-lg text-gray-700 hover:text-orange-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-700 hidden md:block">
                <Image src="/pizza.png" alt="Pizza" width={50} height={50} />
              </span>
            </Link>
          </div>
          <nav className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setIsCartOpen(true)}>
              <CartBadge />
            </Button>
            <Button variant="ghost" asChild className="text-gray-700 hover:text-orange-600 hidden md:inline-flex">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 hidden md:inline-flex">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

