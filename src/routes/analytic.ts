import { AnalyticController } from "@/controller/analy.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/booking").get(AnalyticController.BookingSummary);
router.route("/roomtype").get(AnalyticController.RoomTypeByDate);
router.route("/mostroom").get(AnalyticController.MostRoomType);
router.route("/mostsell").get(AnalyticController.MostSellProduct);

export const analyticsRoute: Router = router;
