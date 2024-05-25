import { z } from "zod";

export const CustomerSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    created_at: z.date().optional(),
  }),
});

export type TCreateCustomer = Omit<typeof CustomerSchema._type.body, "id">;
export type TCustomer = typeof CustomerSchema._type.body;
