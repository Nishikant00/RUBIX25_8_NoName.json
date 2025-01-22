"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { LocationSearch } from "@/components/LocationSearch"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Star } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"

interface Restaurant {
  id: number
  name: string
  cuisine: string
  rating: number
  image: string
}

const fetchRestaurants = async (location: string): Promise<Restaurant[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    { id: 1, name: "Pasta Paradise", cuisine: "Italian", rating: 4.5, image: "/restaurant1.jpg" },
    { id: 2, name: "Sushi Sensation", cuisine: "Japanese", rating: 4.8, image: "/restaurant2.jpg" },
    { id: 3, name: "Burger Bliss", cuisine: "American", rating: 4.2, image: "/restaurant3.jpg" },
  ]
}

export default function RestaurantSearch() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const backgroundImages = ["/carousel1.jpg", "/carousel2.jpg", "/carousel3.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLocationChange = async (location: string) => {
    setIsLoading(true)
    setShowResults(true)
    const results = await fetchRestaurants(location)
    setRestaurants(results)
    setIsLoading(false)
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
          {isLoading ? (
            <p className="p-4 text-center text-gray-600">Searching for the best spots...</p>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Restaurants Near You</h2>
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                    <p className="text-gray-600">{restaurant.cuisine}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

