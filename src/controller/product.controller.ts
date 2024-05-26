import { ProductService } from "@/service/product.service";
import { Request, Response } from "express";

export class ProductController {
  public static async Create(req: Request, res: Response) {
    try {
      const data = await ProductService.Create(req.body);

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }

  public static async GetALl(req: Request, res: Response) {
    try {
      const data = await ProductService.Get();

      res.status(200).send({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false });
    }
  }
}
