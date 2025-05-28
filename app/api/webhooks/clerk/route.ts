import { env } from "@/data/env/server"
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users"
import {
  incrementLogin,
  incrementOtpSent,
  incrementOtpResent,
} from "@/features/users/db/userMetrics"
import { syncClerkUserMetadata } from "@/services/clerk"
import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from "svix"

export async function POST(req: Request) {
  const headerPayload = headers()
  const svixId = (await headerPayload).get("svix-id")
  const svixTimestamp = (await headerPayload).get("svix-timestamp")
  const svixSignature = (await headerPayload).get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)

  let event: WebhookEvent | { type: string; data: any }

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent | { type: string; data: any }
  } catch (err) {
    console.error("Webhook verification failed:", err)
    return new Response("Invalid signature", { status: 400 })
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const email = event.data.email_addresses.find(
        (email: any) => email.id === event.data.primary_email_address_id
      )?.email_address
      const name = `${event.data.first_name} ${event.data.last_name}`.trim()

      if (!email || !name) {
        return new Response("Missing email or name", { status: 400 })
      }

      if (event.type === "user.created") {
        const user = await insertUser({
          clerkUserId: event.data.id,
          email,
          name,
          imageUrl: event.data.image_url,
          role: "user",
        })
        await syncClerkUserMetadata(user)
      } else {
        await updateUser(
          { clerkUserId: event.data.id },
          {
            email,
            name,
            imageUrl: event.data.image_url,
            role: event.data.public_metadata.role,
          }
        )
      }
      break
    }

    case "user.deleted": {
      if (event.data.id) {
        await deleteUser({ clerkUserId: event.data.id })
      }
      break
    }

    case "session.created": {
      await incrementLogin(event.data.user_id)
      break
    }

    case "otp.code.sent": {
      await incrementOtpSent(event.data.user_id)
      break
    }

    case "otp.code.resent": {
      await incrementOtpResent(event.data.user_id)
      break
    }

    default:
      console.warn("Unhandled event type:", event.type)
  }

  return new Response("", { status: 200 })
}
