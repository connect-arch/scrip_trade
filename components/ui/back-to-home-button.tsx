"use client"

import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export function BackToHomeButton() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 backdrop-blur-md text-white border-2 border-blue-400/50 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl z-[100] relative"
    >
      <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
      <span className="font-semibold">Back to Home</span>
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
    </Link>
  )
}
