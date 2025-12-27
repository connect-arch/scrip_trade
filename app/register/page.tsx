import { RegisterForm } from "@/components/auth/register-form"
import { BackToHomeButton } from "@/components/ui/back-to-home-button"
import { FileText, Users, Award, CheckCircle, Briefcase, Globe } from "lucide-react"

export const metadata = {
  title: "Register - ScripTrade",
  description: "Create your ScripTrade account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-float" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 animate-float">
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-yellow-400/30">
            <FileText className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-1/4 animate-float-delayed">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-400/30">
            <Users className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute top-1/2 left-20 animate-float-slow">
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-red-400/30">
            <Award className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute top-1/4 right-16 animate-float" style={{ animationDelay: "3s" }}>
          <div className="bg-gradient-to-br from-slate-800 to-black p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-600/30">
            <CheckCircle className="h-10 w-10 text-yellow-400" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-16 animate-float-delayed" style={{ animationDelay: "4s" }}>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-yellow-400/30">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="absolute top-3/4 right-1/3 animate-float-slow" style={{ animationDelay: "2.5s" }}>
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-500/30">
            <Globe className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      <div className="fixed top-6 left-6 z-[100] pointer-events-auto">
        <BackToHomeButton />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <RegisterForm />
      </div>
    </div>
  )
}
