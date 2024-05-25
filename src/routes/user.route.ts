import { UserController } from "@/controller/user.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/").post(UserController.Create);

export const userRoute: Router = router;
