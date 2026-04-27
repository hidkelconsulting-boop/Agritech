import Stripe from "stripe";
import { env } from "./env.js";
import { prisma } from "./db.js";

// Plan → Stripe Price ID mapping (prix mensuels)
export const PLAN_PRICE_IDS: Record<string, string> = {
  PRO: process.env.STRIPE_PRICE_PRO ?? "price_pro_placeholder",
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE ?? "price_enterprise_placeholder",
};

export function createStripeClient(): Stripe | null {
  if (!env.stripeSecretKey) return null;
  return new Stripe(env.stripeSecretKey, { apiVersion: "2024-06-20" });
}

// Sync Stripe subscription status → notre DB
export async function syncSubscription(
  stripe: Stripe,
  stripeSubscriptionId: string,
  organizationId: string,
) {
  const sub = await stripe.subscriptions.retrieve(stripeSubscriptionId);

  // Mapper le status Stripe vers notre enum
  const statusMap: Record<string, string> = {
    trialing: "TRIAL",
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    unpaid: "PAST_DUE",
    incomplete: "PAST_DUE",
    incomplete_expired: "CANCELED",
    paused: "PAST_DUE",
  };

  // Retrouver le tier à partir du price ID
  const priceId = sub.items.data[0]?.price.id ?? "";
  const tier =
    Object.entries(PLAN_PRICE_IDS).find(([, pid]) => pid === priceId)?.[0] ?? "PRO";

  const status = statusMap[sub.status] ?? "ACTIVE";
  const renewsAt = sub.current_period_end
    ? new Date(sub.current_period_end * 1000)
    : null;

  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const data = {
    tier: tier as "FREE" | "PRO" | "ENTERPRISE",
    status: status as "TRIAL" | "ACTIVE" | "PAST_DUE" | "CANCELED",
    stripeSubscriptionId,
    stripeCustomerId: customerId,
    renewsAt,
  };

  const existing = await prisma.subscription.findFirst({ where: { organizationId } });
  if (existing) {
    await prisma.subscription.update({ where: { id: existing.id }, data });
  } else {
    await prisma.subscription.create({ data: { organizationId, ...data } });
  }
}
