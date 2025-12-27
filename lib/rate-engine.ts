import type { Scrip, ScripType } from "./scrips"

export interface MarketConditions {
  demandScore: number // 0-1, higher means more demand
  supplyScore: number // 0-1, higher means more supply
  volatilityIndex: number // 0-1, higher means more volatile
  lastUpdated: string
}

export interface RateBreakdown {
  baseRate: number
  demandAdjustment: number
  supplyAdjustment: number
  volumeDiscount: number
  marketVolatility: number
  finalRate: number
  confidence: number // 0-100, rate confidence score
}

// Simulate market conditions (in production, this would fetch from a real market data API)
export function getMarketConditions(scripType: ScripType): MarketConditions {
  const baseConditions = {
    RODTEP: {
      demandScore: 0.75 + Math.random() * 0.15,
      supplyScore: 0.55 + Math.random() * 0.2,
      volatilityIndex: 0.1 + Math.random() * 0.15,
    },
    ROSCTL: {
      demandScore: 0.65 + Math.random() * 0.2,
      supplyScore: 0.6 + Math.random() * 0.2,
      volatilityIndex: 0.15 + Math.random() * 0.2,
    },
  }

  const conditions = baseConditions[scripType]

  return {
    ...conditions,
    lastUpdated: new Date().toISOString(),
  }
}

export function calculateDetailedRate(scrip: Scrip): RateBreakdown {
  const marketConditions = getMarketConditions(scrip.scripType)

  // Base rate depends on scrip type
  const baseRate = scrip.scripType === "RODTEP" ? 0.95 : 0.93

  // Demand adjustment: Higher demand = better rates
  const demandAdjustment = (marketConditions.demandScore - 0.5) * 0.04

  // Supply adjustment: Lower supply = better rates
  const supplyAdjustment = (0.5 - marketConditions.supplyScore) * 0.03

  // Volume discount: Larger quantities get better rates
  let volumeDiscount = 0
  if (scrip.quantity > 100000) {
    volumeDiscount = 0.02
  } else if (scrip.quantity > 50000) {
    volumeDiscount = 0.01
  } else if (scrip.quantity > 25000) {
    volumeDiscount = 0.005
  }

  // Market volatility: Higher volatility = slightly lower rates (risk adjustment)
  const marketVolatility = -marketConditions.volatilityIndex * 0.02

  // Calculate final rate
  const finalRate = Math.max(
    0.85, // Minimum rate floor
    Math.min(0.98, baseRate + demandAdjustment + supplyAdjustment + volumeDiscount + marketVolatility), // Maximum rate ceiling
  )

  // Calculate confidence score (higher volume and stable market = higher confidence)
  const volumeConfidence = Math.min(100, (scrip.quantity / 100000) * 40 + 40)
  const marketConfidence = (1 - marketConditions.volatilityIndex) * 30
  const confidence = Math.round(volumeConfidence + marketConfidence)

  return {
    baseRate,
    demandAdjustment,
    supplyAdjustment,
    volumeDiscount,
    marketVolatility,
    finalRate: Math.round(finalRate * 10000) / 10000,
    confidence: Math.min(100, confidence),
  }
}

export function getHistoricalRates(scripType: ScripType): Array<{ date: string; rate: number }> {
  // Simulate historical data for the last 30 days
  const rates: Array<{ date: string; rate: number }> = []
  const baseRate = scripType === "RODTEP" ? 0.95 : 0.93

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const fluctuation = Math.sin(i / 5) * 0.02 + (Math.random() - 0.5) * 0.01
    rates.push({
      date: date.toISOString().split("T")[0],
      rate: Math.round((baseRate + fluctuation) * 10000) / 10000,
    })
  }

  return rates
}

export interface RateComparison {
  currentRate: number
  marketAverage: number
  advantagePercentage: number
  savingsAmount: number
}

export function compareRate(scrip: Scrip, quotedRate: number): RateComparison {
  // Simulate market average (in production, this would be real market data)
  const marketAverage = scrip.scripType === "RODTEP" ? 0.92 : 0.9

  const advantagePercentage = ((quotedRate - marketAverage) / marketAverage) * 100
  const savingsAmount = scrip.quantity * (quotedRate - marketAverage)

  return {
    currentRate: quotedRate,
    marketAverage,
    advantagePercentage: Math.round(advantagePercentage * 100) / 100,
    savingsAmount: Math.round(savingsAmount * 100) / 100,
  }
}
