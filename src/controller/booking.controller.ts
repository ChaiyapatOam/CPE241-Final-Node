import { BookingService } from "@/service/booking.service";
import { Request, Response } from "express";

export class BookingController {
  public static async Booking(req: Request, res: Response) {
    try {
      const data = await BookingService.Create(req.body);

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }
}
