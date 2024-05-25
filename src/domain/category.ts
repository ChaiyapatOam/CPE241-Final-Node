import { z } from "zod";

export const CategorySchema = z.object({
  body: z.object({
    id: z.number().optional(),
    name: z.string(),
  }),
});

// export const CreateCategorySchema = z.object({
//   body: z.object({
//     id: z.number().optional(),
//     name: z.string(),
//   }),
// });

export type TCreateCategory = typeof CategorySchema._type.body;
export type TCategory = typeof CategorySchema._type.body;
