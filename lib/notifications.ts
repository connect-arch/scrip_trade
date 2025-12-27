export interface Notification {
  id: string
  userId: string
  type:
  | "scrip_posted"
  | "rate_quoted"
  | "rate_accepted"
  | "rate_declined"
  | "contact_initiated"
  | "system"

  title: string
  message: string
  scripId?: string
  read: boolean
  createdAt: string
}

const NOTIFICATIONS_KEY = "scrip_trade_notifications"

export function getNotifications(): Notification[] {
  if (typeof window === "undefined") return []
  const notifications = localStorage.getItem(NOTIFICATIONS_KEY)
  return notifications ? JSON.parse(notifications) : []
}

function saveNotifications(notifications: Notification[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
}

export function getUserNotifications(userId: string): Notification[] {
  const notifications = getNotifications()
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function createNotification(
  userId: string,
  type: Notification["type"],
  title: string,
  message: string,
  scripId?: string,
): Notification {
  const notification: Notification = {
    id: crypto.randomUUID(),
    userId,
    type,
    title,
    message,
    scripId,
    read: false,
    createdAt: new Date().toISOString(),
  }

  const notifications = getNotifications()
  notifications.push(notification)
  saveNotifications(notifications)

  return notification
}

export function markAsRead(notificationId: string) {
  const notifications = getNotifications()
  const index = notifications.findIndex((n) => n.id === notificationId)
  if (index !== -1) {
    notifications[index].read = true
    saveNotifications(notifications)
  }
}

export function markAllAsRead(userId: string) {
  const notifications = getNotifications()
  const updated = notifications.map((n) => (n.userId === userId ? { ...n, read: true } : n))
  saveNotifications(updated)
}

export function getUnreadCount(userId: string): number {
  const notifications = getUserNotifications(userId)
  return notifications.filter((n) => !n.read).length
}
