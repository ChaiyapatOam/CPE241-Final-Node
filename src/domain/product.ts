import { z } from "zod";

export const ProductSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    category_id: z.number().default(1),
  }),
});

export type TCreateProduct = typeof ProductSchema._type.body;
export type TProduct = typeof ProductSchema._type.body;
