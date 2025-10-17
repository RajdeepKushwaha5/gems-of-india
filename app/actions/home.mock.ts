"use server"

// Mock data for testing without database
const mockEntities = [
  {
    id: "1",
    name: "Taj Mahal Tours",
    slug: "taj-mahal-tours",
    status: "PUBLISHED",
    description: "Experience the wonder of India's most iconic monument with guided tours",
    logoUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400",
    websiteUrl: "https://example.com/taj-mahal",
    dailyRanking: 1,
    createdAt: new Date(),
    upvoteCount: 142,
    avgRating: 4.8,
    reviewCount: 28,
    userHasUpvoted: false,
  },
  {
    id: "2",
    name: "Kerala Backwaters",
    slug: "kerala-backwaters",
    status: "PUBLISHED",
    description: "Explore the serene backwaters of Kerala on traditional houseboats",
    logoUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400",
    websiteUrl: "https://example.com/kerala",
    dailyRanking: 2,
    createdAt: new Date(),
    upvoteCount: 98,
    avgRating: 4.6,
    reviewCount: 22,
    userHasUpvoted: false,
  },
  {
    id: "3",
    name: "Rajasthan Desert Safari",
    slug: "rajasthan-desert-safari",
    status: "PUBLISHED",
    description: "Adventure through the golden deserts of Rajasthan on camelback",
    logoUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400",
    websiteUrl: "https://example.com/rajasthan",
    dailyRanking: 3,
    createdAt: new Date(),
    upvoteCount: 87,
    avgRating: 4.7,
    reviewCount: 19,
    userHasUpvoted: false,
  },
  {
    id: "4",
    name: "Goa Beach Resorts",
    slug: "goa-beach-resorts",
    status: "PUBLISHED",
    description: "Relax on pristine beaches with luxury accommodations in Goa",
    logoUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    websiteUrl: "https://example.com/goa",
    dailyRanking: 4,
    createdAt: new Date(),
    upvoteCount: 76,
    avgRating: 4.5,
    reviewCount: 31,
    userHasUpvoted: false,
  },
  {
    id: "5",
    name: "Himalayan Trekking",
    slug: "himalayan-trekking",
    status: "PUBLISHED",
    description: "Trek through breathtaking Himalayan landscapes and mountain villages",
    logoUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400",
    websiteUrl: "https://example.com/himalaya",
    dailyRanking: 5,
    createdAt: new Date(),
    upvoteCount: 65,
    avgRating: 4.9,
    reviewCount: 15,
    userHasUpvoted: false,
  },
  {
    id: "6",
    name: "Mumbai Street Food Tours",
    slug: "mumbai-street-food",
    status: "PUBLISHED",
    description: "Discover authentic Mumbai flavors with expert local food guides",
    logoUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    websiteUrl: "https://example.com/mumbai-food",
    dailyRanking: 6,
    createdAt: new Date(),
    upvoteCount: 54,
    avgRating: 4.4,
    reviewCount: 26,
    userHasUpvoted: false,
  },
]

export async function getTodayEntities(limit: number = 10) {
  console.log("🎭 Using mock data for getTodayEntities")
  return mockEntities.slice(0, limit)
}

export async function getYesterdayEntities(limit: number = 10) {
  console.log("🎭 Using mock data for getYesterdayEntities")
  return mockEntities.slice(0, limit)
}

export async function getMonthBestEntities(limit: number = 10) {
  console.log("🎭 Using mock data for getMonthBestEntities")
  return mockEntities.slice(0, limit)
}

export async function getTrendingEntities(limit: number = 10) {
  console.log("🎭 Using mock data for getTrendingEntities")
  return mockEntities.slice(0, limit)
}

export async function getFeaturedPremiumEntities() {
  console.log("🎭 Using mock data for getFeaturedPremiumEntities")
  return mockEntities.slice(0, 3)
}

export async function getYesterdayTopEntities() {
  console.log("🎭 Using mock data for getYesterdayTopEntities")
  return mockEntities.slice(0, 3).map((e) => ({
    id: e.id,
    name: e.name,
    slug: e.slug,
    status: e.status,
    logoUrl: e.logoUrl,
    dailyRanking: e.dailyRanking,
  }))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getWinnersByDate(date: Date) {
  console.log("🎭 Using mock data for getWinnersByDate")
  return mockEntities.slice(0, 3)
}
