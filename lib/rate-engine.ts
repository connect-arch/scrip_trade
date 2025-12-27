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
  confidence: number // 0-100
}

// Simulated market conditions
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

  return {
    ...baseConditions[scripType],
    lastUpdated: new Date().toISOString(),
  }
}

export function calculateDetailedRate(scrip: Scrip): RateBreakdown {
  const marketConditions = getMarketConditions(scrip.scripType)

  // ✅ SAFE quantity usage (single source)
  const qty = scrip.quantity ?? 0

  // Base rate
  const baseRate = scrip.scripType === "RODTEP" ? 0.95 : 0.93

  // Demand & supply adjustments
  const demandAdjustment = (marketConditions.demandScore - 0.5) * 0.04
  const supplyAdjustment = (0.5 - marketConditions.supplyScore) * 0.03

  // Volume discount
  let volumeDiscount = 0
  if (qty > 100000) {
    volumeDiscount = 0.02
  } else if (qty > 50000) {
    volumeDiscount = 0.01
  } else if (qty > 25000) {
    volumeDiscount = 0.005
  }

  // Volatility adjustment
  const marketVolatility = -marketConditions.volatilityIndex * 0.02

  // Final rate (bounded)
  const finalRate = Math.max(
    0.85,
    Math.min(
      0.98,
      baseRate +
        demandAdjustment +
        supplyAdjustment +
        volumeDiscount +
        marketVolatility,
    ),
  )

  // Confidence score
  const volumeConfidence = Math.min(100, (qty / 100000) * 40 + 40)
  const marketConfidence = (1 - marketConditions.volatilityIndex) * 30
  const confidence = Math.round(
    Math.min(100, volumeConfidence + marketConfidence),
  )

  return {
    baseRate,
    demandAdjustment,
    supplyAdjustment,
    volumeDiscount,
    marketVolatility,
    finalRate: Math.round(finalRate * 10000) / 10000,
    confidence,
  }
}

export function getHistoricalRates(
  scripType: ScripType,
): Array<{ date: string; rate: number }> {
  const rates: Array<{ date: string; rate: number }> = []
  const baseRate = scripType === "RODTEP" ? 0.95 : 0.93

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const fluctuation =
      Math.sin(i / 5) * 0.02 + (Math.random() - 0.5) * 0.01

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

export function compareRate(
  scrip: Scrip,
  quotedRate: number,
): RateComparison {
  const qty = scrip.quantity ?? 0
  const marketAverage = scrip.scripType === "RODTEP" ? 0.92 : 0.9

  const advantagePercentage =
    ((quotedRate - marketAverage) / marketAverage) * 100

  const savingsAmount = qty * (quotedRate - marketAverage)

  return {
    currentRate: quotedRate,
    marketAverage,
    advantagePercentage: Math.round(advantagePercentage * 100) / 100,
    savingsAmount: Math.round(savingsAmount * 100) / 100,
  }
}
