import { relations } from "drizzle-orm";
import { pgTable, text, integer, pgEnum, } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const productStatuses = ["public", "private"] as const
export type productStatus = (typeof productStatuses)[number]
export const productStatusEnum = pgEnum("product_status", productStatuses)

export const ProductTable = pgTable("courses", {
  id,
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().default("private").notNull(),
  createdAt,
  updatedAt,
});


export const ProductRelationships = relations(ProductTable,({ many })=> ({
    CourseProducts: many(CourseProductTable),
}))