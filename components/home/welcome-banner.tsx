"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { RiArrowRightLine, RiShieldCheckLine, RiTeamLine, RiTrophyLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { icon: RiShieldCheckLine, label: "Verified Officials", value: "1,000+" },
    { icon: RiTeamLine, label: "Active Users", value: "5,000+" },
    { icon: RiTrophyLine, label: "Reviews Posted", value: "10,000+" },
  ]

  return (
    <div className="border-primary/20 from-primary/10 shadow-primary/5 relative overflow-hidden rounded-3xl border bg-gradient-to-br via-purple-500/5 to-transparent p-1 shadow-xl">
      {/* Animated background with multiple layers */}
      <div className="from-primary/30 absolute inset-0 animate-pulse bg-gradient-to-r via-purple-500/20 to-blue-500/30 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="bg-background/80 relative rounded-2xl border border-white/10 px-6 py-12 backdrop-blur-xl sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          {/* Enhanced animated badge */}
          <div
            className={`border-primary/40 from-primary/20 text-primary shadow-primary/20 hover:shadow-primary/30 mb-6 inline-flex items-center gap-2 rounded-full border-2 bg-gradient-to-r to-purple-500/20 px-5 py-2.5 text-sm font-semibold shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-xl ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary shadow-primary/50 relative inline-flex h-2.5 w-2.5 rounded-full shadow-lg" />
            </span>
            India&apos;s #1 Accountability Platform
          </div>

          {/* Main heading with gradient */}
          <h1
            className={`mb-4 text-4xl font-bold tracking-tight transition-all delay-100 duration-700 sm:text-5xl md:text-6xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <span className="gradient-text">Rate & Review</span>
            <br />
            <span className="text-foreground">Indian Government Officials</span>
          </h1>

          {/* Description */}
          <p
            className={`text-muted-foreground mb-8 text-lg transition-all delay-200 duration-700 sm:text-xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Discover babus, politicians, and departments. Share reviews, improve accountability, and
            make India better.
          </p>

          {/* Enhanced CTA Buttons */}
          <div
            className={`mb-12 flex flex-col items-center justify-center gap-4 transition-all delay-300 duration-700 sm:flex-row ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <Button
              size="lg"
              className="btn-gradient group min-w-[180px] font-semibold text-white shadow-xl"
              asChild
            >
              <Link href="/trending">
                Browse Gems
                <RiArrowRightLine className="ml-2 h-5 w-5 transition-all group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary min-w-[180px] border-2 font-semibold shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/submit">Submit Gem</Link>
            </Button>
          </div>

          {/* Enhanced Stats row with glassmorphism */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all delay-400 duration-700 sm:gap-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group border-primary/20 from-background/50 to-primary/5 hover:border-primary/50 hover:shadow-primary/20 hover:bg-primary/10 flex flex-col items-center gap-2 rounded-xl border-2 bg-gradient-to-br p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <stat.icon className="text-primary h-7 w-7 drop-shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <div className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs font-medium sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
