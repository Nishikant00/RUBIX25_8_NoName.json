"use client"
import React, { useEffect, useRef, useState } from 'react';
import apiServices from "@/services/api";
import { useParams } from "next/navigation";
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    google?: any;
  }
}


const OrderTracking: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [routeData, setRouteData] = useState<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google?.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          initializeMap();
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      if (mapRef.current && window.google?.maps) {
        const initialMap = new window.google.maps.Map(mapRef.current, {
          zoom: 14,
          center: { lat: 18.952638786157994, lng: 72.82092761056496 },
        });
        setMap(initialMap);
      }
    };

    loadGoogleMapsScript().catch(error => {
      console.error("Failed to load Google Maps script:", error);
    });
  }, []);

  const fetchRouteData = async () => {
    try {
      const response:any = await apiServices.getRoute({
        "order_id": id,
        "partner_lat": 18.952638786157994,
        "partner_lon": 72.82092761056496
      });
      
      console.log(response.data)
      setRouteData(response.data);
      
      if (window.google?.maps) {
        initMap(response.data);
      } else {
        console.error("Google Maps not loaded");
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  const initMap = (routeData:any) => {
    if (!map) return;
  
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
  
    
  
    // Update map center
    map.setCenter({ lat: routeData.origin.latitude, lng: routeData.origin.longitude });
  
    // Decode the polyline and render the route
    const path = window.google.maps.geometry.encoding.decodePath(routeData.data.polyline.encodedPolyline);
   
    // Create new markers
    const newMarkers = [
      { 
        position: { lat: routeData.origin.latitude, lng: routeData.origin.longitude }, 
        title: "Origin", 
        label: "You" 
      },
      { 
        position: { lat: routeData.middle.latitude, lng: routeData.middle.longitude }, 
        title: "Waypoint", 
        label: "Restaurant" 
      },
      { 
        position: { lat: routeData.destination.latitude, lng: routeData.destination.longitude }, 
        title: "Destination", 
        label: "Customer" 
      }
    ].map(({ position, title, label }) => 
      new window.google.maps.Marker({
        position,
        map: map,
        title,
        label,
      })
    );
  
    setMarkers(newMarkers);
  
    // Create route polyline
    new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    });
  };
  return (
    <div className="container mx-auto p-4 ">
        <h1 className='text-4xl'>Your </h1>
      <div 
        ref={mapRef} 
        className="mx-auto max-w-[600px] h-[500px] mb-4" 
      />
      <Button 
        onClick={fetchRouteData} 
        className="max-w-[600px] mx-auto"
      >
        Get Route
      </Button>
     
    </div>
  );
};

export default OrderTracking;