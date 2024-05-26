import { PromotionController } from "@/controller/promotion.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router
  .route("/")
  .post(PromotionController.Create)
  .get(PromotionController.GetALl);

export const promotionRoute: Router = router;
