CREATE TABLE "tables" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"imageUrl" text NOT NULL,
	"priceInDollars" integer NOT NULL,
	"status" "product_status" DEFAULT 'private' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_products" DROP CONSTRAINT "course_products_productId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_productId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "course_products" ADD CONSTRAINT "course_products_productId_tables_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."tables"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_tables_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."tables"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "imageUrl";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "priceInDollars";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "status";