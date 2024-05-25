import { NextFunction, Request, Response } from "express";
import sessionService from "@/service/session.service";
import { EmployeeService } from "@/service/employee.service";

export class Middleware {
  public static async checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const ssid = req.cookies.ssid as string;

    if (!ssid) {
      return res.status(403).send({
        message: "No Token provided!",
      });
    }

    const session = await sessionService.Validate(ssid);
    if (!session) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    req.userId = session.userId;

    next();
  }

    public static async isManager(req: Request, res: Response, next: NextFunction) {
      const userId = req.userId;
      const user = await EmployeeService.GetById(userId);
      if (user?.role !== "manager") {
        return res.status(405).send({
          message: "You are not manager!",
        });
      }
      next();
    }

  //   public static async isAdmin(req: Request, res: Response, next: NextFunction) {
  //     const userId = req.userId;
  //     const user = await userService.findUserById(userId);
  //     if (user?.role !== Role.admin) {
  //       return res.status(405).send({
  //         message: "You are not Admin!",
  //       });
  //     }
  //     next();
  //   }
}
