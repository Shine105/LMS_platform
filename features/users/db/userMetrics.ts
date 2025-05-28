import { eq } from "drizzle-orm"
import { sql } from "drizzle-orm"
import { db } from "@/drizzle/db"
import { UserMetricsTable } from "@/drizzle/schema/metrics"

export async function incrementLogin(clerkUserId: string) {
  await db
    .insert(UserMetricsTable)
    .values({ clerkUserId })
    .onConflictDoNothing()
  
  await db
    .update(UserMetricsTable)
    .set({ loginCount: sql`${UserMetricsTable.loginCount} + 1` })
    .where(eq(UserMetricsTable.clerkUserId, clerkUserId))
}

export async function incrementOtpSent(clerkUserId: string) {
  await db
    .insert(UserMetricsTable)
    .values({ clerkUserId })
    .onConflictDoNothing()
  
  await db
    .update(UserMetricsTable)
    .set({ otpSentCount: sql`${UserMetricsTable.otpSentCount} + 1` })
    .where(eq(UserMetricsTable.clerkUserId, clerkUserId))
}

export async function incrementOtpResent(clerkUserId: string) {
  await db
    .insert(UserMetricsTable)
    .values({ clerkUserId })
    .onConflictDoNothing()
  
  await db
    .update(UserMetricsTable)
    .set({ otpResentCount: sql`${UserMetricsTable.otpResentCount} + 1` })
    .where(eq(UserMetricsTable.clerkUserId, clerkUserId))
}
