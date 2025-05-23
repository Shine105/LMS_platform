import { relations } from "drizzle-orm";
import { pgTable, text, integer, pgEnum, timestamp, jsonb, uuid, } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserCourseAccessTable } from "./userCourseAccess";
import { json } from "stream/consumers";
import { UserTable } from "./user";
import { ProductTable } from "./product";


export const PurchaseTable = pgTable("purchases", {
  id,
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb()
  .notNull()
  .$type<{ name: string; description: string; imageUrl: string}>(),
  userId: uuid()
  .notNull()
  .references(() => UserTable.id, { onDelete: "restrict" }),
  productId: uuid()
  .notNull()
  .references(() => ProductTable.id, {onDelete: "restrict" }),
  stripeSessionId: text().notNull().unique(),
  deletedAt: timestamp({ withTimezone: true}),
  createdAt,
  updatedAt,
});


export const PurchaseRelationships = relations(PurchaseTable, ({ one })=> ({
    user: one(UserTable, {
        fields: [PurchaseTable.userId],
        references: [UserTable.id],
    }),
    product : one(ProductTable, {
        fields: [PurchaseTable.productId],
        references: [ProductTable.id],
    }),
}))