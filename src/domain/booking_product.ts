import { z } from "zod";

export const BookingProductSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    booking_id: z.number(),
    product_id: z.number(),
    quantity: z.number(),
  }),
});

export type TCreateBookingProduct = Omit<
  typeof BookingProductSchema._type.body,
  "id"
>;
export type TBookingProduct = typeof BookingProductSchema._type.body;
