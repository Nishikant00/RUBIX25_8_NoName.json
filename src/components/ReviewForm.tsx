import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; comment: string }) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newReview)
    setNewReview({ name: "", rating: 5, comment: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: Number.parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

