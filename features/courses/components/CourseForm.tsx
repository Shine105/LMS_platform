"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { courseSchema } from "../schemas/courses";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import RequiredLabelIcon from "@/components/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCourse } from "../actions/courses";
import { actionToast } from "@/components/ui/sonner";

export function CourseForm() {
    const form = useForm<z.infer<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    async function onSubmit(values: z.infer<typeof courseSchema>) {
        const data = await createCourse(values)
        actionToast({ actionData: data })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-6 flex-col"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            <RequiredLabelIcon />
                            Description
                        </FormLabel>
                        <FormControl>
                            <Textarea className="min-h-20 resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="self-end">
                <Button disabled={form.formState.isSubmitting} type="submit">
                    Save
                </Button>
            </div>
        </form>
    </Form>
}