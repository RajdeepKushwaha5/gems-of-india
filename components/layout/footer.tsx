/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { RiGithubFill, RiTwitterXFill } from "@remixicon/react"

// Link groups for a columnar layout
const discoverLinks = [
  { title: "Trending", href: "/trending" },
  { title: "Categories", href: "/categories" },
  { title: "Submit Gem", href: "/submit" },
]

const resourcesLinks = [{ title: "Blog", href: "/blog" }]

const legalLinks = [
  { title: "Terms of Service", href: "/legal/terms" },
  { title: "Privacy Policy", href: "/legal/privacy" },
]

// Links for the new column "Connect"
const connectLinkItems = [
  {
    href: "https://github.com/varunmara/gems-of-india",
    icon: RiGithubFill,
    label: "GitHub",
  },
  {
    href: "https://x.com/varun_mara",
    icon: RiTwitterXFill,
    label: "Twitter / X",
  },
]

export default function FooterSection() {
  return (
    <footer className="border-border/40 from-background via-background to-primary/5 relative overflow-hidden border-t bg-gradient-to-b pt-12 pb-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-x-8">
          {/* Enhanced Left Section: Brand, Copyright, Author */}
          <div className="flex flex-col items-start text-left md:col-span-4 lg:col-span-4">
            <Link
              href="/"
              className="group font-heading mb-4 flex items-center transition-all duration-300 hover:scale-105"
            >
              <span className="font-heading flex items-center text-xl font-bold">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="mr-2 h-10 w-10 drop-shadow-lg transition-transform duration-300 group-hover:rotate-12"
                />
                <span className="from-foreground via-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                  Gems of India
                </span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-2 text-sm font-medium">
              India&apos;s #1 Accountability Platform
            </p>
            <p className="text-muted-foreground/80 mb-3 text-xs">
              © {new Date().getFullYear()} Gems of India. All rights reserved.
            </p>
            <p className="text-muted-foreground/80 text-sm">
              Open source project by{" "}
              <Link
                href="https://x.com/varun_mara"
                target="_blank"
                rel="noopener"
                className="text-primary decoration-primary/30 font-semibold underline transition-colors duration-300 hover:text-purple-600 hover:decoration-purple-600"
              >
                Varun Mara
              </Link>
            </p>
          </div>

          {/* Right Section: Columnar Navigation Links - 2 colonnes sur mobile, 4 sur md */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {/* Enhanced Discover Column */}
            <div className="text-left">
              <h3 className="text-foreground mb-1 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                Discover
                <span className="from-primary h-0.5 w-6 rounded-full bg-gradient-to-r to-purple-600" />
              </h3>
              <ul role="list" className="mt-4 flex flex-col items-start space-y-3">
                {discoverLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="bg-primary h-1 w-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Resources Column */}
            <div className="text-left">
              <h3 className="text-foreground mb-1 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                Resources
                <span className="from-primary h-0.5 w-6 rounded-full bg-gradient-to-r to-purple-600" />
              </h3>
              <ul role="list" className="mt-4 flex flex-col items-start space-y-3">
                {resourcesLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="bg-primary h-1 w-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Legal Column */}
            <div className="text-left">
              <h3 className="text-foreground mb-1 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                Legal
                <span className="from-primary h-0.5 w-6 rounded-full bg-gradient-to-r to-purple-600" />
              </h3>
              <ul role="list" className="mt-4 flex flex-col items-start space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="bg-primary h-1 w-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Connect Column */}
            <div className="text-left">
              <h3 className="text-foreground mb-1 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                Connect
                <span className="from-primary h-0.5 w-6 rounded-full bg-gradient-to-r to-purple-600" />
              </h3>
              <ul role="list" className="mt-4 flex flex-col items-start space-y-3">
                {connectLinkItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
