"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import apiServices from "@/services/api"

interface SeasonData {
  season: string[]
  no_of_orders_cancelled: number[]
}

interface CategoryData {
  category: string[]
  no_of_orders_cancelled: number[]
}

interface TimeData {
  time_of_order: string[]
  no_of_orders_cancelled: number[]
}

interface WastageAnalysisData {
  orders_per_season: SeasonData
  orders_per_category: CategoryData
  orders_per_time: TimeData
  analysis: string
}

export default function WasteDashboard() {
  const [data, setData] = useState<WastageAnalysisData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiServices.wastageAnalysis("")
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Waste Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders Cancelled by Season</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Season</TableHead>
                    <TableHead>Number of Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.orders_per_season.season.map((season, index) => (
                    <TableRow key={season}>
                      <TableCell>{season}</TableCell>
                      <TableCell>{data.orders_per_season.no_of_orders_cancelled[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders Cancelled by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Number of Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.orders_per_category.category.map((category, index) => (
                    <TableRow key={category}>
                      <TableCell>{category}</TableCell>
                      <TableCell>{data.orders_per_category.no_of_orders_cancelled[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders Cancelled by Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time of Order</TableHead>
                    <TableHead>Number of Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.orders_per_time.time_of_order.map((time, index) => (
                    <TableRow key={time}>
                      <TableCell>{time}</TableCell>
                      <TableCell>{data.orders_per_time.no_of_orders_cancelled[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <ReactMarkdown>{data.analysis}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

