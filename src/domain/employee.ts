import { z } from "zod";

export const EmployeeSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    role: z.string(),
    created_at: z.date(),
  }),
});

export type TCreateEmployee = Omit<typeof EmployeeSchema._type.body, "id">;
export type TEmployee = typeof EmployeeSchema._type.body;
