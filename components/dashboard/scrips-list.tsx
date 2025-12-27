"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getUserScrips, type Scrip, acceptRate, rejectRate } from "@/lib/scrips"
import { getCurrentUser } from "@/lib/auth"
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Calendar,
  FileCheck,
  IndianRupee,
  Package,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ScripsList({ refresh }: { refresh?: number }) {
  const [scrips, setScrips] = useState<Scrip[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadScrips = () => {
    const user = getCurrentUser()
    if (user) {
      const userScrips = getUserScrips(user.id)
      setScrips(userScrips.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()))
    }
    setLoading(false)
  }

  useEffect(() => {
    loadScrips()
  }, [refresh])

  useEffect(() => {
    const interval = setInterval(() => {
      const user = getCurrentUser()
      if (user) {
        const userScrips = getUserScrips(user.id)
        setScrips(userScrips.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleAccept = async (scripId: string) => {
    setActionLoading(scripId)
    const result = acceptRate(scripId)
    if (result.success) {
      loadScrips()
    }
    setActionLoading(null)
  }

  const handleReject = async (scripId: string) => {
    setActionLoading(scripId)
    const result = rejectRate(scripId)
    if (result.success) {
      loadScrips()
    }
    setActionLoading(null)
  }

  const getStatusBadge = (status: Scrip["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900 dark:to-orange-900 dark:text-yellow-100 border-0 px-3 py-1"
          >
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            Pending Review
          </Badge>
        )
      case "quoted":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-100 border-0 px-3 py-1"
          >
            <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
            Rate Quoted
          </Badge>
        )
      case "accepted":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-100 border-0 px-3 py-1"
          >
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
            Accepted
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900 dark:to-pink-900 dark:text-red-100 border-0 px-3 py-1"
          >
            <XCircle className="mr-1.5 h-3.5 w-3.5" />
            Declined
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <Card className="border-2">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Loading your scrips...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (scrips.length === 0) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-primary" />
          </div>
          <p className="text-xl font-semibold mb-2">No scrips posted yet</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Get started by posting your first duty credit scrip using the "Post New" tab above
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {scrips.map((scrip) => (
        <Card key={scrip.id} className="border-2 stat-card-hover overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
          <CardHeader className="bg-gradient-to-br from-muted/30 to-transparent">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {scrip.scripType}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Posted on{" "}
                      {new Date(scrip.postedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </CardDescription>
                  </div>
                </div>
              </div>
              {getStatusBadge(scrip.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
                    <IndianRupee className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</p>
                </div>
                <p className="text-xl font-bold">₹{scrip.amount.toLocaleString("en-IN")}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Issue Date</p>
                </div>
                <p className="text-sm font-semibold">{new Date(scrip.issueDate).toLocaleDateString("en-IN")}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">BRC Status</p>
                </div>
                <p className="text-sm font-semibold">{scrip.brcStatus}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center">
                    <Package className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Scrip Type</p>
                </div>
                <p className="text-sm font-semibold">{scrip.scripType}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-muted-foreground" />
                Documentation Details
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{scrip.documentation}</p>
            </div>

            {scrip.status === "pending" && (
              <Alert className="border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400 icon-pulse" />
                  </div>
                  <AlertDescription className="text-yellow-900 dark:text-yellow-100">
                    <p className="font-semibold mb-1">Under Admin Review</p>
                    <p className="text-sm">
                      Your scrip is being reviewed by our expert team. You'll receive a notification with the
                      competitive rate shortly.
                    </p>
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {scrip.status === "quoted" && scrip.quotedRate && (
              <div className="space-y-4">
                <Alert className="border-2 border-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <AlertDescription className="text-green-900 dark:text-green-100 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-lg">Rate Offered by Admin</p>
                        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-base px-3 py-1">
                          {(scrip.quotedRate * 100).toFixed(2)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                        <IndianRupee className="h-5 w-5" />
                        <div>
                          <p className="text-xs font-medium opacity-75">Expected Payout</p>
                          <p className="text-xl font-bold">
                            ₹{(scrip.amount * scrip.quotedRate).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </AlertDescription>
                  </div>
                </Alert>

                {scrip.adminNotes && (
                  <div className="p-4 bg-gradient-to-br from-muted/50 to-muted rounded-xl border-2">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Admin Notes
                    </p>
                    <p className="text-sm leading-relaxed">{scrip.adminNotes}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAccept(scrip.id)}
                    disabled={actionLoading === scrip.id}
                    className="flex-1 h-12 text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {actionLoading === scrip.id ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Accept Rate
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(scrip.id)}
                    disabled={actionLoading === scrip.id}
                    className="flex-1 h-12 text-base border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                  >
                    {actionLoading === scrip.id ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-2 h-5 w-5" />
                        Decline
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {scrip.status === "accepted" && scrip.acceptedRate && (
              <Alert className="border-2 border-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <AlertDescription className="text-green-900 dark:text-green-100">
                    <p className="font-bold text-lg mb-2">Rate Accepted: {(scrip.acceptedRate * 100).toFixed(2)}%</p>
                    <p className="text-sm">
                      Great choice! Our team will contact you at{" "}
                      <span className="font-semibold">{scrip.userEmail}</span> within 24 hours to complete the
                      transaction securely.
                    </p>
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {scrip.status === "rejected" && (
              <Alert className="border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <AlertDescription className="text-orange-900 dark:text-orange-100">
                    <p className="font-bold text-lg mb-2">Rate Declined</p>
                    <p className="text-sm">
                      We're actively working to find better rates for you. Stay tuned for new opportunities and improved
                      offers.
                    </p>
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
