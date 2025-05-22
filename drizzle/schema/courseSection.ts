import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { productStatusEnum } from "./product";
import { relations } from "drizzle-orm";
import { LessonTable } from "./lessons";


export const courseSectionStatuses = ["public", "private"] as const
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum(
    "course_section_status", 
    courseSectionStatuses
)

export const CourseSectionTable = pgTable("course_sections", {
  id,
  name: text().notNull(),
  status: courseSectionStatusEnum().default("private").notNull(),
  order: integer().notNull(),
  courseId: uuid()
  .notNull()
  .references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const CourseSectionrelationships = relations(
    CourseSectionTable,
    ({ many, one }) => ({
        course: one(CourseTable, {
            fields: [CourseSectionTable.courseId],
            references: [CourseTable.id],
        }),
        lessons: many(LessonTable),
    })

)

