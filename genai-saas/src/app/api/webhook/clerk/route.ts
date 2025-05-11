import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { createUser } from "@/lib/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req)
    
    if (evt.type === "user.created") {
      const { id, email_addresses } = evt.data;
      const email = email_addresses[0].email_address;
  
      try {
        const user = await createUser(id, email);
  
        return NextResponse.json({ user }, { status: 201 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
