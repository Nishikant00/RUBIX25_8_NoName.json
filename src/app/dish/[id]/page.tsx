"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { dishes } from "@/data/dishes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star } from "lucide-react"
import { useCart } from "@/components/CartContext"
import { ReviewForm } from "@/components/ReviewForm"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
}

export default function DishPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const dish = dishes.find((d) => d.id.toString() === id)
  const [reviews, setReviews] = useState<Review[]>([])

  if (!dish) {
    return <div>Dish not found</div>
  }

  const handleSubmitReview = (newReview: Omit<Review, "id">) => {
    const review = {
      id: Date.now(),
      ...newReview,
    }
    setReviews([...reviews, review])
  }

  return (
    <div className="mt-24 container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader className="p-0">
          <Image
            src={dish.image || "/placeholder.svg"}
            alt={dish.name}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <CardTitle className="text-3xl mb-2">{dish.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-semibold mr-1">{dish.rating}</span>
                <span className="text-sm text-gray-500">({dish.reviews} reviews)</span>
              </CardDescription>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#ef6f2c]">₹{dish.price}</span>
              {dish.vegetarian && (
                <Badge variant="secondary" className="ml-2">
                  Veg
                </Badge>
              )}
            </div>
          </div>
          <Button className="w-full bg-[#ef6f2c] hover:bg-[#d15d1e]" onClick={() => addToCart(dish.id)}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewForm onSubmit={handleSubmitReview} />

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

