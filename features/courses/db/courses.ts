import { CourseTable } from "@/drizzle/schema";
import { revalidateCourseCache } from "./cache/courses";
import { db } from "@/drizzle/db";

export async function insertCourse(data:typeof CourseTable.$inferInsert) {
    const [newCourse] = await db.insert(CourseTable).values(data).returning()
    if (newCourse == null) throw new Error("failed to create course")
        revalidateCourseCache(newCourse.id)

    return newCourse
}