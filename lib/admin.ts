// Admin authentication and management
export interface Admin {
  id: string
  username: string
  email: string
  role: "admin"
}

const ADMIN_KEY = "scrip_trade_admins"
const ADMIN_SESSION_KEY = "scrip_trade_admin_session"

// Default admin credentials (in production, use proper authentication)
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123", // In production, use proper password hashing
  email: "admin@scriptrading.com",
}

export function adminLogin(username: string, password: string): { success: boolean; error?: string } {
  if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
    const admin: Admin = {
      id: "admin-1",
      username: DEFAULT_ADMIN.username,
      email: DEFAULT_ADMIN.email,
      role: "admin",
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin))
    }

    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

export function getAdminSession(): Admin | null {
  if (typeof window === "undefined") return null
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY)
  return session ? JSON.parse(session) : null
}

export function adminLogout() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

export function isAdmin(): boolean {
  return getAdminSession() !== null
}
