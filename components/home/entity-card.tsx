"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { RandomLogo } from "../shared/random-logo"
import { EntityCardButtons } from "./entity-card-buttons"

// Function to strip HTML tags from text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim()
}

interface EntityCardProps {
  id: string
  slug: string
  name: string
  description: string
  logoUrl: string
  upvoteCount: number
  avgRating: number
  reviewCount: number
  index?: number
  userHasUpvoted: boolean
  isAuthenticated: boolean
}

export function EntityCard({
  id,
  slug,
  name,
  description,
  logoUrl,
  upvoteCount,
  avgRating,
  reviewCount,
  index,
  userHasUpvoted,
  isAuthenticated,
}: EntityCardProps) {
  const router = useRouter()
  const entityPageUrl = `/${slug}`

  return (
    <div
      className="group border-border/40 from-card to-card/50 hover:border-primary/60 hover:shadow-primary/10 relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-5"
      onClick={(e) => {
        e.stopPropagation()
        router.push(entityPageUrl)
      }}
    >
      {/* Enhanced hover gradient overlay with shimmer */}
      <div className="from-primary/0 via-primary/10 absolute inset-0 bg-gradient-to-r to-purple-500/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,119,198,0.15),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Enhanced rank badge for top 3 with glow */}
      {typeof index === "number" && index < 3 && (
        <div className="absolute top-3 right-3 z-10 animate-pulse">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 font-bold text-white shadow-2xl backdrop-blur-sm ${
              index === 0
                ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/50"
                : index === 1
                  ? "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-gray-400/50"
                  : "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-orange-500/50"
            }`}
          >
            <span className="text-lg drop-shadow-lg">{index + 1}</span>
          </div>
        </div>
      )}

      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0">
          {/* Premium Logo with gradient border and glow */}
          <div className="border-primary/30 from-primary/20 group-hover:shadow-primary/30 group-hover:border-primary/60 relative h-16 w-16 overflow-hidden rounded-2xl border-2 bg-gradient-to-br via-purple-500/10 to-transparent shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl sm:h-20 sm:w-20">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${name} Logo`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <RandomLogo name={name} />
              </div>
            )}

            {/* Premium verified badge for high ratings with glow */}
            {avgRating >= 4.5 && (
              <div className="absolute -right-1 -bottom-1 animate-pulse rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 shadow-xl shadow-blue-500/50 dark:border-gray-900">
                <svg
                  className="h-3.5 w-3.5 text-white drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-grow">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <Link href={entityPageUrl} className="flex-grow">
                <h3 className="group-hover:text-primary line-clamp-2 text-base font-bold transition-all duration-300 group-hover:translate-x-1 sm:text-lg">
                  {name}
                </h3>
              </Link>
            </div>

            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {stripHtml(description)}
            </p>

            {/* Premium rating display with gradient */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-yellow-200/50 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg dark:border-yellow-700/30 dark:from-yellow-900/30 dark:to-orange-900/30">
                <svg
                  className="h-4 w-4 fill-current text-yellow-500 drop-shadow-sm"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="bg-gradient-to-r from-yellow-700 to-orange-600 bg-clip-text text-sm font-extrabold text-transparent dark:from-yellow-300 dark:to-orange-300">
                  {avgRating.toFixed(1)}
                </span>
              </div>

              <span className="text-muted-foreground text-sm font-medium">
                {reviewCount} review{reviewCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced action buttons */}
        <div className="flex-shrink-0">
          <EntityCardButtons
            entityPageUrl={entityPageUrl}
            entityId={id}
            upvoteCount={upvoteCount ?? 0}
            isAuthenticated={isAuthenticated}
            hasUpvoted={userHasUpvoted}
            entityName={name}
            ratingCount={reviewCount ?? 0}
            averageRating={avgRating ?? 0}
          />
        </div>
      </div>
    </div>
  )
}
