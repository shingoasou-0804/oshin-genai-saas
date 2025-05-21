"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export async function createStripeSession(prevState, formData: FormData) {
  const priceId = formData.get("priceId") as string;
  const user = await currentUser();

  if (!user) {
    throw new Error("認証が必要です。");
  }
  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    let customerId = dbUser?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        customer: customerId,
        email: user.emailAddresses[0].emailAddress,
        metadata: {
          clerkId: user.id,
        },
      });

      await prisma.user.update({
        where: { clerkId: user.id },
        data: { stripeCustomerId: customer.id },
      });

      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.BASE_URL}/dashboard/?success=true`,
      cancel_url: `${process.env.BASE_URL}/dashboard/?canceled=true`,
    });

    if (!session.url) {
      throw new Error("セッションの作成に失敗しました。");
    }

    return {
      status: "success",
      error: "",
      redirectUrl: session.url,
    };
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return {
      status: "error",
      error: "決済処理中にエラーが発生しました。",
      redirectUrl: "",
    }
  }
}
