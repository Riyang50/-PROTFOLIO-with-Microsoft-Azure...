"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Sample stock data generator
const generateStockData = (symbol: string, days = 30) => {
  const data = []
  let basePrice = Math.random() * 500 + 100
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const change = (Math.random() - 0.5) * 20
    basePrice += change
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: Math.max(basePrice, 10),
    })
  }
  return data
}

export default function StockAnalyzer() {
  const [symbol, setSymbol] = useState("AAPL")
  const [stockData, setStockData] = useState(generateStockData("AAPL"))

  const handleAnalyze = () => {
    if (symbol.trim()) {
      setStockData(generateStockData(symbol.toUpperCase()))
    }
  }

  const currentPrice = stockData[stockData.length - 1]?.price || 0
  const previousPrice = stockData[stockData.length - 2]?.price || 0
  const priceChange = currentPrice - previousPrice
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2)

  const movingAverage = (data: typeof stockData, period: number) => {
    const result = []
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        result.push(null)
      } else {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.price, 0)
        result.push(sum / period)
      }
    }
    return result
  }

  const ma7 = movingAverage(stockData, 7)
  const ma30 = movingAverage(stockData, 30)

  const chartData = {
    labels: stockData.map((d) => d.date),
    datasets: [
      {
        label: "Stock Price",
        data: stockData.map((d) => d.price),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "7-Day MA",
        data: ma7,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "transparent",
        tension: 0.4,
        borderDash: [5, 5],
      },
      {
        label: "30-Day MA",
        data: ma30,
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "transparent",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => "$" + value.toFixed(2),
        },
      },
    },
  }

  const highPrice = Math.max(...stockData.map((d) => d.price))
  const lowPrice = Math.min(...stockData.map((d) => d.price))
  const avgPrice = stockData.reduce((acc, d) => acc + d.price, 0) / stockData.length

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-6xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Stock Price Analyzer</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Analyze stock price trends with moving averages and key statistics
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Stock Symbol</CardTitle>
              <CardDescription>Type any stock symbol to generate analysis (demo data)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="symbol">Stock Symbol</Label>
                  <Input
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g., AAPL, GOOGL, MSFT"
                    className="mt-2"
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAnalyze}>Analyze</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${priceChange >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {priceChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(2)} ({percentChange}%)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">High (30D)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${highPrice.toFixed(2)}</div>
                <Badge variant="secondary" className="mt-2">
                  Peak Value
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Low (30D)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${lowPrice.toFixed(2)}</div>
                <Badge variant="secondary" className="mt-2">
                  Minimum Value
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average (30D)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${avgPrice.toFixed(2)}</div>
                <Badge variant="secondary" className="mt-2">
                  Mean Price
                </Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Price Chart with Moving Averages</CardTitle>
              <CardDescription>30-day price history with 7-day and 30-day moving averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Technical Indicators</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>7-Day Moving Average: ${ma7[ma7.length - 1]?.toFixed(2) || "N/A"}</li>
                    <li>30-Day Moving Average: ${ma30[ma30.length - 1]?.toFixed(2) || "N/A"}</li>
                    <li>Volatility Range: ${(highPrice - lowPrice).toFixed(2)}</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> This is a demo application using randomly generated data. For real stock
                    analysis, integrate with financial APIs like Alpha Vantage or Yahoo Finance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
