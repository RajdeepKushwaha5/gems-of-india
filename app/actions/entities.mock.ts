// Mock data for entities actions - for UI/UX development without database

export async function getTopCategories(limit = 5) {
  // Mock categories data
  return [
    { id: "1", name: "Politicians", count: 145 },
    { id: "2", name: "Bureaucrats", count: 98 },
    { id: "3", name: "Judges", count: 67 },
    { id: "4", name: "Departments", count: 54 },
    { id: "5", name: "Infrastructure", count: 42 },
  ].slice(0, limit)
}

export async function getUserUpvotedEntities() {
  // Mock upvoted entities
  return Array.from({ length: 3 }, (_, i) => ({
    entity: {
      id: `upvoted-${i + 1}`,
      name: `Upvoted Entity ${i + 1}`,
      slug: `upvoted-entity-${i + 1}`,
      logoUrl: "",
      description: `This is an entity you upvoted`,
      status: "published",
      upvoteCount: 50 + i * 10,
      commentCount: 20 + i * 5,
      createdAt: new Date(),
      websiteUrl: "",
      createdBy: "mock-user-id",
      dailyRanking: null,
    },
  }))
}

export async function getUserCreatedEntities() {
  // Mock created entities
  return Array.from({ length: 5 }, (_, i) => ({
    id: `created-${i + 1}`,
    name: `My Entity ${i + 1}`,
    slug: `my-entity-${i + 1}`,
    logoUrl: "",
    description: `Entity I created`,
    status: i < 3 ? "published" : i < 4 ? "pending" : "in_review",
    upvoteCount: 30 + i * 5,
    commentCount: 10 + i * 2,
    createdAt: new Date(),
    websiteUrl: "",
    createdBy: "mock-user-id",
    dailyRanking: i === 0 ? 1 : i === 1 ? 2 : null,
  }))
}

export async function getEntitiesForDirectory(
  page: number,
  limit: number,
  searchQuery: string,
  stateFilter: string,
  cityFilter: string,
  entityTypeFilter: string,
  statusFilter: string,
  sortParam: string,
) {
  // Mock entities for directory
  const mockEntities = Array.from({ length: 25 }, (_, i) => ({
    id: `entity-${i + 1}`,
    slug: `entity-${i + 1}`,
    name: `Government Entity ${i + 1}`,
    description: `Description for entity ${i + 1}`,
    logoUrl: null,
    upvoteCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 50),
    avgRating: (Math.random() * 2 + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 30),
    status: "published",
    userHasUpvoted: false,
    createdAt: new Date(),
  }))

  // Apply filters
  let filtered = [...mockEntities]

  if (searchQuery) {
    filtered = filtered.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Pagination
  const start = (page - 1) * limit
  const entities = filtered.slice(start, start + limit)

  return {
    entities,
    totalCount: filtered.length,
    states: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Gujarat"],
    cityStatePairs: [
      { city: "Mumbai", state: "Maharashtra" },
      { city: "Pune", state: "Maharashtra" },
      { city: "Bangalore", state: "Karnataka" },
      { city: "Delhi", state: "Delhi" },
      { city: "Chennai", state: "Tamil Nadu" },
    ],
  }
}
