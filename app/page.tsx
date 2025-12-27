"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Ship,
  Plane,
  Container,
  Package,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Floating Background Icons */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Ship className="absolute top-24 left-10 h-40 w-40 text-blue-500/10 animate-float" />
        <Plane className="absolute top-1/3 right-16 h-32 w-32 text-red-500/10 animate-float-slow rotate-12" />
        <Container className="absolute bottom-32 left-1/4 h-36 w-36 text-yellow-500/10 animate-float" />
        <Package className="absolute bottom-24 right-1/4 h-28 w-28 text-blue-600/10 animate-float-slow" />
      </div>

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.18),transparent_45%)]" />

        <div className="relative container mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow border mb-6">
            <Globe className="h-5 w-5 text-blue-600 animate-spin-slow" />
            <span className="font-medium">Trusted by 500+ Global Traders</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
            Trade Duty Credit Scrips <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
              with Confidence
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-700 mb-10">
            Secure platform for buying and selling RODTEP / ROSCTL duty credit
            scrips with complete logistics & consulting support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="px-10 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl hover:scale-105 transition"
              >
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="px-10 h-14 text-lg font-semibold border-2"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Ship, value: "500+", label: "Active Traders" },
              { icon: Container, value: "₹50Cr+", label: "Scrips Traded" },
              { icon: Plane, value: "99%", label: "Success Rate" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg hover:scale-105 transition"
              >
                <item.icon className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                <div className="text-4xl font-bold">{item.value}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Shield className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose ScripTrade?
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Industry-leading security, transparency and expert-driven trading.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["Secure Trading", "Bank-grade security & encryption"],
              ["Expert Review", "Manual verification by experts"],
              ["Regulatory Compliance", "Fully RODTEP / ROSCTL compliant"],
              ["Trusted Platform", "Used by exporters across India"],
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 hover:scale-105 transition"
              >
                <Sparkles className="h-6 w-6 text-blue-400 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{f[0]}</h3>
                <p className="text-blue-200 text-sm">{f[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-50 to-red-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join hundreds of exporters trading duty credit scrips securely.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="px-10 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl hover:scale-105 transition"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
