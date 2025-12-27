"use client"

import type React from "react"
import { Shield, Mail, Lock, Sparkles } from "lucide-react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-2 shadow-2xl backdrop-blur-xl bg-white/95 hover:shadow-3xl transition-all duration-500 animate-fade-in">
      <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
      <CardHeader className="space-y-2 text-center pt-8 pb-6">
        <div className="mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl rounded-full animate-pulse" />
          <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center mb-4 shadow-xl">
            <Shield className="h-10 w-10 text-primary animate-float" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent animate-pulse" />
          </div>
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-base font-medium">
          Sign in to your account to manage your scrips
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 px-8">
          {error && (
            <Alert variant="destructive" className="border-2 animate-shake">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-12 text-base border-2 pl-4 focus:border-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-12 text-base border-2 pl-4 focus:border-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-primary hover:text-accent font-semibold hover:underline transition-colors"
            >
              Register here
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
