"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star } from "lucide-react"
import { useCart } from "@/components/CartContext"
import { ReviewForm } from "@/components/ReviewForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import apiServices, { ngrok_url } from "@/services/api"
import { mock_customer_token } from "@/data/userdata"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  avatar?: string
}

export default function DishPage() {
  const { id }:{id:string} = useParams()
  const { addToCart } = useCart()
  const [reviews, setReviews] = useState<any>([])
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || ''
  const rating = searchParams.get('rating') || '0'
  const image = searchParams.get('image') || '/placeholder.svg'
  const price = searchParams.get('price') || '0'

  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const fetchedReviews = await apiServices.showFoodItemReviews({ item_id: id as string });
          setReviews(fetchedReviews.data.reviews);
          console.log(reviews)
        } catch (error) {
          console.error('Failed to fetch reviews:', error);
          setReviews([]); 
        }
      };
      fetchReviews();
    }
  }, [id]);

  const handleSubmitReview = async (newReview: Omit<Review, "id">) => {
    try {
      await apiServices.addReview(
        {"item_id":id?.toString(), "review":newReview.comment},
        mock_customer_token,
      );
      
      const review = {
        id: Date.now(),
        ...newReview,
      };
      setReviews([...reviews, review]);
      setIsReviewModalOpen(false);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  }

  return (
    <div className="mt-24 container mx-auto px-4 py-8 h-screen">
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader className="p-0">
          <Image
            src={ngrok_url+image}
            alt={name}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <CardTitle className="text-3xl mb-2">{name}</CardTitle>
              <CardDescription className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-semibold mr-1">{rating}</span>
                <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
              </CardDescription>
            </div>
          </div>
          <Button 
            className="w-full bg-[#ef6f2c] hover:bg-[#d15d1e]" 
            onClick={() => addToCart(id.toString(), Number(price))}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reviews</CardTitle>
          <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Write a Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogDescription>Share your experience with this dish</DialogDescription>
              </DialogHeader>
              <ReviewForm onSubmit={handleSubmitReview} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          {reviews.map((review: any, index: number) => (
  <Card key={index}>
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={review.avatar} />
          <AvatarFallback>{review.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <CardDescription className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.stars ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p>{review.review}</p>
    </CardContent>
  </Card>
))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}