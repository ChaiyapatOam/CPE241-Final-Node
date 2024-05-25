import { AnalyticService } from "@/service/analytics.service";
import { Request, Response } from "express";

export class AnalyticController {
  public static async BookingSummary(req: Request, res: Response) {
    const data = await AnalyticService.BookingSummary();

    res.status(200).send({ success: true, data: data });
  }

  public static async RoomTypeByDate(req: Request, res: Response) {
    const data = await AnalyticService.RoomTypeByDate();

    res.status(200).send({ success: true, data: data });
  }

  public static async MostRoomType(req: Request, res: Response) {
    const data = await AnalyticService.MostRoomType();

    res.status(200).send({ success: true, data: data });
  }

  public static async MostSellProduct(req: Request, res: Response) {
    const data = await AnalyticService.MostSellProduct();

    res.status(200).send({ success: true, data: data });
  }
}
