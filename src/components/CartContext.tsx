"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import apiServices from "@/services/api"

type CartItem = {
  item_id: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (id: string, price: number) => Promise<void>
  removeFromCart: (id: string) => void
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = async (id: string, price: number) => {
    try {
      const existingItem = cart.find((item) => item.item_id === id)
      const quantity = existingItem ? existingItem.quantity + 1 : 1

      const cartData = {
        item_id: id,
        price: price,
        quantity: quantity,
      }

      const customerToken = localStorage.getItem("customerToken") || "mock_customer_token"

      const response = await apiServices.addToCart(cartData, customerToken)

      if (response) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.item_id === id)
          if (existingItem) {
            return prevCart.map((item) => (item.item_id === id ? { ...item, quantity: item.quantity + 1 } : item))
          }
          return [...prevCart, { item_id: id, price, quantity: 1 }]
        })
      } else {
        throw new Error(response|| "Failed to add item to cart")
      }
    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.item_id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.item_id === id ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prevCart.filter((item) => item.item_id !== id)
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

