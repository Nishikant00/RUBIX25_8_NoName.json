"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Truck, Utensils, Facebook, Instagram, Twitter, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BoxReveal } from "@/components/ui/box-reveal"
import { useCart } from "@/components/CartContext"
import { dishes } from "@/data/dishes"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf0ea]">
      <Hero />
      <Features />
      <PopularDishes />
      <Testimonials />
      <DecorativeSvg />
    </main>
  )
}

function Hero() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <LeftSection />
        <RightSection />
      </div>
    </section>
  )
}

function LeftSection() {
  return (
    <div className="w-full lg:w-1/2 text-center lg:text-left">
      <BoxReveal boxColor="#ef6f2c" duration={0.5}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold p-2">
          Jomajo<span className="text-[#ef6f2c]">.</span>
        </h1>
      </BoxReveal>

      <BoxReveal boxColor="#ef6f2c" duration={0.5}>
        <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold">
          Instant Food Delivery <span className="text-[#ef6f2c]">Quick Delivery</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor="#ef6f2c" duration={0.5}>
        <div className="mt-6 text-lg sm:text-xl">
          <p>
            → Nearby <span className="font-semibold text-[#ef6f2c]">Mumbai</span>,{" "}
            <span className="font-semibold text-[#ef6f2c]">Thane</span>,{" "}
            <span className="font-semibold text-[#ef6f2c]">Pune</span>, and{" "}
            <span className="font-semibold text-[#ef6f2c]">Navi Mumbai</span>. <br />→ In 30 Minutes
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor="#ef6f2c" duration={0.5}>
        <button className="mt-8 bg-[#ef6f2c] hover:bg-[#d15d1e] text-white px-8 py-3 rounded-full text-lg sm:text-xl font-medium transition-colors duration-300">
          Explore
        </button>
      </BoxReveal>
    </div>
  )
}

function RightSection() {
  return (
    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <BoxReveal boxColor="#ef6f2c" duration={0.5}>
        <div className="relative w-full max-w-md">
          <Image
            src="/foods.png"
            alt="Various delicious food items from Jomajo"
            width={600}
            height={600}
            className="rounded-2xl shadow-xl"
          />
        </div>
      </BoxReveal>
    </div>
  )
}

function DecorativeSvg() {
  return (
    <svg
      className="absolute top-48 right-[870px] hidden xl:block"
      width="50"
      height="70"
      viewBox="0 0 65 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M8.35385 1L4.79097 7.72716C2.95819 11.1877 2 15.0441 2 18.96V24.6509L3.47469 40.8005C3.70045 43.2728 4.30845 45.6952 5.27699 47.9811L11.0769 61.6698M11.0769 61.6698L20.0506 59.5665C24.0246 58.635 25.664 53.8741 23.1059 50.6934V50.6934C20.2544 47.1478 14.5818 48.3566 13.4234 52.7566L11.0769 61.6698ZM11.0769 61.6698L18.9436 74.695L28.6256 86.6918L35.7018 94.7082C37.0304 96.2134 38.5426 97.5458 40.203 98.6744L45.7 102.411C47.4209 103.581 49.2866 104.522 51.2502 105.21L61 108.629M61 108.629L50.4103 110M61 108.629L52.8308 100.745"
        stroke="#ED3A3A"
        strokeOpacity="0.5"
        strokeWidth="3"
      />
    </svg>
    
    
  )
  
}

const features = [
  {
    icon: <Clock className="w-12 h-12 text-[#ef6f2c]" />,
    title: "Fast Delivery",
    description: "Get your food delivered in 30 minutes or less.",
  },
  {
    icon: <Truck className="w-12 h-12 text-[#ef6f2c]" />,
    title: "Wide Coverage",
    description: "We deliver to Mumbai, Thane, Pune, and Navi Mumbai.",
  },
  {
    icon: <Utensils className="w-12 h-12 text-[#ef6f2c]" />,
    title: "Quality Food",
    description: "Enjoy delicious meals from top-rated restaurants.",
  },
]

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <BoxReveal boxColor="#ef6f2c" duration={0.5}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Choose Jomajo?</h2>
        </BoxReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#fdf0ea] p-6 rounded-lg shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PopularDishes() {
  const { addToCart } = useCart()

  return (
    <section className="py-20 bg-[#fdf0ea]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          Popular Dishes
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.slice(0, 4).map((dish) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
              <Link href="/menu">
                <CardHeader className="p-0">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-2">{dish.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold mr-1">{dish.rating}</span>
                    <span className="text-sm text-gray-500">({dish.reviews} reviews)</span>
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <div>
                    <span className="text-lg font-bold text-[#ef6f2c]">₹{dish.price}</span>
                    {dish.vegetarian && (
                      <Badge variant="secondary" className="ml-2">
                        Veg
                      </Badge>
                    )}
                  </div>
                 
                </CardFooter>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "Priya Sharma",
    image: "/cat.jpg",
    text: "Jomajo has been a lifesaver! The food always arrives hot and on time.",
  },
  {
    name: "Rahul Patel",
    image: "/cat.jpg",
    text: "I love the variety of restaurants available on Jomajo. It's my go-to app for food delivery.",
  },
  {
    name: "Anita Desai",
    image: "/cat.jpg",
    text: "The customer service is excellent. They always resolve any issues promptly.",
  },
]

function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <BoxReveal boxColor="#ef6f2c" duration={0.5}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
        </BoxReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#fdf0ea] p-6 rounded-lg shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
                <p className="italic mb-4">"{testimonial.text}"</p>
                <h3 className="font-semibold">{testimonial.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

