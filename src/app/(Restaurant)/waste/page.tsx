"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"

export default function WasteDashboard() {
  const seasonData = {
    season: ["Other", "Summer", "Winter"],
    no_of_orders: [5, 10, 15],
  }

  const categoryData = {
    category: ["Beverages", "Fastfood"],
    no_of_orders: [10, 20],
  }

  const timeData = {
    time_of_order: ["Afternoon", "Evening", "Midnight", "Morning", "Night"],
    no_of_orders: [4, 9, 7, 4, 6],
  }

  const analysis = `After analyzing the provided data, I'll provide a detailed analysis of the cancelled orders and offer suggestions for improvement.

**Seasonal Analysis**

* Winter season has the highest number of cancelled orders (14), followed by Summer (11) and Other (5).
* This suggests that the winter season is more prone to order cancellations, possibly due to weather-related issues or increased demand.

**Time of Order Analysis**

* Midnight and Evening time slots have the highest number of cancelled orders (7 and 6 respectively), followed by Morning, Afternoon, and Night time slots.
* This indicates that orders placed during late night hours and evening hours are more likely to get cancelled.

**Category-wise Analysis**

* Fastfood category has the highest number of cancelled orders (17), followed by Beverages (12).
* This suggests that Fastfood items are more prone to cancellations, possibly due to issues with food quality, preparation time, or delivery.

**Item-wise Analysis**

* Frankie and Vadapav are the most cancelled items (4 times each), followed by Cold Coffee (3 times).
* This indicates that these specific items might have quality control issues, are difficult to prepare, or are frequently out of stock.

**Price Analysis**

* The highest total price of cancelled orders is ₹2115.0, and the lowest is ₹910.0.
* There is no clear correlation between the total price and the likelihood of order cancellation.

**Suggestions**

1. **Seasonal Planning**: Implement measures to mitigate winter season-related issues, such as increased staffing, weather-resistant packaging, and prioritized order fulfillment.
2. **Time-Slot Optimization**: Analyze and optimize the midnight and evening time slots to reduce cancellations, potentially by increasing staff, improving order processing, or offering incentives for timely delivery.
3. **Quality Control**: Focus on improving the quality and consistency of Fastfood items, particularly Frankie and Vadapav, to reduce cancellations.
4. **Inventory Management**: Ensure that frequently cancelled items, like Cold Coffee, are always in stock and readily available to fulfill orders.
5. **Customer Feedback**: Collect and analyze customer feedback to identify root causes of cancellations and improve overall customer satisfaction.

By addressing these areas, you can reduce the number of cancelled orders, improve customer satisfaction, and increase revenue.`

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
                  {seasonData.season.map((season, index) => (
                    <TableRow key={season}>
                      <TableCell>{season}</TableCell>
                      <TableCell>{seasonData.no_of_orders[index]}</TableCell>
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
                  {categoryData.category.map((category, index) => (
                    <TableRow key={category}>
                      <TableCell>{category}</TableCell>
                      <TableCell>{categoryData.no_of_orders[index]}</TableCell>
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
                  {timeData.time_of_order.map((time, index) => (
                    <TableRow key={time}>
                      <TableCell>{time}</TableCell>
                      <TableCell>{timeData.no_of_orders[index]}</TableCell>
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
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

