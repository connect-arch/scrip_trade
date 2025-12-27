import { getCurrentUser } from "./auth"
import { createNotification } from "./notifications"

export type ScripType = "RODTEP" | "ROSCTL"
export type ScripStatus = "pending" | "quoted" | "accepted" | "rejected" | "completed"
export type BRCStatus = "Full Generated" | "Partially Generated"

export interface Scrip {
  id: string
  userId: string
  userName: string
  userEmail: string
  userCompany: string
  userIecId: string
  userPhone: string
  scripType: ScripType
  amount: number
  quantity: number
  issueDate: string
  brcStatus: BRCStatus
  documentation: string
  status: ScripStatus
  postedDate: string
  quotedRate?: number
  acceptedRate?: number
  updatedDate?: string
  adminNotes?: string
}

const SCRIPS_KEY = "scrip_trade_scrips"

/* -------------------- Helpers -------------------- */

export function getScrips(): Scrip[] {
  if (typeof window === "undefined") return []
  const scrips = localStorage.getItem(SCRIPS_KEY)
  return scrips ? (JSON.parse(scrips) as Scrip[]) : []
}

function saveScrips(scrips: Scrip[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(SCRIPS_KEY, JSON.stringify(scrips))
}

export function getUserScrips(userId: string): Scrip[] {
  return getScrips().filter((scrip) => scrip.userId === userId)
}

export function getScripById(id: string): Scrip | undefined {
  return getScrips().find((scrip) => scrip.id === id)
}

/* -------------------- Create -------------------- */

export function createScrip(
  scripType: ScripType,
  amount: number,
  quantity: number,
  issueDate: string,
  brcStatus: BRCStatus,
  documentation: string,
): { success: boolean; scrip?: Scrip; error?: string } {
  const user = getCurrentUser()

  if (!user) {
    return { success: false, error: "User not authenticated" }
  }

  const scrip: Scrip = {
    id: crypto.randomUUID(),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userCompany: user.companyName,
    userIecId: user.iecId,
    userPhone: user.phoneNumber,
    scripType,
    amount,
    quantity,
    issueDate,
    brcStatus,
    documentation,
    status: "pending",
    postedDate: new Date().toISOString(),
  }

  const scrips = getScrips()
  scrips.push(scrip)
  saveScrips(scrips)

  createNotification(
    user.id,
    "scrip_posted",
    "Scrip Posted Successfully",
    `Your ${scripType} scrip for ₹${amount.toLocaleString()} has been submitted. Admin will review and provide rates shortly.`,
    scrip.id,
  )

  return { success: true, scrip }
}

/* -------------------- Admin Actions -------------------- */

export function setScripRate(
  scripId: string,
  rate: number,
  adminNotes?: string,
): { success: boolean; error?: string } {
  const scrips = getScrips()
  const index = scrips.findIndex((s) => s.id === scripId)

  if (index === -1) {
    return { success: false, error: "Scrip not found" }
  }

  const scrip = scrips[index]

  scrips[index] = {
    ...scrip,
    status: "quoted",
    quotedRate: rate,
    updatedDate: new Date().toISOString(),
    adminNotes,
  }

  saveScrips(scrips)

  createNotification(
    scrip.userId,
    "rate_quoted",
    "Rate Quote Available",
    `Admin has reviewed your ${scrip.scripType} scrip. Rate offered: ${(rate * 100).toFixed(2)}%`,
    scripId,
  )

  return { success: true }
}

/* -------------------- User Actions -------------------- */

export function acceptRate(scripId: string): { success: boolean; error?: string } {
  const scrips = getScrips()
  const index = scrips.findIndex((s) => s.id === scripId)

  if (index === -1) {
    return { success: false, error: "Scrip not found" }
  }

  const scrip = scrips[index]

  if (scrip.status !== "quoted") {
    return { success: false, error: "Invalid scrip status" }
  }

  scrips[index] = {
    ...scrip,
    status: "accepted",
    acceptedRate: scrip.quotedRate,
    updatedDate: new Date().toISOString(),
  }

  saveScrips(scrips)

  createNotification(
    scrip.userId,
    "rate_accepted",
    "Rate Accepted Successfully",
    `You accepted the rate of ${((scrip.quotedRate || 0) * 100).toFixed(2)}% for your ${scrip.scripType} scrip.`,
    scripId,
  )

  createNotification(
    scrip.userId,
    "contact_initiated",
    "Contact Initiated",
    "Our team will reach out to you within 24 hours to complete the transaction process.",
    scripId,
  )

  return { success: true }
}

export function rejectRate(scripId: string): { success: boolean; error?: string } {
  const scrips = getScrips()
  const index = scrips.findIndex((s) => s.id === scripId)

  if (index === -1) {
    return { success: false, error: "Scrip not found" }
  }

  const scrip = scrips[index]

  if (scrip.status !== "quoted") {
    return { success: false, error: "Invalid scrip status" }
  }

  scrips[index] = {
    ...scrip,
    status: "rejected",
    updatedDate: new Date().toISOString(),
  }

  saveScrips(scrips)

  createNotification(
    scrip.userId,
    "rate_declined",
    "Rate Declined",
    `You declined the rate for your ${scrip.scripType} scrip. We'll continue to find better rates for you.`,
    scripId,
  )

  return { success: true }
}
