"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PostScripForm } from "@/components/dashboard/post-scrip-form"
import { ScripsList } from "@/components/dashboard/scrips-list"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import { ComplianceInfo } from "@/components/compliance/compliance-info"
import { SupportCenter } from "@/components/support/support-center"
import { SecuritySettings } from "@/components/security/security-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, CheckCircle, Shield, HelpCircle, Settings, Clock, DollarSign } from "lucide-react"
import { getUserScrips } from "@/lib/scrips"
import { getUnreadCount } from "@/lib/notifications"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    quoted: 0,
    accepted: 0,
  })

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/login")
    } else {
      updateStats()
      updateNotificationCount()
    }
  }, [router, refreshKey])

  useEffect(() => {
    const interval = setInterval(updateNotificationCount, 5000)
    return () => clearInterval(interval)
  }, [])

  const updateStats = () => {
    const user = getCurrentUser()
    if (user) {
      const scrips = getUserScrips(user.id)
      setStats({
        total: scrips.length,
        pending: scrips.filter((s) => s.status === "pending").length,
        quoted: scrips.filter((s) => s.status === "quoted").length,
        accepted: scrips.filter((s) => s.status === "accepted").length,
      })
    }
  }

  const updateNotificationCount = () => {
    const user = getCurrentUser()
    if (user) {
      setUnreadCount(getUnreadCount(user.id))
    }
  }

  const handlePostSuccess = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-400 text-lg">Manage your duty credit scrips and track your transactions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stat-card-hover border-2 border-blue-500/30 overflow-hidden relative bg-gradient-to-br from-blue-900/50 to-blue-950/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm font-medium text-blue-300">Total Scrips</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-5xl font-bold pt-2 text-blue-200">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-xs text-blue-300/70">All posted scrips</p>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 border-yellow-500/30 overflow-hidden relative bg-gradient-to-br from-yellow-900/50 to-yellow-950/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm font-medium text-yellow-300">Pending Review</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white icon-pulse" />
                </div>
              </div>
              <CardTitle className="text-5xl font-bold pt-2 text-yellow-200">{stats.pending}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-xs text-yellow-300/70">Awaiting admin rates</p>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 border-red-500/30 overflow-hidden relative bg-gradient-to-br from-red-900/50 to-red-950/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm font-medium text-red-300">Rate Quoted</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-5xl font-bold pt-2 text-red-200">{stats.quoted}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-xs text-red-300/70">Rates provided</p>
            </CardContent>
          </Card>

          <Card className="stat-card-hover border-2 border-green-500/30 overflow-hidden relative bg-gradient-to-br from-slate-800/90 to-black/90 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm font-medium text-green-300">Accepted</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-5xl font-bold pt-2 text-green-200">{stats.accepted}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-xs text-green-300/70">Successfully traded</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scrips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-slate-800/50 border border-slate-700">
            <TabsTrigger
              value="scrips"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              My Scrips
            </TabsTrigger>
            <TabsTrigger
              value="post"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-yellow-700 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4" />
              Post New
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="relative gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white"
            >
              Alerts
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-red-500 text-white border-0">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="compliance"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-700 data-[state=active]:to-blue-800 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-700 data-[state=active]:to-yellow-800 data-[state=active]:text-white"
            >
              <HelpCircle className="h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-black data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scrips" className="space-y-4 animate-scale-in">
            <ScripsList refresh={refreshKey} />
          </TabsContent>

          <TabsContent value="post" className="animate-scale-in">
            <PostScripForm onSuccess={handlePostSuccess} />
          </TabsContent>

          <TabsContent value="notifications" className="animate-scale-in">
            <NotificationsPanel />
          </TabsContent>

          <TabsContent value="compliance" className="animate-scale-in">
            <ComplianceInfo />
          </TabsContent>

          <TabsContent value="support" className="animate-scale-in">
            <SupportCenter />
          </TabsContent>

          <TabsContent value="security" className="animate-scale-in">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
