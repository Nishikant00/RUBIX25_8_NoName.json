"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"



export function ReviewForm({ onSubmit }: any) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({  rating, comment })
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <Label>Rating</Label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
              <Star className={`w-6 h-6 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </form>
  )
}

