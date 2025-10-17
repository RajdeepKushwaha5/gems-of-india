import { headers } from "next/headers"
import Link from "next/link"

import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { EntitySection } from "@/components/home/entity-section"
import { WelcomeBanner } from "@/components/home/welcome-banner"
import { WebsiteStructuredData } from "@/components/seo/structured-data"

import { getCurrentYearPageviews, getCurrentYearVisitors } from "./actions/analytics.mock"
import { getMonthBestEntities, getTodayEntities, getTrendingEntities } from "./actions/home.mock"

export default async function Home() {
  const todayEntities = await getTodayEntities()
  const trendingEntities = await getTrendingEntities()
  const monthEntities = await getMonthBestEntities()

  const currentYearVisitors = await getCurrentYearVisitors()
  const currentYearPageviews = await getCurrentYearPageviews()

  // Get session (with error handling for mock mode)
  let session = null
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    })
  } catch (error) {
    console.log("⚠️ Auth unavailable (running in mock mode):", error)
  }

  return (
    <>
      <WebsiteStructuredData />
      <main className="from-background via-background to-muted/20 relative min-h-screen overflow-hidden bg-gradient-to-b">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="bg-primary/5 pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl" />

        <div className="relative container mx-auto max-w-6xl px-4 pt-6 pb-12 md:pt-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-start">
            {/* Contenu principal */}
            <div className="space-y-6 sm:space-y-8 lg:col-span-2">
              {/* Enhanced Welcome Banner */}
              <WelcomeBanner />

              <EntitySection
                title="Today's Top Rated"
                entities={todayEntities}
                sortByUpvotes={true}
                isAuthenticated={!!session?.user}
              />

              <EntitySection
                title="Trending This Week"
                entities={trendingEntities}
                moreHref="/trending"
                sortByUpvotes={true}
                isAuthenticated={!!session?.user}
              />

              <EntitySection
                title="This Month's Best"
                entities={monthEntities}
                moreHref="/trending?filter=month"
                sortByUpvotes={true}
                isAuthenticated={!!session?.user}
              />
            </div>

            {/* Sidebar */}
            <div className="top-24">
              {/* Platform Stats */}
              {/* Statistics */}
              {(currentYearVisitors !== null || currentYearPageviews !== null) && (
                <div className="space-y-3 pt-0 pb-4">
                  <h3 className="flex items-center gap-2 font-semibold">
                    Statistics ({new Date().getFullYear()})
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {currentYearVisitors !== null && (
                      <div className="hover:bg-muted/40 rounded-md border p-2 text-center transition-colors">
                        <div className="text-xl font-bold">{currentYearVisitors}</div>
                        <div className="text-muted-foreground text-xs font-medium">Visitors</div>
                      </div>
                    )}

                    {currentYearPageviews !== null && (
                      <div className="hover:bg-muted/40 rounded-md border p-2 text-center transition-colors">
                        <div className="text-xl font-bold">{currentYearPageviews}</div>
                        <div className="text-muted-foreground text-xs font-medium">Page Views</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Directory */}
              <div className="space-y-3 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold">Browse Directory</h3>
                  <Button variant="ghost" size="sm" className="text-sm" asChild>
                    <Link href="/directory" className="flex items-center gap-1">
                      View all
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-3 py-4">
                <h3 className="flex items-center gap-2 font-semibold">Quick Access</h3>
                <div className="space-y-2">
                  {session?.user && (
                    <Link
                      href="/dashboard"
                      className="-mx-2 flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:underline"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/trending"
                    className="-mx-2 flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:underline"
                  >
                    Trending Now
                  </Link>
                  <Link
                    href="/trending?filter=month"
                    className="-mx-2 flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:underline"
                  >
                    Best of Month
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
