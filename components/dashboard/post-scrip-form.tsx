"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createScrip, type ScripType, type BRCStatus } from "@/lib/scrips"
import { Loader2, CheckCircle, FileText, Calendar, Shield, Upload } from "lucide-react"

export function PostScripForm({ onSuccess }: { onSuccess?: () => void }) {
  const [scripType, setScripType] = useState<ScripType>("RODTEP")
  const [amount, setAmount] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [brcStatus, setBrcStatus] = useState<BRCStatus>("Full Generated")
  const [documentation, setDocumentation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const result = createScrip(scripType, Number.parseFloat(amount), 0, issueDate, brcStatus, documentation)

      if (result.success) {
        setSuccess(true)
        setAmount("")
        setIssueDate("")
        setDocumentation("")
        setTimeout(() => {
          setSuccess(false)
          onSuccess?.()
        }, 2000)
      } else {
        setError(result.error || "Failed to post scrip")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Post New Scrip</CardTitle>
            <CardDescription className="text-base">List your duty credit scrip for expert rate review</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive" className="animate-scale-in">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 animate-scale-in">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-900 dark:text-green-100 font-medium">
                Scrip posted successfully! Admin will review and provide rates shortly.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="scripType" className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Scrip Type
              </Label>
              <Select value={scripType} onValueChange={(value) => setScripType(value as ScripType)}>
                <SelectTrigger id="scripType" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RODTEP">RODTEP - Remission of Duties and Taxes on Exported Products</SelectItem>
                  <SelectItem value="ROSCTL">ROSCTL - Rebate of State and Central Taxes and Levies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="amount" className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Scrip Amount (INR)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={loading}
                min="1"
                step="0.01"
                className="h-12 text-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="issueDate" className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Scrip Issue Date
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                required
                disabled={loading}
                max={new Date().toISOString().split("T")[0]}
                className="h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="brcStatus" className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                BRC Status
              </Label>
              <Select value={brcStatus} onValueChange={(value) => setBrcStatus(value as BRCStatus)}>
                <SelectTrigger id="brcStatus" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Generated">Full Generated - Complete BRC Available</SelectItem>
                  <SelectItem value="Partially Generated">Partially Generated - Partial BRC</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Bank Realization Certificate status</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="documentation" className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Documentation Details
            </Label>
            <Textarea
              id="documentation"
              placeholder="Enter complete scrip details including certificate number, export details, shipping bill numbers, and any other relevant information..."
              value={documentation}
              onChange={(e) => setDocumentation(e.target.value)}
              required
              disabled={loading}
              rows={5}
              className="text-base resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting Your Scrip...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Post Scrip for Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
