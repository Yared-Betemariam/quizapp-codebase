// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/mongoose/db";
// import { getPlanByAmount, stripe } from "@/lib/stripe";
// import Users from "@/mongoose/models/user";
// import { headers } from "next/headers";
// import type Stripe from "stripe";

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export async function POST(request: Request) {
//   const body = await request.text();
//   const signature = headers().get("Stripe-Signature") ?? "";

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       webhookSecret || ""
//     );
//   } catch (err) {
//     return new Response(
//       `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
//       { status: 400 }
//     );
//   }

//   const session = event.data.object as Stripe.Checkout.Session;

//   const eventType = event.type;
//   await connectDB();
//   try {
//     switch (eventType) {
//       case "checkout.session.completed": {
//         if (!session?.metadata?.userId) {
//           return new Response(null, {
//             status: 200,
//           });
//         }

//         if (session.mode == "payment") {
//           // it is on time payment
//           const id = session.metadata.userId;
//           const price = session.amount_total;

//           await Users.findOneAndUpdate(
//             {
//               _id: id,
//             },
//             {
//               planId: getPlanByAmount(price as number)?.id,
//             }
//           );

//           break;
//         }

//         const subscription = await stripe.subscriptions.retrieve(
//           session.subscription as string
//         );

//         const id = session.metadata.userId;
//         const price = subscription.items.data[0].price;

//         await Users.findOneAndUpdate(
//           {
//             _id: id,
//           },
//           {
//             stripeSubscriptionId: subscription.id,
//             stripeCustomerId: subscription.customer as string,
//             stripePriceId: subscription.items.data[0]?.price.id,
//             stripeCurrentPeriodEnd: new Date(
//               subscription.current_period_end * 1000
//             ),
//             planId: getPlanByAmount(price.unit_amount as number)?.id,
//           }
//         );
//         break;
//       }
//       case "customer.subscription.deleted": {
//         const subscription = await stripe.subscriptions.retrieve(
//           event.data.object.id
//         );

//         await Users.findOneAndUpdate(
//           {
//             stripeSubscriptionId: subscription.id,
//           },
//           {
//             $unset: {
//               stripePriceId: "",
//               stripeCurrentPeriodEnd: "",
//             },
//             planId: "free",
//           }
//         );
//       }
//       // case "invoice.payment_succeeded": {
//       //   console.log("invoice");
//       //   const subscription = await stripe.subscriptions.retrieve(
//       //     session.subscription as string
//       //   );
//       //   console.log(subscription.id);
//       //   await Users.findOneAndUpdate(
//       //     {
//       //       stripeSubscriptionId: subscription.id,
//       //     },
//       //     {
//       //       stripePriceId: subscription.items.data[0]?.price.id,
//       //       stripeCurrentPeriodEnd: new Date(
//       //         subscription.current_period_end * 1000
//       //       ),
//       //     }
//       //   );
//       // }
//       default:
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   return new Response(null, { status: 200 });
// }

// // /* src/app/api/webhook/route.ts */
// // import crypto from 'node:crypto'
// // import { processWebhookEvent, storeWebhookEvent } from '@/app/actions'
// // import { webhookHasMeta } from '@/lib/typeguards'

// // export async function POST(request: Request) {
// //   if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
// //     return new Response('Lemon Squeezy Webhook Secret not set in .env', {
// //       status: 500,
// //     })
// //   }

// //   // First, make sure the request is from Lemon Squeezy.
// //   const rawBody = await request.text()
// //   const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

// //   const hmac = crypto.createHmac('sha256', secret)
// //   const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
// //   const signature = Buffer.from(
// //     request.headers.get('X-Signature') || '',
// //     'utf8'
// //   )

// //   if (!crypto.timingSafeEqual(digest, signature)) {
// //     throw new Error('Invalid signature.')
// //   }

// //   const data = JSON.parse(rawBody) as unknown

// //   // Type guard to check if the object has a 'meta' property.
// //   if (webhookHasMeta(data)) {
// //     const webhookEventId = await storeWebhookEvent(data.meta.event_name, data)

// //     // Non-blocking call to process the webhook event.
// //     void processWebhookEvent(webhookEventId)

// //     return new Response('OK', { status: 200 })
// //   }

// //   return new Response('Data invalid', { status: 400 })
// // }

import Users from "@/mongoose/models/questions";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("web hook");
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE || "";
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    console.log(body);

    // Logic according to event
    if (eventType === "order_created") {
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";

      if (isSuccessful) {
        console.log("user paid", userId);

        await Users.findByIdAndUpdate(userId, {
          pro: true,
        });
      }
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
