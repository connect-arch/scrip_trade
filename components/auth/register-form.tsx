"use client"

import type React from "react"
import { Shield, User, Mail, Phone, Building2, CreditCard, Lock, Sparkles } from "lucide-react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { register } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [iecId, setIecId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (iecId.length !== 10) {
      setError("IEC ID must be exactly 10 characters")
      return
    }

    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    setLoading(true)

    try {
      const result = await register(email, password, name, companyName, iecId, phoneNumber)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-2 shadow-2xl backdrop-blur-xl bg-white/95 hover:shadow-3xl transition-all duration-500 animate-fade-in">
      <div className="h-2 bg-gradient-to-r from-accent via-primary to-accent animate-gradient-x" />
      <CardHeader className="space-y-2 text-center pt-8 pb-4">
        <div className="mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-20 blur-2xl rounded-full animate-pulse" />
          <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20 flex items-center justify-center mb-4 shadow-xl">
            <Shield className="h-10 w-10 text-accent animate-float" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-primary animate-pulse" />
          </div>
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-x">
          Create Account
        </CardTitle>
        <CardDescription className="text-base font-medium">
          Register to start trading duty credit scrips
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-8">
          {error && (
            <Alert variant="destructive" className="border-2 animate-shake">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-accent" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="h-11 border-2 focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-11 border-2 focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              disabled={loading}
              className="h-11 border-2 focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="ABC Exports Pvt. Ltd."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              disabled={loading}
              className="h-11 border-2 focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iecId" className="text-sm font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-accent" />
              IEC ID
            </Label>
            <Input
              id="iecId"
              type="text"
              placeholder="0123456789"
              value={iecId}
              onChange={(e) => setIecId(e.target.value.toUpperCase())}
              required
              disabled={loading}
              maxLength={10}
              className="uppercase h-11 border-2 font-mono focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
            <p className="text-xs text-muted-foreground">10-character Importer Exporter Code</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={8}
              className="h-11 border-2 focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="h-11 border-2 focus:border-accent transition-all duration-300 hover:border-accent/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-accent hover:text-primary font-semibold hover:underline transition-colors"
            >
              Sign in here
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
