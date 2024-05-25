import { z } from "zod";

export const PromotionSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    code: z.string(),
    discount_percent: z.number(),
    amount: z.number(),
    start_date: z.date(),
    expired_date: z.date(),
    room_type_id: z.number(),
  }),
});

export type TCreatePromotion = Omit<typeof PromotionSchema._type.body, "id">;
export type TPromotion = typeof PromotionSchema._type.body;

// export interface Promotion {
//   id: number;
//   code: string;
//   discount_percent: number;
//   amount: number;
//   start_date: Date;
//   expired_date: Date;
//   room_type_id: number;
// }
