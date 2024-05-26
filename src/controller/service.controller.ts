import { RoomServiceService } from "@/service/service.service";
import { Request, Response } from "express";

export class ServiceController {
  public static async Create(req: Request, res: Response) {
    try {
      const data = await RoomServiceService.Create(req.body);

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }
  public static async GetAll(req: Request, res: Response) {
    try {
      const data = await RoomServiceService.Get();

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }
}
