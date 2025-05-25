import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";
import { stripe } from "@/config/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  let event;
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (endpointSecret) {
    const signature = request.headers.get("stripe-signature") as string;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        endpointSecret
      );
    } catch {
      console.log(`⚠️  Webhook signature verification failed.`);
      return new NextResponse("Webhook error", { status: 400 });
    }
  }

  if (!event) {
    return new NextResponse("Event Error", { status: 500 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata || !session?.subscription) {
        return new NextResponse("Session Error", { status: 500 });
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription?.toString()
      );

      let subscriptionStatus: SubscriptionStatus = "FREE";

      switch(subscription.items.data[0].price.id) {
        case "price_1RQGqJA7Nyoj2Kof0dcvz6nu":
          subscriptionStatus = "STARTER";
          break;
        case "price_1RQGrBA7Nyoj2KofCTMT1zS4":
          subscriptionStatus = "Pro";
          break;
        case "price_1RQHBvA7Nyoj2KofxkrqBIcL":
          subscriptionStatus = "ENTERPRISE";
          break;
      }

      // 初回はサブスクリプション登録のみ
      await prisma.user.update({
        where: { clerkId: session.metadata.clerkId },
        data: {
          subscriptionStatus: subscriptionStatus,
          subscription: {
            create: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end),
            },
          },
        },
      });
      
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  return new NextResponse(null, { status: 200 });
}
