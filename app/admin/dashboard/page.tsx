"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAdminSession, adminLogout } from "@/lib/admin"
import { ScripsManagement } from "@/components/admin/scrips-management"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, LogOut, FileText, Clock, TrendingUp, CheckCircle, BarChart3, Activity } from "lucide-react"
import { getScrips } from "@/lib/scrips"

export default function AdminDashboardPage() {
  const router = useRouter()
  const admin = getAdminSession()

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login")
    }
  }, [admin, router])

  if (!admin) return null

  const scrips = getScrips()
  const stats = {
    total: scrips.length,
    pending: scrips.filter((s) => s.status === "pending").length,
    quoted: scrips.filter((s) => s.status === "quoted").length,
    accepted: scrips.filter((s) => s.status === "accepted").length,
  }

  const totalAmount = scrips.reduce((sum, s) => sum + s.amount, 0)

  const handleLogout = () => {
    adminLogout()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card border-b border-border backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-10 animate-pulse" />
                <Shield className="h-6 w-6 text-primary relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Scrip Trading Management System
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Welcome, Admin
          </h2>
          <p className="text-muted-foreground text-lg">Review scrips, set competitive rates, and manage transactions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="stat-card-hover border-2 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 group-hover:from-blue-500/10 group-hover:to-blue-600/10 transition-all" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <CardDescription className="text-sm font-semibold uppercase tracking-wide">
                  Total Scrips
                </CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-500 bg-clip-text text-transparent">
                {stats.total}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <BarChart3 className="h-3 w-3" />
                <span>All submissions</span>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 transition-all" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <CardDescription className="text-sm font-semibold uppercase tracking-wide">Pending</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400 icon-pulse" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-yellow-600 to-orange-500 bg-clip-text text-transparent">
                {stats.pending}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Awaiting review</span>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <CardDescription className="text-sm font-semibold uppercase tracking-wide">Quoted</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {stats.quoted}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Rates provided</span>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <CardDescription className="text-sm font-semibold uppercase tracking-wide">Accepted</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
                {stats.accepted}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Successfully traded</span>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 overflow-hidden relative group col-span-full lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <CardDescription className="text-sm font-semibold uppercase tracking-wide">Total Value</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                ₹{(totalAmount / 10000000).toFixed(2)}Cr
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Across all scrips</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <ScripsManagement />
      </main>
    </div>
  )
}
