"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { dishes } from "@/data/dishes"

type CartItem = {
  id: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { id, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prevCart.filter((item) => item.id !== id)
    })
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

