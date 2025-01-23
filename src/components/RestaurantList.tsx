"use client"

import * as React from "react"
import { useState } from "react"
import { LocationSearch } from "@/components/LocationSearch"
import apiServices from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface Restaurant {
  rest_id: string
  name: string
  location: {
    lat: number
    lon: number
  }
  address: string
}

export function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.rest_id}>
          <CardHeader>
            <CardTitle>{restaurant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Address: {restaurant.address}</p>
            <p>Location: {restaurant.location.lat}, {restaurant.location.lon}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function RestaurantSearch() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLocationChange = async (location: string) => {
    setIsLoading(true)
    try {
      const response = await apiServices.getResto(location)
      
      const restaurantData = Array.isArray(response.data) 
        ? response.data.map(item => item.data)
        : response.data;
  
      setRestaurants(restaurantData)
    } catch (error) {
      console.error("Failed to fetch restaurants:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <LocationSearch onLocationChange={handleLocationChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <RestaurantList restaurants={restaurants} />
      )}
    </div>
  )
}