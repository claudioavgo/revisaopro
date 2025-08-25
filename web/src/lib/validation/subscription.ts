import { z } from "zod";

export const createSubscriptionSchema = z.object({
  userId: z.string().min(1),
  provider: z.enum(["NONE", "STRIPE", "APPLE"]).default("NONE"),
  plan: z.enum(["FREE", "PRO", "TEAM"]).default("FREE"),
  interval: z.enum(["MONTH", "YEAR"]).default("MONTH"),
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
