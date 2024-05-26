import { RoomService } from "@/service/room.service";
import { Request, Response } from "express";

export class RoomController {
  public static async Create(req: Request, res: Response) {
    try {
      const data = await RoomService.Create(req.body);

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }

  public static async GetAllRoom(req: Request, res: Response) {
    try {
      const data = await RoomService.Get();

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }

  public static async GetAllRoomType(req: Request, res: Response) {
    try {
      const data = await RoomService.GetRoomType();

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }

  public static async AddService(req: Request, res: Response) {
    try {
      const data = await RoomService.AddRoomService(req.body);

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }

  public static async AddProduct(req: Request, res: Response) {
    try {
      const data = await RoomService.AddProduct(req.body);

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }
}
