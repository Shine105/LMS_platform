import { relations } from "drizzle-orm";
import { pgTable, text, integer, pgEnum, timestamp, } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserCourseAccessTable } from "./courseAccess";


export const userRoles = ["user", "admin"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text("name").notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true}),
  createdAt,
  updatedAt,
});


export const UserRelationships = relations(UserTable, ({ many })=> ({
    UserCourseAccesses: many(UserCourseAccessTable)
}))