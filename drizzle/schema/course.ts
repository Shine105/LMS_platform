import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";
import { UserCourseAccessTable } from "./userCourseAccess";



export const CourseTable = pgTable("courses", {
  id,
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt,
  updatedAt,
});


export const CourseRelationships = relations(CourseTable, ({ many })=> ({
    CourseProducts: many(CourseProductTable),
    UserCourseAccesses: many(UserCourseAccessTable)
}))