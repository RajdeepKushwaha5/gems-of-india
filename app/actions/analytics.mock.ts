"use server"

// Mock analytics data for testing without Google Analytics
export async function getLast24hVisitors(): Promise<number | null> {
  console.log("🎭 Using mock data for getLast24hVisitors")
  return 1247
}

export async function getLast7DaysVisitors(): Promise<number | null> {
  console.log("🎭 Using mock data for getLast7DaysVisitors")
  return 8543
}

export async function getLast30DaysVisitors(): Promise<number | null> {
  console.log("🎭 Using mock data for getLast30DaysVisitors")
  return 32156
}

export async function getLast30DaysPageviews(): Promise<number | null> {
  console.log("🎭 Using mock data for getLast30DaysPageviews")
  return 87432
}

export async function getCurrentYearVisitors(): Promise<number | null> {
  console.log("🎭 Using mock data for getCurrentYearVisitors")
  return 125789
}

export async function getCurrentYearPageviews(): Promise<number | null> {
  console.log("🎭 Using mock data for getCurrentYearPageviews")
  return 342567
}
