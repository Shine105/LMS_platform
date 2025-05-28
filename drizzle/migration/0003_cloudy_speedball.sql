CREATE TABLE "user_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" text NOT NULL,
	"loginCount" integer DEFAULT 0 NOT NULL,
	"otpSentCount" integer DEFAULT 0 NOT NULL,
	"otpResentCount" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_metrics_clerkUserId_unique" UNIQUE("clerkUserId")
);
