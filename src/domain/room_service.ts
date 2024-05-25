import { z } from "zod";

export const RoomServiceSchema = z.object({
  body: z.object({
    id: z.number().optional(),
    service_id: z.number(),
    booking_id: z.number(),
    request_time: z.date(),
    finish_time: z.date().nullable(),
    employee_id: z.number(),
  }),
});

export type TCreateRoomService = Omit<
  typeof RoomServiceSchema._type.body,
  "id"
>;
export type TRoomService = typeof RoomServiceSchema._type.body;

// export interface RoomService {
//   id: number;
//   service_id: number;
//   booking_id: number;
//   request_time: Date;
//   finish_time: Date | null;
//   employee_id: number;
// }
