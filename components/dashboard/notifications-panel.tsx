"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getUserNotifications, markAsRead, markAllAsRead, type Notification } from "@/lib/notifications"
import { getCurrentUser } from "@/lib/auth"
import { Bell, CheckCheck, TrendingUp, CheckCircle, XCircle, MessageSquare } from "lucide-react"

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const loadNotifications = () => {
    const user = getCurrentUser()
    if (user) {
      const userNotifications = getUserNotifications(user.id)
      setNotifications(userNotifications)
      setUnreadCount(userNotifications.filter((n) => !n.read).length)
    }
  }

  useEffect(() => {
    loadNotifications()

    // Poll for new notifications
    const interval = setInterval(loadNotifications, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId)
    loadNotifications()
  }

  const handleMarkAllAsRead = () => {
    const user = getCurrentUser()
    if (user) {
      markAllAsRead(user.id)
      loadNotifications()
    }
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "rate_quoted":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "rate_accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rate_declined":
        return <XCircle className="h-4 w-4 text-orange-500" />
      case "contact_initiated":
        return <MessageSquare className="h-4 w-4 text-accent" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Stay updated on your scrip transactions</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
              <p className="text-sm text-muted-foreground mt-1">We'll notify you about your scrip activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? "bg-card" : "bg-accent/5 border-accent/20"
                  } hover:bg-muted/50 transition-colors cursor-pointer`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
