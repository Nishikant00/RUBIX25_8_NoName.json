"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, ThumbsDown, Star, TrendingUp, BarChart3, Loader2 } from "lucide-react"
import apiServices from "@/services/api"

interface SentimentData {
  average_sentiment: number
  count_per_sentiment: Array<{
    stars: number
    sentiment_count: number
  }>
  average_per_month: {
    month: number[]
    average_sentiment: number[]
  }
  positive_sentiments: Array<{
    review: string
    sentiment: string
  }>
  negative_sentiments: Array<{
    review: string
    sentiment: string
  }>
}

const dummyData: SentimentData = {
  average_sentiment: 4.0,
  count_per_sentiment: [
    { stars: 5, sentiment_count: 2 },
    { stars: 4, sentiment_count: 1 },
    { stars: 1, sentiment_count: 1 },
  ],
  average_per_month: {
    month: [1.0],
    average_sentiment: [4.0],
  },
  positive_sentiments: [
    { review: "quanity is less but fine good to go", sentiment: "positive" },
    { review: "very good taste", sentiment: "excellent" },
    { review: "what a butter chicken it was... so delicious .. plz eat it whenver u go", sentiment: "excellent" },
  ],
  negative_sentiments: [{ review: "cockraoch found with an eel . very bad taste", sentiment: "very negative" }],
}

export default function Page() {
  const [data, setData] = useState<SentimentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiServices.sentimentAnalysis("")
        console.log(response)
        setData(response.data)
      } catch (err) {
        console.error("Failed to fetch sentiment data:", err)
        setData(dummyData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>No data available</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="p-4 space-y-4 ml-[100px]">
      {" "}
      <h1 className="text-3xl font-bold mb-6">Sentiment Analysis Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.average_sentiment.toFixed(1)}/5.0</div>
            <p className="text-xs text-muted-foreground">Overall rating based on all reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.count_per_sentiment.reduce((acc, curr) => acc + curr.sentiment_count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Combined positive and negative reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.average_per_month.average_sentiment[0].toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Average sentiment for current month</p>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Sentiment Distribution</CardTitle>
          <CardDescription>Number of reviews per rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.count_per_sentiment.map(({ stars, sentiment_count }) => (
              <div key={stars} className="flex items-center gap-2">
                <div className="w-12 text-sm">{stars} stars</div>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(sentiment_count / data.count_per_sentiment.reduce((acc, curr) => acc + curr.sentiment_count, 0)) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-12 text-sm text-right">{sentiment_count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Positive Reviews</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            {data.positive_sentiments.map((review, index) => (
              <div key={index} className="space-y-2 border-b last:border-0 pb-4 last:pb-0">
                <p className="text-sm">{review.review}</p>
                <Badge variant="outline" className="bg-green-50">
                  {review.sentiment}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Negative Reviews</CardTitle>
            <ThumbsDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            {data.negative_sentiments.map((review, index) => (
              <div key={index} className="space-y-2 border-b last:border-0 pb-4 last:pb-0">
                <p className="text-sm">{review.review}</p>
                <Badge variant="outline" className="bg-red-50">
                  {review.sentiment}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

