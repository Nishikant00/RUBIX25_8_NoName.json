"use client"

import { useCart } from "./CartContext"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CartBadge() {
  const { cartCount } = useCart()

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{cartCount}</Badge>}
    </div>
  )
}

