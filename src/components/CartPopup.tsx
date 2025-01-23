"use client"

import { useCart } from "./CartContext"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import apiServices from "@/services/api"
import { mock_customer_token } from "@/data/userdata"
import { useEffect, useState } from "react"

interface CartItem {
  id: string
  item: {
    id: string
    name: string
    base_price: string
    category: string
    description: string
    product_image: string
  }
  price: number
  quantity: number
}

export function CartPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { removeFromCart } = useCart()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const showCart = async () => {
      try {
        const response = await apiServices.showCart(mock_customer_token)
        if (response && response.data && response.data.data) {
          setCartItems(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
      }
    }
    if (isOpen) {
      showCart()
    }
  }, [isOpen])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId)
    setCartItems((prevItems) => prevItems.filter((item) => item.item.id !== itemId))
  }
  const handleCheckout=async ()=>{
    const cartcheckoutData=
      {
        "restaurant_id":3,
        "delivery_address":"Mazgaon mumbai",
        "lat":72.164,
        "lon":18.245,
        "date":"23/1/2025",
        "total_price":total,
        "time_of_order":"afternoon"
    }
    const response=await apiServices.createOrder(cartcheckoutData,mock_customer_token)
    setCartItems([])
    console.log(response.data.mssg)
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveFromCart(item.item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

