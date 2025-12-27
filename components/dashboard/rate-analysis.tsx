"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { RateBreakdown, RateComparison } from "@/lib/rate-engine"
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

export function RateAnalysis({
  breakdown,
  comparison,
}: {
  breakdown: RateBreakdown
  comparison: RateComparison
}) {
  const formatRate = (rate: number) => `${(rate * 100).toFixed(2)}%`
  const formatAdjustment = (adj: number) => {
    const formatted = `${(Math.abs(adj) * 100).toFixed(2)}%`
    return adj >= 0 ? `+${formatted}` : `-${formatted}`
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Rate Breakdown</CardTitle>
          <CardDescription>Detailed analysis of your quoted rate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Base Rate</span>
              <span className="font-semibold">{formatRate(breakdown.baseRate)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Market Demand</span>
              <span className={`font-semibold ${breakdown.demandAdjustment >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatAdjustment(breakdown.demandAdjustment)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Supply Conditions</span>
              <span className={`font-semibold ${breakdown.supplyAdjustment >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatAdjustment(breakdown.supplyAdjustment)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Volume Discount</span>
              <span className="font-semibold text-green-600">{formatAdjustment(breakdown.volumeDiscount)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Market Volatility</span>
              <span className={`font-semibold ${breakdown.marketVolatility >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatAdjustment(breakdown.marketVolatility)}
              </span>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Final Rate</span>
                <span className="text-2xl font-bold text-accent">{formatRate(breakdown.finalRate)}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Rate Confidence</span>
                <span className="text-sm font-semibold">{breakdown.confidence}%</span>
              </div>
              <Progress value={breakdown.confidence} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Comparison</CardTitle>
          <CardDescription>How your rate compares to market average</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Your Rate</span>
              <span className="font-semibold">{formatRate(comparison.currentRate)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Market Average</span>
              <span className="font-semibold">{formatRate(comparison.marketAverage)}</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Your Advantage</span>
                {comparison.advantagePercentage > 0 ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {comparison.advantagePercentage.toFixed(2)}% better
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    <TrendingDown className="mr-1 h-3 w-3" />
                    {Math.abs(comparison.advantagePercentage).toFixed(2)}% below
                  </Badge>
                )}
              </div>

              {comparison.savingsAmount > 0 ? (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm text-green-900 dark:text-green-100">
                    You're getting{" "}
                    <span className="font-bold">
                      ₹{comparison.savingsAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>{" "}
                    more than market average!
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    We're working to find you a better rate. Check back soon for improved offers.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
