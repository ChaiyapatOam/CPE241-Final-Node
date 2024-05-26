import { z } from "zod";

export const RoomServiceSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    name: z.string(),
    cost: z.number(),
  }),
});

export type TCreateRoomService = Omit<
  typeof RoomServiceSchema._type.body,
  "id"
>;
export type TRoomService = typeof RoomServiceSchema._type.body;
// export interface Service {
//   id: number;
//   name: string;
//   cost: number;
// }
