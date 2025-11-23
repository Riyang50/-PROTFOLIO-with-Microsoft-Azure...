"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, BarChart3, PieChart, LineChart, ArrowLeft } from "lucide-react"
import Link from "next/link"

type DataRow = Record<string, string | number>

export default function CSVVisualizer() {
  const [data, setData] = useState<DataRow[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [chartType, setChartType] = useState<"bar" | "pie" | "line">("bar")
  const [selectedColumn, setSelectedColumn] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length === 0) return

      const headerLine = lines[0].split(",").map((h) => h.trim())
      setHeaders(headerLine)
      setSelectedColumn(headerLine[0])

      const dataRows = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim())
        const row: DataRow = {}
        headerLine.forEach((header, index) => {
          const value = values[index]
          row[header] = isNaN(Number(value)) ? value : Number(value)
        })
        return row
      })

      setData(dataRows)
    }
    reader.readAsText(file)
  }

  const getChartData = () => {
    if (!selectedColumn || data.length === 0) return []

    const valueCounts: Record<string, number> = {}
    data.forEach((row) => {
      const value = String(row[selectedColumn])
      valueCounts[value] = (valueCounts[value] || 0) + 1
    })

    return Object.entries(valueCounts).slice(0, 10)
  }

  const chartData = getChartData()
  const maxValue = Math.max(...chartData.map(([, count]) => count), 1)

  const downloadSample = () => {
    const sampleCSV = `Name,Age,City,Salary
John Doe,28,New York,75000
Jane Smith,34,Los Angeles,82000
Bob Johnson,45,Chicago,68000
Alice Brown,29,Houston,71000
Charlie Davis,38,Phoenix,79000
Eva Wilson,31,Philadelphia,73000
Frank Miller,42,San Antonio,76000
Grace Lee,27,San Diego,70000`

    const blob = new Blob([sampleCSV], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample-data.csv"
    a.click()
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">CSV Data Visualizer</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your CSV file to visualize and analyze data with interactive charts
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>Select a CSV file from your computer to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="csv-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      <Upload className="h-5 w-5" />
                      <span className="text-sm">Click to upload CSV file</span>
                    </div>
                    <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                  </Label>
                </div>
                <Button variant="outline" onClick={downloadSample} className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Sample
                </Button>
              </div>

              {data.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Loaded {data.length} rows with {headers.length} columns
                </div>
              )}
            </CardContent>
          </Card>

          {data.length > 0 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Data Visualization</CardTitle>
                  <CardDescription>Choose a column and chart type to visualize your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="column-select" className="mb-2 block">
                        Select Column
                      </Label>
                      <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                        <SelectTrigger id="column-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {headers.map((header) => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label className="mb-2 block">Chart Type</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={chartType === "bar" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("bar")}
                          className="gap-2"
                        >
                          <BarChart3 className="h-4 w-4" />
                          Bar
                        </Button>
                        <Button
                          variant={chartType === "pie" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("pie")}
                          className="gap-2"
                        >
                          <PieChart className="h-4 w-4" />
                          Pie
                        </Button>
                        <Button
                          variant={chartType === "line" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("line")}
                          className="gap-2"
                        >
                          <LineChart className="h-4 w-4" />
                          Line
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-muted rounded-lg">
                    {chartType === "bar" && (
                      <div className="space-y-3">
                        {chartData.map(([label, count]) => (
                          <div key={label} className="flex items-center gap-4">
                            <div className="w-32 text-sm truncate">{label}</div>
                            <div className="flex-1 flex items-center gap-2">
                              <div
                                className="h-8 bg-primary rounded transition-all"
                                style={{ width: `${(count / maxValue) * 100}%` }}
                              />
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {chartType === "pie" && (
                      <div className="flex justify-center items-center h-64">
                        <div className="text-center text-muted-foreground">
                          Pie chart visualization showing distribution of {selectedColumn}
                          <div className="mt-4 grid grid-cols-2 gap-2 max-w-sm mx-auto">
                            {chartData.map(([label, count]) => (
                              <div key={label} className="text-sm flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary rounded-full" />
                                <span>
                                  {label}: {count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {chartType === "line" && (
                      <div className="h-64 flex items-end gap-2 justify-around">
                        {chartData.map(([label, count]) => (
                          <div key={label} className="flex flex-col items-center gap-2">
                            <div
                              className="w-8 bg-primary rounded-t"
                              style={{ height: `${(count / maxValue) * 200}px` }}
                            />
                            <span className="text-xs truncate w-20 text-center">{label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Preview</CardTitle>
                  <CardDescription>First 5 rows of your uploaded data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.slice(0, 5).map((row, index) => (
                          <TableRow key={index}>
                            {headers.map((header) => (
                              <TableCell key={header}>{String(row[header])}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
