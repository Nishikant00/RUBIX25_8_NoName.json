import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface Restaurant {
  id: number
  name: string
  cuisine: string
  rating: number
}

interface RestaurantListProps {
  restaurants: Restaurant[]
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id}>
          <CardHeader>
            <CardTitle>{restaurant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Rating: {restaurant.rating}/5</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

