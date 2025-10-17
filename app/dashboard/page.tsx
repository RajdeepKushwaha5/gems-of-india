import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import {
  RiAddLine,
  RiCalendarLine,
  RiFireLine,
  RiHashtag,
  RiHeartFill,
  RiRocketLine,
} from "@remixicon/react"

import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardEntityCard } from "@/components/dashboard/dashboard-entity-card"

import { getUserCreatedEntities, getUserUpvotedEntities } from "../actions/entities.mock"

// Base entity type that matches the actual structure from the database
interface BaseEntity {
  id: string
  name: string
  slug: string
  logoUrl: string
  description: string
  status: string
  upvoteCount?: string | number | null
  commentCount?: string | number | null
  websiteUrl?: string | null
  createdAt: string | Date
  createdBy?: string | null
  dailyRanking?: number | null
}

export default async function Dashboard() {
  let session = null
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    })
  } catch (error) {
    console.log("⚠️ Auth unavailable (running in mock mode):", error)
    // For UI/UX development, provide a mock session
    session = {
      user: {
        id: "mock-user-id",
        name: "Demo User",
        email: "demo@example.com",
        image: null,
      },
    }
  }

  // If user is not logged in, we shouldn't be here
  if (!session?.user?.id) {
    return null
  }

  // Get data from actions
  const upvotedEntitiesData = await getUserUpvotedEntities()
  const createdEntitiesData = await getUserCreatedEntities()

  // Process the data to match our expected formats
  const upvotedEntities = upvotedEntitiesData.map((item) => item.entity) as BaseEntity[]
  const createdEntities = createdEntitiesData as BaseEntity[]

  // entities with badge (launched + top 3)
  const badgeEntities = createdEntities.filter(
    (entity) => entity.status === "published" && entity.dailyRanking && entity.dailyRanking <= 3,
  )

  const publishedEntities = createdEntities.filter((entity) => entity.status === "published")

  const pendingEntities = createdEntities.filter((entity) => entity.status === "pending")

  const inReviewEntities = createdEntities.filter((entity) => entity.status === "in_review")

  return (
    <div className="from-background via-background to-muted/20 relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-b py-6 sm:py-8">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-heading text-2xl font-bold sm:text-3xl">Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {session?.user?.name || "User"}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" asChild>
                <Link href="/">Explore Gems</Link>
              </Button>
              <Button asChild>
                <Link
                  href="/submit"
                  className="flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <RiAddLine className="h-4 w-4" />
                  Submit a Gem
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - My entities */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border dark:border-zinc-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-xl font-semibold">My Gems</CardTitle>
                </div>
                <CardDescription>Manage your submitted gems</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <Tabs defaultValue="active">
                  <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger
                      value="active"
                      className="cursor-pointer px-1 py-1.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
                    >
                      Published ({publishedEntities.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="upcoming"
                      className="cursor-pointer px-1 py-1.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
                    >
                      Pending ({pendingEntities.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="past"
                      className="cursor-pointer px-1 py-1.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
                    >
                      In Review ({inReviewEntities.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-0">
                    {pendingEntities.length > 0 ? (
                      <div className="space-y-3">
                        {pendingEntities.map((entity) => (
                          <DashboardEntityCard key={entity.id} {...entity} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="bg-secondary/50 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                          <RiCalendarLine className="text-muted-foreground h-6 w-6" />
                        </div>
                        <h3 className="mb-1 font-medium">No pending gem submissions</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          You don&apos;t have any pending gem submissions yet
                        </p>
                        <Button size="sm" asChild>
                          <Link href="/submit">Submit a Gem</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="active" className="mt-0">
                    {publishedEntities.length > 0 ? (
                      <div className="space-y-3">
                        {publishedEntities.map((entity) => (
                          <DashboardEntityCard key={entity.id} {...entity} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="bg-secondary/50 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                          <RiRocketLine className="text-muted-foreground h-6 w-6" />
                        </div>
                        <h3 className="mb-1 font-medium">No published gems</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          You don&apos;t have any published gems at the moment
                        </p>
                        <Button size="sm" asChild>
                          <Link href="/submit">Submit a Gem</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="past" className="mt-0">
                    {inReviewEntities.length > 0 ? (
                      <div className="space-y-3">
                        {inReviewEntities.map((entity) => (
                          <DashboardEntityCard key={entity.id} {...entity} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="bg-secondary/50 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                          <RiRocketLine className="text-muted-foreground h-6 w-6" />
                        </div>
                        <h3 className="mb-1 font-medium">No past submissions</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          You haven&apos;t submitted any gems yet
                        </p>
                        <Button size="sm" asChild>
                          <Link href="/submit">Submit a Gem</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Section Badges */}
            {badgeEntities.length > 0 && (
              <Card className="border dark:border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-xl font-semibold">Your Badges</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Gems you&apos;ve recently submitted and ranked in the top 3
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-0">
                  {badgeEntities.map((entity) => (
                    <DashboardEntityCard
                      key={entity.id}
                      {...entity}
                      actionButton={
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                          className="h-8 w-full px-4 text-sm font-semibold sm:w-auto"
                          title="View badge"
                        >
                          <Link href={`/${entity.slug}/badges`}>Badges</Link>
                        </Button>
                      }
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Upvotes Section */}
            <Card className="border dark:border-zinc-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-xl font-semibold">
                    Recent Upvotes
                  </CardTitle>
                </div>
                <CardDescription>Gems you&apos;ve recently upvoted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upvotedEntities.length > 0 ? (
                    upvotedEntities
                      .slice(0, 4)
                      .map((entity) => <DashboardEntityCard key={entity.id} {...entity} />)
                  ) : (
                    <div className="py-6 text-center">
                      <div className="bg-secondary/50 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                        <RiHeartFill className="text-muted-foreground h-6 w-6" />
                      </div>
                      <h3 className="mb-1 font-medium">No upvotes yet</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        You haven&apos;t upvoted any gems yet
                      </p>
                      <Button size="sm" asChild>
                        <Link href="/trending">Explore Gems</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile and Actions */}
          <div className="space-y-6">
            <Card className="border dark:border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-xl font-semibold">Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full border">
                    {session?.user?.image ? (
                      <Image
                        src={session?.user?.image}
                        alt={session?.user?.name || "User"}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center object-cover text-2xl font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{session?.user?.name}</h4>
                    <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 pt-0">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/settings" className="flex items-center justify-center gap-2">
                    <RiRocketLine className="h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-semibold">Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" asChild className="justify-start">
                  <Link href="/submit" className="flex items-center gap-2">
                    <RiAddLine className="h-4 w-4" />
                    Submit a Gem
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start">
                  <Link href="/" className="flex items-center gap-2">
                    <RiRocketLine className="h-4 w-4" />
                    Explore Gems
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start">
                  <Link href="/trending" className="flex items-center gap-2">
                    <RiFireLine className="h-4 w-4" />
                    Trending Gems
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start">
                  <Link href="/categories" className="flex items-center gap-2">
                    <RiHashtag className="h-4 w-4" />
                    Explore categories
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
