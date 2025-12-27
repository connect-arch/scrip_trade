"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/auth"
import { Shield, LogOut, Building2, FileText } from "lucide-react"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [iecId, setIecId] = useState("")

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/login")
    } else {
      setUserName(user.name)
      setCompanyName(user.companyName)
      setIecId(user.iecId)
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-xl font-semibold">ScripTrade</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{companyName}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-mono">{iecId}</span>
              </div>
            </div>
            <div className="h-6 hidden md:block w-px bg-border" />
            <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
        <div className="md:hidden mt-3 pt-3 border-t border-border flex flex-col space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Building2 className="h-3.5 w-3.5" />
            <span>{companyName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-mono">{iecId}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
