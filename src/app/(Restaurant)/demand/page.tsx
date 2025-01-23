"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import apiServices from "@/services/api"
import { Skeleton } from "@/components/ui/skeleton"

interface DataItem {
  total_price: number
  category?: string
  name?: string
}

interface DataByTime {
  [key: string]: DataItem[]
}

interface DataBySeason {
  [key: string]: DataItem[]
}

interface DashboardData {
  item_time_result: DataByTime
  item_season_result: DataBySeason
  category_season_result: DataBySeason
  category_time_result: DataByTime
}

const dummyData: DashboardData = {
  item_time_result: {
    Morning: [
      { name: "Coffee", total_price: 1000 },
      { name: "Sandwich", total_price: 1500 },
    ],
    Afternoon: [
      { name: "Salad", total_price: 1200 },
      { name: "Juice", total_price: 800 },
    ],
  },
  item_season_result: {
    Summer: [
      { name: "Ice Cream", total_price: 2000 },
      { name: "Cold Drinks", total_price: 1800 },
    ],
    Winter: [
      { name: "Hot Chocolate", total_price: 1500 },
      { name: "Soup", total_price: 1700 },
    ],
  },
  category_season_result: {
    Summer: [
      { category: "Desserts", total_price: 3000 },
      { category: "Beverages", total_price: 2500 },
    ],
    Winter: [
      { category: "Hot Beverages", total_price: 2800 },
      { category: "Soups", total_price: 2200 },
    ],
  },
  category_time_result: {
    Morning: [
      { category: "Breakfast", total_price: 3500 },
      { category: "Beverages", total_price: 2000 },
    ],
    Evening: [
      { category: "Snacks", total_price: 2800 },
      { category: "Desserts", total_price: 2500 },
    ],
  },
}

export default function DemandDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiServices.demandAnalysis("")
        if (result && Object.keys(result).length > 0) {
          setData(result)
        } else {
          console.log("API returned empty data. Using dummy data.")
          setData(dummyData)
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        console.log("Error occurred. Using dummy data.")
        setData(dummyData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const prepareChartData = (data: DataByTime | DataBySeason) => {
    return Object.entries(data).map(([key, value]) => ({
      name: key,
      ...value.reduce(
        (acc, item) => {
          acc[item.name || item.category || ""] = item.total_price
          return acc
        },
        {} as { [key: string]: number },
      ),
    }))
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!data) {
    return <ErrorMessage message="No data available" />
  }

  const itemTimeData = prepareChartData(data.item_time_result)
  const itemSeasonData = prepareChartData(data.item_season_result)
  const categorySeasonData = prepareChartData(data.category_season_result)
  const categoryTimeData = prepareChartData(data.category_time_result)

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Demand Dashboard</h2>
      <div className="mr-8 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <ChartCard title="Items by Time of Day" data={itemTimeData} />
        <ChartCard title="Items by Season" data={itemSeasonData} />
        <ChartCard title="Categories by Season" data={categorySeasonData} />
        <ChartCard title="Categories by Time of Day" data={categoryTimeData} />
      </div>
    </div>
  )
}

function ChartCard({ title, data }: { title: string; data: any[] }) {
  return (

    <Card className="mx-8 md:w-[400px] lg:w-[800px] h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0] || {})
              .filter((key) => key !== "name")
              .map((key, index) => (
                <Bar key={key} dataKey={key} fill={`hsl(${index * 60}, 70%, 50%)`} />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Skeleton className="h-8 w-[200px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="w-full h-[400px]">
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Demand Dashboard</h2>
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-red-500">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}

