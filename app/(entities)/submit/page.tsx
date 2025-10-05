import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { SubmitEntityFormNew } from "@/components/entity/submit-form"

export default async function SubmitEntity() {
  // Verify the user is logged in
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Redirect to login if no session
  if (!session?.user?.id) {
    redirect("/sign-in?redirect=/submit")
  }

  return (
    <div className="from-background to-background/80 min-h-[calc(100vh-5rem)] bg-gradient-to-b">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-12">
        <div className="mb-6 space-y-2 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create a User or Organization
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Share your user/organization with the community. Fill in the details below.
          </p>
        </div>

        <div className="bg-card rounded-lg border shadow-sm sm:rounded-xl">
          <div className="p-4 sm:p-6 md:p-8">
            <SubmitEntityFormNew />
          </div>
        </div>
      </div>
    </div>
  )
}
