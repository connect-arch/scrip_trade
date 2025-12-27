import { LoginForm } from "@/components/auth/login-form"
import { BackToHomeButton } from "@/components/ui/back-to-home-button"
import { TrendingUp, Shield, Zap, Lock, DollarSign, Award } from "lucide-react"

export const metadata = {
  title: "Sign In - ScripTrade",
  description: "Sign in to your ScripTrade account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-float" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-1/4 animate-float">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-400/30">
            <TrendingUp className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float-delayed">
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-red-400/30">
            <Shield className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute top-1/2 right-20 animate-float-slow">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-yellow-400/30">
            <Zap className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute top-20 left-20 animate-float" style={{ animationDelay: "3s" }}>
          <div className="bg-gradient-to-br from-slate-800 to-black p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-600/30">
            <Lock className="h-10 w-10 text-yellow-400" />
          </div>
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float-delayed" style={{ animationDelay: "4s" }}>
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-500/30">
            <DollarSign className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute top-2/3 left-1/3 animate-float-slow" style={{ animationDelay: "2.5s" }}>
          <div className="bg-gradient-to-br from-red-500 to-red-700 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-red-400/30">
            <Award className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      <div className="fixed top-6 left-6 z-[100] pointer-events-auto">
        <BackToHomeButton />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  )
}
