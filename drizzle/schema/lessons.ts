import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { productStatusEnum } from "./product";
import { relations } from "drizzle-orm";
import { CourseSectionTable } from "./courseSection";
import { UserLessonCompleteTable } from "./userLessonComplete";


export const lessonStatuses = ["public", "private", "preview"] as const
export type lessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum(
    "lesson_status", 
    lessonStatuses
)

export const LessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  descriptions: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().default("private").notNull(),
  sectionId: uuid()
  .notNull()
  .references(() => CourseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const Lessonrelationships = relations(LessonTable, ({ one, many }) => ({
        section: one(CourseSectionTable, {
            fields: [LessonTable.sectionId],
            references: [CourseSectionTable.id],
        }),
        UserLessonComplete: many(UserLessonCompleteTable)
    })

)

