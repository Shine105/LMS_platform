import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { id, createdAt, updatedAt } from "../schemaHelpers"

export const UserMetricsTable = pgTable("user_metrics", {
  id,
  clerkUserId: text().notNull().unique(),
  loginCount: integer().notNull().default(0),
  otpSentCount: integer().notNull().default(0),
  otpResentCount: integer().notNull().default(0),
  createdAt,
  updatedAt,
})
