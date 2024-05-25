import { z } from "zod";

export const BookingSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    room_id: z.number(),
    customer_id: z.number(),
    check_in_date: z.date(),
    check_out_date: z.date(),
    guest_number: z.number(),
    reception_staff: z.number(),
    created_at: z.date(),
  }),
});

export const CreateBookingSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    room_id: z.number(),
    customer_id: z.number().optional(),
    check_in_date: z.date(),
    check_out_date: z.date(),
    guest_number: z.number(),
    reception_staff: z.number(),
    created_at: z.date().optional(),
  }),
});

export type TCreateBooking = typeof CreateBookingSchema._type.body;
export type TBooking = typeof BookingSchema._type.body;
