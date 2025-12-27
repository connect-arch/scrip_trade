export interface User {
  id: string
  email: string
  name: string
  companyName: string
  iecId: string
  phoneNumber: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

// Mock user storage (in production, this would be a database)
const USERS_KEY = "scrip_trade_users"
const CURRENT_USER_KEY = "scrip_trade_current_user"

export function getUsers(): Record<string, any> {
  if (typeof window === "undefined") return {}
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : {}
}

function saveUsers(users: Record<string, any>) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
  companyName: string,
  iecId: string,
  phoneNumber: string,
): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const users = getUsers()

  if (users[email]) {
    return {
      success: false,
      error: "Email already registered",
    }
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    name,
    companyName,
    iecId,
    phoneNumber,
    createdAt: new Date().toISOString(),
  }

  users[email] = {
    ...user,
    password, // In production, this should be hashed
  }

  saveUsers(users)
  setCurrentUser(user)

  return {
    success: true,
    user,
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const users = getUsers()
  const userData = users[email]

  if (!userData || userData.password !== password) {
    return {
      success: false,
      error: "Invalid email or password",
    }
  }

  const user: User = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    companyName: userData.companyName,
    iecId: userData.iecId,
    phoneNumber: userData.phoneNumber,
    createdAt: userData.createdAt,
  }

  setCurrentUser(user)

  return {
    success: true,
    user,
  }
}

export function logout() {
  setCurrentUser(null)
}
