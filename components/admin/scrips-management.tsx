"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getScrips, setScripRate, type Scrip } from "@/lib/scrips"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  IndianRupee,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Building2,
  CreditCard,
  Phone,
  Mail,
  User,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function ScripsManagement() {
  const [scrips, setScrips] = useState<Scrip[]>([])
  const [selectedScrip, setSelectedScrip] = useState<Scrip | null>(null)
  const [rate, setRate] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "quoted">("pending")

  useEffect(() => {
    loadScrips()
  }, [filter])

  const loadScrips = () => {
    const allScrips = getScrips()
    const filtered = filter === "all" ? allScrips : allScrips.filter((s) => s.status === filter)
    setScrips(filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()))
  }

  const handleSetRate = () => {
    if (!selectedScrip) return

    const rateValue = Number.parseFloat(rate) / 100

    if (rateValue < 0.5 || rateValue > 1) {
      setError("Rate must be between 50% and 100%")
      return
    }

    const result = setScripRate(selectedScrip.id, rateValue, adminNotes)

    if (result.success) {
      setSuccess("Rate set successfully!")
      setRate("")
      setAdminNotes("")
      setDialogOpen(false)
      setSelectedScrip(null)
      setTimeout(() => {
        setSuccess("")
        loadScrips()
      }, 2000)
    } else {
      setError(result.error || "Failed to set rate")
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline"; label: string }> = {
      pending: { variant: "secondary", label: "Pending Review" },
      quoted: { variant: "default", label: "Rate Quoted" },
      accepted: { variant: "outline", label: "Accepted" },
      rejected: { variant: "outline", label: "Rejected" },
    }
    const config = variants[status] || { variant: "outline", label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {success && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-900 dark:text-green-100">{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
          <Clock className="h-4 w-4 mr-2" />
          Pending ({getScrips().filter((s) => s.status === "pending").length})
        </Button>
        <Button variant={filter === "quoted" ? "default" : "outline"} onClick={() => setFilter("quoted")}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Quoted ({getScrips().filter((s) => s.status === "quoted").length})
        </Button>
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All Scrips ({getScrips().length})
        </Button>
      </div>

      <div className="grid gap-4">
        {scrips.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No scrips found in this category
            </CardContent>
          </Card>
        ) : (
          scrips.map((scrip) => (
            <Card key={scrip.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-base">
                        {scrip.scripType}
                      </Badge>
                      <span className="text-2xl font-bold">₹{scrip.amount.toLocaleString()}</span>
                    </CardTitle>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2 border">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">User Contact Details</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Name:</span>
                          <span>{scrip.userName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Company:</span>
                          <span>{scrip.userCompany}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Email:</span>
                          <a href={`mailto:${scrip.userEmail}`} className="text-primary hover:underline">
                            {scrip.userEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Phone:</span>
                          <a href={`tel:${scrip.userPhone}`} className="text-primary hover:underline">
                            {scrip.userPhone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm md:col-span-2">
                          <CreditCard className="h-4 w-4 text-indigo-600" />
                          <span className="font-medium">IEC ID:</span>
                          <span className="font-mono">{scrip.userIecId}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-3">
                      Posted: {formatDistanceToNow(new Date(scrip.postedDate), { addSuffix: true })}
                    </CardDescription>
                  </div>
                  {getStatusBadge(scrip.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Issue Date: {new Date(scrip.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>BRC: {scrip.brcStatus}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Documentation:</p>
                  <p className="text-sm text-muted-foreground">{scrip.documentation}</p>
                </div>
                {scrip.quotedRate && (
                  <div className="mb-4 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Quoted Rate: {(scrip.quotedRate * 100).toFixed(2)}%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Amount to user: ₹{(scrip.amount * scrip.quotedRate).toLocaleString()}
                    </p>
                    {scrip.adminNotes && (
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Notes:</span> {scrip.adminNotes}
                      </p>
                    )}
                  </div>
                )}
                {scrip.status === "pending" && (
                  <Dialog
                    open={dialogOpen && selectedScrip?.id === scrip.id}
                    onOpenChange={(open) => {
                      setDialogOpen(open)
                      if (!open) {
                        setSelectedScrip(null)
                        setRate("")
                        setAdminNotes("")
                        setError("")
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedScrip(scrip)
                          setDialogOpen(true)
                        }}
                      >
                        <IndianRupee className="h-4 w-4 mr-2" />
                        Set Rate
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Rate for Scrip</DialogTitle>
                        <DialogDescription>
                          Enter the rate percentage for {scrip.scripType} scrip of ₹{scrip.amount.toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {error && (
                          <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="rate">Rate Percentage (%)</Label>
                          <Input
                            id="rate"
                            type="number"
                            placeholder="e.g., 94.5"
                            value={rate}
                            onChange={(e) => {
                              setRate(e.target.value)
                              setError("")
                            }}
                            min="50"
                            max="100"
                            step="0.01"
                          />
                          <p className="text-xs text-muted-foreground">
                            {rate &&
                              `User will receive: ₹${(scrip.amount * (Number.parseFloat(rate) / 100)).toLocaleString()}`}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Admin Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any notes about this rate..."
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <Button onClick={handleSetRate} className="w-full">
                          Confirm Rate
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
