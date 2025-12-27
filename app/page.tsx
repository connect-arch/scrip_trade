"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  FileText,
  Ship,
  Plane,
  Container,
  Package,
  Anchor,
  CheckCircle,
  Globe,
  ExternalLink,
  MapPin,
  Phone,
  Building2,
  Truck,
  FileCheck,
  Sparkles,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated 3D Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-5 animate-float">
          <Ship className="h-40 w-40 text-blue-500" strokeWidth={0.5} />
        </div>
        <div className="absolute top-1/3 right-20 opacity-5 animate-float-delayed">
          <Plane className="h-32 w-32 text-red-500 rotate-45" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-40 left-1/4 opacity-5 animate-float-slow">
          <Container className="h-36 w-36 text-yellow-500" strokeWidth={0.5} />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-5 animate-float">
          <Package className="h-28 w-28 text-blue-600" strokeWidth={0.5} />
        </div>
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl blur-md group-hover:blur-lg transition-all" />
              <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-3 rounded-xl shadow-xl">
                <div className="text-white font-bold text-xl leading-none">ST</div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Scrip Trade
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Duty Credit Trading Platform</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="gap-2 text-black border-black hover:bg-black hover:text-white bg-transparent"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="ghost" size="sm" className="gap-2">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative container mx-auto px-4 py-24 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-10 left-10 tile-float-3d bg-gradient-to-br from-blue-500/10 to-blue-700/10 p-6 rounded-2xl backdrop-blur-sm border border-blue-400/20 transform rotate-12">
              <Ship className="h-16 w-16 text-blue-500" />
            </div>
            <div className="absolute top-20 right-20 tile-float-3d-delayed bg-gradient-to-br from-red-500/10 to-yellow-500/10 p-6 rounded-2xl backdrop-blur-sm border border-red-400/20 transform -rotate-12">
              <Plane className="h-16 w-16 text-red-500" />
            </div>
            <div className="absolute bottom-40 right-40 tile-float-3d-slow bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 p-6 rounded-2xl backdrop-blur-sm border border-yellow-400/20 transform rotate-6">
              <Container className="h-16 w-16 text-yellow-600" />
            </div>
            <div className="absolute bottom-20 left-40 tile-float-3d bg-gradient-to-br from-blue-600/10 to-black/10 p-6 rounded-2xl backdrop-blur-sm border border-blue-400/20 transform -rotate-6">
              <Package className="h-16 w-16 text-blue-600" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-black px-6 py-3 rounded-full text-sm font-medium mb-4 border border-gray-200 shadow-lg">
              <Globe className="h-5 w-5 animate-spin-slow text-blue-600" />
              Trusted by 500+ Global Traders
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-balance text-black drop-shadow-2xl">
              Trade Duty Credit Scrips with Confidence
            </h1>
            <p className="text-xl md:text-2xl text-black text-balance max-w-2xl mx-auto leading-relaxed font-semibold">
              Secure platform for buying and selling RODTEP/ROSCTL duty credit scrips with comprehensive logistics &
              consulting support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-lg px-8 h-14 gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-black font-bold shadow-2xl shadow-blue-500/50 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <span className="relative">Start Trading Now</span>
                  <ArrowRight className="h-5 w-5 relative" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 h-14 gap-2 bg-white backdrop-blur-sm border-2 border-black text-black hover:bg-black hover:text-white font-bold"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Ship className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
                  <div className="text-4xl font-bold text-black">500+</div>
                  <div className="text-sm text-gray-700 font-medium">Active Traders</div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Container className="h-8 w-8 text-red-600 mb-2 mx-auto" />
                  <div className="text-4xl font-bold text-black">₹50Cr+</div>
                  <div className="text-sm text-gray-700 font-medium">Scrips Traded</div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-yellow-700/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-200 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Plane className="h-8 w-8 text-yellow-600 mb-2 mx-auto" />
                  <div className="text-4xl font-bold text-black">99%</div>
                  <div className="text-sm text-gray-700 font-medium">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/10">
                <Anchor className="h-5 w-5" />
                Complete Logistics Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Why Choose ScripTrade?</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Experience seamless trading with industry-leading security and comprehensive export support
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-blue-500/10 to-blue-700/10 backdrop-blur-md p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg" />
                    <div className="relative h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center backdrop-blur-sm">
                      <Ship className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">Secure Trading</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Bank-grade security with encryption and two-factor authentication to protect your transactions.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-red-500/10 to-yellow-500/10 backdrop-blur-md p-8 rounded-2xl border border-red-400/20 hover:border-red-400/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg" />
                    <div className="relative h-16 w-16 rounded-xl bg-gradient-to-br from-red-500/20 to-yellow-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Plane className="h-8 w-8 text-red-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">Expert Review</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Our admin team manually reviews each scrip to provide competitive and fair market rates.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-yellow-700/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 backdrop-blur-md p-8 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-lg" />
                    <div className="relative h-16 w-16 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 flex items-center justify-center backdrop-blur-sm">
                      <Container className="h-8 w-8 text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">Full Compliance</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Fully compliant with regulatory requirements for duty credit scrip trading and documentation.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-black/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-blue-600/10 to-black/10 backdrop-blur-md p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg" />
                    <div className="relative h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600/20 to-black/20 flex items-center justify-center backdrop-blur-sm">
                      <Package className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">Trusted Platform</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Join hundreds of traders who trust our platform for their scrip trading needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process to start trading
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-lg">
                1
              </div>
              <h3 className="font-bold text-xl mb-3">Post Your Scrip</h3>
              <p className="text-muted-foreground">
                Submit your duty credit scrip details including amount, issue date, and BRC status
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-lg">
                2
              </div>
              <h3 className="font-bold text-xl mb-3">Get Expert Rate</h3>
              <p className="text-muted-foreground">
                Admin team reviews your scrip and provides the best competitive rate based on market conditions
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-lg">
                3
              </div>
              <h3 className="font-bold text-xl mb-3">Accept & Trade</h3>
              <p className="text-muted-foreground">
                Accept the rate and our team will initiate the transaction process with complete security
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Building2 className="h-4 w-4" />
                Our Companies & Services
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Export Solutions</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Beyond scrip trading, we offer complete consulting and logistics support for all your export needs
              </p>
            </div>

            {/* Company Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {/* Magnas Consulting */}
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-16 w-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Magnas Consulting & Logistics</h3>
                  <a
                    href="https://magnasconsulting.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 inline-flex items-center gap-2 text-sm group-hover:underline"
                  >
                    magnasconsulting.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-white/80 leading-relaxed text-center">
                  Expert consulting services for export-related compliance, documentation, and government schemes
                </p>
              </div>

              {/* Eximassist Services Private Limited */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-red-600/20 backdrop-blur-sm p-8 rounded-2xl border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 group">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-16 w-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Eximassist Services Private Limited</h3>
                  <a
                    href="https://eximassist.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:text-yellow-200 inline-flex items-center gap-2 text-sm group-hover:underline"
                  >
                    eximassist.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-white/80 leading-relaxed text-center">
                  Comprehensive logistics and export assistance services to streamline your international trade
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-600/30 to-black/30 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="h-14 w-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">GST Refund</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Expert assistance in processing GST refunds for export transactions with complete documentation
                  support
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-600/30 to-yellow-600/30 backdrop-blur-sm p-6 rounded-xl border border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
                <div className="h-14 w-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                  <FileCheck className="h-7 w-7 text-red-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">BRC Generation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Bank Realization Certificate processing and follow-up for seamless export documentation
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-600/30 to-black/30 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                <div className="h-14 w-14 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Scrip Generation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  RODTEP/ROSCTL duty credit scrip generation and management with regulatory compliance
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="h-14 w-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Export Documentation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Complete support for all export-related documentation, licensing, and compliance requirements
                </p>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-yellow-600/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">Full-Service Consulting & Logistics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 rounded-full bg-blue-500/20 items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Compliance Advisory</h4>
                  <p className="text-sm text-white/70">Expert guidance on export regulations and government schemes</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 rounded-full bg-yellow-500/20 items-center justify-center mb-3">
                    <Truck className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Logistics Support</h4>
                  <p className="text-sm text-white/70">End-to-end logistics solutions for your exports</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 rounded-full bg-red-500/20 items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-red-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Documentation Services</h4>
                  <p className="text-sm text-white/70">Professional handling of all export paperwork</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200">
                <MapPin className="h-5 w-5" />
                Our Offices
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Visit Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're here to serve you across multiple locations in Maharashtra
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Pune Office */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all" />
                <div className="relative bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pune Office</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">
                      706, Bramhacorp Vantage,
                      <br />
                      Tower C, NDA-Pashan Road,
                      <br />
                      Bavdhan, Pune - 411021
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium pt-2">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+912040753413" className="hover:underline">
                        (+91) 20-40753413
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mumbai Office */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all" />
                <div className="relative bg-white p-8 rounded-2xl border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-red-500 to-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mumbai Office</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">
                      2908, Plan S Business Park,
                      <br />
                      Opp. DY Patil Stadium,
                      <br />
                      Nerul, Navi Mumbai - 400706
                    </p>
                    <div className="flex items-center gap-2 text-red-600 font-medium pt-2">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+912247785380" className="hover:underline">
                        (+91) 22-47785380
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nashik Office */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-green-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all" />
                <div className="relative bg-white p-8 rounded-2xl border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-yellow-500 to-green-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nashik Office</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">
                      603, Business World,
                      <br />
                      Tidke Colony Link Road,
                      <br />
                      Govind Nagar, Nashik - 422009
                    </p>
                    <div className="flex items-center gap-2 text-yellow-600 font-medium pt-2">
                      <Phone className="h-4 w-4" />
                      <span>Contact us for details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative container mx-auto px-4 py-24 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
          <div className="max-w-3xl mx-auto space-y-8 relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              No Hidden Fees
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Create your account today and start trading duty credit scrips with confidence. Join our trusted
              community.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 h-14 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg"
              >
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ScripTrade</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://magnasconsulting.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                magnasconsulting.com
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href="https://eximassist.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                eximassist.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">&copy; 2025 ScripTrade. All rights reserved.</p>
              <p className="text-sm text-muted-foreground mt-1">Compliant with RODTEP/ROSCTL trading regulations</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
