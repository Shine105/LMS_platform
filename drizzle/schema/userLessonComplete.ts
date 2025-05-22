import { relations } from "drizzle-orm"
import { UserTable } from "./user"
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelpers"
import { LessonTable } from "./lessons"


export const UserLessonCompleteTable = pgTable(
    "user_lesson_complete" ,
    {
        userId: uuid()
        .notNull()
        .references(() => UserTable.id, { onDelete: "cascade" }),
        lessonId: uuid()
        .notNull()
        .references(() => LessonTable.id, { onDelete: "cascade" }),
        createdAt,
        updatedAt,
    },
    t => [primaryKey({ columns: [t.userId, t.lessonId] })]
)

export const UserLessonCompleteRealtionships = relations(
    UserLessonCompleteTable,
    ({ one }) => ({
        user: one(UserTable, {
            fields: [UserLessonCompleteTable.userId],
            references: [UserTable.id],
        }),
        course: one(LessonTable, {
            fields: [UserLessonCompleteTable.lessonId],
            references: [LessonTable.id],
        }),
    })
)