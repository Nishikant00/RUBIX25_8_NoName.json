import React, { useState } from "react"
import { Search, MapPin, Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LocationSearchProps {
  onLocationChange: (location: string) => void
}

export function LocationSearch({ onLocationChange }: LocationSearchProps) {
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    onLocationChange(location)
  }

  const handleCurrentLocation = () => {
    // In a real application, you would use the Geolocation API here
    setLocation("Current Location")
    onLocationChange("Current Location")
  }

  return (
    <div className="flex items-center space-x-2 bg-white rounded-full p-2 shadow-lg">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <MapPin className="mr-2 h-4 w-4" />
            {location || "Where"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Location</h4>
            <Input placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Button variant="outline" className="w-full" onClick={handleCurrentLocation}>
              <Crosshair className="mr-2 h-4 w-4" />
              Use current location
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={handleSearch} size="icon" className="shrink-0">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  )
}

