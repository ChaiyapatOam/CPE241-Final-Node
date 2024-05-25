import { UserService } from "@/service/user.service";
import { Request, Response } from "express";

export class UserController {
  public static async Create(req: Request, res: Response) {
    const user = await UserService.Create(req.body);

    res.status(200).send({ success: true, data: user });
  }

  // public static async Register(req: Request, res: Response) {
  //   try {
  //     const user = await userService.Register(req.body);
  //     const session = await sessionService.Create(user.id);
  //     res.cookie("ssid", session, sessionService.cookieConfig);
  //     res.status(200).send({ success: true, data: user });
  //   } catch (e) {
  //     res.status(500).send({ success: false });
  //   }
  // }

  // public static async Logout(req: Request, res: Response) {
  //   const ssid = req.cookies.ssid as string;
  //   await sessionService.Delete(ssid);
  //   res.clearCookie("ssid");
  //   res.status(200).send({ success: true });
  // }
}
