import { ProductController } from "@/controller/product.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/").post(ProductController.Create).get(ProductController.GetALl);

export const productRoute: Router = router;
