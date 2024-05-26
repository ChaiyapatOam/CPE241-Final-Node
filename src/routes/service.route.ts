import { ServiceController } from "@/controller/service.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/").post(ServiceController.Create).get(ServiceController.GetAll);

export const serviceRoute: Router = router;
