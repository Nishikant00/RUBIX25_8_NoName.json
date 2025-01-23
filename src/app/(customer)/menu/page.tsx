"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/CartContext"
import { dishes } from "@/data/dishes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Star, Loader2 } from "lucide-react"
import Link from "next/link"
import apiServices, { ngrok_url } from "@/services/api"
import { mock_customer_token } from "@/data/userdata"

interface MenuItem {
  id: string
  name: string
  product_image: string
  category: string
  description: string
  base_price: string
  restaurant_info: {
    id: number
  }
  dynamic_price: number
}

export default function Page() {
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = new FormData()
        data.append("id", "3")
        const response = await apiServices.showItems(data)

        if (response.data?.data && Array.isArray(response.data.data)) {
          console.log("API Response Data:", response.data.data)
          setMenuItems(response.data.data)
        } else {
          console.warn("Invalid API response, using fallback data")
          setMenuItems([])
        }
      } catch (error) {
        console.error("Error fetching menu items:", error)
        setError("Failed to load menu items")
        setMenuItems([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const itemsToDisplay = menuItems.length > 0 ? menuItems : dishes

  const filteredDishes = itemsToDisplay.filter((dish: any) => {
    const nameMatch = dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = categoryFilter === "" || categoryFilter === "all" || dish.category === categoryFilter
    return nameMatch && categoryMatch
  })

  const categories = Array.from(new Set(itemsToDisplay.map((dish: any) => dish.category)))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}. Showing fallback data.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Dishes</h1>
      <div className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredDishes.map((dish: any) => (
          <Card key={dish.id} className="overflow-hidden">
            <Link 
              href={{
                pathname: `/dish/${dish.id}`,
                query: {
                  name: dish.name,
                  rating: dish.rating,
                  image: dish.product_image,
                  price: dish.base_price
                }
              }}
            >
              <CardHeader className="p-0">
                <Image
                  src={ngrok_url+dish.product_image || dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{dish.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-semibold mr-1">{dish.rating || "N/A"}</span>
                  <span className="text-sm text-gray-500">({dish.reviews || 0} reviews)</span>
                </CardDescription>
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between items-center p-4">
              <div>
                <span className="text-lg font-bold text-[#ef6f2c]">
                  ₹{dish.dynamic_price || dish.base_price || dish.price}
                </span>
                {dish.vegetarian && (
                  <Badge variant="secondary" className="ml-2">
                    Veg
                  </Badge>
                )}
              </div>
              <Button className="bg-[#ef6f2c] hover:bg-[#d15d1e]" onClick={() => addToCart(dish.id, dish.dynamic_price)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

