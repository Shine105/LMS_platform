import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { CourseTable } from "@/features/courses/components/CourseTable";
import { getCourseGlobalTag } from "@/features/courses/db/cache/courses";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";

export default async function CoursesPage() {
// const courses = await getCourses()

    return (
        <div className="container my-6">
            <PageHeader title="Courses">
                <Button asChild>
                    <Link href="/admin/courses/new">
                        New Course
                    </Link>
                </Button>
            </PageHeader>

            {/* <CourseTable courses={courses} /> */}

        </div>
    )
}

// async function getCourses() {
//     "use cache"
//     cacheTag(getCourseGlobalTag())

//     return db.select({
//         id:
//     }).from(Coursest
// }
