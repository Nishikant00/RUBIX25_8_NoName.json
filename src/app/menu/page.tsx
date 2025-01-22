"use client"

import { useState } from "react"
import { useCart } from "@/components/CartContext"
import { dishes } from "@/data/dishes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Star } from "lucide-react"

export default function Page() {
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const filteredDishes = dishes.filter(
    (dish:any) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || dish.category === categoryFilter),
  )

  const categories = Array.from(new Set(dishes.map((dish:any) => dish.category)))

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
        {filteredDishes.map((dish:any) => (
          <Card key={dish.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src={dish.image || "/placeholder.svg"}
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
                <span className="font-semibold mr-1">{dish.rating}</span>
                <span className="text-sm text-gray-500">({dish.reviews} reviews)</span>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <div>
                <span className="text-lg font-bold text-[#ef6f2c]">₹{dish.price}</span>
                {dish.vegetarian && (
                  <Badge variant="secondary" className="ml-2">
                    Veg
                  </Badge>
                )}
              </div>
              <Button className="bg-[#ef6f2c] hover:bg-[#d15d1e]" onClick={() => addToCart(dish.id)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

