import { z } from "zod";

export const RoomSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    number: z.string(),
    type_id: z.number(),
    available: z.boolean(),
  }),
});

export type TCreateRoom = Omit<typeof RoomSchema._type.body, "id">;
export type TRoom = typeof RoomSchema._type.body;

// export interface Room {
//   id: number;
//   number: string;
//   type_id: number;
//   available: boolean;
// }
