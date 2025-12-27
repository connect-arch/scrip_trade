"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Key, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Security Overview
          </CardTitle>
          <CardDescription>Protect your account with enhanced security measures</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              Your account security is our priority. Enable additional security features to protect your transactions
              and personal information.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-accent" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require a code from your phone when signing in</p>
            </div>
            <Switch id="2fa" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-yellow-900 dark:text-yellow-100">
                Two-factor authentication will be enabled on your next login. You'll need to set up an authenticator app
                or receive codes via SMS.
              </AlertDescription>
            </Alert>
          )}

          {!twoFactorEnabled && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Two-factor authentication is currently disabled. We strongly recommend enabling it to secure your
                account against unauthorized access.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-accent" />
            Password Security
          </CardTitle>
          <CardDescription>Manage your password and recovery options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Change Password
            </Button>
            <p className="text-xs text-muted-foreground px-4">Last changed: Never (account created recently)</p>
          </div>

          <div className="border-t pt-4 space-y-3">
            <p className="text-sm font-medium">Password Requirements:</p>
            <ul className="text-sm text-muted-foreground space-y-1 pl-5">
              <li className="list-disc">Minimum 8 characters</li>
              <li className="list-disc">Mix of uppercase and lowercase letters recommended</li>
              <li className="list-disc">Include numbers and special characters for stronger security</li>
              <li className="list-disc">Avoid common words or personal information</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you receive security alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email alerts for account activity</p>
            </div>
            <Switch id="email-notif" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
            </div>
            <Switch id="login-alerts" checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Encryption</CardTitle>
          <CardDescription>How we protect your information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">End-to-End Encryption</p>
              <p>All data transmission is encrypted using industry-standard TLS/SSL protocols</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Secure Storage</p>
              <p>Your data is stored in encrypted format with bank-grade security measures</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Regular Security Audits</p>
              <p>Our platform undergoes regular security assessments to ensure compliance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showSuccess && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-900 dark:text-green-100">
            Security settings updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSave} className="w-full">
        Save Security Settings
      </Button>
    </div>
  )
}
