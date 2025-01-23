"use client"

import { useState } from "react"
import * as React from "react"
import { LocationSearch } from "@/components/LocationSearch"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

interface RestaurantData {
  rest_id: string
  name: string
  location: {
    lat: number
    lon: number
  }
  address: string
  id: string
}

export default function RestaurantSearch() {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([])
  const [showResults, setShowResults] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const backgroundImages = ["/carousel1.jpg", "/carousel2.jpg", "/carousel3.png"]

  const handleLocationChange = () => {
    const mockResponse = {
      "data": [
        {"data":{"rest_id":"9","name":"Mumbai Bites","location":{"lat":19.14979142005578,"lon":72.70838399584551},"address":"137 High Street, Andheri, Mumbai"},"id":"L-Vgk5QBUURvwbVkbcRM"},
        {"data":{"rest_id":"17","name":"Bollywood Bites","location":{"lat":19.189978329950648,"lon":73.14603978433172},"address":"160 Link Road, Bandra, Mumbai"},"id":"NeVlk5QBUURvwbVkFMTj"}
      ]
    };

    const parsedRestaurants = mockResponse.data.map(item => ({
      ...item.data,
      id: item.id
    }));

    setRestaurants(parsedRestaurants);
    setShowResults(true);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImages[currentImageIndex] || "/placeholder.svg"}
            alt="Restaurant background"
            fill
            style={{objectFit:"cover"}}
            quality={100}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-8 text-white text-center tracking-tight"
        >
          Discover Your Next Favorite Spot
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <LocationSearch onLocationChange={handleLocationChange} />
        </motion.div>
      </div>
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogTitle/>
        <DialogContent className="sm:max-w-[600px]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Restaurants Near You</h2>
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.address}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    ID: {restaurant.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}